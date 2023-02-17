const { expect } = require("chai");
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Token contract", function () {
  it.skip("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
  it.skip("Should execute an already deployed token by using a given address", async function() {
    /*
    const tokenCompiledInfo = require("../artifacts/contracts/Token.sol/Token.json");

    let contract = new ethers.Contract("0x1C3fDA9aBA84C3bED5c987A9a65dC4991303f539", 
    tokenCompiledInfo.abi, 
    ethers.getDefaultProvider());

    console.dir(contract);
    */


  // need to do build first: npx hardhat compile
  // then deploy: npx hardhat run --network localhost scripts/deploy.ts


   // will investigate to do using abi later
   // Now, using getContractfactory then attach
   const TokenFactory = await ethers.getContractFactory('Token');
   const tokenContract = await TokenFactory.attach('0x1C3fDA9aBA84C3bED5c987A9a65dC4991303f539');

    // accounts coming from hardhat.config networks.accounts
    const accounts = await ethers.getSigners();

    // now try calling the contract method to get info from them
    for (const account of accounts) {
      console.log(`Account ${account.address}`);
      const balance = await tokenContract.balanceOf(account.address);
      console.log(`balance: ${balance}`);
    }
    await tokenContract.transfer(accounts[1].address, 10);
    const updateAdd2Bal = await tokenContract.balanceOf(accounts[1].address);
    console.log('',updateAdd2Bal);
  });

  // Skip deployment for now
  it.skip("Should transfer tokens between accounts", async function () {

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    console.log(hardhatToken.address);

    // accounts coming from hardhat.config networks.accounts
    const accounts = await ethers.getSigners();

    // or can do this
    // await ethers.getSigner('0xB4b6734Bb3eFAcF7C587B5Ce08C467f4c9427B49');

    for (const account of accounts) {
      console.log(account.address);
    }

    const initialBalance1 = await hardhatToken.balanceOf(accounts[0].address);
    const initialBalance2 = await hardhatToken.balanceOf(accounts[1].address);

    console.log(initialBalance1);
    console.log(initialBalance2);

    // Transfer 10 tokens from owner to addr1
    await hardhatToken.transfer(accounts[1].address, 10);
    const updateAdd2Bal = await hardhatToken.balanceOf(accounts[1].address);
    console.log('',updateAdd2Bal);
    console.log('initialBalance2.add(BigNumber.from(10))', initialBalance2.add(BigNumber.from(10)))
    expect(updateAdd2Bal).to.equal(initialBalance2.add(BigNumber.from(10)));

    // Transfer 50 tokens from addr1 to addr2 
    // (connect should use a SignerInstance, in this case accounts[0] instead of account[0].address)
    await hardhatToken.connect(accounts[0]).transfer(accounts[1].address, 50);
    expect(await hardhatToken.balanceOf(accounts[1].address)).to.equal(initialBalance2.add(BigNumber.from(60)));
  });
})