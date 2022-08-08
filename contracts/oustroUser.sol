// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


contract oustroUser {
    // Store all token URIs for easy retreival
    Users [] private userlist;

    struct Users {
        address userAddress;
        string username;
        string displayPic;
        string bio;
        bool verify;
    }

    function createUser(address newAddress, string memory username, string memory profile) public returns (uint) {
        // Mint NFT
        string memory newBio = "I'm new here!";
        userlist.push(
            Users(
                newAddress,
                username,
                profile,
                newBio,
                false
            )
        );
        return userlist.length;
    }

    function getUserByAddress(address _owner) external view returns (Users memory) {
        for (uint i = 0; i < userlist.length; ++i) {
            if (_owner == userlist[i].userAddress) {
                return userlist[i];
            }
        }
    }

    function getAllUsers() external view returns (Users [] memory) {
        return userlist;
    }

    function verifyUser(address _owner) public returns (uint) {
        for (uint i = 0; i < userlist.length; ++i) {
            if (_owner == userlist[i].userAddress) {
                userlist[i].verify = !userlist[i].verify; 
            }
        }
        return userlist.length;
    }

    function changeUsername(address _owner, string memory newName) public returns (uint) {
        for (uint i = 0; i < userlist.length; ++i) {
            if (_owner == userlist[i].userAddress) {
                userlist[i].username = newName; 
            }
        }
        return userlist.length;
    }

    function changeBio(address _owner, string memory updatedBio) public returns (uint) {
        for (uint i = 0; i < userlist.length; ++i) {
            if (_owner == userlist[i].userAddress) {
                userlist[i].bio = updatedBio; 
            }
        }
        return userlist.length;
    }

    function changeDP(address _owner, string memory newDP) public returns (uint) {
        for (uint i = 0; i < userlist.length; ++i) {
            if (_owner == userlist[i].userAddress) {
                userlist[i].displayPic = newDP; 
            }
        }
        return userlist.length;
    }
}