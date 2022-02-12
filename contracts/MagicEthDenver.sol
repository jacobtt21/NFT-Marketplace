// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MagicEthDenver is ERC721URIStorage {
    // Track token IDs
    uint256 private count = 0;
    // Store all token URIs for easy retreival
    string[] private tokenURIs;
    // For grabbing all NFTs owned by a specific user 
    mapping (address => string[]) private addressToURIs;

    constructor() ERC721("Magic Eth-Denver Collection", "MEDC") {}

    function createNFT(string memory uri) public returns (uint) {
        // Mint NFT
        count++;
        uint256 newTokenId = count;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);

        // Update variables with new token URI
        tokenURIs.push(uri);
        addressToURIs[msg.sender].push(uri);

        return newTokenId;
    }

    function getCount() external  view returns (uint) {
        return count;
    }

    function getNFTs() external view returns (string[] memory) {
        return tokenURIs;
    }

    function getNFTsByOwner(address _owner) external view returns (string[] memory) {
        return addressToURIs[_owner];
    }
}
