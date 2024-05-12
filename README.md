# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


TokenInteractonContract
User addresss are: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0x70997970C51812dc3A010C7d01b50e0d17dc79C8  0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
task token address is : 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract address are : 0x5FbDB2315678afecb367f032d93F642f64180aa30xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
User1BalanceBefore: 100000000000000000000
User2BalanceBefore: 0
User1BalanceAfter: 50000000000000000000
User2BalanceAfter :50000000000000000000


deployed Token contract is : 0xd52f355F1591b17876Dd3C86fd3205ee7bDaD6b6
deployed Task contract is : 0x9d6dC583d8492D51b637e8C915797494521cEaa9

deployed Token contract is : 0xFb6685D8f902A6165b8AE637e2De8B49500649b6
deployed Task contract is : 0xD2b261b47eF7b0B11a8B3ff4Dcf47c16bFE8ef5d

//CreateManager check employee registered , verify is admin doing transaction
//CreateTeam verify emp and mgr registered before

//npx hardhat run scripts/deployNew.js --network customendpoint 