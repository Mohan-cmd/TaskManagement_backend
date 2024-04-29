
// const {ethers} = require("ethers");
// const myTokenABI= require("../artifacts/contracts/OwnToken.sol/OwnToken.json");

// async function main(){
    
//     //connect to the Ethereum network
//     const provider = new ethers.providers.JsonRpcProvider("https://skilled-soft-smoke.matic-amoy.quiknode.pro/958687e1f54ed1e8354d05506f19590618a04727/");
//     const signer = provider.getSigner();
    
    
// }

const { ethers } = require("hardhat");
const tokenABI = require('../artifacts/contracts/Token.sol/Token.json'); // Load ERC20 token ABI

async function main() {
    // Get signer object
    const sender = '0x13D464B7373AECDAB08C3787e54Df1820F31EEd8';

    // Load ERC20 token contract
    const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // ERC20 token contract address
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI.abi, sender);

    // Set sender and receiver addresses
    const receiverAddress = '0x3554177f03cBCB11be48610D654e575E697bD054'; // Ethereum address of the receiver
    console.log('amount is notparsed: ')
    // Set token amount to transfer (in wei)
    const amount = ethers.parseEther('12000'); // Convert token amount to wei
    console.log('amount is parsed: '+amount)
    // Call the transfer function to transfer tokens
    const tx = await tokenContract.transfer(receiverAddress, amount);
    
    await tx.wait();

    console.log("Tokens transferred successfully.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

