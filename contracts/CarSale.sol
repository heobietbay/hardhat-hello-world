// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// This example shows a smart contract that allows Alice to sell her car to Bob in exchange for cryptocurrency
contract CarSale {
    address payable public alice;
    address payable public bob;
    uint public price;
    bool public carTransferred;
    
    constructor(address payable _bob) {
        alice = payable(msg.sender);
        bob = _bob;
        price = 1;
        carTransferred = false;
    }

    error OnlyBobCanBuy();

    modifier onlyBobBuy() {
        if(msg.sender != bob) {
            revert OnlyBobCanBuy();
        }
        _;
    }
    
    function buyCar() onlyBobBuy public payable {
        require(msg.value == price, "Insufficient funds");
        require(!carTransferred, "Car already transferred");
        alice.transfer(msg.value);
        carTransferred = true;
    }
    
    function cancelSale() public {
        require(msg.sender == alice, "Unauthorized");
        require(!carTransferred, "Car already transferred");
        selfdestruct(alice);
    }
}
