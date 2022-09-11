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
        uint verify;
        bool show;
    }

    constructor() ERC721("Oustro", "OUSTRO") {}

    function createNFT(string memory uri, uint price, bool goingtoShow, uint256 newTokenId) public returns (uint) {
        // Mint NFT
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
                false,
                0,
                goingtoShow
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
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                return nfts[i];
            }
        }
        return nfts[nfts.length - 1];
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

    event IDEvent(uint id);

    function getIndex() public returns (uint) {
        count = count + 1;
        emit IDEvent(count);
        return count;
    }

    function changeMarketStatus(uint Id, address _currentOwner) public returns (uint) {
        uint indexPos = nfts.length;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                indexPos = i;
            }
        }
        if (nfts[indexPos].owner == _currentOwner) {
            bool newStatus = !nfts[indexPos].onMarket;
            if (newStatus == true) {
                _transfer(msg.sender, address(this), Id);
            }
            else {
                _transfer(address(this), _currentOwner, Id);
            }
            nfts[indexPos].onMarket = newStatus;
        }
        return Id;
    }

    function transfer(address _newOwner, uint Id, address _currentOwner) external {
        uint indexPos = nfts.length;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                indexPos = i;
            }
        }
        if (nfts[indexPos].owner == _currentOwner) {
            nfts[indexPos].owner = _newOwner;
            nfts[indexPos].onMarket = false;
            _transfer(address(this), msg.sender, Id);
        }
    }

    function changePrice(uint Id, uint newPrice, address _currentOwner) public returns (uint) {
        uint indexPos = nfts.length;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                indexPos = i;
            }
        }
        if (nfts[indexPos].owner == _currentOwner) {
            nfts[indexPos].price = newPrice;
        }
        return newPrice;
    }

    function rateNFT(uint Id, uint newRating) public returns (uint) {
        uint indexPos = nfts.length;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                indexPos = i;
            }
        }
        uint currentRating = nfts[indexPos].rating;
        uint currentRaters = nfts[indexPos].raters;
        nfts[indexPos].rating = ((currentRating * currentRaters) + newRating) / (currentRaters + 1);
        nfts[indexPos].raters = currentRaters + 1;
        return newRating;
    }

    function changeVerify(uint Id, uint newVerify) public returns (uint) {
        uint indexPos = nfts.length;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                indexPos = i;
            }
        }
        nfts[indexPos].verify = newVerify;
        return newVerify;
    }

    function changeShow(uint Id) public returns (uint) {
        uint indexPos = nfts.length;
        for (uint i = 0; i < nfts.length; ++i) {
            if (nfts[i].ID == Id) {
                indexPos = i;
            }
        }
        nfts[indexPos].show = !nfts[indexPos].show;
        return Id;
    }
}