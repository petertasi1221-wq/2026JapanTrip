export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  location?: string;
  type: 'transport' | 'food' | 'activity' | 'hotel';
  note?: string;
}

export interface DayItinerary {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g., "Day 1"
  weekday: string; // e.g., "Sat"
  city: 'Kyoto' | 'Osaka' | 'Nara' | 'Airport';
  items: ItineraryItem[];
}

export interface User {
  id: string;
  name: string;
  avatarColor: string;
}

export interface Expense {
  id: string;
  payerId: string;
  amount: number;
  description: string;
  date: string;
  involvedUserIds: string[]; // Who splits this bill
}

export interface Balance {
  fromUserId: string;
  toUserId: string;
  fromUser: string;
  toUser: string;
  amount: number;
}