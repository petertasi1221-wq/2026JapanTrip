import React, { useState, useEffect } from 'react';
import DateSelector from './components/DateSelector.tsx';
import ItineraryView from './components/ItineraryView.tsx';
import ExpenseSplitter from './components/ExpenseSplitter.tsx';
import { Calendar, Wallet } from 'lucide-react';
import { TRIP_START_DATE, ITINERARY_DATA } from './constants.ts';
import { Expense } from './types.ts';

const STORAGE_KEY = 'bentou_trip_expenses';

function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'expenses'>('itinerary');
  const [selectedDate, setSelectedDate] = useState<string>(TRIP_START_DATE);
  
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const currentDayData = ITINERARY_DATA.find(d => d.date === selectedDate);

  return (
    <div className="h-[100dvh] bg-kyoto-cream text-kyoto-dark-brown font-sans flex justify-center overflow-hidden">
      {/* 限制最大寬度，模擬手機體驗，並確保陰影不被截斷 */}
      <div className="w-full max-w-md bg-kyoto-cream relative h-full flex flex-col shadow-2xl">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {activeTab === 'itinerary' ? (
            <>
              <DateSelector 
                days={ITINERARY_DATA}
                selectedDate={selectedDate} 
                onSelectDate={setSelectedDate} 
              />
              <ItineraryView 
                dayData={currentDayData} 
              />
            </>
          ) : (
            <ExpenseSplitter 
              expenses={expenses} 
              onExpensesChange={setExpenses} 
            />
          )}
        </div>

        {/* Bottom Navigation - Glassmorphism */}
        <div className="fixed bottom-0 w-full max-w-md glass-nav pb-safe z-50 rounded-t-[2rem]">
          <div className="flex justify-around items-center h-20 px-6">
            <button 
              onClick={() => setActiveTab('itinerary')}
              className="group flex flex-col items-center gap-1.5 w-16"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${activeTab === 'itinerary' ? 'bg-kyoto-dark-brown text-white shadow-lg translate-y-[-4px]' : 'text-kyoto-brown/40 hover:bg-kyoto-brown/5'}`}>
                <Calendar size={22} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold tracking-widest font-lively transition-colors ${activeTab === 'itinerary' ? 'text-kyoto-dark-brown' : 'text-kyoto-brown/40'}`}>行程</span>
            </button>

            <button 
              onClick={() => setActiveTab('expenses')}
              className="group flex flex-col items-center gap-1.5 w-16"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${activeTab === 'expenses' ? 'bg-kyoto-dark-brown text-white shadow-lg translate-y-[-4px]' : 'text-kyoto-brown/40 hover:bg-kyoto-brown/5'}`}>
                <Wallet size={22} strokeWidth={activeTab === 'expenses' ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold tracking-widest font-lively transition-colors ${activeTab === 'expenses' ? 'text-kyoto-dark-brown' : 'text-kyoto-brown/40'}`}>分帳</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;