const { expect } = require("chai");
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("CarSale contract", function () {
  it.skip("Deployment should assign bob and alice", async function () {
    const [bob, alice] = await ethers.getSigners();

    const CarSale = await ethers.getContractFactory("CarSale");

    const carSaleInstance = await CarSale.deploy(bob.address);

    console.dir(carSaleInstance);

  });
  it("Should execute an already deployed contract by using a given address", async function() {
   
  // need to do build first: npx hardhat compile
  // then deploy: npx hardhat run --network localhost scripts/deploy.ts


  const [bob, alice] = await ethers.getSigners();
   // will investigate to do using abi later
   // Now, using getContractfactory then attach
   const CarSaleFactory = await ethers.getContractFactory('CarSale');
   const contract = await CarSaleFactory.attach('0xABcB00E7F61aEC1cb256C79401Ab1583cF85Cb88');

   const gasPrice = await CarSaleFactory.signer.getGasPrice();
   console.log(`Current gas price: ${gasPrice}`);

   const estimatedGas = await CarSaleFactory.signer.estimateGas(CarSaleFactory.getDeployTransaction(bob.address));
   console.log(`Estimated gas: ${estimatedGas}`);

   const signerBalance = await CarSaleFactory.signer.getBalance();
   console.log(`signerBalance: ${signerBalance}`);

    // accounts coming from hardhat.config networks.accounts
    const accounts = await ethers.getSigners();

    // now try calling the contract method to get info from them
    for (const account of accounts) {
      console.log(`Account ${account.address}`);
      const bl = await account.getBalance();
      console.log(`balance: ${bl}`);
    }
    //await contract.buyCar({ value: ethers.utils.parseEther("0.01"), gasLimit: 2 });
    await contract.buyCar({ value: 1, gasLimit: 1000000 });
  });
  
})