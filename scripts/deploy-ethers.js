require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// 合约ABI和字节码
const MyContractABI = require('../artifacts/contracts/MyContract.sol/MyContract.json').abi;
const MyContractBytecode = require('../artifacts/contracts/MyContract.sol/MyContract.json').bytecode;

// 网络配置
const RPC_URL = process.env.ASSET_HUB_RPC_URL || 'http://127.0.0.1:9944';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error('请在.env文件中设置PRIVATE_KEY环境变量');
}

if (!process.env.ASSET_HUB_RPC_URL) {
  throw new Error('请在.env文件中设置ASSET_HUB_RPC_URL环境变量');
}

async function main() {
  try {
    // 连接到网络
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log('部署账户地址:', wallet.address);

    // 检查网络连接
    try {
      await provider.getNetwork();
    } catch (error) {
      throw new Error('无法连接到Asset Hub网络，请检查RPC URL配置和网络状态');
    }

    // 部署 MyContract
    console.log('正在部署 MyContract...');
    const MyContractFactory = new ethers.ContractFactory(MyContractABI, MyContractBytecode, wallet);
    const myContract = await MyContractFactory.deploy({
      gasLimit: 20000000,
      gasPrice: 10000000000,
      nonce: await wallet.getNonce()
    });
    await myContract.waitForDeployment();
    const myContractAddress = await myContract.getAddress();
    console.log('MyContract 部署地址:', myContractAddress);

    // 保存部署信息
    const deployInfo = {
      MyContract: myContractAddress
    };

    const configPath = path.join(__dirname, '../app/config.json');
    fs.writeFileSync(configPath, JSON.stringify(deployInfo, null, 2));
    console.log('部署信息已保存到:', configPath);

  } catch (error) {
    console.error('部署过程中发生错误:', error);
    process.exitCode = 1;
  }
}

main();