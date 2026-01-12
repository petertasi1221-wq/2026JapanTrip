import React from 'react';
import { getIconForType } from '../constants';
import { MapPin, Clock } from 'lucide-react';
import { DayItinerary } from '../types';

interface ItineraryViewProps {
  dayData?: DayItinerary;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ dayData }) => {
  if (!dayData) return <div className="p-6 text-center text-kyoto-brown/50">沒有資料</div>;

  // 隨機旋轉角度，模擬手貼記事本的感覺
  const getRotation = (index: number) => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-0.5', '-rotate-0.5'];
    return rotations[index % rotations.length];
  };

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-2">
             <span className="bg-kyoto-green/20 text-kyoto-dark-brown px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
               <MapPin size={14} /> {dayData.city === 'Airport' ? '機場' : dayData.city === 'Kyoto' ? '京都' : dayData.city === 'Osaka' ? '大阪' : dayData.city === 'Nara' ? '奈良' : dayData.city}
             </span>
             <span className="text-kyoto-brown/50 text-sm font-medium">{dayLabel(dayData.dayLabel)}</span>
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
                {/* Timeline Dot */}
                <div className={`
                  absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-kyoto-cream z-10 shadow-sm
                  ${item.type === 'food' ? 'bg-kyoto-pink' : item.type === 'transport' ? 'bg-kyoto-green' : 'bg-kyoto-brown'}
                `}></div>
                
                {/* Card Container with Notebook Style */}
                <div className="relative">
                  {/* Paper Tape Decorative Element (和風紙膠帶) */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 opacity-60 z-20 mix-blend-multiply
                    ${index % 3 === 0 ? 'bg-kyoto-pink -rotate-2' : index % 3 === 1 ? 'bg-kyoto-green rotate-3' : 'bg-kyoto-sand -rotate-1'}
                  `}></div>

                  {/* The actual Card */}
                  <div className="bg-white p-6 rounded-lg shadow-[5px_5px_0px_rgba(141,110,99,0.05)] border border-kyoto-sand transition-all duration-300 relative overflow-hidden active:scale-[0.98] hover:shadow-[8px_8px_0px_rgba(141,110,99,0.08)] hover:-translate-y-1">
                    
                    {/* Subtle grid pattern for the paper */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center text-kyoto-brown/70 text-sm font-bold uppercase tracking-tighter">
                          <Clock size={14} className="mr-1.5" />
                          {item.time}
                        </div>
                        <div className="bg-kyoto-sand/30 p-1.5 rounded-full">
                          <Icon size={16} className="text-kyoto-brown/40" />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-kyoto-dark-brown mb-2 leading-tight">{item.title}</h3>
                      
                      {item.location && (
                        <p className="text-sm text-kyoto-brown/70 mb-2 flex items-start italic">
                          <span className="mr-1 opacity-60">📍</span> {item.location}
                        </p>
                      )}
                      
                      {item.note && (
                        <div className="mt-4 relative">
                          {/* Note with handwritten feel */}
                          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-kyoto-pink/40 rounded-full"></div>
                          <div className="pl-3 py-1 text-sm text-kyoto-dark-brown/80 font-medium leading-relaxed">
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
          
          {/* End of day marker */}
          <div 
            className="relative pl-8 pb-4 animate-fade-in"
            style={{ animationDelay: `${dayData.items.length * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
             <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-kyoto-brown/20"></div>
             <div className="text-sm text-kyoto-brown/40 font-medium italic pl-2 border-l border-kyoto-brown/10 ml-0.5">旅途回憶錄...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function dayLabel(label: string) {
  return label;
}

export default ItineraryView;