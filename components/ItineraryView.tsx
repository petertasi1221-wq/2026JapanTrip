import React from 'react';
import { getIconForType } from '../constants.ts';
import { MapPin, Clock } from 'lucide-react';
import { DayItinerary } from '../types.ts';

interface ItineraryViewProps {
  dayData?: DayItinerary;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ dayData }) => {
  if (!dayData) return <div className="p-10 text-center text-kyoto-brown/30 font-handwriting">日記載入中... 🌸</div>;

  return (
    <div className="px-5 pt-4 pb-8">
      <div className="flex items-center space-x-2 mb-6 animate-fade-in pl-2">
         <div className="bg-white/80 border border-kyoto-sand px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
           <MapPin size={14} className="text-kyoto-green" />
           <span className="text-sm font-bold text-kyoto-dark-brown font-lively tracking-wide">
             {dayData.city === 'Airport' ? '機場' : dayData.city === 'Kyoto' ? '京都' : dayData.city === 'Osaka' ? '大阪' : dayData.city === 'Nara' ? '奈良' : dayData.city}
           </span>
         </div>
         <span className="text-kyoto-brown/40 text-xs font-bold tracking-widest uppercase bg-kyoto-sand/30 px-2 py-1.5 rounded-full">
           {dayData.dayLabel}
         </span>
      </div>

      <div className="space-y-4">
        {dayData.items.map((item, index) => {
          const Icon = getIconForType(item.type);
          
          return (
            <div 
              key={item.id} 
              className="relative group animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {/* 連接線 (只在項目之間顯示) */}
              {index !== dayData.items.length - 1 && (
                <div className="absolute left-[24px] top-12 bottom-[-16px] w-[2px] bg-kyoto-brown/10 z-0 rounded-full"></div>
              )}

              <div className="flex gap-4 relative z-10">
                {/* 左側時間軸 */}
                <div className="flex flex-col items-center flex-shrink-0 w-12 pt-1">
                   <div className={`
                     w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border-2 border-white
                     ${item.type === 'food' ? 'bg-kyoto-pink text-kyoto-dark-brown' : 
                       item.type === 'transport' ? 'bg-kyoto-green text-white' : 
                       item.type === 'hotel' ? 'bg-kyoto-brown text-white' : 
                       'bg-white text-kyoto-brown'}
                   `}>
                     <Icon size={20} />
                   </div>
                   <div className="mt-2 text-xs font-bold text-kyoto-brown/50 font-lively">{item.time}</div>
                </div>

                {/* 右側卡片 */}
                <div className="flex-1">
                  <div className="bg-white p-5 rounded-[1.5rem] shadow-card border border-white/60 active:scale-[0.98] transition-transform duration-200">
                    <h3 className="text-lg font-bold text-kyoto-dark-brown leading-tight font-lively mb-1.5">
                      {item.title}
                    </h3>
                    
                    {item.note && (
                      <p className="text-sm text-kyoto-brown/80 font-handwriting leading-relaxed bg-kyoto-cream/50 p-3 rounded-xl">
                         {item.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItineraryView;