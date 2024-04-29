require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
  localhost: {
    url: "http://127.0.0.1:8545"
  },
  customendpoint:{
    url: "https://skilled-soft-smoke.matic-amoy.quiknode.pro/958687e1f54ed1e8354d05506f19590618a04727/",
    accounts: ["e79f0aa02913d17e41d83b393534e0dd7ab24cd98851a51ec49ce57a04a3148b"]
  }
}
};
