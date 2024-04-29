const { ethers } = require("ethers");
    const fs= require("fs");

async function main(){
    
   // const myContract = await ethers.getContractFactory("OwnToken");
  
    
    const myTokenABI= require("../artifacts/contracts/Token.sol/Token.json");
    //console.log("Hello",ethers)
    const provider = new ethers.JsonRpcProvider("https://skilled-soft-smoke.matic-amoy.quiknode.pro/958687e1f54ed1e8354d05506f19590618a04727/");
    const abi = myTokenABI.abi;
   // const {OwnToken} = require(myTokenABI.abi);
   
    const bytecode = myTokenABI.bytecode;
   // console.log("ByteCode is : "+bytecode);
   // const privateKey = "e79f0aa02913d17e41d83b393534e0dd7ab24cd98851a51ec49ce57a04a3148b";
   // const wallet = new ethers.Wallet(privateKey, provider);
   // const signer = await provider.getSigner();
   // const factory = new ethers.ContractFactory(abi,bytecode,wallet);

   // const contract = await factory.deploy("TASTOK","TT",2,100000000);
   // await contract.deployed();
  // console.log(contract);
   const contractAddress = "0x995c3b88Dbbad735d8443b653266bC4687C97c24";
    console.log("MyContract is deployed to: ",contractAddress);
    const contractInstance = new ethers.Contract(contractAddress, abi, provider);
    //contractInstance= 
   // console.log("Contract Instance is: "+ contractInstance);
console.log("Contract Instance is: "+ JSON.stringify(contractInstance))
 const balanceBefore = await contractInstance.name();
    console.log("Token Details:", await contractInstance.name() + await contractInstance.symbol()+await contractInstance.decimals()+await contractInstance.totalSupply());

}

main()
.then(()=>process.exit(0))
.catch(error =>{
    console.log(error);
    process.exit(1);
})