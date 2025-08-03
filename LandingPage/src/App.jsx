import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AIAssistant from './components/AIAssistant'
import InteractiveCourses from './components/InteractiveCourses'
import Certification from './components/Certification'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import PomodoroMasteryCourse from './components/PomodoroMasteryCourse'

function App() {
  const [showCourse, setShowCourse] = useState(false)

  const startCourse = () => {
    setShowCourse(true)
  }

  const backToLanding = () => {
    setShowCourse(false)
  }

  if (showCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onStartCourse={startCourse} onBackToLanding={backToLanding} showCourse={showCourse} />
        <div className="pt-16">
          <PomodoroMasteryCourse />
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