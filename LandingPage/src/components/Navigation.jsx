import React, { useState } from 'react'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-custom rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-manrope font-bold text-xl text-gray-900">SkillPath</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('courses')}
              className="text-slate-text hover:text-emerald-custom transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-slate-text hover:text-emerald-custom transition-colors"
            >
              How it Works
            </button>
            <a href="#" className="text-slate-text hover:text-emerald-custom transition-colors">
              Sign In
            </a>
            <button className="bg-emerald-custom text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-500 transition-colors soft-shadow">
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('courses')}
              className="block w-full text-left text-slate-text hover:text-emerald-custom transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-slate-text hover:text-emerald-custom transition-colors"
            >
              How it Works
            </button>
            <a href="#" className="block text-slate-text hover:text-emerald-custom transition-colors">
              Sign In
            </a>
            <button className="w-full bg-emerald-custom text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-500 transition-colors">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 