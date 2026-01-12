import React from 'react';
import { getIconForType } from '../constants';
import { MapPin, Clock } from 'lucide-react';
import { DayItinerary } from '../types';

interface ItineraryViewProps {
  dayData?: DayItinerary;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ dayData }) => {
  if (!dayData) return <div className="p-10 text-center text-kyoto-brown/30 font-handwriting">日記載入中... 🌸</div>;

  const getRotation = (index: number) => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-0.5', '-rotate-0.5'];
    return rotations[index % rotations.length];
  };

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-2">
             <span className="bg-kyoto-green/20 text-kyoto-dark-brown px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 font-lively tracking-wide">
               <MapPin size={14} /> {dayData.city === 'Airport' ? '機場' : dayData.city === 'Kyoto' ? '京都' : dayData.city === 'Osaka' ? '大阪' : dayData.city === 'Nara' ? '奈良' : dayData.city}
             </span>
             <span className="text-kyoto-brown/50 text-xs font-bold font-handwriting tracking-widest uppercase">{dayData.dayLabel}</span>
          </div>
        </div>

        <div className="relative border-l-2 border-kyoto-brown/10 ml-3 space-y-12">
          {dayData.items.map((item, index) => {
            const Icon = getIconForType(item.type);
            const rotation = getRotation(index);
            
            return (
              <div 
                key={item.id} 
                className={`relative pl-8 group animate-fade-in-up ${rotation}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                <div className={`
                  absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-kyoto-cream z-10 shadow-sm
                  ${item.type === 'food' ? 'bg-kyoto-pink' : item.type === 'transport' ? 'bg-kyoto-green' : 'bg-kyoto-brown'}
                `}></div>
                
                <div className="relative">
                  {/* 標記膠帶裝飾 */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 opacity-60 z-20 mix-blend-multiply
                    ${index % 3 === 0 ? 'bg-kyoto-pink/80 -rotate-2' : index % 3 === 1 ? 'bg-kyoto-green/80 rotate-3' : 'bg-orange-200/80 -rotate-1'}
                  `}></div>

                  <div className="bg-white p-6 rounded-lg shadow-[5px_5px_0px_rgba(141,110,99,0.05)] border border-kyoto-sand transition-all duration-300 relative overflow-hidden active:scale-[0.98] hover:shadow-[8px_8px_0px_rgba(141,110,99,0.08)]">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center text-kyoto-brown/50 text-sm font-bold tracking-tighter">
                          <Clock size={15} className="mr-1.5" />
                          {item.time}
                        </div>
                        <div className="bg-kyoto-sand/30 p-1.5 rounded-full">
                          <Icon size={16} className="text-kyoto-brown/40" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-medium text-kyoto-dark-brown mb-2 leading-tight font-lively tracking-wider">
                        {item.title}
                      </h3>
                      
                      {item.note && (
                        <div className="mt-4 relative">
                          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-kyoto-pink/40 rounded-full"></div>
                          <div className="pl-3 py-1 text-base text-kyoto-dark-brown/90 font-handwriting leading-relaxed">
                             {item.note}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;