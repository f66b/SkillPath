# SkillPath Trophy System - Deployment Guide

This guide will walk you through deploying the SkillPath Trophy System smart contract and integrating it with your frontend.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **MetaMask** or another Web3 wallet
4. **Testnet ETH/MATIC** for deployment costs

## Step 1: Setup Environment

### 1.1 Install Dependencies

```bash
cd contracts
npm install
```

### 1.2 Environment Variables

Create a `.env` file in the `contracts` directory:

```env
# Private key of the account that will deploy the contract
PRIVATE_KEY=your_private_key_here

# RPC URLs
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com
BASE_RPC_URL=https://mainnet.base.org

# API Keys for contract verification
POLYGONSCAN_API_KEY=your_polygonscan_api_key
BASESCAN_API_KEY=your_basescan_api_key
```

⚠️ **Security Note**: Never commit your `.env` file to version control!

## Step 2: Compile Contracts

```bash
npm run compile
```

This will create the `artifacts` directory with compiled contract files.

## Step 3: Deploy to Testnet (Mumbai)

### 3.1 Get Testnet MATIC

1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Connect your wallet
3. Request testnet MATIC

### 3.2 Deploy Contract

```bash
npm run deploy:testnet
```

The deployment script will:
- Deploy the `SkillPathTrophies` contract
- Add initial courses (HTML & CSS, JavaScript, React, Pomodoro)
- Save deployment information to `deployment-mumbai.json`

### 3.3 Verify Contract (Optional)

```bash
npx hardhat verify --network mumbai DEPLOYED_CONTRACT_ADDRESS
```

## Step 4: Deploy to Mainnet

### 4.1 Polygon Mainnet

```bash
npm run deploy:mainnet
```

### 4.2 Base Network (Alternative)

```bash
npx hardhat run scripts/deploy.js --network base
```

## Step 5: Frontend Integration

### 5.1 Environment Variables

Add to your React app's `.env`:

```env
REACT_APP_TROPHY_CONTRACT_ADDRESS=your_deployed_contract_address
REACT_APP_NETWORK_ID=137  # Polygon mainnet
REACT_APP_RPC_URL=https://polygon-rpc.com
```

### 5.2 Install Dependencies

```bash
cd LandingPage
npm install ethers@6
```

### 5.3 Import Trophy Component

Add the `TrophySystem` component to your app:

```jsx
import TrophySystem from './components/TrophySystem';

// In your App.jsx or routing
<TrophySystem />
```

## Step 6: Trophy Images

### 6.1 Upload to IPFS

1. Create trophy images for each course
2. Upload to IPFS using [Pinata](https://pinata.cloud/) or similar
3. Update course image URIs in the contract

### 6.2 Update Course Images

```javascript
// Example: Update course image
await contract.updateCourse(
  1, // courseId
  "HTML & CSS Fundamentals",
  "Learn the basics of web development",
  "https://ipfs.io/ipfs/QmYourActualImageHash"
);
```

## Step 7: Backend Integration

### 7.1 Install Dependencies

```bash
cd backend
npm install ethers@6
```

### 7.2 Initialize Trophy Service

```javascript
const TrophyService = require('./trophyService');

const trophyService = new TrophyService(
  'CONTRACT_ADDRESS',
  'RPC_URL',
  'PRIVATE_KEY'
);
```

### 7.3 API Endpoints

Create API endpoints for trophy verification:

```javascript
// Verify user eligibility
app.post('/api/trophies/verify', async (req, res) => {
  const { userId, userAddress, courseId } = req.body;
  const eligibility = await trophyService.verifyTrophyEligibility(
    userId, userAddress, courseId
  );
  res.json(eligibility);
});

// Get user trophies
app.get('/api/trophies/:userAddress', async (req, res) => {
  const trophies = await trophyService.getUserTrophies(req.params.userAddress);
  res.json(trophies);
});
```

## Step 8: Testing

### 8.1 Local Testing

```bash
npm test
```

### 8.2 Manual Testing

1. Connect wallet to testnet
2. Complete a course in your app
3. Try claiming a trophy
4. Verify the NFT appears in wallet
5. Try transferring (should fail)

## Step 9: Production Checklist

- [ ] Contract deployed to mainnet
- [ ] Contract verified on block explorer
- [ ] All courses added to contract
- [ ] Trophy images uploaded to IPFS
- [ ] Frontend environment variables set
- [ ] Backend API endpoints implemented
- [ ] User authentication integrated
- [ ] Course completion tracking working
- [ ] Error handling implemented
- [ ] Gas optimization verified

## Troubleshooting

### Common Issues

1. **"Insufficient funds"**: Get more testnet tokens
2. **"Nonce too low"**: Wait for pending transactions
3. **"Contract not found"**: Check contract address
4. **"User not eligible"**: Verify course completion logic

### Gas Optimization

- Use batch operations for multiple courses
- Optimize contract storage
- Use events for off-chain tracking

## Security Considerations

1. **Access Control**: Only owner can add/update courses
2. **Soulbound**: NFTs cannot be transferred
3. **Verification**: Backend must verify course completion
4. **Rate Limiting**: Prevent spam claims
5. **Input Validation**: Validate all user inputs

## Support

For issues or questions:
- Check the contract code comments
- Review OpenZeppelin documentation
- Test thoroughly on testnet first
- Monitor gas costs and optimize

## Contract Addresses

After deployment, save these addresses:

- **Mumbai Testnet**: `0x...`
- **Polygon Mainnet**: `0x...`
- **Base Network**: `0x...`

Update your frontend and backend configuration accordingly. 