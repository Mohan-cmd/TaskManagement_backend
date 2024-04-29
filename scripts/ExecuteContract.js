const { ethers } = require("hardhat");

async function main() {
  // Get signer objects for sending and receiving accounts
  const [deployer, receiver] = await ethers.getSigners();

  // Replace with your token contract address (if applicable)
  const tokenAddress = "0x..."; // Replace with actual address

  // Get ERC20 token contract instance (if applicable)
  const token = await ethers.getContractAt(tokenAddress, ERC20_ABI); // Replace with your token's ABI

  // Account A approves Contract to spend tokens on its behalf (if applicable)
  const approvalTx = await token.connect(deployer).approve(tokenAddress, amount); // Replace with actual amount
  await approvalTx.wait();

  // Transfer tokens from account A to account B
  const transferTx = await token.connect(deployer).transferFrom(deployer.address, receiver.address, amount);
  await transferTx.wait();

  console.log("Tokens transferred successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
