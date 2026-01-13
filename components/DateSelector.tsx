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
    <div className="w-full glass pt-safe pb-2 sticky top-0 z-40 transition-all duration-300">
      
      <div className="px-6 py-4 mb-2 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-kyoto-brown/60 tracking-widest mb-1 font-lively">2026.04</span>
          <h2 className="text-3xl font-bold text-kyoto-dark-brown tracking-tighter font-lively">
            Trip to JAPAN 
          </h2>
        </div>
        
        {/* 簡化的標籤 - 字體加大 */}
        <div className="bg-kyoto-pink/20 px-4 py-1.5 rounded-full border border-kyoto-pink/30">
          <span className="text-base font-bold text-kyoto-dark-brown font-lively">便當團京阪10日遊 🍱</span>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 px-6 pb-4 no-scrollbar snap-x relative"
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
                w-14 h-20 rounded-[1.2rem] transition-all duration-300 relative overflow-hidden
                ${isSelected 
                  ? 'bg-kyoto-dark-brown text-white shadow-lg scale-105' 
                  : 'bg-white text-kyoto-brown border border-kyoto-sand shadow-sm hover:border-kyoto-brown/30'}
              `}
            >
              <span className={`text-[10px] font-bold uppercase mt-1 ${isSelected ? 'text-kyoto-pink' : 'text-kyoto-brown/40'}`}>
                {day.weekday}
              </span>
              <span className="text-xl font-bold font-lively leading-none mt-1">{dayNum}</span>
              {isSelected && (
                 <div className="absolute bottom-2 w-1 h-1 bg-kyoto-pink rounded-full"></div>
              )}
            </button>
          );
        })}
        <div className="w-4 flex-shrink-0" />
      </div>
    </div>
  );
};

export default DateSelector;