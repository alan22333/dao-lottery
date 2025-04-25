# 🗳️ DAO Lottery System

A decentralized governance-based lottery system that encourages community participation through voting and token rewards.

![create](https://pic1.imgdb.cn/item/680b1e9d58cb8da5c8ca9f3f.png)
![list](https://pic1.imgdb.cn/item/680b1eec58cb8da5c8caa040.png)
![detail](https://pic1.imgdb.cn/item/680b1f8658cb8da5c8caa3de.png)
![vote](https://pic1.imgdb.cn/item/680b1f9d58cb8da5c8caa4ae.png)
![admin](https://pic1.imgdb.cn/item/680b207658cb8da5c8caa740.png)
![drawWinner](https://pic1.imgdb.cn/item/680b211058cb8da5c8caacfc.png)
![claim](https://pic1.imgdb.cn/item/680b215558cb8da5c8caafbc.png)
![profile](https://pic1.imgdb.cn/item/680b21ca58cb8da5c8cab059.png)

---

## ✨ Features

- ✅ **Proposal Submission** – Any user can create governance proposals
- ✅ **Proposal Voting** – Users can vote using GOV tokens
- ✅ **Random Lottery** – Voters have a chance to win REWARD tokens after a proposal is finalized
- ✅ **Claim Rewards** – Winners can claim their rewards manually
- ✅ **Initial Airdrop** – New users can claim initial GOV tokens
- ✅ **Token Balance View** – Users can check their GOV and REWARD balances

---

## 🧱 Tech Stack

| Technology       | Description                      |
|------------------|----------------------------------|
| **Next.js 14**   | Frontend framework               |
| **Tailwind CSS** | UI and styling                   |
| **Solidity**     | Smart contract programming       |
| **Hardhat**      | Contract development & testing   |
| **Viem**         | Smart contract interaction       |
| **Ethers.js**    | Wallet connection and accounts   |
| **MetaMask**     | Ethereum wallet interface        |

---

## 🧩 Smart Contract Architecture

| Contract Name      | Description                                       |
|--------------------|---------------------------------------------------|
| `GovToken.sol`     | Governance token (GOV), used for voting           |
| `RewardToken.sol`  | Reward token (REWARD), distributed to lottery winners |
| `Governance.sol`   | Handles proposal creation and voting              |
| `Lottery.sol`      | Selects random winner from eligible voters        |

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

### 🔧 Environment Setup

Create a `.env.local` file based on `.env.example` and fill in the required contract addresses:

```env
NEXT_PUBLIC_GOV_TOKEN_ADDRESS="0x.."
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS="0x.."
NEXT_PUBLIC_GOVERNANCE_ADDRESS="0x.."
NEXT_PUBLIC_LOTTERY_ADDRESS="0x.."

NEXT_PUBLIC_ADMIN_ADDRESS="0x.."

NEXT_PUBLIC_CHAIN_ID="31337"
```

### 🧪 Local Development

```bash
npm run dev
```

### 🔨 Deploy Smart Contracts

```bash
npx hardhat compile
npx hardhat deploy --network <your-network>
```

---

## 📁 Project Structure

```
.
├── contracts/         # Solidity smart contracts
├── lib/               # Viem hooks and contract logic
├── components/        # Reusable React components
├── pages/             # Next.js routing structure
├── public/            # Static assets (images, screenshots)
└── styles/            # Global styles (Tailwind CSS)
```

---

## 📸 UI Previews

![create](https://pic1.imgdb.cn/item/680b1e9d58cb8da5c8ca9f3f.png)
![list](https://pic1.imgdb.cn/item/680b1eec58cb8da5c8caa040.png)
![detail](https://pic1.imgdb.cn/item/680b1f8658cb8da5c8caa3de.png)
![vote](https://pic1.imgdb.cn/item/680b1f9d58cb8da5c8caa4ae.png)
![admin](https://pic1.imgdb.cn/item/680b207658cb8da5c8caa740.png)
![drawWinner](https://pic1.imgdb.cn/item/680b211058cb8da5c8caacfc.png)
![claim](https://pic1.imgdb.cn/item/680b215558cb8da5c8caafbc.png)
![profile](https://pic1.imgdb.cn/item/680b21ca58cb8da5c8cab059.png)

---

## 🎯 Future Plans

This project is a minimal viable product (MVP) designed to explore governance + incentive mechanisms. Future improvements may include:

- 🔐 Chainlink VRF integration for verifiable randomness
- ⚙️ Advanced voting strategies
- 🔄 Multi-proposal lottery support
- 📱 Mobile-first responsive optimization

---

## 🧑‍💻 Contribute

> Contributions welcome! Feel free to fork, star ⭐, or open issues/PRs.

---

## 🛡️ License

This project is licensed under the [MIT License].

---