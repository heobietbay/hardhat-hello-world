import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config(); 

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [`0x${process.env.ACCOUNT1_PRIVATEKEY}`,`0x${process.env.ACCOUNT2_PRIVATEKEY}`],
    }

  },
};

export default config;
