// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title SkillPathTrophies
 * @dev Soulbound NFT contract for SkillPath course completion trophies
 * @notice This contract mints non-transferable NFTs as trophies for course completion
 */
contract SkillPathTrophies is ERC721, Ownable {
    using Strings for uint256;
    
    // Course information mapping
    mapping(uint256 => CourseInfo) public courses;
    
    // Track claimed trophies: courseId => userAddress => hasClaimed
    mapping(uint256 => mapping(address => bool)) public hasClaimed;
    
    // Track token metadata
    mapping(uint256 => TrophyMetadata) public trophyMetadata;
    
    // Counter for token IDs
    uint256 private _tokenIdCounter;
    
    // Events
    event TrophyClaimed(uint256 indexed courseId, address indexed user, uint256 tokenId);
    event CourseAdded(uint256 indexed courseId, string courseName, string courseDescription);
    
    // Structs
    struct CourseInfo {
        string name;
        string description;
        string imageUri;
        bool exists;
    }
    
    struct TrophyMetadata {
        uint256 courseId;
        address userAddress;
        uint256 dateClaimed;
        string courseName;
    }
    
    // Modifiers
    modifier onlyEligibleUser(uint256 courseId) {
        require(courses[courseId].exists, "Course does not exist");
        require(!hasClaimed[courseId][msg.sender], "Trophy already claimed for this course");
        _;
    }
    
    modifier onlyValidToken(uint256 tokenId) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _;
    }
    
    constructor() ERC721("SkillPath Trophies", "SPT") Ownable(msg.sender) {}
    
    /**
     * @dev Claim a trophy for completing a course
     * @param courseId The ID of the completed course
     */
    function claimTrophy(uint256 courseId) external onlyEligibleUser(courseId) {
        require(_isEligibleForTrophy(courseId, msg.sender), "User not eligible for trophy");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Mark as claimed
        hasClaimed[courseId][msg.sender] = true;
        
        // Store metadata
        trophyMetadata[tokenId] = TrophyMetadata({
            courseId: courseId,
            userAddress: msg.sender,
            dateClaimed: block.timestamp,
            courseName: courses[courseId].name
        });
        
        // Mint the NFT
        _mint(msg.sender, tokenId);
        
        emit TrophyClaimed(courseId, msg.sender, tokenId);
    }
    
    /**
     * @dev Add a new course (only owner)
     * @param courseId The course ID
     * @param courseName The name of the course
     * @param courseDescription The description of the course
     * @param imageUri The URI for the course trophy image
     */
    function addCourse(
        uint256 courseId,
        string memory courseName,
        string memory courseDescription,
        string memory imageUri
    ) external onlyOwner {
        require(!courses[courseId].exists, "Course already exists");
        
        courses[courseId] = CourseInfo({
            name: courseName,
            description: courseDescription,
            imageUri: imageUri,
            exists: true
        });
        
        emit CourseAdded(courseId, courseName, courseDescription);
    }
    
    /**
     * @dev Update course information (only owner)
     * @param courseId The course ID
     * @param courseName The new name of the course
     * @param courseDescription The new description of the course
     * @param imageUri The new URI for the course trophy image
     */
    function updateCourse(
        uint256 courseId,
        string memory courseName,
        string memory courseDescription,
        string memory imageUri
    ) external onlyOwner {
        require(courses[courseId].exists, "Course does not exist");
        
        courses[courseId].name = courseName;
        courses[courseId].description = courseDescription;
        courses[courseId].imageUri = imageUri;
    }
    
    /**
     * @dev Check if user has claimed a trophy for a specific course
     * @param courseId The course ID
     * @param user The user address
     * @return True if user has claimed the trophy
     */
    function hasUserClaimed(uint256 courseId, address user) external view returns (bool) {
        return hasClaimed[courseId][user];
    }
    
    /**
     * @dev Get trophy metadata for a token
     * @param tokenId The token ID
     * @return Trophy metadata
     */
    function getTrophyMetadata(uint256 tokenId) 
        external 
        view 
        onlyValidToken(tokenId) 
        returns (TrophyMetadata memory) 
    {
        return trophyMetadata[tokenId];
    }
    
    /**
     * @dev Get all trophies owned by a user
     * @param user The user address
     * @return Array of token IDs owned by the user
     */
    function getUserTrophies(address user) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(user);
        uint256[] memory trophies = new uint256[](balance);
        
        uint256 index = 0;
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (_ownerOf(i) != address(0) && ownerOf(i) == user) {
                trophies[index] = i;
                index++;
            }
        }
        
        return trophies;
    }
    
    /**
     * @dev Generate token URI with embedded metadata
     * @param tokenId The token ID
     * @return The token URI
     */
    function tokenURI(uint256 tokenId) 
        public 
        view 
        virtual 
        override 
        onlyValidToken(tokenId) 
        returns (string memory) 
    {
        TrophyMetadata memory metadata = trophyMetadata[tokenId];
        CourseInfo memory course = courses[metadata.courseId];
        
        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "SkillPath Trophy - ', course.name, '",',
            '"description": "Awarded to ', _addressToString(metadata.userAddress), 
            ' for completing the ', course.name, ' course on SkillPath.",',
            '"image": "', course.imageUri, '",',
            '"attributes": [',
            '{"trait_type": "Course ID", "value": "', metadata.courseId.toString(), '"},',
            '{"trait_type": "Date Claimed", "value": "', metadata.dateClaimed.toString(), '"},',
            '{"trait_type": "Non-Transferable", "value": "true"}',
            ']}'
        ))));
        
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
    
    /**
     * @dev Override transfer functions to make NFTs soulbound
     */
    function transferFrom(address from, address to, uint256 tokenId) 
        public 
        virtual 
        override 
        onlyValidToken(tokenId) 
    {
        revert("SkillPathTrophies: Transfer not allowed - Soulbound tokens");
    }
    
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) 
        public 
        virtual 
        override 
        onlyValidToken(tokenId) 
    {
        revert("SkillPathTrophies: Transfer not allowed - Soulbound tokens");
    }
    
    function approve(address to, uint256 tokenId) 
        public 
        virtual 
        override 
        onlyValidToken(tokenId) 
    {
        revert("SkillPathTrophies: Approval not allowed - Soulbound tokens");
    }
    
    function setApprovalForAll(address operator, bool approved) 
        public 
        virtual 
        override 
    {
        revert("SkillPathTrophies: Approval not allowed - Soulbound tokens");
    }
    
    function getApproved(uint256 tokenId) 
        public 
        view 
        virtual 
        override 
        onlyValidToken(tokenId) 
        returns (address) 
    {
        return address(0);
    }
    
    function isApprovedForAll(address owner, address operator) 
        public 
        view 
        virtual 
        override 
        returns (bool) 
    {
        return false;
    }
    
    /**
     * @dev Hook function to prevent transfers during minting
     */
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        // Only allow minting (auth == address(0) means minting)
        if (auth != address(0)) {
            revert("SkillPathTrophies: Transfer not allowed - Soulbound tokens");
        }
        return super._update(to, tokenId, auth);
    }
    
    /**
     * @dev Convert address to string
     * @param addr The address to convert
     * @return The address as a string
     */
    function _addressToString(address addr) internal pure returns (string memory) {
        return Strings.toHexString(uint256(uint160(addr)), 20);
    }
    
    /**
     * @dev Check if user is eligible for trophy (to be implemented by backend)
     * @param courseId The course ID
     * @param user The user address
     * @return True if user is eligible
     */
    function _isEligibleForTrophy(uint256 courseId, address user) internal view returns (bool) {
        // This function should be called after backend verification
        // For now, we'll allow the claim if the course exists and hasn't been claimed
        // In production, this should integrate with your backend verification system
        return courses[courseId].exists && !hasClaimed[courseId][user];
    }
    
    /**
     * @dev Get total number of trophies minted
     * @return The total number of trophies
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
} 