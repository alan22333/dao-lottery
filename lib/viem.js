// lib/viem.js
import { createPublicClient, createWalletClient, custom, defineChain, http } from 'viem'
import { hardhat, sepolia } from 'viem/chains'

import govTokenAbi from '@/abis/GovToken.json'
import rewardTokenAbi from '@/abis/RewardToken.json'
import governanceAbi from '@/abis/Governance.json'
import lotteryAbi from '@/abis/Lottery.json'

// ✅ 合约地址（部署后替换成你的地址）
export const CONTRACTS = {
  govToken: process.env.NEXT_PUBLIC_GOV_TOKEN_ADDRESS,
  rewardToken: process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS,
  governance: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS,
  lottery: process.env.NEXT_PUBLIC_LOTTERY_ADDRESS,
}

// ✅ 只读 client
export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
})

// ✅ 写入 client（使用 MetaMask）
export function getWalletClient() {
  if (!window.ethereum) throw new Error('MetaMask not installed')
  return createWalletClient({
    chain: hardhat,
    transport: custom(window.ethereum),
  })
}

// ✅ 获取当前地址（连接钱包）
export async function connectWallet() {
  if (!window.ethereum) throw new Error('MetaMask not installed')
  const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return address
}

// ================= 合约方法封装 ===================

// 获取 GOV 余额
export async function getGovBalance(address) {
  return await publicClient.readContract({
    address: CONTRACTS.govToken,
    abi: govTokenAbi,
    functionName: 'balanceOf',
    args: [address],
  })
}

// 领取 GOV Token
export async function claimGovToken(address) {
  const client = getWalletClient()
  return await client.writeContract({
    address: CONTRACTS.govToken,
    abi: govTokenAbi,
    functionName: 'claim',
    account: address,
  })
}

// 检查是否领取过
export async function hasClaimed(address) {
    return await publicClient.readContract({
      address: CONTRACTS.govToken,
      abi: govTokenAbi,
      functionName: 'hasClaimed',
      args: [address],
    })
}

// 创建提案
export async function createProposal(address, title, description) {
  const client = getWalletClient()
  return await client.writeContract({
    address: CONTRACTS.governance,
    abi: governanceAbi,
    functionName: 'createProposal',
    args: [title, description],
    account: address,
  })
}

// 给提案投票
export async function voteProposal(address, proposalId, support) {
  const client = getWalletClient()
  return await client.writeContract({
    address: CONTRACTS.governance,
    abi: governanceAbi,
    functionName: 'vote',
    args: [proposalId, support],
    account: address,
  })
}

// 抽奖（管理员）
export async function drawLottery(address, proposalId) {
  const client = getWalletClient()
  return await client.writeContract({
    address: CONTRACTS.lottery,
    abi: lotteryAbi,
    functionName: 'drawLottery',
    args: [proposalId],
    account: address,
  })
}

// 领奖
export async function claimReward(address, proposalId) {
  const client = getWalletClient()
  return await client.writeContract({
    address: CONTRACTS.lottery,
    abi: lotteryAbi,
    functionName: 'claimReward',
    args: [proposalId],
    account: address,
  })
}
