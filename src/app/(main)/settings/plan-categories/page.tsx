'use client';

import { useState } from 'react';
// import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Edit, Trash2, X } from 'lucide-react';

// Type định nghĩa cho danh mục
type Category = {
  id: number;
  name: string;
  color: string;
};

const defaultCategories: Category[] = [
  { id: 1, name: 'Ăn uống', color: '#f43f5e' },
  { id: 2, name: 'Đi lại', color: '#3b82f6' },
];

const randomColor = (): string => {
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function SettingsCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(randomColor());
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleSave = () => {
    if (!newName.trim()) return;
    if (editing) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editing.id ? { ...editing, name: newName.trim(), color: newColor } : cat
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: newName.trim(), color: newColor },
      ]);
    }
    setNewName('');
    setNewColor(randomColor());
    setEditing(null);
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setNewName(cat.name);
    setNewColor(cat.color);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setDeleteConfirmId(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">⚙️ Cấu hình danh mục thu chi</h1>

      {/* Add/Edit form */}
      <div className="bg-white shadow-md p-6 rounded-xl mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {editing ? '✏️ Chỉnh sửa danh mục' : '➕ Thêm danh mục mới'}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Tên danh mục"
            className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-12 h-10 p-1 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
          >
            {editing ? 'Cập nhật' : 'Thêm'}
          </button>
          {editing && (
            <button
              onClick={() => {
                setEditing(null);
                setNewName('');
                setNewColor(randomColor());
              }}
              className="text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
          )}
        </div>
      </div>

      {/* Category list */}
      <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">📋 Danh sách danh mục</h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md border border-gray-100 hover:shadow"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cat.color }}
                ></span>
                <span className="text-gray-800 font-medium">{cat.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  title="Sửa"
                  onClick={() => handleEdit(cat)}
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  title="Xóa"
                  onClick={() => setDeleteConfirmId(cat.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirm delete */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
            <p className="mb-4 text-gray-700">Bạn có chắc chắn muốn xóa danh mục này?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Xóa
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
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
