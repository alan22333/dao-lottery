// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {

    mapping(address => bool) public isMinner;

    modifier onlyMinner() {
        require(isMinner[msg.sender], "Only minner can call this function");
        _;
    }
    constructor() ERC20("RewardToken", "RWD") {
        // owner is minner
        isMinner[msg.sender] = true;
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyMinner {
        _mint(to, amount);
    }

    function setMinner(address _addr,bool _isMinner)external onlyOwner{
        isMinner[_addr] = _isMinner;
    }
}