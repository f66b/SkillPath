import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

const Web3Context = createContext()

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum
  }

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.')
      return false
    }

    setIsConnecting(true)
    setError(null)

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const account = accounts[0]
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      setAccount(account)
      setProvider(provider)
      setSigner(signer)

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return true
    } catch (err) {
      console.error('Error connecting wallet:', err)
      setError(err.message || 'Failed to connect wallet')
      return false
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setError(null)

    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      disconnectWallet()
    } else {
      // User switched accounts
      setAccount(accounts[0])
    }
  }

  // Handle chain changes
  const handleChainChanged = () => {
    // Reload the page when chain changes
    window.location.reload()
  }

  // Sign a message for authentication
  const signMessage = async (message) => {
    if (!signer) {
      throw new Error('No wallet connected')
    }

    try {
      const signature = await signer.signMessage(message)
      return signature
    } catch (err) {
      console.error('Error signing message:', err)
      throw new Error('Failed to sign message')
    }
  }

  // Get user's ENS name if available
  const getENSName = async () => {
    if (!provider || !account) return null

    try {
      const ensName = await provider.lookupAddress(account)
      return ensName
    } catch (err) {
      console.error('Error getting ENS name:', err)
      return null
    }
  }

  // Check if wallet is connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        })
        
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          
          setAccount(accounts[0])
          setProvider(provider)
          setSigner(signer)

          // Add event listeners
          window.ethereum.on('accountsChanged', handleAccountsChanged)
          window.ethereum.on('chainChanged', handleChainChanged)
        }
      }
    }

    checkConnection()
  }, [])

  const value = {
    account,
    provider,
    signer,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    signMessage,
    getENSName,
    isMetaMaskInstalled
  }

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
} 