import React, { useState, useMemo } from 'react';
import { USERS } from '../constants';
import { Expense } from '../types';
import { calculateSettlements } from '../services/money';
import { Plus, X, Wallet, Trash2, Check, ReceiptText } from 'lucide-react';
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

  // Modal State
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

  const toggleUserInvolvement = (userId: string) => {
    const current = newExpense.involvedUserIds || [];
    if (current.includes(userId)) {
      setNewExpense({ ...newExpense, involvedUserIds: current.filter(id => id !== userId) });
    } else {
      setNewExpense({ ...newExpense, involvedUserIds: [...current, userId] });
    }
  };

  const settlements = useMemo(() => calculateSettlements(expenses, USERS), [expenses]);
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  if (isAdding) {
    return (
      <div className="fixed inset-0 bg-kyoto-cream z-50 flex flex-col animate-fade-in-up">
        <div className="p-6 flex justify-between items-center bg-white shadow-sm">
          <h2 className="text-xl font-bold text-kyoto-dark-brown">新增支出項目</h2>
          <button onClick={() => setIsAdding(false)} className="bg-kyoto-sand p-2 rounded-full text-kyoto-brown active:scale-90 transition-transform">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar pb-10">
          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-2">支出金額 (JPY)</label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-kyoto-brown/40">¥</span>
              <input 
                type="number" 
                inputMode="numeric"
                className="w-full text-4xl font-bold text-kyoto-dark-brown bg-transparent border-b-2 border-kyoto-sand focus:border-kyoto-pink focus:outline-none py-2 pl-8 placeholder-kyoto-sand"
                placeholder="0"
                value={newExpense.amount || ''}
                onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-2">項目名稱</label>
            <input 
              type="text" 
              className="w-full text-lg text-kyoto-dark-brown bg-white border border-kyoto-sand rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-kyoto-pink/50 shadow-sm"
              placeholder="例如：晚餐、交通票券..."
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-3">誰付的錢？</label>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => setNewExpense({...newExpense, payerId: user.id})}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all
                    ${newExpense.payerId === user.id ? 'bg-kyoto-dark-brown text-white shadow-lg scale-105' : 'bg-white text-kyoto-brown border border-kyoto-sand'}
                  `}
                >
                  <div className={`w-3 h-3 rounded-full ${user.avatarColor}`}></div>
                  <span className="text-sm font-bold">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-3">分給哪些人？</label>
            <div className="grid grid-cols-2 gap-3">
              {USERS.map(user => {
                const isSelected = newExpense.involvedUserIds?.includes(user.id);
                return (
                  <button
                    key={user.id}
                    onClick={() => toggleUserInvolvement(user.id)}
                    className={`
                      flex items-center justify-between px-4 py-4 rounded-2xl transition-all border-2
                      ${isSelected ? 'bg-kyoto-sakura/40 border-kyoto-pink text-kyoto-dark-brown shadow-sm' : 'bg-white border-transparent text-kyoto-brown/40'}
                    `}
                  >
                    <span className="font-bold">{user.name}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-kyoto-pink text-white' : 'bg-kyoto-sand text-transparent'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-kyoto-sand pb-safe">
          <button 
            onClick={handleAddExpense}
            className="w-full bg-kyoto-pink text-kyoto-dark-brown font-bold text-lg py-4 rounded-2xl shadow-soft active:scale-[0.98] transition-all"
          >
            儲存紀錄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 px-6 pt-6 animate-fade-in">
      {/* Header Summary */}
      <div className="bg-kyoto-dark-brown text-kyoto-cream p-8 rounded-[2rem] shadow-soft mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-kyoto-pink rounded-full mix-blend-overlay opacity-20 transform translate-x-10 -translate-y-10"></div>
        <h2 className="text-kyoto-cream/60 text-sm font-bold mb-1 tracking-widest uppercase">總累積支出</h2>
        <div className="text-5xl font-bold flex items-baseline gap-1">
          <span className="text-2xl text-kyoto-pink">¥</span>
          {totalSpent.toLocaleString()}
        </div>
        <div className="mt-8">
            <button 
                onClick={() => setIsAdding(true)}
                className="w-full bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/10 active:scale-[0.98]"
            >
                <Plus size={20} /> 開始記一筆
            </button>
        </div>
      </div>

      {/* Settlements */}
      {settlements.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-kyoto-brown font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
            <Wallet size={16} /> 建議結算路徑
          </h3>
          <div className="space-y-3">
            {settlements.map((s, idx) => {
              const fromUser = USERS.find(u => u.id === s.fromUserId);
              const toUser = USERS.find(u => u.id === s.toUserId);

              return (
                <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-kyoto-sand flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full ${fromUser?.avatarColor} flex items-center justify-center text-base font-bold text-kyoto-dark-brown shadow-sm border-2 border-white`}>
                        {fromUser?.name}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <div className="h-[2px] w-full bg-gradient-to-r from-kyoto-pink/20 via-kyoto-pink to-kyoto-pink/20 relative">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-kyoto-pink rotate-45 transform translate-x-1/2 -mt-[1px]"></div>
                      </div>
                      <span className="text-lg font-bold text-kyoto-dark-brown mt-1">
                        <span className="text-xs text-kyoto-pink mr-0.5">¥</span>
                        {s.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full ${toUser?.avatarColor} flex items-center justify-center text-base font-bold text-kyoto-dark-brown shadow-sm border-2 border-white`}>
                        {toUser?.name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Recent Activity */}
      <div>
        <h3 className="text-kyoto-brown font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
          <ReceiptText size={16} /> 支出明細
        </h3>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <div className="text-center py-16 bg-white/40 rounded-[2rem] border border-dashed border-kyoto-sand">
              <p className="text-kyoto-brown/40 text-sm font-medium">目前尚無任何記帳紀錄</p>
            </div>
          ) : (
            expenses.map(expense => {
              const payer = USERS.find(u => u.id === expense.payerId);
              return (
                <div key={expense.id} className="flex items-center justify-between bg-white p-5 rounded-[1.5rem] border border-kyoto-sand/50 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-full ${payer?.avatarColor} flex items-center justify-center text-sm font-bold text-kyoto-dark-brown opacity-90 border-2 border-white shadow-sm`}>
                      {payer?.name}
                    </div>
                    <div>
                      <div className="font-bold text-kyoto-dark-brown leading-tight">{expense.description}</div>
                      <div className="text-[10px] text-kyoto-brown/50 mt-1 uppercase font-bold tracking-widest">
                        {payer?.name} 先付 • {expense.involvedUserIds.length} 人分擔
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-kyoto-dark-brown text-lg">
                        <span className="text-xs text-kyoto-pink mr-0.5 font-normal">¥</span>
                        {expense.amount.toLocaleString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setDeleteModal({ isOpen: true, id: expense.id })}
                      className="p-2.5 text-kyoto-sand hover:text-red-400 hover:bg-red-50 rounded-full transition-all active:scale-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="確定刪除紀錄？"
        message="這項支出記錄一旦刪除後將無法恢復，結算金額將會重新計算。"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
      />
    </div>
  );
};

export default ExpenseSplitter;