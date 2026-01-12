import React, { useState } from 'react';
import { getIconForType } from '../constants';
import { MapPin, Clock, Plus, X, Trash2 } from 'lucide-react';
import { DayItinerary, ItineraryItem } from '../types';

interface ItineraryViewProps {
  dayData?: DayItinerary;
  onAddItem: (item: ItineraryItem) => void;
  onDeleteItem: (itemId: string) => void;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ dayData, onAddItem, onDeleteItem }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ItineraryItem>>({
    type: 'activity',
    time: '12:00',
    title: '',
    location: '',
    note: ''
  });

  if (!dayData) return <div className="p-6 text-center text-kyoto-brown/50">沒有資料</div>;

  const handleSaveItem = () => {
    if (!newItem.title || !newItem.time) return;

    const item: ItineraryItem = {
      id: Date.now().toString(),
      time: newItem.time,
      title: newItem.title,
      type: newItem.type as any,
      location: newItem.location,
      note: newItem.note
    };

    onAddItem(item);
    setIsAdding(false);
    setNewItem({
      type: 'activity',
      time: '12:00',
      title: '',
      location: '',
      note: ''
    });
  };

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
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-kyoto-sand/50 transition-all duration-200 relative overflow-hidden active:scale-[0.99] active:shadow-none">
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-kyoto-brown/60 text-sm font-medium">
                      <Clock size={14} className="mr-1" />
                      {item.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-kyoto-brown/40" />
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('確定要刪除這個行程嗎？')) {
                              onDeleteItem(item.id);
                          }
                        }}
                        className="text-kyoto-sand hover:text-red-400 hover:bg-red-50 transition-all p-2 -mr-2 -mt-2 rounded-full active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-kyoto-dark-brown mb-1 pr-4">{item.title}</h3>
                  
                  {item.location && (
                    <p className="text-sm text-kyoto-brown/70 mb-1 flex items-start">
                      <span className="mr-1">📍</span> {item.location}
                    </p>
                  )}
                  
                  {item.note && (
                    <div className="mt-3 bg-kyoto-sand/30 p-2 rounded-xl text-xs text-kyoto-brown/80 italic">
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

        {/* Floating Add Button */}
        <button 
          onClick={() => setIsAdding(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-kyoto-dark-brown text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30"
        >
          <Plus size={28} />
        </button>
      </div>

      {/* Add Item Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-kyoto-cream w-full max-w-md p-6 rounded-t-3xl sm:rounded-3xl shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-kyoto-dark-brown">新增行程</h3>
              <button onClick={() => setIsAdding(false)} className="bg-kyoto-sand p-2 rounded-full text-kyoto-brown">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-4">
              <div>
                <label className="block text-sm font-bold text-kyoto-brown/60 mb-1">類型</label>
                <div className="flex gap-2">
                  {[
                    { id: 'activity', label: '景點' },
                    { id: 'food', label: '美食' },
                    { id: 'transport', label: '交通' },
                    { id: 'hotel', label: '住宿' }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setNewItem({...newItem, type: type.id as any})}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${newItem.type === type.id ? 'bg-kyoto-dark-brown text-white' : 'bg-white text-kyoto-brown border border-kyoto-sand'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-kyoto-brown/60 mb-1">時間</label>
                  <input 
                    type="time" 
                    value={newItem.time}
                    onChange={e => setNewItem({...newItem, time: e.target.value})}
                    className="w-full bg-white border border-kyoto-sand rounded-xl px-3 py-3 text-kyoto-dark-brown focus:outline-none focus:border-kyoto-pink"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-kyoto-brown/60 mb-1">標題</label>
                  <input 
                    type="text" 
                    value={newItem.title}
                    onChange={e => setNewItem({...newItem, title: e.target.value})}
                    placeholder="例如：參觀金閣寺"
                    className="w-full bg-white border border-kyoto-sand rounded-xl px-4 py-3 text-kyoto-dark-brown focus:outline-none focus:border-kyoto-pink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-kyoto-brown/60 mb-1">地點 (選填)</label>
                <input 
                  type="text" 
                  value={newItem.location}
                  onChange={e => setNewItem({...newItem, location: e.target.value})}
                  placeholder="例如：京都站前"
                  className="w-full bg-white border border-kyoto-sand rounded-xl px-4 py-3 text-kyoto-dark-brown focus:outline-none focus:border-kyoto-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-kyoto-brown/60 mb-1">備註 (選填)</label>
                <textarea 
                  value={newItem.note}
                  onChange={e => setNewItem({...newItem, note: e.target.value})}
                  placeholder="重要資訊、預約代碼..."
                  className="w-full bg-white border border-kyoto-sand rounded-xl px-4 py-3 text-kyoto-dark-brown focus:outline-none focus:border-kyoto-pink resize-none h-20"
                />
              </div>

              <button 
                onClick={handleSaveItem}
                className="w-full bg-kyoto-pink text-kyoto-dark-brown font-bold text-lg py-4 rounded-2xl shadow-soft mt-4 hover:brightness-105 active:scale-95 transition-all"
              >
                確認新增
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryView;