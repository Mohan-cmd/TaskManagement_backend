const {ethers} = require('hardhat');
//const fs = require('fs ');

async function main(){
    //const myTokenABI= require("../artifacts/contracts/Token.sol/Token.json");
    
    
    // const contractJSON = JSON.parse(fs.readFileSync("../artifacts/contracts/Token.sol/Token.json"))
    // const abi = contractJSON.abi;
    // const bytecode = contractJSON.bytecode;
    // const [deployer] = await ethers.getSigners();
    // const contractFactory = new ethers.contractFactory(abi,bytecode,deployer);
    // const contract = await contractFactory.deploy();
    //  console.log('Contract address is : '+contract.target);

    const name = "TaskToken";
    const symbol = "TTK";

     const Token = await ethers.getContractFactory("Token");
     const token = await Token.deploy(name,symbol);
     console.log('deployed Token contract is : '+token.target);

    const Task = await ethers.getContractFactory("NewTask");
    const task = await Task.deploy(token.target);
    console.log('deployed Task contract is : '+task.target);
}

main().then(()=>process.exit(0))
.catch((error)=>{ 
    console.error(error);
    process.exit(1);
})