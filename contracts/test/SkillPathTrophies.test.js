const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SkillPathTrophies", function () {
  let SkillPathTrophies;
  let skillPathTrophies;
  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy contract
    SkillPathTrophies = await ethers.getContractFactory("SkillPathTrophies");
    skillPathTrophies = await SkillPathTrophies.deploy();
    await skillPathTrophies.waitForDeployment();

    // Add test courses
    await skillPathTrophies.addCourse(
      1,
      "HTML & CSS Fundamentals",
      "Learn the basics of web development",
      "https://ipfs.io/ipfs/QmTestImage1"
    );

    await skillPathTrophies.addCourse(
      2,
      "JavaScript Essentials",
      "Master JavaScript programming",
      "https://ipfs.io/ipfs/QmTestImage2"
    );
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await skillPathTrophies.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await skillPathTrophies.name()).to.equal("SkillPath Trophies");
      expect(await skillPathTrophies.symbol()).to.equal("SPT");
    });
  });

  describe("Course Management", function () {
    it("Should allow owner to add courses", async function () {
      await skillPathTrophies.addCourse(
        3,
        "React Development",
        "Build modern web apps",
        "https://ipfs.io/ipfs/QmTestImage3"
      );

      const course = await skillPathTrophies.courses(3);
      expect(course.exists).to.be.true;
      expect(course.name).to.equal("React Development");
    });

    it("Should not allow non-owner to add courses", async function () {
      await expect(
        skillPathTrophies.connect(user1).addCourse(
          3,
          "React Development",
          "Build modern web apps",
          "https://ipfs.io/ipfs/QmTestImage3"
        )
      ).to.be.revertedWithCustomError(skillPathTrophies, "OwnableUnauthorizedAccount");
    });

    it("Should not allow adding duplicate course IDs", async function () {
      await expect(
        skillPathTrophies.addCourse(
          1,
          "Duplicate Course",
          "This should fail",
          "https://ipfs.io/ipfs/QmTestImage4"
        )
      ).to.be.revertedWith("Course already exists");
    });

    it("Should allow owner to update courses", async function () {
      await skillPathTrophies.updateCourse(
        1,
        "Updated HTML & CSS",
        "Updated description",
        "https://ipfs.io/ipfs/QmUpdatedImage"
      );

      const course = await skillPathTrophies.courses(1);
      expect(course.name).to.equal("Updated HTML & CSS");
    });
  });

  describe("Trophy Claiming", function () {
    it("Should allow eligible user to claim trophy", async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);

      expect(await skillPathTrophies.hasUserClaimed(1, user1.address)).to.be.true;
      expect(await skillPathTrophies.balanceOf(user1.address)).to.equal(1);
    });

    it("Should not allow claiming for non-existent course", async function () {
      await expect(
        skillPathTrophies.connect(user1).claimTrophy(999)
      ).to.be.revertedWith("Course does not exist");
    });

    it("Should not allow double claiming", async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);

      await expect(
        skillPathTrophies.connect(user1).claimTrophy(1)
      ).to.be.revertedWith("Trophy already claimed for this course");
    });

    it("Should emit TrophyClaimed event", async function () {
      await expect(skillPathTrophies.connect(user1).claimTrophy(1))
        .to.emit(skillPathTrophies, "TrophyClaimed")
        .withArgs(1, user1.address, 0); // tokenId starts at 0
    });

    it("Should increment token ID correctly", async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);
      await skillPathTrophies.connect(user2).claimTrophy(1);

      expect(await skillPathTrophies.totalSupply()).to.equal(2);
    });
  });

  describe("Soulbound Functionality", function () {
    beforeEach(async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);
    });

    it("Should not allow transferFrom", async function () {
      await expect(
        skillPathTrophies.connect(user1).transferFrom(user1.address, user2.address, 0)
      ).to.be.revertedWith("SkillPathTrophies: Transfer not allowed - Soulbound tokens");
    });

    it("Should not allow safeTransferFrom", async function () {
      await expect(
        skillPathTrophies.connect(user1).safeTransferFrom(user1.address, user2.address, 0)
      ).to.be.revertedWith("SkillPathTrophies: Transfer not allowed - Soulbound tokens");
    });

    it("Should not allow approve", async function () {
      await expect(
        skillPathTrophies.connect(user1).approve(user2.address, 0)
      ).to.be.revertedWith("SkillPathTrophies: Approval not allowed - Soulbound tokens");
    });

    it("Should not allow setApprovalForAll", async function () {
      await expect(
        skillPathTrophies.connect(user1).setApprovalForAll(user2.address, true)
      ).to.be.revertedWith("SkillPathTrophies: Approval not allowed - Soulbound tokens");
    });

    it("Should return zero address for getApproved", async function () {
      expect(await skillPathTrophies.getApproved(0)).to.equal(ethers.ZeroAddress);
    });

    it("Should return false for isApprovedForAll", async function () {
      expect(await skillPathTrophies.isApprovedForAll(user1.address, user2.address)).to.be.false;
    });
  });

  describe("Metadata and URI", function () {
    beforeEach(async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);
    });

    it("Should return correct token URI", async function () {
      const tokenUri = await skillPathTrophies.tokenURI(0);
      expect(tokenUri).to.include("data:application/json;base64,");
      
      const jsonData = JSON.parse(
        Buffer.from(tokenUri.replace("data:application/json;base64,", ""), "base64").toString()
      );
      
      expect(jsonData.name).to.include("HTML & CSS Fundamentals");
      expect(jsonData.description).to.include(user1.address);
      expect(jsonData.attributes).to.have.lengthOf(3);
    });

    it("Should return correct trophy metadata", async function () {
      const metadata = await skillPathTrophies.getTrophyMetadata(0);
      
      expect(metadata.courseId).to.equal(1);
      expect(metadata.userAddress).to.equal(user1.address);
      expect(metadata.courseName).to.equal("HTML & CSS Fundamentals");
      expect(metadata.dateClaimed).to.be.gt(0);
    });

    it("Should revert for non-existent token", async function () {
      await expect(
        skillPathTrophies.getTrophyMetadata(999)
      ).to.be.revertedWith("Token does not exist");
    });
  });

  describe("User Trophy Queries", function () {
    beforeEach(async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);
      await skillPathTrophies.connect(user1).claimTrophy(2);
      await skillPathTrophies.connect(user2).claimTrophy(1);
    });

    it("Should return correct user trophies", async function () {
      const user1Trophies = await skillPathTrophies.getUserTrophies(user1.address);
      const user2Trophies = await skillPathTrophies.getUserTrophies(user2.address);
      const user3Trophies = await skillPathTrophies.getUserTrophies(user3.address);

      expect(user1Trophies).to.have.lengthOf(2);
      expect(user2Trophies).to.have.lengthOf(1);
      expect(user3Trophies).to.have.lengthOf(0);
    });

    it("Should check claim status correctly", async function () {
      expect(await skillPathTrophies.hasUserClaimed(1, user1.address)).to.be.true;
      expect(await skillPathTrophies.hasUserClaimed(1, user2.address)).to.be.true;
      expect(await skillPathTrophies.hasUserClaimed(1, user3.address)).to.be.false;
    });
  });

  describe("Edge Cases", function () {
    it("Should handle multiple users claiming different courses", async function () {
      await skillPathTrophies.connect(user1).claimTrophy(1);
      await skillPathTrophies.connect(user2).claimTrophy(2);
      await skillPathTrophies.connect(user3).claimTrophy(1);

      expect(await skillPathTrophies.totalSupply()).to.equal(3);
      expect(await skillPathTrophies.balanceOf(user1.address)).to.equal(1);
      expect(await skillPathTrophies.balanceOf(user2.address)).to.equal(1);
      expect(await skillPathTrophies.balanceOf(user3.address)).to.equal(1);
    });

    it("Should handle large course IDs", async function () {
      const largeCourseId = ethers.MaxUint256;
      await skillPathTrophies.addCourse(
        largeCourseId,
        "Large Course ID",
        "Test with large ID",
        "https://ipfs.io/ipfs/QmTestImage5"
      );

      await skillPathTrophies.connect(user1).claimTrophy(largeCourseId);
      expect(await skillPathTrophies.hasUserClaimed(largeCourseId, user1.address)).to.be.true;
    });
  });

  describe("Gas Optimization", function () {
    it("Should use reasonable gas for trophy claiming", async function () {
      const tx = await skillPathTrophies.connect(user1).claimTrophy(1);
      const receipt = await tx.wait();
      
      // Gas should be reasonable (less than 200k for basic operations)
      expect(receipt.gasUsed).to.be.lt(200000);
    });

    it("Should use reasonable gas for course addition", async function () {
      const tx = await skillPathTrophies.addCourse(
        3,
        "Gas Test Course",
        "Testing gas usage",
        "https://ipfs.io/ipfs/QmGasTest"
      );
      const receipt = await tx.wait();
      
      expect(receipt.gasUsed).to.be.lt(150000);
    });
  });
}); 