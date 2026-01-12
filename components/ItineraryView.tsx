import React from 'react';
import { getIconForType } from '../constants';
import { MapPin, Clock } from 'lucide-react';
import { DayItinerary } from '../types';

interface ItineraryViewProps {
  dayData?: DayItinerary;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ dayData }) => {
  if (!dayData) return <div className="p-6 text-center text-kyoto-brown/50">沒有資料</div>;

  return (
    <div className="pb-24 animate-fade-in">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
             <span className="bg-kyoto-green/20 text-kyoto-dark-brown px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
               <MapPin size={14} /> {dayData.city === 'Airport' ? '機場' : dayData.city === 'Kyoto' ? '京都' : dayData.city === 'Osaka' ? '大阪' : dayData.city === 'Nara' ? '奈良' : dayData.city}
             </span>
             <span className="text-kyoto-brown/50 text-sm font-medium">{dayData.dayLabel}</span>
          </div>
        </div>

        <div className="relative border-l-2 border-kyoto-brown/10 ml-3 space-y-8">
          {dayData.items.map((item) => {
            const Icon = getIconForType(item.type);
            
            return (
              <div key={item.id} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div className={`
                  absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-kyoto-cream 
                  ${item.type === 'food' ? 'bg-kyoto-pink' : item.type === 'transport' ? 'bg-kyoto-green' : 'bg-kyoto-brown'}
                `}></div>
                
                {/* Card */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-kyoto-sand/50 transition-all duration-200 relative overflow-hidden active:scale-[0.99]">
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-kyoto-brown/60 text-sm font-medium">
                      <Clock size={14} className="mr-1" />
                      {item.time}
                    </div>
                    <Icon size={18} className="text-kyoto-brown/40" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-kyoto-dark-brown mb-1 pr-4">{item.title}</h3>
                  
                  {item.location && (
                    <p className="text-sm text-kyoto-brown/70 mb-1 flex items-start">
                      <span className="mr-1">📍</span> {item.location}
                    </p>
                  )}
                  
                  {item.note && (
                    <div className="mt-3 bg-kyoto-sand/60 border-l-2 border-kyoto-green/60 p-3 rounded-r-xl rounded-l-sm text-xs text-kyoto-dark-brown font-medium leading-relaxed">
                      💡 {item.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* End of day marker */}
          <div className="relative pl-8 pb-4">
             <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-kyoto-brown/20"></div>
             <div className="text-sm text-kyoto-brown/40 font-medium italic">今日行程結束</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;