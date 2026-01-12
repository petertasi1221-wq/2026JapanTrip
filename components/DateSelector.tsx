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
    <div className="w-full bg-kyoto-cream pt-8 pb-2 sticky top-0 z-10 shadow-sm border-b border-kyoto-brown/10 overflow-hidden">
      {/* 裝飾性背景 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kyoto-sakura/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
      
      <div className="px-6 mb-8 relative">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-kyoto-dark-brown tracking-tighter font-lively">2026.04</h2>
            <div className="h-px flex-1 bg-kyoto-brown/10 ml-2"></div>
          </div>
          <div className="mt-2 relative inline-block self-start">
            <span className="relative inline-block bg-gradient-to-r from-kyoto-pink to-[#FFD1D1] text-kyoto-dark-brown px-4 py-1.5 rounded-xl text-sm font-bold shadow-sm border border-white/40 transform -rotate-1 font-lively tracking-wider">
              便當團京阪10日遊 🍱
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
                  ? 'bg-kyoto-dark-brown text-white shadow-soft transform scale-105' 
                  : 'bg-white text-kyoto-brown border border-kyoto-sand'}
              `}
            >
              <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-kyoto-pink' : 'text-kyoto-brown/40'}`}>
                {day.weekday}
              </span>
              <span className="text-xl font-bold mt-1">{dayNum}</span>
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