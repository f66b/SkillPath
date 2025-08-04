import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';
import { ProgressContext } from '../context/ProgressContext';

// Contract ABI (you'll need to import this from your compiled contract)
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
  const { account, provider } = useContext(Web3Context);
  const { userProgress } = useContext(ProgressContext);
  
  const [contract, setContract] = useState(null);
  const [userTrophies, setUserTrophies] = useState([]);
  const [availableTrophies, setAvailableTrophies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [claiming, setClaiming] = useState({});

  // Contract address - replace with your deployed contract address
  const CONTRACT_ADDRESS = process.env.REACT_APP_TROPHY_CONTRACT_ADDRESS || "0x...";

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
  }, [contract, account, userProgress]);

  const initializeContract = async () => {
    try {
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
    } catch (error) {
      console.error('Error initializing contract:', error);
      setError('Failed to connect to trophy contract');
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
      setError('Failed to load trophies');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableTrophies = async () => {
    try {
      const available = [];
      
      // Check each course in user progress
      for (const course of userProgress.courses || []) {
        if (course.completed) {
          const hasClaimed = await contract.hasUserClaimed(course.id, account);
          if (!hasClaimed) {
            const courseInfo = await contract.courses(course.id);
            available.push({
              courseId: course.id,
              courseName: courseInfo.name,
              courseDescription: courseInfo.description,
              imageUri: courseInfo.imageUri
            });
          }
        }
      }
      
      setAvailableTrophies(available);
    } catch (error) {
      console.error('Error loading available trophies:', error);
    }
  };

  const claimTrophy = async (courseId) => {
    try {
      setClaiming(prev => ({ ...prev, [courseId]: true }));
      setError(null);

      const tx = await contract.claimTrophy(courseId);
      await tx.wait();

      // Reload trophies after successful claim
      await loadUserTrophies();
      await loadAvailableTrophies();
      
      setClaiming(prev => ({ ...prev, [courseId]: false }));
    } catch (error) {
      console.error('Error claiming trophy:', error);
      setError(error.message || 'Failed to claim trophy');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Connect your wallet to view and claim your trophies</p>
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
            Claim your achievements as unique, non-transferable NFTs
          </p>
        </div>

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
                          Claiming...
                        </span>
                      ) : (
                        'Claim Trophy'
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
            Your Trophy Collection ({userTrophies.length})
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
                        <span className="text-green-600 font-semibold">Soulbound</span>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Trophies Yet</h3>
              <p className="text-gray-600">
                Complete courses to earn your first trophy!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrophySystem; 