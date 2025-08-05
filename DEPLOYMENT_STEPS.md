# 🚀 Deploy Your Trophy System to Blockchain

Follow these steps to deploy your SkillPath Trophy System and claim real NFTs!

## Step 1: Setup Environment

### 1.1 Install Dependencies
```bash
cd contracts
npm install
```

### 1.2 Create Environment File
Create a `.env` file in the `contracts/` directory:

```env
# Your private key (NEVER share this!)
PRIVATE_KEY=your_private_key_here

# RPC URLs
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

⚠️ **Security**: Never commit your `.env` file to version control!

### 1.3 Get Testnet MATIC
1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Connect your wallet
3. Request testnet MATIC (you'll need some for gas fees)

## Step 2: Deploy Contract

### 2.1 Compile Contracts
```bash
npm run compile
```

### 2.2 Deploy to Mumbai Testnet
```bash
npx hardhat run scripts/deploy-testnet.js --network mumbai
```

### 2.3 Save Contract Address
Copy the contract address from the deployment output. It will look like:
```
✅ SkillPathTrophies deployed to: 0x1234567890abcdef...
```

## Step 3: Update Frontend

### 3.1 Create Environment File
Create a `.env` file in the `LandingPage/` directory:

```env
REACT_APP_TROPHY_CONTRACT_ADDRESS=0x1234567890abcdef...
REACT_APP_NETWORK_ID=80001
REACT_APP_RPC_URL=https://rpc-mumbai.maticvigil.com
```

### 3.2 Update Contract Address
Replace `0x1234567890abcdef...` with your actual deployed contract address.

## Step 4: Test the System

### 4.1 Start Development Server
```bash
cd LandingPage
npm run dev
```

### 4.2 Test Trophy Claiming
1. Connect your wallet to Mumbai testnet
2. Complete a course (like the initiation course)
3. Go to the Trophies page
4. Click "Claim NFT Trophy"
5. Approve the transaction in your wallet
6. Wait for confirmation
7. View your NFT on PolygonScan!

## Step 5: Verify Contract (Optional)

### 5.1 Get API Key
1. Go to [PolygonScan](https://polygonscan.com/)
2. Create an account
3. Get your API key

### 5.2 Verify Contract
```bash
npx hardhat verify --network mumbai CONTRACT_ADDRESS
```

## Step 6: Deploy to Mainnet (When Ready)

### 6.1 Get Mainnet MATIC
You'll need real MATIC tokens for mainnet deployment.

### 6.2 Deploy to Polygon Mainnet
```bash
npx hardhat run scripts/deploy-testnet.js --network polygon
```

### 6.3 Update Environment
Update your frontend `.env` file:
```env
REACT_APP_TROPHY_CONTRACT_ADDRESS=0x1234567890abcdef...
REACT_APP_NETWORK_ID=137
REACT_APP_RPC_URL=https://polygon-rpc.com
```

## Troubleshooting

### Common Issues

1. **"Insufficient funds"**
   - Get more testnet MATIC from the faucet

2. **"Contract not found"**
   - Check your contract address is correct
   - Make sure you're on the right network

3. **"User not eligible"**
   - Complete the course first (100% progress)
   - Check course completion in your dashboard

4. **"Transaction failed"**
   - Increase gas limit in your wallet
   - Make sure you have enough MATIC for gas

### Gas Optimization

The contract is optimized for gas efficiency:
- Trophy claiming: ~150,000 gas
- Course addition: ~100,000 gas
- View functions: No gas cost

## Security Notes

1. **Private Key Security**
   - Never share your private key
   - Use a dedicated wallet for deployment
   - Consider using a hardware wallet

2. **Contract Security**
   - Only the owner can add courses
   - NFTs are soulbound (non-transferable)
   - Double-claiming is prevented

3. **Testing**
   - Always test on testnet first
   - Verify all functionality before mainnet

## Next Steps

After deployment:

1. **Add Real Trophy Images**
   - Upload images to IPFS
   - Update course image URIs

2. **Integrate with Backend**
   - Connect course completion verification
   - Add user authentication

3. **Monitor Usage**
   - Track trophy claims
   - Monitor gas usage
   - Check for any issues

## Support

If you encounter issues:

1. Check the console for error messages
2. Verify your contract address
3. Ensure you're on the correct network
4. Check your wallet connection

---

**🎉 Congratulations! You now have a fully functional NFT trophy system!** 