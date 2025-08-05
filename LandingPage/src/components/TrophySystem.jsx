import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { useProgress } from '../context/ProgressContext';
import { simulateCourseCompletion, resetCourseProgress, getCourseStatus } from '../utils/simulateProgress';

// Contract ABI for the deployed contract
const CONTRACT_ABI = [
  "function claimTrophy(uint256 courseId) external",
  "function hasUserClaimed(uint256 courseId, address user) external view returns (bool)",
  "function getUserTrophies(address user) external view returns (uint256[])",
  "function getTrophyMetadata(uint256 tokenId) external view returns (tuple(uint256 courseId, address userAddress, uint256 dateClaimed, string courseName))",
  "function tokenURI(uint256 tokenId) external view returns (string)",
  "function courses(uint256 courseId) external view returns (tuple(string name, string description, string imageUri, bool exists))",
  "function totalSupply() external view returns (uint256)"
];

const TrophySystem = () => {
  const { account, provider } = useWeb3();
  const { progress, getCourseProgress } = useProgress();
  
  const [contract, setContract] = useState(null);
  const [userTrophies, setUserTrophies] = useState([]);
  const [availableTrophies, setAvailableTrophies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [claiming, setClaiming] = useState({});

  // Contract address - update this with your deployed contract address
  const CONTRACT_ADDRESS = process.env.REACT_APP_TROPHY_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

  // Course ID mapping
  const courseIdMapping = {
    'initiation': 1,
    'pomodoro': 2,
    'htmlcss': 3
  };

  useEffect(() => {
    if (provider && account) {
      initializeContract();
    }
  }, [provider, account]);

  useEffect(() => {
    if (contract && account) {
      loadUserTrophies();
      loadAvailableTrophies();
    }
  }, [contract, account, progress]);

  const initializeContract = async () => {
    try {
      if (!provider) {
        setError('Provider not available. Please connect your wallet.');
        return;
      }
      
      console.log('Initializing contract with address:', CONTRACT_ADDRESS);
      console.log('Provider:', provider);
      
      const signer = await provider.getSigner();
      console.log('Signer:', signer);
      
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      // Test the contract connection
      try {
        const totalSupply = await contractInstance.totalSupply();
        console.log('Contract connection successful. Total supply:', totalSupply.toString());
      } catch (testError) {
        console.error('Contract connection test failed:', testError);
        setError('Cannot connect to the trophy contract. Make sure you are connected to the local hardhat network (Chain ID: 31337) and the hardhat node is running.');
        return;
      }
      
      setContract(contractInstance);
      console.log('Contract initialized successfully:', contractInstance);
    } catch (error) {
      console.error('Error initializing contract:', error);
      setError('Failed to connect to trophy contract. Please check your wallet connection and network settings.');
    }
  };

  const loadUserTrophies = async () => {
    try {
      setLoading(true);
      const tokenIds = await contract.getUserTrophies(account);
      const trophies = [];

      for (const tokenId of tokenIds) {
        const metadata = await contract.getTrophyMetadata(tokenId);
        const tokenUri = await contract.tokenURI(tokenId);
        
        // Parse the base64 metadata
        const jsonData = JSON.parse(atob(tokenUri.replace('data:application/json;base64,', '')));
        
        trophies.push({
          tokenId: tokenId.toString(),
          courseId: metadata.courseId.toString(),
          courseName: metadata.courseName,
          dateClaimed: new Date(metadata.dateClaimed * 1000).toISOString(),
          userAddress: metadata.userAddress,
          metadata: jsonData
        });
      }

      setUserTrophies(trophies.sort((a, b) => new Date(b.dateClaimed) - new Date(a.dateClaimed)));
    } catch (error) {
      console.error('Error loading user trophies:', error);
      setError('Failed to load trophies from blockchain');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableTrophies = async () => {
    try {
      const available = [];
      
      // Check each course in user progress
      const courseIds = ['initiation', 'pomodoro', 'htmlcss'];
      for (const courseId of courseIds) {
        const courseProgress = getCourseProgress(courseId);
        console.log(`Course ${courseId} progress:`, courseProgress);
        
        // Check if course is completed (100% progress)
        if (courseProgress && courseProgress.courseProgress >= 100) {
          try {
            // Check if trophy already claimed on blockchain
            const hasClaimed = await contract.hasUserClaimed(courseIdMapping[courseId], account);
            console.log(`Course ${courseId} claimed status:`, hasClaimed);
            
            if (!hasClaimed) {
              const courseInfo = await contract.courses(courseIdMapping[courseId]);
              available.push({
                courseId: courseIdMapping[courseId],
                courseName: courseInfo.name,
                courseDescription: courseInfo.description,
                imageUri: courseInfo.imageUri
              });
            }
          } catch (blockchainError) {
            console.error(`Error checking blockchain for course ${courseId}:`, blockchainError);
            // If blockchain check fails, still show the trophy as available
            // This allows users to claim even if there are temporary blockchain issues
            available.push({
              courseId: courseIdMapping[courseId],
              courseName: courseId.charAt(0).toUpperCase() + courseId.slice(1) + ' Course',
              courseDescription: `Complete the ${courseId} course to earn this trophy`,
              imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash1"
            });
          }
        } else {
          console.log(`Course ${courseId} not completed. Progress: ${courseProgress?.courseProgress || 0}%`);
        }
      }
      
      console.log('Available trophies:', available);
      setAvailableTrophies(available);
    } catch (error) {
      console.error('Error loading available trophies:', error);
      setError('Failed to load available trophies from blockchain');
    }
  };

  const claimTrophy = async (courseId) => {
    try {
      setClaiming(prev => ({ ...prev, [courseId]: true }));
      setError(null);

      console.log('Claiming trophy for course ID:', courseId);
      const tx = await contract.claimTrophy(courseId);
      console.log('Transaction sent:', tx.hash);
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      // Reload trophies after successful claim
      await loadUserTrophies();
      await loadAvailableTrophies();
      
      setClaiming(prev => ({ ...prev, [courseId]: false }));
    } catch (error) {
      console.error('Error claiming trophy:', error);
      setError(error.message || 'Failed to claim trophy. Make sure you have enough gas and the course is completed.');
      setClaiming(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SkillPath Trophy System</h1>
            <p className="text-xl text-gray-600 mb-8">
              Claim your achievements as unique, non-transferable NFTs on the blockchain
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔗 Connect Your Wallet</h3>
              <p className="text-yellow-700 mb-4">
                Connect your wallet to view and claim your trophies. You'll need to be connected to the local hardhat network.
              </p>
              
              <div className="space-y-4">
                <div className="text-sm text-yellow-600">
                  <strong>Network Settings:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• Network Name: Hardhat Local</li>
                    <li>• RPC URL: http://127.0.0.1:8545</li>
                    <li>• Chain ID: 31337</li>
                    <li>• Currency: ETH</li>
                  </ul>
                </div>
                
                <div className="text-sm text-yellow-600">
                  <strong>Test Account:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266</li>
                    <li>• Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!contract && account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connecting to Blockchain</h2>
          <p className="text-gray-600">Initializing trophy contract...</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
              <p className="text-red-800 text-sm">{error}</p>
              <div className="mt-3 text-xs text-red-600">
                <p><strong>To fix this:</strong></p>
                <ul className="mt-1 space-y-1">
                  <li>• Make sure hardhat node is running</li>
                  <li>• Connect to network Chain ID: 31337</li>
                  <li>• Check that the contract is deployed</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your SkillPath Trophies</h1>
          <p className="text-xl text-gray-600">
            Claim your achievements as unique, non-transferable NFTs on the blockchain
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Contract: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
          </div>
          <button
            onClick={() => {
              loadAvailableTrophies();
              loadUserTrophies();
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Refresh Trophies
          </button>
        </div>

        {/* Debug Panel - Only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">🔧 Debug Panel (Development Only)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-yellow-700 mb-2">Course Status</h4>
                {['initiation', 'pomodoro', 'htmlcss'].map(courseType => {
                  const status = getCourseStatus(account, courseType);
                  return (
                    <div key={courseType} className="text-sm text-yellow-600 mb-1">
                      {courseType}: {status.progress}% ({status.completedLessons}/{status.totalLessons})
                    </div>
                  );
                })}
              </div>
              <div>
                <h4 className="font-medium text-yellow-700 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => simulateCourseCompletion(account, 'initiation')}
                    className="block w-full text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                  >
                    Complete Initiation
                  </button>
                  <button
                    onClick={() => simulateCourseCompletion(account, 'pomodoro')}
                    className="block w-full text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                  >
                    Complete Pomodoro
                  </button>
                  <button
                    onClick={() => simulateCourseCompletion(account, 'htmlcss')}
                    className="block w-full text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                  >
                    Complete HTML/CSS
                  </button>
                  <button
                    onClick={() => {
                      simulateCourseCompletion(account, 'initiation');
                      simulateCourseCompletion(account, 'pomodoro');
                      simulateCourseCompletion(account, 'htmlcss');
                      setTimeout(() => {
                        loadAvailableTrophies();
                        loadUserTrophies();
                      }, 1000);
                    }}
                    className="block w-full text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Complete ALL Courses
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-yellow-700 mb-2">Reset Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => resetCourseProgress(account, 'initiation')}
                    className="block w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Reset Initiation
                  </button>
                  <button
                    onClick={() => resetCourseProgress(account, 'pomodoro')}
                    className="block w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Reset Pomodoro
                  </button>
                  <button
                    onClick={() => resetCourseProgress(account, 'htmlcss')}
                    className="block w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Reset HTML/CSS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Available Trophies */}
        {availableTrophies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Trophies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTrophies.map((trophy) => (
                <div key={trophy.courseId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {trophy.courseName}
                    </h3>
                    <p className="text-gray-600 mb-4">{trophy.courseDescription}</p>
                    <button
                      onClick={() => claimTrophy(trophy.courseId)}
                      disabled={claiming[trophy.courseId]}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {claiming[trophy.courseId] ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Claiming NFT...
                        </span>
                      ) : (
                        'Claim NFT Trophy'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User's Trophies */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your NFT Trophy Collection ({userTrophies.length})
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : userTrophies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTrophies.map((trophy) => (
                <div key={trophy.tokenId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {trophy.courseName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Claimed on {formatDate(trophy.dateClaimed)}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Token ID:</span>
                        <span className="font-mono text-gray-900">{trophy.tokenId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Course ID:</span>
                        <span className="font-mono text-gray-900">{trophy.courseId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 font-semibold">Soulbound NFT</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={`https://polygonscan.com/token/${CONTRACT_ADDRESS}?a=${trophy.tokenId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View on PolygonScan →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No NFT Trophies Yet</h3>
              <p className="text-gray-600">
                Complete courses to earn your first blockchain trophy!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrophySystem; 