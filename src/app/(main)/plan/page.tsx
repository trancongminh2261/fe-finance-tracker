// app/financial-plan/page.tsx
'use client';

// import { useState, useEffect } from 'react';
// import { format, startOfMonth, endOfMonth, addMonths } from 'date-fns';
import { useState } from 'react';
import { format, addMonths } from 'date-fns';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function FinancialPlanPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Plan | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState(['Du lịch', 'Mua sắm']);
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const filteredPlans = plans.filter((p) => !filterCategory || p.category === filterCategory);

  const handleSave = (plan: Plan) => {
    if (editPlan) {
      setPlans(plans.map((p) => (p.id === plan.id ? plan : p)));
    } else {
      setPlans([...plans, { ...plan, id: Date.now() }]);
    }
    setFormOpen(false);
    setEditPlan(null);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      setPlans(plans.filter((p) => p.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Kế hoạch tài chính</h1>
          <button
            onClick={() => setFormOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus size={16} className="mr-2" /> Tạo kế hoạch
          </button>
        </div>

        {/* Bộ lọc */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Lọc theo danh mục:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Tất cả --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Danh sách kế hoạch */}
        <div className="space-y-4">
          {filteredPlans.length === 0 ? (
            <p className="text-center text-gray-500 p-4">Chưa có kế hoạch nào</p>
          ) : (
            filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{plan.name}</h2>
                  <p className="text-sm text-gray-500">Danh mục: {plan.category}</p>
                  <p className="text-sm text-gray-500">
                    Thời hạn: {plan.months} tháng – {format(new Date(plan.startDate), 'dd/MM/yyyy')} đến{' '}
                    {format(addMonths(new Date(plan.startDate), plan.months), 'dd/MM/yyyy')}
                  </p>
                  <p className="text-sm text-gray-500">Tổng số tiền: {plan.total.toLocaleString('vi-VN')} đ</p>
                  <p className="text-sm text-gray-500">
                    Ngày đóng hàng tháng: {plan.payDay} – mỗi tháng đóng {(plan.total / plan.months).toLocaleString('vi-VN')} đ
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditPlan(plan);
                      setFormOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    title="Sửa"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(plan)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for Plan Form */}
        {formOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setFormOpen(false);
                  setEditPlan(null);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editPlan ? 'Sửa kế hoạch' : 'Tạo kế hoạch mới'}
              </h2>
              <PlanForm
                categories={categories}
                onAddCategory={() => setNewCategoryDialog(true)}
                initialData={editPlan || undefined}
                onSave={handleSave}
                onCancel={() => {
                  setFormOpen(false);
                  setEditPlan(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Xác nhận xóa</h2>
              <p className="text-gray-600 mb-6">Bạn có chắc muốn xóa kế hoạch "{deleteConfirm.name}"?</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Adding New Category */}
        {newCategoryDialog && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setNewCategoryDialog(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm danh mục mới</h2>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nhập tên danh mục"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => {
                    if (newCategory && !categories.includes(newCategory)) {
                      setCategories([...categories, newCategory]);
                      setNewCategory('');
                      setNewCategoryDialog(false);
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Thêm
                </button>
                <button
                  onClick={() => setNewCategoryDialog(false)}
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

function PlanForm({
  initialData,
  onSave,
  onCancel,
  categories,
  onAddCategory,
}: {
  initialData?: Plan;
  onSave: (plan: Plan) => void;
  onCancel: () => void;
  categories: string[];
  onAddCategory: () => void;
}) {
  const [name, setName] = useState(initialData?.name || '');
  const [months, setMonths] = useState(initialData?.months.toString() || '');
  const [total, setTotal] = useState(initialData?.total.toString() || '');
  const [payDay, setPayDay] = useState(initialData?.payDay.toString() || '1');
  const [category, setCategory] = useState(initialData?.category || categories[0] || '');
  const [startDate, setStartDate] = useState(
    initialData ? format(new Date(initialData.startDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  );

  const monthlyAmount = total && months ? Math.floor(parseInt(total) / parseInt(months)) : 0;

  function submit() {
    if (!name || !months || !total || !payDay || !category) return alert('Điền đầy đủ thông tin');
    onSave({
      id: initialData?.id || Date.now(),
      name,
      months: parseInt(months),
      total: parseInt(total),
      payDay: parseInt(payDay),
      category,
      startDate,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên kế hoạch</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên kế hoạch"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Số tháng</label>
        <input
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          type="number"
          placeholder="Nhập số tháng"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tổng số tiền cần</label>
        <input
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          type="number"
          placeholder="Nhập tổng số tiền"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tiền cần đóng mỗi tháng</label>
        <input
          disabled
          value={monthlyAmount.toLocaleString('vi-VN')}
          className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đóng tiền hàng tháng</label>
        <input
          value={payDay}
          onChange={(e) => setPayDay(e.target.value)}
          type="number"
          min={1}
          max={31}
          placeholder="Nhập ngày (1-31)"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
        <input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={onAddCategory}
            className="px-3 py-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            + Thêm
          </button>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-4">
        <button
          onClick={submit}
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

type Plan = {
  id: number;
  name: string;
  months: number;
  total: number;
  payDay: number;
  category: string;
  startDate: string;
};