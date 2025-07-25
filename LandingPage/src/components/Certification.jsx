import React from 'react'

const Certification = () => {
  const certificateFeatures = [
    "Blockchain-verified authenticity",
    "LinkedIn integration ready", 
    "Employer verification portal",
    "Detailed skill breakdown"
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
                Get Certified. Stay Motivated.
              </h2>
              <p className="text-xl text-slate-text leading-relaxed mb-8">
                Each completed course earns you a digital certificate — easily shareable and instantly verifiable.
              </p>
            </div>
            <div className="bg-cool-gray rounded-3xl p-8 soft-shadow">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 mb-4">
                Certificate Features:
              </h3>
              <div className="space-y-4">
                {certificateFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-custom rounded-full"></div>
                    <span className="text-slate-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-50 to-mint/20 rounded-3xl soft-shadow overflow-hidden">
              <img 
                src="images/certificate-tablet.png" 
                alt="Digital Certificate on Tablet" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            <div className="absolute top-6 right-6 glassmorphism rounded-2xl p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald-custom" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium text-gray-700">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certification 