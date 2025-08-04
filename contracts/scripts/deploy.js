const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SkillPathTrophies contract...");

  // Get the contract factory
  const SkillPathTrophies = await ethers.getContractFactory("SkillPathTrophies");
  
  // Deploy the contract
  const skillPathTrophies = await SkillPathTrophies.deploy();
  
  // Wait for deployment to finish
  await skillPathTrophies.waitForDeployment();
  
  const contractAddress = await skillPathTrophies.getAddress();
  
  console.log("SkillPathTrophies deployed to:", contractAddress);
  
  // Add some initial courses
  console.log("Adding initial courses...");
  
  const courses = [
    {
      id: 1,
      name: "HTML & CSS Fundamentals",
      description: "Learn the basics of web development with HTML and CSS",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash1"
    },
    {
      id: 2,
      name: "JavaScript Essentials",
      description: "Master JavaScript programming fundamentals",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash2"
    },
    {
      id: 3,
      name: "React Development",
      description: "Build modern web applications with React",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash3"
    },
    {
      id: 4,
      name: "Pomodoro Mastery",
      description: "Master productivity techniques with the Pomodoro method",
      imageUri: "https://ipfs.io/ipfs/QmYourTrophyImageHash4"
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
    console.log(`Added course: ${course.name}`);
  }
  
  console.log("Deployment completed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Owner address:", await skillPathTrophies.owner());
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    deployer: await skillPathTrophies.owner(),
    courses: courses
  };
  
  const fs = require("fs");
  fs.writeFileSync(
    `deployment-${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`Deployment info saved to deployment-${hre.network.name}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 