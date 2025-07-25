import React from 'react'

const InteractiveCourses = () => {
  return (
    <section id="courses" className="py-20 bg-cool-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            Interactive Learning You'll Actually Finish
          </h2>
          <p className="text-xl text-slate-text max-w-3xl mx-auto leading-relaxed">
            Forget static content. SkillPath keeps you engaged with interactive checkpoints, AI explanations, and milestone tracking.
          </p>
        </div>
        <div className="relative">
          <div className="bg-white rounded-3xl soft-shadow overflow-hidden mx-auto max-w-4xl">
            {/* Fallback dashboard design for broken image */}
            <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-white to-emerald-50 p-8 flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-custom/10 rounded-2xl p-4">
                    <div className="w-12 h-12 bg-emerald-custom rounded-xl mb-3 mx-auto"></div>
                    <div className="h-2 bg-emerald-custom/30 rounded mb-2"></div>
                    <div className="h-2 bg-emerald-custom/20 rounded w-3/4 mx-auto"></div>
                  </div>
                  <div className="bg-emerald-custom/10 rounded-2xl p-4">
                    <div className="w-12 h-12 bg-emerald-custom rounded-xl mb-3 mx-auto"></div>
                    <div className="h-2 bg-emerald-custom/30 rounded mb-2"></div>
                    <div className="h-2 bg-emerald-custom/20 rounded w-2/3 mx-auto"></div>
                  </div>
                  <div className="bg-gray-200/50 rounded-2xl p-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl mb-3 mx-auto"></div>
                    <div className="h-2 bg-gray-300 rounded mb-2"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
                <h3 className="font-manrope font-bold text-2xl text-gray-900 mb-4">Interactive Course Dashboard</h3>
                <p className="text-slate-text">Track progress, access modules, and engage with AI-powered learning</p>
              </div>
            </div>
          </div>
          <div className="absolute top-8 left-8 glassmorphism rounded-2xl p-6 max-w-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-emerald-custom rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">85%</span>
              </div>
              <span className="font-semibold text-gray-900">Course Progress</span>
            </div>
            <p className="text-sm text-slate-text">3 of 4 modules completed</p>
          </div>
          <div className="absolute bottom-8 right-8 glassmorphism rounded-2xl p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Next: Final Assessment</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="btn-primary">
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  )
}

export default InteractiveCourses 