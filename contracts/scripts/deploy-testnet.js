const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying SkillPathTrophies to testnet...");

  // Get the contract factory
  const SkillPathTrophies = await ethers.getContractFactory("SkillPathTrophies");
  
  // Deploy the contract
  console.log("📦 Deploying contract...");
  const skillPathTrophies = await SkillPathTrophies.deploy();
  
  // Wait for deployment to finish
  await skillPathTrophies.waitForDeployment();
  
  const contractAddress = await skillPathTrophies.getAddress();
  
  console.log("✅ SkillPathTrophies deployed to:", contractAddress);
  
  // Add initial courses
  console.log("📚 Adding initial courses...");
  
  const courses = [
    {
      id: 1,
      name: "Welcome to SkillPath",
      description: "Get started with this simple initiation course to learn how the platform works",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash1"
    },
    {
      id: 2,
      name: "Pomodoro Mastery Course",
      description: "Master time management and productivity with the proven Pomodoro Technique",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash2"
    },
    {
      id: 3,
      name: "HTML & CSS Basics",
      description: "Build your first web page from scratch! Learn HTML structure, CSS styling, and responsive design",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash3"
    }
  ];
  
  for (const course of courses) {
    const tx = await skillPathTrophies.addCourse(
      course.id,
      course.name,
      course.description,
      course.imageUri
    );
    await tx.wait();
    console.log(`✅ Added course: ${course.name}`);
  }
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("📋 Contract Details:");
  console.log("   Contract Address:", contractAddress);
  console.log("   Network:", hre.network.name);
  console.log("   Owner:", await skillPathTrophies.owner());
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    deployer: await skillPathTrophies.owner(),
    courses: courses,
    deploymentDate: new Date().toISOString()
  };
  
  const fs = require("fs");
  fs.writeFileSync(
    `deployment-${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`\n📄 Deployment info saved to deployment-${hre.network.name}.json`);
  
  console.log("\n🔧 Next Steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Update your frontend .env file with the contract address");
  console.log("3. Update the TrophySystem component to use the real contract");
  console.log("4. Test trophy claiming on the frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 