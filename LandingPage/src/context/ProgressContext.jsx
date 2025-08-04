import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWeb3 } from './Web3Context'

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

  // Load progress from localStorage
  const loadProgress = (walletAddress) => {
    try {
      const stored = localStorage.getItem(`skillpath_progress_${walletAddress}`)
      if (stored) {
        const parsedProgress = JSON.parse(stored)
        setProgress(parsedProgress)
      } else {
        // Initialize empty progress for new wallet
        setProgress({
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

  // Save progress to localStorage
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
      localStorage.setItem(`skillpath_progress_${walletAddress}`, JSON.stringify(updatedProgress))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  // Mark lesson as completed
  const markLessonComplete = (courseType, partId, lessonId) => {
    if (!account) return

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
    return progress[courseType] || {
      completedLessons: {},
      partScores: {},
      courseProgress: 0
    }
  }

  // Check if lesson is completed
  const isLessonCompleted = (courseType, partId, lessonId) => {
    const courseProgress = getCourseProgress(courseType)
    return courseProgress.completedLessons[`${partId}-${lessonId}`] || false
  }

  // Get part score
  const getPartScore = (courseType, partId) => {
    const courseProgress = getCourseProgress(courseType)
    return courseProgress.partScores[partId] || 0
  }

  // Get total lessons for a course (this would need to be updated based on actual course data)
  const getTotalLessons = (courseType) => {
    // This should match the actual number of lessons in your courses
    const courseData = {
      pomodoro: 50, // 5 parts * 10 lessons
      htmlcss: 50   // 5 parts * 10 lessons
    }
    return courseData[courseType] || 0
  }

  // Get overall statistics
  const getStatistics = () => {
    if (!account) return {}

    const pomodoroProgress = getCourseProgress('pomodoro')
    const htmlcssProgress = getCourseProgress('htmlcss')

    const totalLessonsCompleted = 
      Object.keys(pomodoroProgress.completedLessons).length +
      Object.keys(htmlcssProgress.completedLessons).length

    const totalQuizzesPassed = 
      Object.values(pomodoroProgress.partScores).filter(score => score >= 60).length +
      Object.values(htmlcssProgress.partScores).filter(score => score >= 60).length

    const totalCertificates = 
      (pomodoroProgress.courseProgress === 100 ? 1 : 0) +
      (htmlcssProgress.courseProgress === 100 ? 1 : 0)

    return {
      lessonsCompleted: totalLessonsCompleted,
      quizzesPassed: totalQuizzesPassed,
      certificatesEarned: totalCertificates,
      hoursStudied: Math.round(totalLessonsCompleted * 0.5) // Estimate 30 minutes per lesson
    }
  }

  // Export progress data
  const exportProgress = () => {
    if (!account) return null

    try {
      const data = {
        walletAddress: account,
        progress: progress,
        statistics: getStatistics(),
        exportedAt: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
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
      localStorage.removeItem(`skillpath_progress_${account}`)
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