import React from 'react'
import { useWeb3 } from '../context/Web3Context'
import WalletConnect from './WalletConnect'

const ProtectedRoute = ({ children, fallback }) => {
  const { account } = useWeb3()

  if (!account) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Wallet Required
            </h2>
            
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access this feature. This ensures secure authentication and personalized experience.
            </p>
            
            <WalletConnect />
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Don't have a wallet?</p>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Download MetaMask
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute 