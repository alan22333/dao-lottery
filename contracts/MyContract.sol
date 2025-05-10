// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyContract {
    uint public num = 10;

    function setNum(uint _num) public {
        num = _num;
    }

}