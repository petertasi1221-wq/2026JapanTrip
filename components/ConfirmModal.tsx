import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-kyoto-dark-brown/40 backdrop-blur-sm animate-fade-in" onClick={onCancel}></div>
      <div className="bg-kyoto-cream w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden z-10 animate-fade-in-up border border-white/50">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-kyoto-dark-brown mb-3">{title}</h3>
          <p className="text-kyoto-brown/70 leading-relaxed mb-8">{message}</p>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              className="w-full bg-red-400 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-red-500 transition-colors active:scale-95"
            >
              確定刪除
            </button>
            <button 
              onClick={onCancel}
              className="w-full bg-kyoto-sand text-kyoto-brown font-bold py-4 rounded-2xl hover:bg-kyoto-sand/80 transition-colors active:scale-95"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;