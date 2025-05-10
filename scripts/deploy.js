const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署合约的账户地址:", deployer.address);

  // 部署 RewardToken
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.waitForDeployment();
  console.log("RewardToken 部署地址:", await rewardToken.getAddress());

  // 部署 GovToken
  const GovToken = await hre.ethers.getContractFactory("GovToken");
  const govToken = await GovToken.deploy();
  await govToken.waitForDeployment();
  console.log("GovToken 部署地址:", await govToken.getAddress());

  // 部署 Governance
  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(
    await govToken.getAddress(),
    await rewardToken.getAddress()
  );
  await governance.waitForDeployment();
  console.log("Governance 部署地址:", await governance.getAddress());

  // 部署 Lottery
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(
    await govToken.getAddress(),
    await governance.getAddress()
  );
  await lottery.waitForDeployment();
  console.log("Lottery 部署地址:", await lottery.getAddress());

  // 设置权限关系
  // 将 Governance 合约设置为 RewardToken 的所有者
  const rewardTokenOwnerTx = await rewardToken.transferOwnership(await governance.getAddress());
  await rewardTokenOwnerTx.wait();
  console.log("已将 Governance 设置为 RewardToken 的所有者");

  // 将 Lottery 合约设置为 GovToken 的铸币者
  const setMinterTx = await govToken.setMinter(await lottery.getAddress());
  await setMinterTx.wait();
  console.log("已将 Lottery 设置为 GovToken 的铸币者");

  // 保存部署信息到配置文件
  const fs = require('fs');
  const deployInfo = {
    RewardToken: await rewardToken.getAddress(),
    GovToken: await govToken.getAddress(),
    Governance: await governance.getAddress(),
    Lottery: await lottery.getAddress(),
  };

  fs.writeFileSync(
    'app/config.json',
    JSON.stringify(deployInfo, null, 2)
  );
  console.log("部署信息已保存到 app/config.json");
}

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function test(){
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署合约的账户地址:", deployer.address);

  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy({
    gasLimit: 20000000,
    gasPrice: 10000000000,
    nonce: await deployer.getNonce()
  });
  await myContract.waitForDeployment();
  console.log("MyContract 部署地址:", await myContract.getAddress());

}

test().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});