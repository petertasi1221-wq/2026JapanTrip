import React, { useState } from 'react';
import DateSelector from './components/DateSelector';
import ItineraryView from './components/ItineraryView';
import ExpenseSplitter from './components/ExpenseSplitter';
import { Calendar, Wallet } from 'lucide-react';
import { TRIP_START_DATE, ITINERARY_DATA } from './constants';

function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'expenses'>('itinerary');
  const [selectedDate, setSelectedDate] = useState<string>(TRIP_START_DATE);
  
  // ITINERARY_DATA 現在是唯讀的，直接從常量獲取
  const currentDayData = ITINERARY_DATA.find(d => d.date === selectedDate);

  return (
    <div className="min-h-screen bg-kyoto-cream text-kyoto-dark-brown font-sans flex justify-center">
      <div className="w-full max-w-md bg-kyoto-cream relative shadow-2xl min-h-screen flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
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
            <ExpenseSplitter />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-kyoto-brown/5 pb-safe z-40">
          <div className="flex justify-around items-center h-20 px-6">
            <button 
              onClick={() => setActiveTab('itinerary')}
              className={`flex flex-col items-center gap-1 transition-colors duration-300 ${activeTab === 'itinerary' ? 'text-kyoto-dark-brown' : 'text-kyoto-brown/40'}`}
            >
              <div className={`p-2.5 rounded-2xl transition-all ${activeTab === 'itinerary' ? 'bg-kyoto-pink/30 scale-110 shadow-sm' : 'bg-transparent'}`}>
                <Calendar size={24} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-bold tracking-widest">行程</span>
            </button>

            <button 
              onClick={() => setActiveTab('expenses')}
              className={`flex flex-col items-center gap-1 transition-colors duration-300 ${activeTab === 'expenses' ? 'text-kyoto-dark-brown' : 'text-kyoto-brown/40'}`}
            >
              <div className={`p-2.5 rounded-2xl transition-all ${activeTab === 'expenses' ? 'bg-kyoto-green/30 scale-110 shadow-sm' : 'bg-transparent'}`}>
                <Wallet size={24} strokeWidth={activeTab === 'expenses' ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-bold tracking-widest">分帳</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;