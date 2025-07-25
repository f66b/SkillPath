import React from 'react'

const ComingSoon = () => {
  const processSteps = [
    { number: "1", label: "Define Goals" },
    { number: "2", label: "AI Curation" },
    { number: "3", label: "Start Learning" }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-mint/10 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/images/learning-journey-map.png" 
          alt="Learning Journey Map" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-emerald-custom/10 text-emerald-custom px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-emerald-custom rounded-full mr-2 animate-pulse"></span>
            Coming Soon
          </div>
          <h2 className="font-manrope font-bold text-4xl lg:text-6xl text-gray-900 mb-8">
            Build Your Own Learning Path
          </h2>
          <p className="text-xl text-slate-text leading-relaxed mb-12 max-w-3xl mx-auto">
            Imagine customizing your own course with the help of AI — and SkillPath makes it possible. Create learning experiences tailored exactly to your goals, interests, and timeline.
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-center space-x-8 text-slate-text">
              {processSteps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-custom/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-custom font-bold text-sm">{step.number}</span>
                    </div>
                    <span>{step.label}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-8 h-0.5 bg-emerald-custom/30"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <button className="btn-primary">
            Join the Waitlist
          </button>
          <p className="text-sm text-slate-text mt-4">
            Be the first to know when custom course builder launches
          </p>
        </div>
      </div>
    </section>
  )
}

export default ComingSoon 