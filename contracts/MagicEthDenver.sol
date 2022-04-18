// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Oustro is ERC721URIStorage {
    // Track token IDs
    uint256 private count = 0;
    // Store all token URIs for easy retreival
    MarketItem [] private nfts;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        string data;
        address owner;
        uint price;
        uint ID;
    }

    constructor() ERC721("Oustro", "OUSTRO") {}

    function createNFT(string memory uri, uint price) public returns (uint) {
        // Mint NFT
        count = count + 1;
        uint256 newTokenId = count;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        nfts.push(
            MarketItem(
                uri,
                msg.sender,
                price,
                newTokenId 
            )
        );

        return newTokenId;
    }

    function getNFTs() external view returns (string [] memory) {
        string [] memory uris = new string[](nfts.length);
        for (uint i = 0; i < nfts.length; ++i) {
            uris[i] = nfts[i].data;
        }
        return uris;
    }

    function getNFTsByOwner(address _owner) external view returns (string [] memory) {
        uint total = 0;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].owner == _owner) {
                total += 1;
            }
        }
        string [] memory items = new string[](total);
        uint index = 0;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].owner == _owner) {
                items[index] = nfts[i].data;
                index += 1;
            }
        }
        return items;
    }

    function getIndex() external view returns (uint) {
        return count + 1;
    }

    function transfer(address _newOwner, uint Id) external {
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                nfts[i].owner = _newOwner;
                break;
            }
        }
    }
}
