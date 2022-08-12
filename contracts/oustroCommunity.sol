// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


contract oustroCommunity {
    Community [] private communitylist;

    struct Community {
        address creator;
        string cname;
        string cPic;
        string bio;
        uint contributors;
        bool allow;
    }

    function createCommunity(address newAddress, string memory name, string memory profile, string memory bio) public returns (uint) {
        // Mint NFT
        communitylist.push(
            Community(
                newAddress,
                name,
                profile,
                bio,
                0,
                true
            )
        );
        return communitylist.length;
    }

    function addContributor(string memory name) public returns (uint) {
        for (uint i = 0; i < communitylist.length; ++i) {
            if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(communitylist[i].cname))) {
                communitylist[i].contributors += 1;
            }
        }
        return communitylist.length;
    }

    function delist(string memory name) public returns (uint) {
        for (uint i = 0; i < communitylist.length; ++i) {
            if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(communitylist[i].cname))) {
                communitylist[i].allow = !communitylist[i].allow;
            }
        }
        return communitylist.length;
    }

    function getCommByName(string memory name) external view returns (Community memory) {
        for (uint i = 0; i < communitylist.length; ++i) {
            if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(communitylist[i].cname))) {
                return communitylist[i];
            }
        }
    }

    function getAllCommunities() external view returns (Community [] memory) {
        return communitylist;
    }
}