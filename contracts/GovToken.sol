// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract GovToken is ERC20, Ownable, ERC20Burnable {
    uint256 public constant CLAIM_AMOUNT = 100;

    mapping(address => bool) public hasClaimed;
    mapping(address => bool) public isMinner;

    modifier onlyMinner() {
        require(isMinner[msg.sender], "Not a minner");
        _;
    }

    constructor() ERC20("GovToken", "GOV"){
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyMinner(){
        _mint(to, amount);
    }

    /// @notice 用户一次性领取 GOV 代币
    function claim() external {
        require(!hasClaimed[msg.sender], "Already claimed");
        hasClaimed[msg.sender] = true;
        _mint(msg.sender, CLAIM_AMOUNT);
    }

    function checkClaimed() external view returns(bool){
        return hasClaimed[msg.sender];
    }

    function setMinner(address _addr,bool _isMinner)external onlyOwner(){
        isMinner[_addr] = _isMinner;
    }
}
