require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
     solidity: "0.8.19",
     defaultNetwork: "rospten",
     networks: {
        hardhat: {},
        rospten: { 
            url: "https://eth-goerli.g.alchemy.com/v2/822oQpZ5OrMUvLi2iGTTHHCuL0yABhe_",
            accounts: [`${process.env.PRIVATE_KEY}`],
           },
       },
  };