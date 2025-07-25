import React from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AIAssistant from './components/AIAssistant'
import InteractiveCourses from './components/InteractiveCourses'
import Certification from './components/Certification'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <AIAssistant />
      <InteractiveCourses />
      <Certification />
      <ComingSoon />
      <Footer />
    </div>
  )
}

export default App 