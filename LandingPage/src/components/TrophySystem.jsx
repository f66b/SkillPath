import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useProgress } from '../context/ProgressContext';

const TrophySystem = () => {
  const { account } = useWeb3();
  const { progress, getCourseProgress } = useProgress();
  
  const [userTrophies, setUserTrophies] = useState([]);
  const [availableTrophies, setAvailableTrophies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [claiming, setClaiming] = useState({});

  // Mock contract data for demonstration
  const mockCourses = {
    1: {
      name: "Welcome to SkillPath",
      description: "Get started with this simple initiation course to learn how the platform works",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash1"
    },
    2: {
      name: "Pomodoro Mastery Course",
      description: "Master time management and productivity with the proven Pomodoro Technique",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash2"
    },
    3: {
      name: "HTML & CSS Basics",
      description: "Build your first web page from scratch! Learn HTML structure, CSS styling, and responsive design",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash3"
    }
  };

  // Course ID mapping
  const courseIdMapping = {
    'initiation': 1,
    'pomodoro': 2,
    'htmlcss': 3
  };

  useEffect(() => {
    if (account) {
      loadUserTrophies();
      loadAvailableTrophies();
    }
  }, [account, progress]);

  const loadUserTrophies = async () => {
    try {
      setLoading(true);
      // Load claimed trophies from localStorage
      const claimedTrophies = localStorage.getItem(`skillpath_trophies_${account}`) || '[]';
      const trophies = JSON.parse(claimedTrophies);
      
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
      const courseIds = ['initiation', 'pomodoro', 'htmlcss'];
      for (const courseId of courseIds) {
        const courseProgress = getCourseProgress(courseId);
        console.log(`Course ${courseId} progress:`, courseProgress);
        
        // Check if course is completed (100% progress)
        if (courseProgress && courseProgress.courseProgress >= 100) {
          // Check if trophy already claimed
          const claimedTrophies = localStorage.getItem(`skillpath_trophies_${account}`) || '[]';
          const trophies = JSON.parse(claimedTrophies);
          const hasClaimed = trophies.some(trophy => trophy.courseId === courseIdMapping[courseId]);
          
          if (!hasClaimed) {
            const courseInfo = mockCourses[courseIdMapping[courseId]];
            available.push({
              courseId: courseIdMapping[courseId],
              courseName: courseInfo.name,
              courseDescription: courseInfo.description,
              imageUri: courseInfo.imageUri
            });
          }
        }
      }
      
      console.log('Available trophies:', available);
      setAvailableTrophies(available);
    } catch (error) {
      console.error('Error loading available trophies:', error);
    }
  };

  const claimTrophy = async (courseId) => {
    try {
      setClaiming(prev => ({ ...prev, [courseId]: true }));
      setError(null);

      // Create trophy data
      const courseInfo = mockCourses[courseId];
      const trophy = {
        tokenId: Date.now().toString(),
        courseId: courseId,
        courseName: courseInfo.name,
        dateClaimed: new Date().toISOString(),
        userAddress: account,
        metadata: {
          name: `SkillPath Trophy - ${courseInfo.name}`,
          description: `Awarded to ${account} for completing the ${courseInfo.name} course on SkillPath.`,
          image: courseInfo.imageUri,
          attributes: [
            { trait_type: "Course ID", value: courseId.toString() },
            { trait_type: "Date Claimed", value: new Date().toISOString() },
            { trait_type: "Non-Transferable", value: "true" }
          ]
        }
      };

      // Save to localStorage
      const claimedTrophies = localStorage.getItem(`skillpath_trophies_${account}`) || '[]';
      const trophies = JSON.parse(claimedTrophies);
      trophies.push(trophy);
      localStorage.setItem(`skillpath_trophies_${account}`, JSON.stringify(trophies));

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
                       <span className="text-green-600 text-sm font-medium">
                         ✅ Trophy Claimed
                       </span>
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