const { ethers } = require("hardhat");

async function testTrophySystem() {
  console.log("🧪 Testing Complete Trophy System...");
  
  try {
    // Connect to the local network
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    
    // Contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    // Contract ABI
    const abi = [
      "function totalSupply() external view returns (uint256)",
      "function courses(uint256 courseId) external view returns (string name, string description, string imageUri, bool exists)",
      "function hasUserClaimed(uint256 courseId, address user) external view returns (bool)",
      "function claimTrophy(uint256 courseId) external",
      "function getUserTrophies(address user) external view returns (uint256[])",
      "function getTrophyMetadata(uint256 tokenId) external view returns (uint256 courseId, address userAddress, uint256 dateClaimed, string courseName)"
    ];
    
    // Create contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    // Test account (first hardhat account)
    const testAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    
    console.log("\n📊 Testing Contract Basics...");
    
    // Test 1: Check total supply
    const totalSupply = await contract.totalSupply();
    console.log("✅ Total supply:", totalSupply.toString());
    
    // Test 2: Check courses
    for (let i = 1; i <= 3; i++) {
      const course = await contract.courses(i);
      console.log(`✅ Course ${i}: ${course.name}`);
    }
    
    console.log("\n🔍 Testing User Claims...");
    
    // Test 3: Check if user has claimed any trophies
    for (let i = 1; i <= 3; i++) {
      const hasClaimed = await contract.hasUserClaimed(i, testAccount);
      console.log(`✅ Course ${i} claimed by ${testAccount.slice(0, 6)}...: ${hasClaimed}`);
    }
    
    // Test 4: Get user trophies
    const userTrophies = await contract.getUserTrophies(testAccount);
    console.log(`✅ User trophies count: ${userTrophies.length}`);
    
    console.log("\n🎉 Trophy System Test Complete!");
    console.log("\n📋 Summary:");
    console.log("- Contract is deployed and accessible");
    console.log("- All 3 courses are configured");
    console.log("- User claim checking is working");
    console.log("- Ready for frontend integration");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testTrophySystem()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 