'use client'

import { useEffect, useState } from 'react'
import { connectWallet } from '@/lib/viem'

export default function ConnectWallet() {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    // 检查是否已经连接
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) setAddress(accounts[0])
      })

      // 监听账号变化
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        } else {
          setAddress(null)
        }
      })
    }
  }, [])

  const handleConnect = async () => {
    try {
      const addr = await connectWallet()
      setAddress(addr)
    } catch (err) {
      console.error('连接失败:', err)
      alert('连接钱包失败，请确认已安装 MetaMask')
    }
  }

  const shorten = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
    >
      {address ? shorten(address) : '连接钱包'}
    </button>
  )
}
