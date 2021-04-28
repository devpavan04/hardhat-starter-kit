// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Hello {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function getHelloMessage() public view returns (string memory) {
        return message;
    }

    function setHelloMessage(string memory _message) public {
        message = _message;
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    function deposit() public payable {
        (bool sent, bytes memory data) =
            address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}
