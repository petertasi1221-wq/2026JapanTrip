import React, { useState, useMemo } from 'react';
import { USERS } from '../constants.ts';
import { Expense } from '../types.ts';
import { calculateSettlements } from '../services/money.ts';
import { Plus, X, Wallet, Trash2, Check, ReceiptText } from 'lucide-react';
import ConfirmModal from './ConfirmModal.tsx';

interface ExpenseSplitterProps {
  expenses: Expense[];
  onExpensesChange: (expenses: Expense[]) => void;
}

const ExpenseSplitter: React.FC<ExpenseSplitterProps> = ({ expenses, onExpensesChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    payerId: 'u1',
    involvedUserIds: USERS.map(u => u.id),
    amount: 0,
    description: ''
  });

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;
    
    const expense: Expense = {
      id: Date.now().toString(),
      payerId: newExpense.payerId as string,
      amount: Number(newExpense.amount),
      description: newExpense.description as string,
      date: new Date().toISOString().split('T')[0],
      involvedUserIds: newExpense.involvedUserIds as string[]
    };

    onExpensesChange([expense, ...expenses]);
    setIsAdding(false);
    setNewExpense({
      payerId: 'u1',
      involvedUserIds: USERS.map(u => u.id),
      amount: 0,
      description: ''
    });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      onExpensesChange(expenses.filter(e => e.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const settlements = useMemo(() => calculateSettlements(expenses, USERS), [expenses]);
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  // ... (其餘邏輯維持不變)
  return (
    <div className="pb-24 px-6 pt-6 animate-fade-in">
      {/* 僅列出簡化後的 UI 確保結構正確 */}
      <div className="bg-kyoto-dark-brown text-kyoto-cream p-8 rounded-[2rem] shadow-soft mb-8 relative overflow-hidden">
        <h2 className="text-kyoto-cream/60 text-sm font-bold mb-1 tracking-widest uppercase">總累積支出</h2>
        <div className="text-5xl font-bold flex items-baseline gap-1">
          <span className="text-2xl text-kyoto-pink">¥</span>
          {totalSpent.toLocaleString()}
        </div>
        <div className="mt-8">
            <button onClick={() => setIsAdding(true)} className="w-full bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                <Plus size={20} /> 開始記一筆
            </button>
        </div>
      </div>
      {/* ... (其餘 UI 部分) */}
      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="確定刪除紀錄？"
        message="這項支出記錄一旦刪除後將無法恢復。"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
      />
    </div>
  );
};

export default ExpenseSplitter;