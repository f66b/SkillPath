import React from 'react'

const AIAssistant = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-custom" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      title: "Smart Recommendations",
      description: "AI analyzes your learning style and suggests the perfect next steps"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-custom" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
      title: "Real-time Support",
      description: "Get instant explanations and guidance whenever you're stuck"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-custom" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      title: "Adaptive Learning",
      description: "Content adjusts to your pace and understanding level"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-cool-gray rounded-3xl soft-shadow overflow-hidden">
              {/* Fallback gradient background for broken image */}
              <div className="w-full h-96 lg:h-[450px] bg-gradient-to-br from-emerald-100 to-mint/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-emerald-custom/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-12 h-12 text-emerald-custom" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 className="font-manrope font-semibold text-xl text-gray-800 mb-2">AI Assistant</h3>
                  <p className="text-slate-text">Interactive AI-powered learning companion</p>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 glassmorphism rounded-2xl p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-custom rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI Active</span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
                Your Personal Learning Assistant
              </h2>
              <p className="text-xl text-slate-text leading-relaxed">
                Our AI companion learns your goals and recommends the best path forward. Ask questions, get real-time help, and never learn alone.
              </p>
            </div>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-custom/10 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-manrope font-semibold text-lg text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-text">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAssistant 