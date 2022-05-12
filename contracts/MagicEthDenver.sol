
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
        uint rating;
        uint raters;
        bool onMarket;
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
                newTokenId,
                0,
                0,
                false
            )
        );

        return newTokenId;
    }

    function getEverything() external view returns (MarketItem [] memory) {
        MarketItem [] memory uris = new MarketItem[](nfts.length);
        for (uint i = 0; i < nfts.length; ++i) {
            uris[i] = nfts[i];
        }
        return uris;
    }

    function getNFTbyId(uint Id) external view returns (MarketItem memory) {
        return nfts[Id - 1];
    }

    function getNFTsByOwner(address _owner) external view returns (MarketItem [] memory) {
        uint total = 0;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].owner == _owner) {
                total += 1;
            }
        }
        MarketItem [] memory items = new MarketItem[](total);
        uint index = 0;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].owner == _owner) {
                items[index] = nfts[i];
                index += 1;
            }
        }
        return items;
    }

    function getIndex() external view returns (uint) {
        return count + 1;
    }

    function changeMarketStatus(uint Id, address _currentOwner) public returns (uint) {
        if (nfts[Id - 1].owner == _currentOwner) {
            nfts[Id - 1].onMarket = !nfts[Id - 1].onMarket;
        }

        return Id;
    }

    function transfer(address _newOwner, uint Id, address _currentOwner) external {
        if (nfts[Id - 1].owner == _currentOwner) {
            nfts[Id - 1].owner = _newOwner;
        }
    }

    function changePrice(uint Id, uint newPrice, address _currentOwner) public returns (uint) {
        if (nfts[Id - 1].owner == _currentOwner) {
            nfts[Id - 1].price = newPrice;
        }

        return newPrice;
    }

    function rateNFT(uint Id, uint newRating) public returns (uint) {
        uint currentRating = nfts[Id - 1].rating;
        uint currentRaters = nfts[Id - 1].raters;
        nfts[Id - 1].rating = ((currentRating * currentRaters) + newRating) / (currentRaters + 1);
        nfts[Id - 1].raters = currentRaters + 1;
        return newRating;
    }
}