// Progress Service for JSON file operations
import userProgressData from '../data/userProgress.json'

class ProgressService {
  constructor() {
    this.progressData = userProgressData
    this.filePath = '/src/data/userProgress.json'
  }

  // Get user progress by wallet address
  getUserProgress(walletAddress) {
    if (!walletAddress) return null
    
    const user = this.progressData.users[walletAddress]
    if (!user) {
      // Create new user entry if doesn't exist
      return this.createNewUser(walletAddress)
    }
    
    return user
  }

  // Create new user entry
  createNewUser(walletAddress) {
    const newUser = {
      walletAddress: walletAddress,
      lastUpdated: new Date().toISOString(),
      courses: {
        initiation: {
          completedLessons: {},
          partScores: {},
          courseProgress: 0,
          lastAccessed: new Date().toISOString()
        },
        pomodoro: {
          completedLessons: {},
          partScores: {},
          courseProgress: 0,
          lastAccessed: new Date().toISOString()
        },
        htmlcss: {
          completedLessons: {},
          partScores: {},
          courseProgress: 0,
          lastAccessed: new Date().toISOString()
        }
      },
      statistics: {
        lessonsCompleted: 0,
        quizzesPassed: 0,
        certificatesEarned: 0,
        hoursStudied: 0
      }
    }

    this.progressData.users[walletAddress] = newUser
    this.progressData.metadata.totalUsers = Object.keys(this.progressData.users).length
    this.saveToFile()
    
    return newUser
  }

  // Update user progress
  updateUserProgress(walletAddress, courseType, newProgress) {
    if (!walletAddress || !courseType) return false

    let user = this.getUserProgress(walletAddress)
    if (!user) {
      user = this.createNewUser(walletAddress)
    }

    // Update course progress
    user.courses[courseType] = {
      ...newProgress,
      lastAccessed: new Date().toISOString()
    }

    // Update user metadata
    user.lastUpdated = new Date().toISOString()

    // Recalculate statistics
    user.statistics = this.calculateUserStatistics(user)

    // Update the data
    this.progressData.users[walletAddress] = user
    this.progressData.metadata.lastBackup = new Date().toISOString()

    // Save to file
    return this.saveToFile()
  }

  // Mark lesson as completed
  markLessonComplete(walletAddress, courseType, partId, lessonId) {
    if (!walletAddress || !courseType) return false

    let user = this.getUserProgress(walletAddress)
    if (!user) {
      user = this.createNewUser(walletAddress)
    }

    const courseProgress = user.courses[courseType] || {
      completedLessons: {},
      partScores: {},
      courseProgress: 0
    }

    // Mark lesson as completed
    const updatedCompletedLessons = {
      ...courseProgress.completedLessons,
      [`${partId}-${lessonId}`]: true
    }

    // Calculate new course progress
    const totalLessons = this.getTotalLessons(courseType)
    const completedCount = Object.keys(updatedCompletedLessons).length
    const newCourseProgress = Math.round((completedCount / totalLessons) * 100)

    const newProgress = {
      ...courseProgress,
      completedLessons: updatedCompletedLessons,
      courseProgress: newCourseProgress
    }

    return this.updateUserProgress(walletAddress, courseType, newProgress)
  }

  // Update part score
  updatePartScore(walletAddress, courseType, partId, score) {
    if (!walletAddress || !courseType) return false

    let user = this.getUserProgress(walletAddress)
    if (!user) {
      user = this.createNewUser(walletAddress)
    }

    const courseProgress = user.courses[courseType] || {
      completedLessons: {},
      partScores: {},
      courseProgress: 0
    }

    const newProgress = {
      ...courseProgress,
      partScores: {
        ...courseProgress.partScores,
        [partId]: score
      }
    }

    return this.updateUserProgress(walletAddress, courseType, newProgress)
  }

