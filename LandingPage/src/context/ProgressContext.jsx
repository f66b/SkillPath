import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWeb3 } from './Web3Context'
import progressService from '../services/progressService'

const ProgressContext = createContext()

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export const ProgressProvider = ({ children }) => {
  const { account } = useWeb3()
  const [progress, setProgress] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Load progress for current wallet
  useEffect(() => {
    if (account) {
      loadProgress(account)
    }
  }, [account])

  // Load progress from JSON service
  const loadProgress = (walletAddress) => {
    try {
      const userProgress = progressService.getUserProgress(walletAddress)
      if (userProgress && userProgress.courses) {
        setProgress(userProgress.courses)
      } else {
        // Initialize empty progress for new wallet
        setProgress({
          initiation: {
            completedLessons: {},
            partScores: {},
            courseProgress: 0,
            lastAccessed: Date.now()
          },
          pomodoro: {
            completedLessons: {},
            partScores: {},
            courseProgress: 0,
            lastAccessed: Date.now()
          },
          htmlcss: {
            completedLessons: {},
            partScores: {},
            courseProgress: 0,
            lastAccessed: Date.now()
          }
        })
      }
    } catch (error) {
      console.error('Error loading progress:', error)
      setProgress({})
    }
  }

  // Save progress using JSON service
  const saveProgress = (walletAddress, courseType, newProgress) => {
    try {
      const updatedProgress = {
        ...progress,
        [courseType]: {
          ...newProgress,
          lastAccessed: Date.now()
        }
      }
      
      setProgress(updatedProgress)
      progressService.updateUserProgress(walletAddress, courseType, newProgress)
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  // Mark lesson as completed
  const markLessonComplete = (courseType, partId, lessonId) => {
    if (!account) return

    // Use the service to mark lesson complete
    progressService.markLessonComplete(account, courseType, partId, lessonId)
    
    // Update local state
    const courseProgress = progress[courseType] || {
      completedLessons: {},
      partScores: {},
      courseProgress: 0
    }

    const updatedCompletedLessons = {
      ...courseProgress.completedLessons,
      [`${partId}-${lessonId}`]: true
    }

    const newProgress = {
      ...courseProgress,
      completedLessons: updatedCompletedLessons
    }

    // Recalculate course progress
    const totalLessons = getTotalLessons(courseType)
    const completedCount = Object.keys(updatedCompletedLessons).length
    newProgress.courseProgress = Math.round((completedCount / totalLessons) * 100)

    saveProgress(account, courseType, newProgress)
  }

  // Update part score
  const updatePartScore = (courseType, partId, score) => {
    if (!account) return

    // Use the service to update part score
    progressService.updatePartScore(account, courseType, partId, score)

    const courseProgress = progress[courseType] || {
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

    saveProgress(account, courseType, newProgress)
  }

  // Get course progress
  const getCourseProgress = (courseType) => {
    if (account) {
      return progressService.getCourseProgress(account, courseType)
    }
    return progress[courseType] || {
      completedLessons: {},
      partScores: {},
      courseProgress: 0
    }
  }

  // Check if lesson is completed
  const isLessonCompleted = (courseType, partId, lessonId) => {
    if (account) {
      return progressService.isLessonCompleted(account, courseType, partId, lessonId)
    }
    const courseProgress = getCourseProgress(courseType)
    return courseProgress.completedLessons[`${partId}-${lessonId}`] || false
  }

  // Get part score
  const getPartScore = (courseType, partId) => {
    if (account) {
      return progressService.getPartScore(account, courseType, partId)
    }
    const courseProgress = getCourseProgress(courseType)
    return courseProgress.partScores[partId] || 0
  }

  // Get total lessons for a course (this would need to be updated based on actual course data)
  const getTotalLessons = (courseType) => {
    return progressService.getTotalLessons(courseType)
  }

  // Get overall statistics
  const getStatistics = () => {
    if (!account) return {}
    
    return progressService.getUserStatistics(account)
  }

  // Export progress data
  const exportProgress = () => {
    if (!account) return null

    try {
      const exportData = progressService.exportUserProgress(account)
      if (!exportData) return null
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `skillpath_progress_${account.slice(0, 8)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting progress:', error)
    }
  }

  // Import progress data
  const importProgress = (file) => {
    if (!account) return false

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.walletAddress === account) {
            setProgress(data.progress)
            localStorage.setItem(`skillpath_progress_${account}`, JSON.stringify(data.progress))
            resolve(true)
          } else {
            reject(new Error('Progress data is for a different wallet address'))
          }
        } catch (error) {
          reject(new Error('Invalid progress file format'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  // Clear progress for current wallet
  const clearProgress = () => {
    if (!account) return

    if (window.confirm('Are you sure you want to clear all progress? This action cannot be undone.')) {
      setProgress({})
      // Note: In a real application, you would call an API to clear the data
      // For now, we'll just clear the local state
      console.log('Progress cleared for wallet:', account)
    }
  }

  const value = {
    progress,
    isLoading,
    markLessonComplete,
    updatePartScore,
    getCourseProgress,
    isLessonCompleted,
    getPartScore,
    getStatistics,
    exportProgress,
    importProgress,
    clearProgress
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
} 