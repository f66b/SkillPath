# 🏆 SkillPath Trophy System

A complete NFT trophy system for the SkillPath education platform, featuring soulbound (non-transferable) NFTs that users can claim upon course completion.

## 📋 Overview

The SkillPath Trophy System consists of:

- **Smart Contract**: Soulbound ERC721 NFTs on EVM-compatible blockchains
- **Backend Service**: Course completion verification and trophy management
- **Frontend Component**: React component for trophy claiming and display
- **Deployment Tools**: Hardhat configuration and deployment scripts

## 🚀 Features

### Smart Contract Features
- ✅ Soulbound NFTs (non-transferable)
- ✅ Course-based trophy minting
- ✅ One trophy per course per user
- ✅ Embedded metadata with Base64 encoding
- ✅ Gas-optimized operations
- ✅ Comprehensive access control

### Backend Features
- ✅ Course completion verification
- ✅ Trophy eligibility checking
- ✅ User trophy retrieval
- ✅ Metadata generation
- ✅ Integration with existing progress tracking

### Frontend Features
- ✅ Wallet connection integration
- ✅ Trophy claiming interface
- ✅ Trophy collection display
- ✅ Real-time status updates
- ✅ Error handling and loading states

## 📁 Project Structure

```
SkillPath/
├── contracts/
│   ├── SkillPathTrophies.sol          # Main smart contract
│   ├── package.json                   # Contract dependencies
│   ├── hardhat.config.js              # Hardhat configuration
│   ├── scripts/
│   │   └── deploy.js                  # Deployment script
│   ├── test/
│   │   └── SkillPathTrophies.test.js  # Comprehensive test suite
│   ├── metadata/
│   │   └── example-trophy-metadata.json # Example metadata
│   └── DEPLOYMENT_GUIDE.md           # Deployment instructions
├── backend/
│   └── trophyService.js              # Backend trophy service
├── LandingPage/
│   └── src/
│       └── components/
│           └── TrophySystem.jsx      # React trophy component
└── TROPHY_SYSTEM_README.md           # This file
```

## 🛠️ Quick Start

### 1. Smart Contract Setup

```bash
cd contracts
npm install
```

### 2. Environment Configuration

Create `.env` file in `contracts/`:

```env
PRIVATE_KEY=your_private_key_here
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### 3. Compile and Deploy

```bash
npm run compile
npm run deploy:testnet
```

### 4. Frontend Integration

```bash
cd LandingPage
npm install ethers@6
```

Add to your React app:

```jsx
import TrophySystem from './components/TrophySystem';

// In your routing
<TrophySystem />
```

## 📖 Smart Contract Details

### Contract: `SkillPathTrophies.sol`

**Key Functions:**
- `claimTrophy(uint256 courseId)` - Claim trophy for completed course
- `hasUserClaimed(uint256 courseId, address user)` - Check if user claimed
- `getUserTrophies(address user)` - Get all user trophies
- `addCourse(uint256 courseId, string name, string description, string imageUri)` - Add new course (owner only)

**Security Features:**
- Soulbound tokens (no transfers allowed)
- Access control for course management
- Double-claiming prevention
- Input validation

### NFT Metadata Structure

```json
{
  "name": "SkillPath Trophy - [Course Name]",
  "description": "Awarded to [user_address] for completing [Course Name]",
  "image": "[IPFS_URI]",
  "attributes": [
    {"trait_type": "Course ID", "value": "1"},
    {"trait_type": "Date Claimed", "value": "1703123456"},
    {"trait_type": "Non-Transferable", "value": "true"}
  ]
}
```

## 🔧 Backend Integration

### TrophyService Class

```javascript
const TrophyService = require('./trophyService');

const trophyService = new TrophyService(
  'CONTRACT_ADDRESS',
  'RPC_URL',
  'PRIVATE_KEY'
);

// Verify eligibility
const eligibility = await trophyService.verifyTrophyEligibility(
  userId, userAddress, courseId
);

// Get user trophies
const trophies = await trophyService.getUserTrophies(userAddress);
```

### API Endpoints

```javascript
// Verify trophy eligibility
POST /api/trophies/verify
{
  "userId": "user123",
  "userAddress": "0x...",
  "courseId": 1
}

// Get user trophies
GET /api/trophies/:userAddress
```

## 🎨 Frontend Component

### TrophySystem Component

The `TrophySystem.jsx` component provides:

- **Wallet Connection**: Integrates with existing Web3 context
- **Available Trophies**: Shows trophies ready to claim
- **Trophy Collection**: Displays owned trophies
- **Claiming Interface**: One-click trophy claiming
- **Real-time Updates**: Automatic refresh after claims

### Key Features:
- Responsive design with Tailwind CSS
- Loading states and error handling
- PolygonScan integration for verification
- Sortable trophy collection

## 🧪 Testing

### Run Tests

```bash
cd contracts
npm test
```

### Test Coverage

The test suite covers:
- ✅ Contract deployment
- ✅ Course management
- ✅ Trophy claiming
- ✅ Soulbound functionality
- ✅ Metadata generation
- ✅ User queries
- ✅ Edge cases
- ✅ Gas optimization

## 🚀 Deployment

### Testnet (Mumbai)

```bash
npm run deploy:testnet
```

### Mainnet (Polygon)

```bash
npm run deploy:mainnet
```

### Verification

```bash
npx hardhat verify --network mumbai DEPLOYED_ADDRESS
```

## 🔒 Security Considerations

1. **Access Control**: Only contract owner can add/update courses
2. **Soulbound**: NFTs cannot be transferred or approved
3. **Verification**: Backend must verify course completion
4. **Rate Limiting**: Implement rate limiting for API calls
5. **Input Validation**: All inputs are validated on-chain

## 💰 Gas Optimization

- **Optimized Storage**: Efficient data structures
- **Batch Operations**: Support for batch course addition
- **Event Usage**: Events for off-chain tracking
- **Compiler Optimization**: Solidity optimizer enabled

## 🌐 Supported Networks

- **Polygon Mainnet** (Recommended)
- **Polygon Mumbai Testnet**
- **Base Network**
- **Any EVM-compatible chain**

## 📞 Support

### Common Issues

1. **"Insufficient funds"**: Get testnet tokens from faucet
2. **"Course not found"**: Verify course ID exists
3. **"Already claimed"**: Check claim status
4. **"Transfer failed"**: Expected for soulbound tokens

### Resources

- [OpenZeppelin Documentation](https://docs.openzeppelin.com/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Polygon Documentation](https://docs.polygon.technology/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for the SkillPath education platform** 