import React, { useRef, useEffect } from 'react';
import { DayItinerary } from '../types';

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
    <div className="w-full bg-kyoto-cream pt-5 pb-2 sticky top-0 z-10 shadow-sm border-b border-kyoto-brown/10">
      <div className="px-6 mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-kyoto-dark-brown tracking-tight">2026年4月</h2>
        
        {/* 美化後的旅行標籤 */}
        <div className="relative group">
          <div className="absolute inset-0 bg-kyoto-pink/30 blur-md rounded-full -rotate-1"></div>
          <span className="relative inline-block bg-gradient-to-r from-kyoto-pink to-[#FFD1D1] text-kyoto-dark-brown px-4 py-2 rounded-xl text-sm font-bold shadow-soft border border-white/40 transform -rotate-1 tracking-wider">
            🌸 便當團京阪10日遊
          </span>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 px-6 pb-4 no-scrollbar snap-x"
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
                  ? 'bg-kyoto-dark-brown text-white shadow-soft transform scale-105' 
                  : 'bg-white text-kyoto-brown border border-kyoto-sand'}
              `}
            >
              <span className={`text-xs font-medium ${isSelected ? 'text-kyoto-pink' : 'text-kyoto-brown/60'}`}>
                {day.weekday}
              </span>
              <span className="text-xl font-bold mt-1">{dayNum}</span>
              {isSelected && <div className="w-1 h-1 bg-kyoto-pink rounded-full mt-1"></div>}
            </button>
          );
        })}
        {/* Spacer for right padding */}
        <div className="w-2 flex-shrink-0" />
      </div>
    </div>
  );
};

export default DateSelector;