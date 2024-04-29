// const {ethers} = require("hardhat");
// const {expect} = require("chai");
// //const provider = new ethers.provider.JsonRpcProvider("https://skilled-soft-smoke.matic-amoy.quiknode.pro/958687e1f54ed1e8354d05506f19590618a04727/");

// //const contractAddress= ""

// describe('TokenInteractonContract', function(){
//     let user1;
//     let user2;
//     let owner; 


// beforeEach(async function(){
   
//     [owner,user1,user2] = await ethers.getSigners();
//     console.log('User addresss are: '+owner.address +' '+user1.address+' '+' '+user2.address)
//    // taskTokenAddress='0x995c3b88Dbbad735d8443b653266bC4687C97c24';
//     const Token =await ethers.getContractFactory('Token');
//     //console.log('Token obj is '+ JSON.stringify(Token));
//     taskToken = await Token.deploy();
//     //await taskToken.deployed();
//     //console.log('taskToken depl is: '+JSON.stringify(taskToken));
//     console.log('task token address is : '+await taskToken.target)

//     const NewTask = await ethers.getContractFactory('NewTask');
//     taskContract = await NewTask.deploy(await taskToken.target);
//     //await taskToken.deployed();

//     console.log("Contract address are : " + await taskToken.target + await taskContract.target);

// })

// it('should trannsfer tokens from one address to another', async function(){
//      // Transfer some tokens to user1
//      await taskToken.transfer(user1.address, ethers.parseEther("100"));

//      // Check user1 balance before transfer
//      const user1BalanceBefore = await taskToken.balanceOf(user1.address);
//      console.log('User1BalanceBefore: '+user1BalanceBefore)
//      expect(user1BalanceBefore).to.equal(ethers.parseEther("100"));
 
//      // Check user2 balance before transfer
//      const user2BalanceBefore = await taskToken.balanceOf(user2.address);
//      console.log('User2BalanceBefore: '+user2BalanceBefore)
//      expect(user2BalanceBefore).to.equal(0);
 
//      // Approve NewTask contract to spend tokens on behalf of user1
//      await taskToken.connect(user1).approve(taskContract.target, ethers.parseEther("50"));
 
//      // Transfer tokens from user1 to user2 using NewTask contract
//      await taskContract.connect(user1).transferTokens(user1.address, user2.address, ethers.parseEther("50"));
 
//      // Check user1 balance after transfer
//      const user1BalanceAfter = await taskToken.balanceOf(user1.address);
//      console.log('User1BalanceAfter: '+user1BalanceAfter)
//      expect(user1BalanceAfter).to.equal(ethers.parseEther("50"));
 
//      // Check user2 balance after transfer
//      const user2BalanceAfter = await taskToken.balanceOf(user2.address);
//      console.log('User2BalanceAfter :'+user2BalanceAfter);
//      expect(user2BalanceAfter).to.equal(ethers.parseEther("50"));
//    });
// })


