export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm text-center py-6 mt-10">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} DAO 抽奖系统. All rights reserved.</p>
        <p className="mt-1">
          由 ❤️ 构建，使用 Next.js + Solidity + viem 技术栈
        </p>
      </div>
    </footer>
  )
}
