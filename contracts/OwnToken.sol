// pragma solidity >0.7.0 <=0.9.0;

// import "./Token.sol"; // Import the TASKTOKEN contract

// contract TokenInteractionContract {
//     Token public taskToken;

//     constructor(address _taskTokenAddress) {
//         taskToken = Token(_taskTokenAddress);
//     }

//    function transferTokens(address _from, address _to, uint256 _amount) external {
//         // Approve the contract to spend tokens on behalf of the token holder
//         taskToken.approve(address(this), _amount);
        
//         // Transfer tokens from _from to _to
//         taskToken.transferFrom(_from, _to, _amount);
//     }
// }
