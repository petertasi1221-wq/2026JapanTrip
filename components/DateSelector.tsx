import React, { useRef, useEffect } from 'react';
import { DayItinerary } from '../types.ts';

interface DateSelectorProps {
  days: DayItinerary[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ days, selectedDate, onSelectDate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedEl = document.getElementById(`date-${selectedDate}`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedDate]);

  return (
    <div className="w-full bg-kyoto-cream pt-8 pb-2 sticky top-0 z-10 shadow-sm border-b border-kyoto-brown/10 overflow-hidden">
      {/* 裝飾性背景圓影 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kyoto-sakura/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
      
      <div className="px-6 mb-10 relative">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-kyoto-dark-brown tracking-tighter font-lively">2026.04</h2>
            <div className="h-px flex-1 bg-kyoto-brown/10"></div>
          </div>
          
          {/* 標籤貼紙樣式標題 */}
          <div className="mt-4 relative inline-block self-start z-10">
            <div className="absolute inset-0 bg-kyoto-brown/5 blur-md transform -rotate-2 translate-y-1 translate-x-1 rounded-2xl"></div>
            
            <span className="relative inline-block bg-gradient-to-br from-kyoto-pink via-[#FFDADA] to-kyoto-sakura text-kyoto-dark-brown px-6 py-2.5 rounded-2xl text-xl font-bold border-2 border-white shadow-sm transform -rotate-2 font-lively tracking-widest active:scale-95 transition-transform duration-200">
              便當團京阪10日遊 🍱
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
            </span>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 px-6 pb-4 no-scrollbar snap-x relative z-10"
      >
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const dayNum = day.date.split('-')[2];
          
          return (
            <button
              key={day.date}
              id={`date-${day.date}`}
              onClick={() => onSelectDate(day.date)}
              className={`
                snap-center flex-shrink-0 flex flex-col items-center justify-center 
                w-16 h-20 rounded-2xl transition-all duration-300
                ${isSelected 
                  ? 'bg-kyoto-dark-brown text-white shadow-soft transform scale-105 z-10' 
                  : 'bg-white text-kyoto-brown border border-kyoto-sand'}
              `}
            >
              <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-kyoto-pink' : 'text-kyoto-brown/40'}`}>
                {day.weekday}
              </span>
              <span className="text-xl font-bold mt-1 font-lively">{dayNum}</span>
              {isSelected && <div className="w-1.5 h-1.5 bg-kyoto-pink rounded-full mt-1"></div>}
            </button>
          );
        })}
        <div className="w-4 flex-shrink-0" />
      </div>
    </div>
  );
};

export default DateSelector;