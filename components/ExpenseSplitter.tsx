import React, { useState, useMemo } from 'react';
import { USERS } from '../constants';
import { Expense } from '../types';
import { calculateSettlements } from '../services/money';
import { Plus, X, Wallet, Trash2, ReceiptText, ChevronRight } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

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

  return (
    <div className="pb-24 px-6 pt-6 animate-fade-in">
      {/* 總覽卡片 */}
      <div className="bg-kyoto-dark-brown text-kyoto-cream p-8 rounded-[2.5rem] shadow-soft mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-kyoto-pink/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        <h2 className="text-kyoto-cream/60 text-sm font-bold mb-2 tracking-widest uppercase font-lively">總累積支出</h2>
        <div className="text-5xl font-bold flex items-baseline gap-1 font-lively">
          <span className="text-2xl text-kyoto-pink">¥</span>
          {totalSpent.toLocaleString()}
        </div>
        <button 
          onClick={() => setIsAdding(true)} 
          className="mt-8 w-full bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all font-lively tracking-widest"
        >
          <Plus size={20} /> 新增支出
        </button>
      </div>

      {/* 結算建議 */}
      {settlements.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-lively">
            <ReceiptText size={20} className="text-kyoto-pink" /> 結算建議
          </h3>
          <div className="space-y-3">
            {settlements.map((s, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-kyoto-sand flex items-center justify-between shadow-sm animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-kyoto-dark-brown font-lively">{s.fromUser}</span>
                  <ChevronRight size={14} className="text-kyoto-brown/30" />
                  <span className="font-bold text-kyoto-dark-brown font-lively">{s.toUser}</span>
                </div>
                <div className="text-lg font-bold text-kyoto-pink font-lively">¥{Math.round(s.amount).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 支出列表 */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-lively">
          <Wallet size={20} className="text-kyoto-green" /> 支出紀錄
        </h3>
        {expenses.length === 0 ? (
          <div className="bg-white/50 border-2 border-dashed border-kyoto-sand rounded-3xl p-10 text-center text-kyoto-brown/40 font-handwriting">
            目前還沒有紀錄喔～ 🖋️
          </div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => {
              const payer = USERS.find(u => u.id === expense.payerId);
              return (
                <div key={expense.id} className="bg-white p-5 rounded-2xl border border-kyoto-sand shadow-sm group animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-kyoto-brown/40 font-bold mb-1 font-lively uppercase">{expense.date}</div>
                      <h4 className="font-bold text-kyoto-dark-brown text-lg font-lively tracking-wide">{expense.description}</h4>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full ${payer?.avatarColor} flex items-center justify-center text-[10px] font-bold text-kyoto-dark-brown border border-white`}>
                          {payer?.name}
                        </span>
                        <span className="text-sm text-kyoto-brown/60 font-handwriting">代墊 ¥{expense.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDeleteModal({ isOpen: true, id: expense.id })}
                      className="p-2 text-red-200 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 新增支出彈窗 */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-kyoto-dark-brown/40 backdrop-blur-sm