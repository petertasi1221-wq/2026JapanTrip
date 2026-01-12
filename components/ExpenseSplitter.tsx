import React, { useState, useMemo } from 'react';
import { USERS } from '../constants';
import { Expense } from '../types';
import { calculateSettlements } from '../services/money';
import { Plus, X, Wallet, ArrowRight, Check } from 'lucide-react';

const ExpenseSplitter: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'e1', payerId: 'u1', amount: 5000, description: '租用 Wifi 機', date: '2026-04-11', involvedUserIds: ['u1', 'u2', 'u3', 'u4'] },
    { id: 'e2', payerId: 'u2', amount: 12000, description: '燒肉晚餐', date: '2026-04-11', involvedUserIds: ['u1', 'u2', 'u3', 'u4'] }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    payerId: 'u1',
    involvedUserIds: USERS.map(u => u.id),
    amount: 0,
    description: ''
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

    setExpenses([expense, ...expenses]);
    setIsAdding(false);
    setNewExpense({
      payerId: 'u1',
      involvedUserIds: USERS.map(u => u.id),
      amount: 0,
      description: ''
    });
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
          <h2 className="text-xl font-bold text-kyoto-dark-brown">新增支出</h2>
          <button onClick={() => setIsAdding(false)} className="bg-kyoto-sand p-2 rounded-full text-kyoto-brown">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-2">金額 (日圓)</label>
            <input 
              type="number" 
              className="w-full text-4xl font-bold text-kyoto-dark-brown bg-transparent border-b-2 border-kyoto-sand focus:border-kyoto-pink focus:outline-none py-2 placeholder-kyoto-sand"
              placeholder="0"
              value={newExpense.amount || ''}
              onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-2">項目說明</label>
            <input 
              type="text" 
              className="w-full text-lg text-kyoto-dark-brown bg-kyoto-sand/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-kyoto-pink/50"
              placeholder="例如：電車車票、晚餐..."
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
          </div>

          {/* Payer */}
          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-3">誰付錢？</label>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => setNewExpense({...newExpense, payerId: user.id})}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                    ${newExpense.payerId === user.id ? 'bg-kyoto-dark-brown text-white shadow-md' : 'bg-white text-kyoto-brown border border-kyoto-sand'}
                  `}
                >
                  <div className={`w-2 h-2 rounded-full ${user.avatarColor}`}></div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Split */}
          <div>
            <label className="block text-sm font-bold text-kyoto-brown/60 mb-3">分給誰？</label>
            <div className="grid grid-cols-2 gap-3">
              {USERS.map(user => {
                const isSelected = newExpense.involvedUserIds?.includes(user.id);
                return (
                  <button
                    key={user.id}
                    onClick={() => toggleUserInvolvement(user.id)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl transition-all
                      ${isSelected ? 'bg-kyoto-sakura/50 border-2 border-kyoto-pink text-kyoto-dark-brown' : 'bg-white border-2 border-transparent text-kyoto-brown/50'}
                    `}
                  >
                    <span className="font-medium">{user.name}</span>
                    {isSelected && <Check size={16} className="text-kyoto-pink" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-kyoto-sand">
          <button 
            onClick={handleAddExpense}
            className="w-full bg-kyoto-pink text-kyoto-dark-brown font-bold text-lg py-4 rounded-2xl shadow-soft active:scale-95 transition-transform"
          >
            確認新增
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 px-6 pt-6 animate-fade-in">
      {/* Header Summary */}
      <div className="bg-kyoto-dark-brown text-kyoto-cream p-6 rounded-3xl shadow-soft mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-kyoto-pink rounded-full mix-blend-overlay opacity-20 transform translate-x-10 -translate-y-10"></div>
        <h2 className="text-kyoto-cream/60 text-sm font-medium mb-1">總花費</h2>
        <div className="text-4xl font-bold">¥{totalSpent.toLocaleString()}</div>
        <div className="mt-6 flex gap-2">
            <button 
                onClick={() => setIsAdding(true)}
                className="flex-1 bg-white/10 backdrop-blur-md text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            >
                <Plus size={18} /> 新增支出
            </button>
        </div>
      </div>

      {/* Settlements */}
      {settlements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-kyoto-brown font-bold mb-4 flex items-center gap-2">
            <Wallet size={18} /> 建議結算
          </h3>
          <div className="space-y-3">
            {settlements.map((s, idx) => {
              const fromUser = USERS.find(u => u.id === s.fromUserId);
              const toUser = USERS.find(u => u.id === s.toUserId);

              return (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-kyoto-sand flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {/* From User */}
                    <div className="flex flex-col items-center min-w-[3rem]">
                      <div className={`w-10 h-10 rounded-full ${fromUser?.avatarColor} flex items-center justify-center text-sm font-bold text-kyoto-dark-brown shadow-sm`}>
                        {fromUser?.name}
                      </div>
                    </div>
                    
                    {/* Arrow & Amount */}
                    <div className="flex-1 flex flex-col items-center px-1">
                      <span className="text-[10px] text-kyoto-brown/40 mb-1 font-bold">給付</span>
                      <div className="h-[2px] w-full bg-kyoto-pink/50 relative">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-kyoto-pink/50 rotate-45 transform translate-x-1/2 -mt-[1px]"></div>
                      </div>
                      <span className="text-lg font-bold text-kyoto-pink mt-1">¥{s.amount.toLocaleString()}</span>
                    </div>

                    {/* To User */}
                    <div className="flex flex-col items-center min-w-[3rem]">
                      <div className={`w-10 h-10 rounded-full ${toUser?.avatarColor} flex items-center justify-center text-sm font-bold text-kyoto-dark-brown shadow-sm`}>
                        {toUser?.name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h3 className="text-kyoto-brown font-bold mb-4">最近活動</h3>
        <div className="space-y-4">
          {expenses.map(expense => {
             const payer = USERS.find(u => u.id === expense.payerId);
             return (
              <div key={expense.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${payer?.avatarColor} flex items-center justify-center text-xs font-bold text-kyoto-dark-brown opacity-80`}>
                    {payer?.name.substring(0, 1)}
                  </div>
                  <div>
                    <div className="font-bold text-kyoto-dark-brown">{expense.description}</div>
                    <div className="text-xs text-kyoto-brown/50">{expense.date} • {payer?.name} 付款</div>
                  </div>
                </div>
                <div className="font-bold text-kyoto-brown">¥{expense.amount.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseSplitter;