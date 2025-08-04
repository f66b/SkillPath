import React, { useState, useEffect } from 'react'
import { Web3Provider } from './context/Web3Context'
import { ProgressProvider } from './context/ProgressContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AIAssistant from './components/AIAssistant'
import InteractiveCourses from './components/InteractiveCourses'
import Certification from './components/Certification'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import PomodoroMasteryCourse from './components/PomodoroMasteryCourse'
import HTMLCSSCourse from './components/HTMLCSSCourse'
import InitiationCourse from './components/InitiationCourse'
import ProtectedRoute from './components/ProtectedRoute'
import PersonalDashboard from './components/PersonalDashboard'

function App() {
  const [showCourse, setShowCourse] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'course', 'dashboard'

  // Handle URL changes for dashboard routing
  useEffect(() => {
    const path = window.location.pathname
    console.log('Current path:', path)
    console.log('Setting currentView based on path:', path)
    
    if (path === '/dashboard') {
      console.log('Setting view to dashboard')
      setCurrentView('dashboard')
      setShowCourse(false)
      setSelectedCourse(null)
    } else if (path === '/course' || path === '/courses') {
      console.log('Setting view to course selection')
      setCurrentView('course')
      setShowCourse(true)
    } else {
      console.log('Setting view to landing')
      setCurrentView('landing')
      setShowCourse(false)
      setSelectedCourse(null)
    }
  }, [])

  const startCourse = () => {
    setShowCourse(true)
    setCurrentView('course')
    window.history.pushState({}, '', '/courses')
  }

  const backToLanding = () => {
    setShowCourse(false)
    setSelectedCourse(null)
    setCurrentView('landing')
    window.history.pushState({}, '', '/')
  }

  const goToDashboard = () => {
    setCurrentView('dashboard')
    setShowCourse(false)
    setSelectedCourse(null)
    window.history.pushState({}, '', '/dashboard')
  }

  const selectCourse = (courseType) => {
    console.log('Selecting course:', courseType)
    setSelectedCourse(courseType)
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/dashboard') {
        setCurrentView('dashboard')
        setShowCourse(false)
        setSelectedCourse(null)
      } else if (path === '/course' || path === '/courses') {
        setCurrentView('course')
        setShowCourse(true)
      } else {
        setCurrentView('landing')
        setShowCourse(false)
        setSelectedCourse(null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Dashboard view
  console.log('Rendering with currentView:', currentView, 'selectedCourse:', selectedCourse)
  if (currentView === 'dashboard') {
    return (
      <Web3Provider>
        <ProgressProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation 
              onStartCourse={startCourse} 
              onBackToLanding={backToLanding} 
              showCourse={showCourse}
              onGoToDashboard={goToDashboard}
            />
            <div className="pt-16">
              <ProtectedRoute>
                <PersonalDashboard />
              </ProtectedRoute>
            </div>
          </div>
        </ProgressProvider>
      </Web3Provider>
    )
  }

  // Course view
  if (currentView === 'course' && selectedCourse) {
    return (
      <Web3Provider>
        <ProgressProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation 
              onStartCourse={startCourse} 
              onBackToLanding={backToLanding} 
              showCourse={showCourse}
              onGoToDashboard={goToDashboard}
            />
            <div className="pt-16">
              {selectedCourse === 'initiation' && <InitiationCourse />}
              {selectedCourse === 'pomodoro' && <PomodoroMasteryCourse />}
              {selectedCourse === 'htmlcss' && <HTMLCSSCourse />}
            </div>
          </div>
        </ProgressProvider>
      </Web3Provider>
    )
  }

  // Course selection view
  if (currentView === 'course' && !selectedCourse) {
    return (
      <Web3Provider>
        <ProgressProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation 
              onStartCourse={startCourse} 
              onBackToLanding={backToLanding} 
              showCourse={showCourse}
              onGoToDashboard={goToDashboard}
            />
            <div className="pt-16">
              <ProtectedRoute>
                <div className="max-w-4xl mx-auto px-4 py-12">
                  <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      Choose Your Course
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Select a course to start your learning journey
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Initiation Course */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Welcome to SkillPath
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Get started with this simple initiation course to learn how the platform works. Perfect for beginners!
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span className="mr-4">🎓 1 part</span>
                          <span>📚 10 lessons</span>
                        </div>
                        <button
                          onClick={() => selectCourse('initiation')}
                          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Start Course
                        </button>
                      </div>
                    </div>

                    {/* Pomodoro Course */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Pomodoro Mastery Course
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Master time management and productivity with the proven Pomodoro Technique. Learn to focus, eliminate distractions, and accomplish more in less time.
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span className="mr-4">⏱️ 5 parts</span>
                          <span>📚 50 lessons</span>
                        </div>
                        <button
                          onClick={() => selectCourse('pomodoro')}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Start Course
                        </button>
                      </div>
                    </div>

                    {/* HTML & CSS Course */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          HTML & CSS Basics
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Build your first web page from scratch! Learn HTML structure, CSS styling, and responsive design to create beautiful, modern websites.
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span className="mr-4">🌐 5 parts</span>
                          <span>📚 50 lessons</span>
                        </div>
                        <button
                          onClick={() => selectCourse('htmlcss')}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Start Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            </div>
          </div>
        </ProgressProvider>
      </Web3Provider>
    )
  }

  // Landing page view
  return (
    <Web3Provider>
      <ProgressProvider>
        <div className="min-h-screen bg-white">
          <Navigation 
            onStartCourse={startCourse} 
            onBackToLanding={backToLanding} 
            showCourse={showCourse}
            onGoToDashboard={goToDashboard}
          />
          <Hero onStartCourse={startCourse} />
          <AIAssistant />
          <InteractiveCourses onStartCourse={startCourse} />
          <Certification />
          <ComingSoon />
          <Footer />
        </div>
      </ProgressProvider>
    </Web3Provider>
  )
}

export default App 