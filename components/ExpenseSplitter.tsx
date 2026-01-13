import React, { useState, useMemo } from 'react';
import { USERS } from '../constants.ts';
import { Expense } from '../types.ts';
import { calculateSettlements } from '../services/money.ts';
import { Plus, X, Wallet, Trash2, ReceiptText, ChevronRight, Check } from 'lucide-react';
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
    if (!newExpense.amount || !newExpense.description || !newExpense.involvedUserIds?.length) return;
    
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
      {expenses.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-lively">
            <ReceiptText size={20} className="text-kyoto-pink" /> 結算建議
          </h3>
          
          {settlements.length > 0 ? (
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
          ) : (
            <div className="text-center p-6 bg-white/50 rounded-3xl border border-dashed border-kyoto-sand/50 animate-fade-in">
               <div className="text-3xl mb-2">🎉</div>
               <h4 className="font-bold text-kyoto-dark-brown/80 font-lively">目前沒有需要結算的款項</h4>
               <p className="text-xs text-kyoto-brown/50 font-handwriting mt-1">大家都付得差不多囉！</p>
            </div>
          )}
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
              const involvedCount = expense.involvedUserIds.length;
              const isAll = involvedCount === USERS.length;
              const involvedText = isAll 
                ? '全員分攤' 
                : `${involvedCount}人分攤: ${expense.involvedUserIds.map(id => USERS.find(u => u.id === id)?.name).join('、')}`;

              return (
                <div key={expense.id} className="bg-white p-5 rounded-2xl border border-kyoto-sand shadow-sm group animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-kyoto-brown/40 font-bold mb-1 font-lively uppercase">{expense.date}</div>
                      <h4 className="font-bold text-kyoto-dark-brown text-lg font-lively tracking-wide">{expense.description}</h4>
                      <div className="mt-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full ${payer?.avatarColor} flex items-center justify-center text-[10px] font-bold text-kyoto-dark-brown border border-white shadow-sm`}>
                            {payer?.name}
                          </span>
                          <span className="text-sm text-kyoto-brown/60 font-handwriting">代墊 ¥{expense.amount.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-kyoto-brown/40 ml-8 font-bold bg-kyoto-sand/20 inline-block px-2 py-0.5 rounded-md self-start">
                           {involvedText}
                        </div>
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
          <div className="absolute inset-0 bg-kyoto-dark-brown/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsAdding(false)}></div>
          <div className="bg-kyoto-cream w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden z-10 animate-fade-in-up border border-white/50 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-lively">記一筆 🖋️</h3>
                <button onClick={() => setIsAdding(false)} className="text-kyoto-brown/40 hover:text-kyoto-dark-brown"><X size={24} /></button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-kyoto-brown/50 mb-1 ml-1 font-lively">支出項目</label>
                  <input 
                    type="text" 
                    placeholder="例如：拉麵、車票..."
                    className="w-full bg-white border border-kyoto-sand rounded-xl px-4 py-3 outline-none focus:border-kyoto-pink transition-colors font-handwriting"
                    value={newExpense.description}
                    onChange={e => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-kyoto-brown/50 mb-1 ml-1 font-lively">金額 (JPY)</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full bg-white border border-kyoto-sand rounded-xl px-4 py-3 outline-none focus:border-kyoto-pink transition-colors font-lively"
                    value={newExpense.amount || ''}
                    onChange={e => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-kyoto-brown/50 mb-1 ml-1 font-lively">誰付錢？</label>
                  <div className="flex flex-wrap gap-2">
                    {USERS.map(user => (
                      <button
                        key={user.id}
                        onClick={() => setNewExpense({...newExpense, payerId: user.id})}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          newExpense.payerId === user.id 
                            ? 'bg-kyoto-dark-brown text-white shadow-md ring-2 ring-offset-1 ring-kyoto-dark-brown' 
                            : 'bg-white text-kyoto-brown border border-kyoto-sand hover:bg-kyoto-sand/30'
                        }`}
                      >
                        {user.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1 ml-1">
                    <label className="block text-xs font-bold text-kyoto-brown/50 font-lively">分給誰？</label>
                    <button 
                      onClick={() => setNewExpense({...newExpense, involvedUserIds: USERS.map(u => u.id)})}
                      className="text-[10px] text-kyoto-pink font-bold hover:underline"
                    >
                      全選
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {USERS.map(user => {
                      const isInvolved = newExpense.involvedUserIds?.includes(user.id);
                      return (
                        <button
                          key={user.id}
                          onClick={() => {
                            const currentIds = newExpense.involvedUserIds || [];
                            const newIds = isInvolved
                              ? currentIds.filter(id => id !== user.id)
                              : [...currentIds, user.id];
                            setNewExpense({...newExpense, involvedUserIds: newIds});
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                            isInvolved 
                              ? 'bg-kyoto-green text-white shadow-md' 
                              : 'bg-white text-kyoto-brown/40 border border-kyoto-sand grayscale opacity-70 hover:opacity-100 hover:grayscale-0'
                          }`}
                        >
                          {isInvolved && <Check size={14} strokeWidth={3} />}
                          {user.name}
                        </button>
                      );
                    })}
                  </div>
                  {(!newExpense.involvedUserIds || newExpense.involvedUserIds.length === 0) && (
                    <p className="text-xs text-red-400 mt-2 ml-1 font-bold animate-pulse">⚠️ 請至少選擇一人分攤</p>
                  )}
                </div>

                <button 
                  onClick={handleAddExpense}
                  disabled={!newExpense.description || !newExpense.amount || !newExpense.involvedUserIds?.length}
                  className="w-full bg-kyoto-pink text-kyoto-dark-brown font-bold py-4 rounded-2xl shadow-lg hover:bg-kyoto-pink/80 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 font-lively mt-4"
                >
                  儲存紀錄
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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