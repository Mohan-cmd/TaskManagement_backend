

pragma solidity >0.7.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
      address public owner;
      uint256 public maxSupply;
      //uint256 private totalSupply_;
      uint256 private initialSupply;
         constructor(string memory name_, string memory symbol_) ERC20("TASKTOK","TTKK"){
            //_mint(msg.sender,100000000 * 10 ** decimals());
            initialSupply=1000000 * 10 ** decimals();
            maxSupply= 10000000 * 10 ** decimals();
             owner = msg.sender;
            //maxSupply = _maxSupply;
            //totalSupply_ = initialSupply * (1 ** uint256(decimals()));
            _mint(owner, initialSupply);
         }
 function mint(address account, uint256 amount) public {
   require(msg.sender == owner, "Only owner can mint tokens");
   require(totalSupply() + amount <= maxSupply, "Exceeds maximum supply");
    _mint(account, amount);
}
        
}