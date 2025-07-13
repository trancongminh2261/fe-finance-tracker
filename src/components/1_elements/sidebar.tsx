// components/Sidebar.tsx
'use client';

import { useState } from "react";
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <a href="/profile" className="flex flex-col items-center group">
          <img
            src="https://i.pravatar.cc/60"
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-blue-500 group-hover:opacity-80 transition"
          />
          <span className="text-sm mt-2 text-gray-700 group-hover:text-blue-600 transition">
            Cá nhân
          </span>
        </a>
      </div>

      <ul className="space-y-3 text-gray-700 font-medium">
        <li><a href="/home" className="hover:text-blue-600 flex items-center gap-2">🏠 Trang chủ</a></li>
        <li><a href="/transactions" className="hover:text-blue-600 flex items-center gap-2">💰 Quản lý thu chi</a></li>
        <li><a href="/plan" className="hover:text-blue-600 flex items-center gap-2">📊 Kế hoạch tài chính</a></li>
        <li>
          <button
            onClick={() => setConfigOpen(!configOpen)}
            className="w-full text-left flex items-center justify-between hover:text-blue-600"
          >
            <span className="flex items-center gap-2">⚙️ Cấu hình</span>
            {configOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {configOpen && (
            <ul className="mt-2 ml-6 space-y-2 text-sm text-gray-700">
              <li><a href="/settings/transaction-categories" className="hover:text-blue-600 block">▸ Danh mục thu chi</a></li>
              <li><a href="/settings/plan-categories" className="hover:text-blue-600 block">▸ Danh mục kế hoạch</a></li>
            </ul>
          )}
        </li>
        <li><a href="/login" className="hover:text-blue-600 flex items-center gap-2">↩️ Đăng xuất</a></li>
      </ul>
    </aside>
  );
}
