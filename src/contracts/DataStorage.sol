// SPDX-License-Identifier: MIT
pragma solidity <=0.8.21;

contract DataStorage {
    address public owner;
    mapping(address => string) public userToData;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function storeData(string memory data) public {
        userToData[msg.sender] = data;
    }
}
