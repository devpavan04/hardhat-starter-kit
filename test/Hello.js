const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);
use(require("chai-as-promised")).should();

describe("Hello", () => {
  let hello, acc1, acc2, acc3;

  beforeEach(async () => {
    [acc1, acc2, acc3] = await ethers.getSigners();
  });

  describe("on deployment", async () => {
    it("reads deployed hello message", async () => {
      const Hello = await ethers.getContractFactory("Hello");
      hello = await Hello.deploy("Hello, World!");

      await hello.deployed();

      expect(await hello.message()).to.equal("Hello, World!");
    });
  });

  describe("functionalities", async () => {
    it("setHelloMessage()", async () => {
      await hello.setHelloMessage("Hello, Blockchain Community!");

      expect(await hello.message()).to.equal("Hello, Blockchain Community!");
    });

    it("getHelloMessage()", async () => {
      expect(await hello.getHelloMessage()).to.equal("Hello, Blockchain Community!");
    });

    it("deposit()", async () => {
      expect(await hello.contractBalance()).to.equal("0");

      await hello.connect(acc3).deposit({ value: ethers.utils.parseEther("5") });

      expect(await hello.contractBalance()).to.equal("5000000000000000000");

      // await hello.connect(acc2).deposit({ value: ethers.utils.parseEther("5") }).should.be.rejected;
    });
  });
});
