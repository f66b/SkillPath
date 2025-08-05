const { ethers } = require("hardhat");

async function testContract() {
  console.log("🧪 Testing contract connection...");
  
  try {
    // Connect to the local network
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    
    // Contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    // Contract ABI (minimal for testing)
    const abi = [
      "function totalSupply() external view returns (uint256)",
      "function courses(uint256 courseId) external view returns (string name, string description, string imageUri, bool exists)"
    ];
    
    // Create contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    // Test 1: Check total supply
    console.log("📊 Testing totalSupply...");
    const totalSupply = await contract.totalSupply();
    console.log("✅ Total supply:", totalSupply.toString());
    
    // Test 2: Check course 1
    console.log("📚 Testing course 1...");
    const course1 = await contract.courses(1);
    console.log("✅ Course 1:", course1.name);
    
    // Test 3: Check course 2
    console.log("📚 Testing course 2...");
    const course2 = await contract.courses(2);
    console.log("✅ Course 2:", course2.name);
    
    // Test 4: Check course 3
    console.log("📚 Testing course 3...");
    const course3 = await contract.courses(3);
    console.log("✅ Course 3:", course3.name);
    
    console.log("\n🎉 All tests passed! Contract is working correctly.");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 