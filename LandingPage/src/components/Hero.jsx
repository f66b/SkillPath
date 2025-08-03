import React from 'react'

const Hero = ({ onStartCourse }) => {
  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-manrope font-bold text-5xl lg:text-6xl text-gray-900 leading-tight">
              Unlock Your Potential with{' '}
              <span className="text-emerald-custom">AI-Guided Learning</span>
            </h1>
            <p className="text-xl text-slate-text leading-relaxed">
              Join thousands of learners building real skills through interactive, personalized courses — complete with verifiable certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStartCourse}
                className="btn-primary"
              >
                Start Learning for Free
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-text">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-custom rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-custom rounded-full"></div>
                <span>Instant access</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl soft-shadow overflow-hidden">
              <img 
                src="/images/hero-learning.png" 
                alt="AI-Guided Learning Platform" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-mint rounded-3xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-custom rounded-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 