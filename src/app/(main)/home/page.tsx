'use client'

import React from 'react'

const fakeStats = {
    totalBalance: 12500000,
    totalSpentThisWeek: 3200000,
    totalDeposit: 8000000,
    totalWithdrawn: 2000000,
}

const fakeTransactions = [
    { id: 1, type: 'Nạp tiền', amount: 2000000, date: '2025-07-10', note: 'Lương tháng 7' },
    { id: 2, type: 'Chi tiêu', amount: 500000, date: '2025-07-11', note: 'Ăn uống' },
    { id: 3, type: 'Chi tiêu', amount: 1200000, date: '2025-07-11', note: 'Mua sắm' },
    { id: 4, type: 'Rút tiền', amount: 1000000, date: '2025-07-12', note: 'ATM' },
]

export default function HomePage() {
    return (
        <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">Tổng quan tài chính</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Số dư còn lại" amount={fakeStats.totalBalance} color="green" />
                <StatCard title="Tiêu trong tuần" amount={fakeStats.totalSpentThisWeek} color="red" />
                <StatCard title="Đã nạp" amount={fakeStats.totalDeposit} color="blue" />
                <StatCard title="Đã rút" amount={fakeStats.totalWithdrawn} color="yellow" />
            </div>

            {/* Transaction history */}
            <h2 className="text-2xl font-semibold mb-4">Lịch sử thu chi gần đây</h2>
            <div className="bg-white shadow p-4 rounded">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Ngày</th>
                            <th>Loại</th>
                            <th>Số tiền</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fakeTransactions.map((t) => (
                            <tr key={t.id} className="border-b">
                                <td className="py-2">{t.date}</td>
                                <td>{t.type}</td>
                                <td className="text-right text-blue-600">
                                    {new Intl.NumberFormat('vi-VN').format(t.amount)} đ
                                </td>
                                <td>{t.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function StatCard({ title, amount, color }: { title: string; amount: number; color: string }) {
    const colorMap: Record<string, string> = {
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-700',
        blue: 'bg-blue-100 text-blue-700',
        yellow: 'bg-yellow-100 text-yellow-700',
    }

    return (
        <div className={`p-4 rounded shadow ${colorMap[color]}`}>
            <h3 className="text-md font-semibold mb-2">{title}</h3>
            <p className="text-2xl font-bold">{amount.toLocaleString()} đ</p>
        </div>
    )
}
