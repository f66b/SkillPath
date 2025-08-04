import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useProgress } from '../context/ProgressContext'

const UserProfile = () => {
  const { account, signMessage, getENSName } = useWeb3()
  const { getCourseProgress, getStatistics } = useProgress()
  const [ensName, setEnsName] = useState(null)
  const [isSigning, setIsSigning] = useState(false)
  const [signature, setSignature] = useState(null)
  const [courseProgress, setCourseProgress] = useState({
    pomodoro: 0,
    htmlcss: 0
  })
  const [statistics, setStatistics] = useState({
    lessonsCompleted: 0,
    quizzesPassed: 0,
    certificatesEarned: 0,
    hoursStudied: 0
  })

  // Get ENS name when component mounts
  useEffect(() => {
    const fetchENSName = async () => {
      if (account) {
        const name = await getENSName()
        setEnsName(name)
      }
    }
    fetchENSName()
  }, [account, getENSName])

  // Load progress and statistics when account changes
  useEffect(() => {
    if (account) {
      const pomodoroProgress = getCourseProgress('pomodoro')
      const htmlcssProgress = getCourseProgress('htmlcss')
      const stats = getStatistics()

      setCourseProgress({
        pomodoro: pomodoroProgress.courseProgress || 0,
        htmlcss: htmlcssProgress.courseProgress || 0
      })
      setStatistics(stats)
    }
  }, [account, getCourseProgress, getStatistics])

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Handle message signing
  const handleSignMessage = async () => {
    if (!account) return

    setIsSigning(true)
    try {
      const message = `Sign this message to verify your identity on SkillPath. Timestamp: ${Date.now()}`
      const sig = await signMessage(message)
      setSignature(sig)
    } catch (error) {
      console.error('Error signing message:', error)
    } finally {
      setIsSigning(false)
    }
  }

  // Copy signature to clipboard
  const copySignature = async () => {
    if (signature) {
      try {
        await navigator.clipboard.writeText(signature)
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy signature:', err)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {ensName || 'Web3 Learner'}
              </h1>
              <p className="text-blue-100 font-mono">
                {formatAddress(account)}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Wallet Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Wallet Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                <p className="font-mono text-sm text-gray-600 break-all">{account}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">ENS Name</h3>
                <p className="text-sm text-gray-600">
                  {ensName || 'No ENS name found'}
                </p>
              </div>
            </div>
          </div>

          {/* Message Signing */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Identity Verification</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                Sign a message to verify your identity and unlock additional features.
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleSignMessage}
                  disabled={isSigning || !!signature}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSigning ? 'Signing...' : signature ? 'Message Signed' : 'Sign Message'}
                </button>
                
                {signature && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Signature Generated</h4>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-xs text-green-700 break-all flex-1">
                        {signature}
                      </p>
                      <button
                        onClick={copySignature}
                        className="text-green-600 hover:text-green-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pomodoro Course */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Pomodoro Mastery</h3>
                  <span className="text-sm text-gray-500">{courseProgress.pomodoro}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${courseProgress.pomodoro}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Time management and productivity</p>
              </div>

              {/* HTML & CSS Course */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">HTML & CSS Basics</h3>
                  <span className="text-sm text-gray-500">{courseProgress.htmlcss}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${courseProgress.htmlcss}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Web development fundamentals</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{statistics.lessonsCompleted}</div>
                <div className="text-sm text-blue-600">Lessons Completed</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{statistics.quizzesPassed}</div>
                <div className="text-sm text-green-600">Quizzes Passed</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{statistics.hoursStudied}</div>
                <div className="text-sm text-purple-600">Hours Studied</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{statistics.certificatesEarned}</div>
                <div className="text-sm text-orange-600">Certificates Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile 