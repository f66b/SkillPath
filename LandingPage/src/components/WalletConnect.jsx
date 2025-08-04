import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'

const WalletConnect = () => {
  const { 
    account, 
    connectWallet, 
    disconnectWallet, 
    isConnecting, 
    error, 
    getENSName 
  } = useWeb3()
  
  const [ensName, setEnsName] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  // Get ENS name when account changes
  useEffect(() => {
    const fetchENSName = async () => {
      if (account) {
        const name = await getENSName()
        setEnsName(name)
      } else {
        setEnsName(null)
      }
    }

    fetchENSName()
  }, [account, getENSName])

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Handle wallet connection
  const handleConnect = async () => {
    const success = await connectWallet()
    if (success) {
      setShowDropdown(false)
    }
  }

  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnectWallet()
    setShowDropdown(false)
  }

  // Copy address to clipboard
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(account)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }

  if (account) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            {ensName || formatAddress(account)}
          </span>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {ensName || 'Connected Wallet'}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    {formatAddress(account)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={copyAddress}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Address</span>
                </button>

                <button
                  onClick={handleDisconnect}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isConnecting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <span>Connect Wallet</span>
          </>
        )}
      </button>

      {error && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-red-50 border border-red-200 rounded-lg p-3 z-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}

export default WalletConnect 