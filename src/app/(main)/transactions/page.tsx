// app/transactions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const fakeIncomeCategories = ['Lương', 'Thưởng', 'Khác'];
const fakeExpenseCategories = ['Ăn uống', 'Đi lại', 'Mua sắm'];

const fakeData: TransactionItem[] = [
    {
        id: 1,
        type: 'income',
        amount: 5000000,
        reason: 'Lương tháng 7',
        category: 'Lương',
        date: new Date('2025-07-10'),
    },
    {
        id: 2,
        type: 'expense',
        amount: 100000,
        reason: 'Ăn trưa',
        category: 'Ăn uống',
        date: new Date('2025-07-11'),
    },
];

export default function TransactionsPage() {
    const [tab, setTab] = useState<'income' | 'expense'>('income');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [data, setData] = useState(fakeData);
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<number | null>(null);
    const [editItem, setEditItem] = useState<TransactionItem | null>(null);

    // Đặt mặc định ngày đầu và cuối tháng hiện tại
    useEffect(() => {
        const today = new Date();
        setFromDate(format(startOfMonth(today), 'yyyy-MM-dd'));
        setToDate(format(endOfMonth(today), 'yyyy-MM-dd'));
    }, []);

    const filteredData = data
        .filter((item) => item.type === tab)
        .filter((item) => {
            const itemDate = item.date.toISOString().split('T')[0];
            return (
                (!fromDate || itemDate >= fromDate) &&
                (!toDate || itemDate <= toDate) &&
                (!selectedCategory || item.category === selectedCategory)
            );
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    const handleEdit = (item: TransactionItem) => {
        setEditItem(item);
        setOpenForm(true);
    };

    const handleDelete = (id: number) => {
        setData((prev) => prev.filter((i) => i.id !== id));
        setOpenDeleteConfirm(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Quản lý giao dịch</h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setTab('income')}
                    className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${tab === 'income'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                        }`}
                >
                    Tiền thu
                </button>
                <button
                    onClick={() => setTab('expense')}
                    className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${tab === 'expense'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                        }`}
                >
                    Tiền chi
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full p-2 border border-gray-800 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">-- Tất cả --</option>
                            {(tab === 'income' ? fakeIncomeCategories : fakeExpenseCategories).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setEditItem(null);
                                setOpenForm(true);
                            }}
                            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <Plus size={16} className="mr-2" />
                            Tạo mới
                        </button>
                    </div>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {filteredData.length === 0 ? (
                    <p className="p-4 text-gray-500 text-center">Không có giao dịch nào</p>
                ) : (
                    filteredData.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <div>
                                <div className="font-medium text-gray-800">{item.reason}</div>
                                <div className="text-sm text-gray-500">
                                    {item.category} – {format(item.date, 'dd/MM/yyyy')}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`font-medium ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {new Intl.NumberFormat('vi-VN').format(item.amount)} đ
                                </div>
                                <button title="Sửa" onClick={() => handleEdit(item)} className="text-gray-500 hover:text-indigo-600">
                                    <Edit size={16} />
                                </button>
                                <button
                                    title="Xóa"
                                    onClick={() => setOpenDeleteConfirm(item.id)}
                                    className="text-gray-500 hover:text-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal for Transaction Form */}
            {openForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setOpenForm(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {editItem ? (tab === 'income' ? 'Sửa giao dịch thu' : 'Sửa giao dịch chi') : (tab === 'income' ? 'Thêm giao dịch thu' : 'Thêm giao dịch chi')}
                        </h2>
                        <TransactionForm
                            type={tab}
                            editItem={editItem}
                            onCancel={() => setOpenForm(false)}
                            onSave={(newItem) => {
                                if (editItem) {
                                    setData((prev) => prev.map((item) => (item.id === newItem.id ? newItem : item)));
                                } else {
                                    setData([...data, newItem]);
                                }
                                setOpenForm(false);
                                setEditItem(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {openDeleteConfirm !== null && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setOpenDeleteConfirm(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Xác nhận xóa</h2>
                        <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa giao dịch này?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDelete(openDeleteConfirm)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                                Xác nhận
                            </button>
                            <button
                                onClick={() => setOpenDeleteConfirm(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

type TransactionItem = {
    id: number;
    type: 'income' | 'expense';
    amount: number;
    reason: string;
    category: string;
    date: Date;
};

function TransactionForm({
    type,
    editItem,
    onSave,
    onCancel,
}: {
    type: 'income' | 'expense';
    editItem?: TransactionItem | null;
    onSave: (item: TransactionItem) => void;
    onCancel: () => void;
}) {
    const [amount, setAmount] = useState(editItem ? editItem.amount.toString() : '');
    const [reason, setReason] = useState(editItem ? editItem.reason : '');
    const [category, setCategory] = useState(editItem ? editItem.category : '');
    const [date, setDate] = useState(editItem ? editItem.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);

    function handleSubmit() {
        if (!amount || !reason || !category || !date) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        onSave({
            id: editItem ? editItem.id : Math.random(),
            type,
            amount: parseInt(amount),
            reason,
            category,
            date: new Date(date),
        });
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
                <input
                    type="number"
                    placeholder="Nhập số tiền"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lý do</label>
                <input
                    type="text"
                    placeholder="Nhập lý do"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">-- Chọn danh mục --</option>
                    {(type === 'income' ? fakeIncomeCategories : fakeExpenseCategories).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                    Lưu
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                    Hủy
                </button>
            </div>
        </div>
    );
}