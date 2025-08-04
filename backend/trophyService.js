const { ethers } = require('ethers');
const SkillPathTrophiesABI = require('../contracts/artifacts/contracts/SkillPathTrophies.sol/SkillPathTrophies.json').abi;

class TrophyService {
  constructor(contractAddress, rpcUrl, privateKey) {
    this.contractAddress = contractAddress;
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(contractAddress, SkillPathTrophiesABI, this.signer);
  }

  /**
   * Verify if a user has completed a course
   * @param {string} userId - User ID
   * @param {number} courseId - Course ID
   * @returns {boolean} - True if user has completed the course
   */
  async verifyCourseCompletion(userId, courseId) {
    try {
      // This would integrate with your existing course completion tracking
      // For now, we'll simulate the verification
      const userProgress = await this.getUserProgress(userId);
      const course = userProgress.courses.find(c => c.id === courseId);
      
      return course && course.completed;
    } catch (error) {
      console.error('Error verifying course completion:', error);
      return false;
    }
  }

  /**
   * Check if user has already claimed a trophy for a course
   * @param {string} userAddress - User's wallet address
   * @param {number} courseId - Course ID
   * @returns {boolean} - True if user has already claimed
   */
  async hasUserClaimedTrophy(userAddress, courseId) {
    try {
      return await this.contract.hasUserClaimed(courseId, userAddress);
    } catch (error) {
      console.error('Error checking trophy claim status:', error);
      return false;
    }
  }

  /**
   * Get all trophies owned by a user
   * @param {string} userAddress - User's wallet address
   * @returns {Array} - Array of trophy metadata
   */
  async getUserTrophies(userAddress) {
    try {
      const tokenIds = await this.contract.getUserTrophies(userAddress);
      const trophies = [];

      for (const tokenId of tokenIds) {
        const metadata = await this.contract.getTrophyMetadata(tokenId);
        const tokenUri = await this.contract.tokenURI(tokenId);
        
        trophies.push({
          tokenId: tokenId.toString(),
          courseId: metadata.courseId.toString(),
          courseName: metadata.courseName,
          dateClaimed: new Date(metadata.dateClaimed * 1000).toISOString(),
          userAddress: metadata.userAddress,
          tokenUri: tokenUri
        });
      }

      return trophies.sort((a, b) => new Date(b.dateClaimed) - new Date(a.dateClaimed));
    } catch (error) {
      console.error('Error getting user trophies:', error);
      return [];
    }
  }

  /**
   * Verify user eligibility and prepare trophy claim
   * @param {string} userId - User ID
   * @param {string} userAddress - User's wallet address
   * @param {number} courseId - Course ID
   * @returns {Object} - Eligibility status and claim data
   */
  async verifyTrophyEligibility(userId, userAddress, courseId) {
    try {
      // Check if course exists
      const course = await this.contract.courses(courseId);
      if (!course.exists) {
        return {
          eligible: false,
          reason: 'Course does not exist'
        };
      }

      // Check if user has completed the course
      const hasCompleted = await this.verifyCourseCompletion(userId, courseId);
      if (!hasCompleted) {
        return {
          eligible: false,
          reason: 'Course not completed'
        };
      }

      // Check if user has already claimed
      const hasClaimed = await this.hasUserClaimedTrophy(userAddress, courseId);
      if (hasClaimed) {
        return {
          eligible: false,
          reason: 'Trophy already claimed'
        };
      }

      return {
        eligible: true,
        courseName: course.name,
        courseDescription: course.description
      };
    } catch (error) {
      console.error('Error verifying trophy eligibility:', error);
      return {
        eligible: false,
        reason: 'Verification failed'
      };
    }
  }

  /**
   * Add a new course to the contract (admin only)
   * @param {number} courseId - Course ID
   * @param {string} courseName - Course name
   * @param {string} courseDescription - Course description
   * @param {string} imageUri - Trophy image URI
   * @returns {Object} - Transaction result
   */
  async addCourse(courseId, courseName, courseDescription, imageUri) {
    try {
      const tx = await this.contract.addCourse(courseId, courseName, courseDescription, imageUri);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        courseId: courseId
      };
    } catch (error) {
      console.error('Error adding course:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get course information
   * @param {number} courseId - Course ID
   * @returns {Object} - Course information
   */
  async getCourseInfo(courseId) {
    try {
      const course = await this.contract.courses(courseId);
      return {
        exists: course.exists,
        name: course.name,
        description: course.description,
        imageUri: course.imageUri
      };
    } catch (error) {
      console.error('Error getting course info:', error);
      return null;
    }
  }

  /**
   * Get user progress from your existing system
   * @param {string} userId - User ID
   * @returns {Object} - User progress data
   */
  async getUserProgress(userId) {
    // This would integrate with your existing progress tracking system
    // For now, returning mock data
    return {
      userId: userId,
      courses: [
        { id: 1, completed: true, progress: 100 },
        { id: 2, completed: false, progress: 75 },
        { id: 3, completed: true, progress: 100 },
        { id: 4, completed: false, progress: 30 }
      ]
    };
  }

  /**
   * Generate trophy metadata for a course
   * @param {number} courseId - Course ID
   * @param {string} userAddress - User's wallet address
   * @returns {Object} - Trophy metadata
   */
  async generateTrophyMetadata(courseId, userAddress) {
    try {
      const course = await this.getCourseInfo(courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      return {
        name: `SkillPath Trophy - ${course.name}`,
        description: `Awarded to ${userAddress} for completing the ${course.name} course on SkillPath.`,
        image: course.imageUri,
        attributes: [
          {
            trait_type: "Course ID",
            value: courseId.toString()
          },
          {
            trait_type: "Date Claimed",
            value: new Date().toISOString()
          },
          {
            trait_type: "Non-Transferable",
            value: "true"
          }
        ]
      };
    } catch (error) {
      console.error('Error generating trophy metadata:', error);
      throw error;
    }
  }
}

module.exports = TrophyService; 