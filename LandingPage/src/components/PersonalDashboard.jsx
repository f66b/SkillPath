import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useProgress } from '../context/ProgressContext'

const PersonalDashboard = () => {
  const { account } = useWeb3()
  const { getCourseProgress, getStatistics } = useProgress()
  const [myCourses, setMyCourses] = useState([])
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: 'initiation',
      title: 'Welcome to SkillPath',
      description: 'Get started with this simple initiation course to learn how the platform works',
      icon: '🎓',
      color: 'purple',
      parts: 1,
      lessons: 10,
      category: 'Getting Started'
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro Mastery Course',
      description: 'Master time management and productivity with the proven Pomodoro Technique',
      icon: '⏱️',
      color: 'blue',
      parts: 5,
      lessons: 50,
      category: 'Productivity'
    },
    {
      id: 'htmlcss',
      title: 'HTML & CSS Basics',
      description: 'Build your first web page from scratch! Learn HTML structure, CSS styling, and responsive design',
      icon: '🌐',
      color: 'green',
      parts: 5,
      lessons: 50,
      category: 'Web Development'
    },
    {
      id: 'javascript',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming and interactive web development',
      icon: '⚡',
      color: 'yellow',
      parts: 5,
      lessons: 50,
      category: 'Programming'
    },
    {
      id: 'react',
      title: 'React for Beginners',
      description: 'Build modern web applications with React and component-based architecture',
      icon: '⚛️',
      color: 'indigo',
      parts: 5,
      lessons: 50,
      category: 'Frontend'
    }
  ])

  // Load user's courses from localStorage
  useEffect(() => {
    if (account) {
      const storedCourses = localStorage.getItem(`skillpath_mycourses_${account}`)
      if (storedCourses) {
        setMyCourses(JSON.parse(storedCourses))
      }
    }
  }, [account])

  // Save courses to localStorage
  const saveMyCourses = (courses) => {
    if (account) {
      localStorage.setItem(`skillpath_mycourses_${account}`, JSON.stringify(courses))
      setMyCourses(courses)
    }
  }

  // Add course to personal collection
  const addCourse = (course) => {
    if (!myCourses.find(c => c.id === course.id)) {
      const updatedCourses = [...myCourses, { ...course, addedAt: Date.now() }]
      saveMyCourses(updatedCourses)
    }
  }

  // Remove course from personal collection
  const removeCourse = (courseId) => {
    const updatedCourses = myCourses.filter(c => c.id !== courseId)
    saveMyCourses(updatedCourses)
  }

  // Get course progress
  const getCourseProgressData = (courseId) => {
    const progress = getCourseProgress(courseId)
    return progress.courseProgress || 0
  }

  // Get statistics
  const statistics = getStatistics()

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      purple: 'bg-purple-500 text-purple-100',
      red: 'bg-red-500 text-red-100',
      indigo: 'bg-indigo-500 text-indigo-100'
    }
    return colorMap[color] || 'bg-gray-500 text-gray-100'
  }

  const getBorderColor = (color) => {
    const colorMap = {
      blue: 'border-blue-200',
      green: 'border-green-200',
      yellow: 'border-yellow-200',
      purple: 'border-purple-200',
      red: 'border-red-200',
      indigo: 'border-indigo-200'
    }
    return colorMap[color] || 'border-gray-200'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your courses and track your learning journey
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Courses</p>
                <p className="text-2xl font-bold text-gray-900">{myCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.lessonsCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.certificatesEarned}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Studied</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.hoursStudied}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
          {myCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Add courses from the available courses below to start your learning journey</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => {
                const progress = getCourseProgressData(course.id)
                return (
                  <div key={course.id} className={`bg-white rounded-lg shadow-sm border ${getBorderColor(course.color)} overflow-hidden`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${getColorClasses(course.color)} rounded-lg flex items-center justify-center text-xl`}>
                          {course.icon}
                        </div>
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getColorClasses(course.color).replace('text-', 'bg-').replace('-100', '-500')}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{course.parts} parts</span>
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Available Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => {
              const isAdded = myCourses.find(c => c.id === course.id)
              return (
                <div key={course.id} className={`bg-white rounded-lg shadow-sm border ${getBorderColor(course.color)} overflow-hidden`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${getColorClasses(course.color)} rounded-lg flex items-center justify-center text-xl`}>
                        {course.icon}
                      </div>
                      <button
                        onClick={() => isAdded ? removeCourse(course.id) : addCourse(course)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          isAdded 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                      >
                        {isAdded ? 'Remove' : 'Add'}
                      </button>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.parts} parts</span>
                      <span>{course.lessons} lessons</span>
                    </div>
                    
                    <div className="mt-3">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDashboard 