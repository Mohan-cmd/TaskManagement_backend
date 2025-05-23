require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
  localhost: {
    url: "http://127.0.0.1:8545"
  },
  customendpoint:{
    url: "https://side-crimson-sun.ethereum-sepolia.quiknode.pro/02645e9c5f2a1bb42d6937d0648b30c1c95af5be/",
    accounts: ["e79f0aa02913d17e41d83b393534e0dd7ab24cd98851a51ec49ce57a04a3148b"]
  }
}
};
