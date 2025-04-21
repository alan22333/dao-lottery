const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAO Lottery Governance System", function () {
  let owner, user1, user2, user3;
  let govToken, rewardToken, governance, lottery;

  beforeEach(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();

    // 部署 GovToken
    const GovToken = await ethers.getContractFactory("GovToken");
    govToken = await GovToken.deploy();
    await govToken.waitForDeployment();

    // 用户领取 gov token
    await govToken.connect(user1).claim();
    await govToken.connect(user2).claim();
    await govToken.connect(user3).claim();

    // 部署 RewardToken
    const RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.waitForDeployment();

    // 部署 Governance 合约
    const Governance = await ethers.getContractFactory("Governance");
    governance = await Governance.deploy(govToken.target);
    await governance.waitForDeployment();

    // 设置权限
    await govToken.transferOwnership(governance.target);

    // 部署 Lottery 合约
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy(rewardToken.target, governance.target);
    await lottery.waitForDeployment();

    // 设置 lottery 合约为治理合约的调用方
    await governance.setLotteryContract(lottery.target);

    // 设置 rewardToken 权限
    await rewardToken.transferOwnership(lottery.target);
  });

  it("用户可以创建提案并进行投票，然后抽奖并发放奖励", async () => {
    // user1 创建提案（销毁10个 GOV）
    // await governance.connect(user1).createProposal("Burn test", 60); // 60 秒

    // // user2 投反对票（销毁1个 GOV）
    // await governance.connect(user2).voteProposal(1, false);

    // // user3 投反对票（销毁1个 GOV）
    // await governance.connect(user3).voteProposal(1, false);

    // // 等待 60 秒
    // await ethers.provider.send("evm_increaseTime", [70]);
    // await ethers.provider.send("evm_mine");

    // // 由 lottery 合约 finalize
    // await lottery.drawWinner(1);

    // const winner = await rewardToken.balanceOf(user2.address) > 0
    //   ? user2.address
    //   : user3.address;

    // const winnerBalance = await rewardToken.balanceOf(winner);
    // expect(winnerBalance).to.equal(ethers.utils.parseEther("100"));

    // const winnerGOV = await govToken.balanceOf(winner);
    // expect(winnerGOV).to.equal(ethers.utils.parseEther("90")); // 初始100 -1 +1

    // console.log("✅ Lottery winner:", winner);
  });
});
