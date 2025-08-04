import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AIAssistant from './components/AIAssistant'
import InteractiveCourses from './components/InteractiveCourses'
import Certification from './components/Certification'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import PomodoroMasteryCourse from './components/PomodoroMasteryCourse'
import HTMLCSSCourse from './components/HTMLCSSCourse'

function App() {
  const [showCourse, setShowCourse] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  const startCourse = () => {
    setShowCourse(true)
  }

  const backToLanding = () => {
    setShowCourse(false)
    setSelectedCourse(null)
  }

  const selectCourse = (courseType) => {
    setSelectedCourse(courseType)
  }

  if (showCourse && selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onStartCourse={startCourse} onBackToLanding={backToLanding} showCourse={showCourse} />
        <div className="pt-16">
          {selectedCourse === 'pomodoro' && <PomodoroMasteryCourse />}
          {selectedCourse === 'htmlcss' && <HTMLCSSCourse />}
        </div>
      </div>
    )
  }

  if (showCourse && !selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onStartCourse={startCourse} onBackToLanding={backToLanding} showCourse={showCourse} />
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Course
              </h1>
              <p className="text-gray-600 text-lg">
                Select a course to start your learning journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartCourse={startCourse} onBackToLanding={backToLanding} showCourse={showCourse} />
      <Hero onStartCourse={startCourse} />
      <AIAssistant />
      <InteractiveCourses onStartCourse={startCourse} />
      <Certification />
      <ComingSoon />
      <Footer />
    </div>
  )
}

export default App 