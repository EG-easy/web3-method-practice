pragma solidity ^0.4.24;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyToken is StandardToken {
  string public name = "";
  string public symbol = "";
  uint public decimals = ;

   constructor(uint initialSupply) public {
   	totalSupply_ = initialSupply;
    balances[msg.sender] = initialSupply;
  }
}