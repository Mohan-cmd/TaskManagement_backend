

pragma solidity >0.7.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
         constructor() ERC20("TASKTOK","TTT"){
            _mint(msg.sender,100000000 * 10 ** decimals());
         }
 function mint(address account, uint256 amount) public {
    _mint(account, amount);
}
        
}