  // Get course progress
  getCourseProgress(walletAddress, courseType) {
    const user = this.getUserProgress(walletAddress)
    if (!user || !user.courses[courseType]) {
      return {
        completedLessons: {},
        partScores: {},
        courseProgress: 0
      }
    }
    return user.courses[courseType]
  }

  // Check if lesson is completed
  isLessonCompleted(walletAddress, courseType, partId, lessonId) {
    const courseProgress = this.getCourseProgress(walletAddress, courseType)
    return courseProgress.completedLessons[`${partId}-${lessonId}`] || false
  }

  // Get part score
  getPartScore(walletAddress, courseType, partId) {
    const courseProgress = this.getCourseProgress(walletAddress, courseType)
    return courseProgress.partScores[partId] || 0
  }

  // Get total lessons for a course
  getTotalLessons(courseType) {
    const courseData = {
      initiation: 10, // 1 part * 10 lessons
      pomodoro: 50,   // 5 parts * 10 lessons
      htmlcss: 50     // 5 parts * 10 lessons
    }
    return courseData[courseType] || 0
  }

  // Calculate user statistics
  calculateUserStatistics(user) {
    const courses = user.courses
    let totalLessonsCompleted = 0
    let totalQuizzesPassed = 0
    let totalCertificates = 0

    Object.values(courses).forEach(course => {
      totalLessonsCompleted += Object.keys(course.completedLessons).length
      totalQuizzesPassed += Object.values(course.partScores).filter(score => score >= 60).length
      if (course.courseProgress === 100) {
        totalCertificates += 1
      }
    })

    return {
      lessonsCompleted: totalLessonsCompleted,
      quizzesPassed: totalQuizzesPassed,
      certificatesEarned: totalCertificates,
      hoursStudied: Math.round(totalLessonsCompleted * 0.5) // Estimate 30 minutes per lesson
    }
  }

  // Get user statistics
  getUserStatistics(walletAddress) {
    const user = this.getUserProgress(walletAddress)
    if (!user) {
      return {
        lessonsCompleted: 0,
        quizzesPassed: 0,
        certificatesEarned: 0,
        hoursStudied: 0
      }
    }
    return user.statistics
  }

  // Save data to file (in a real app, this would be an API call)
  saveToFile() {
    try {
      // In a real application, this would be an API call to save to server
      // For now, we'll simulate by updating the local data
      // In production, you'd want to make an HTTP request to your backend
      
      // Simulate saving to file
      console.log('Progress data updated:', this.progressData)
      
      // You could also use localStorage as a fallback
      localStorage.setItem('skillpath_progress_backup', JSON.stringify(this.progressData))
      
      return true
    } catch (error) {
      console.error('Error saving progress to file:', error)
      return false
    }
  }

  // Export user progress
  exportUserProgress(walletAddress) {
    const user = this.getUserProgress(walletAddress)
    if (!user) return null

    const exportData = {
      walletAddress: walletAddress,
      progress: user,
      exportedAt: new Date().toISOString()
    }

    return exportData
  }

  // Get all users (for admin purposes)
  getAllUsers() {
    return Object.keys(this.progressData.users)
  }

  // Get progress summary for all users
  getProgressSummary() {
    const users = this.progressData.users
    const summary = {
      totalUsers: Object.keys(users).length,
      totalLessonsCompleted: 0,
      totalCertificatesEarned: 0,
      averageProgress: 0
    }

    Object.values(users).forEach(user => {
      summary.totalLessonsCompleted += user.statistics.lessonsCompleted
      summary.totalCertificatesEarned += user.statistics.certificatesEarned
    })

    if (summary.totalUsers > 0) {
      const totalProgress = Object.values(users).reduce((sum, user) => {
        const courseProgresses = Object.values(user.courses).map(course => course.courseProgress)
        return sum + (courseProgresses.reduce((a, b) => a + b, 0) / courseProgresses.length)
      }, 0)
      summary.averageProgress = Math.round(totalProgress / summary.totalUsers)
    }

    return summary
  }
}

// Create singleton instance
const progressService = new ProgressService()

export default progressService 