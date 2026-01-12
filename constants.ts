import { DayItinerary, User } from './types';
import { Plane, Coffee, Camera, Train, MapPin, Utensils, BedDouble } from 'lucide-react';

export const USERS: User[] = [
  { id: 'u1', name: '呈', avatarColor: 'bg-kyoto-pink' },
  { id: 'u2', name: '妤', avatarColor: 'bg-kyoto-green' },
  { id: 'u3', name: '睿', avatarColor: 'bg-orange-200' },
  { id: 'u4', name: '紅', avatarColor: 'bg-blue-200' },
];

export const TRIP_START_DATE = '2026-04-11';
export const TRIP_END_DATE = '2026-04-20';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    date: '2026-04-11',
    weekday: '週六',
    dayLabel: '第 1 天',
    city: 'Airport',
    items: [
      { id: '1', time: '10:30', title: '抵達關西機場', type: 'transport', location: 'Kansai Int. Airport' },
      { id: '2', time: '12:00', title: 'Haruka 特急往京都', type: 'transport', note: '第 4 月台' },
      { id: '3', time: '14:00', title: '飯店 Check-in', type: 'hotel', location: 'Hotel The Mitsui Kyoto' },
      { id: '4', time: '18:00', title: '先斗町晚餐', type: 'food', note: '已預約燒肉' },
    ]
  },
  {
    date: '2026-04-12',
    weekday: '週日',
    dayLabel: '第 2 天',
    city: 'Kyoto',
    items: [
      { id: '5', time: '08:00', title: '早晨咖啡', type: 'food', location: '% Arabica 東山' },
      { id: '6', time: '09:00', title: '清水寺參拜', type: 'activity', note: '先去租和服' },
      { id: '7', time: '12:30', title: '湯豆腐午餐', type: 'food', location: '奧丹清水' },
      { id: '8', time: '15:00', title: '二年坂逛街', type: 'activity' },
    ]
  },
  {
    date: '2026-04-13',
    weekday: '週一',
    dayLabel: '第 3 天',
    city: 'Kyoto',
    items: [
      { id: '9', time: '07:00', title: '嵐山竹林小徑', type: 'activity', note: '早點去拍照' },
      { id: '10', time: '11:00', title: '天龍寺', type: 'activity' },
      { id: '11', time: '13:00', title: '蕎麥麵午餐', type: 'food', location: '嵐山 吉村' },
    ]
  },
  {
    date: '2026-04-14',
    weekday: '週二',
    dayLabel: '第 4 天',
    city: 'Kyoto',
    items: [
      { id: '12', time: '10:00', title: '伏見稻荷大社', type: 'activity' },
      { id: '13', time: '13:00', title: '錦市場', type: 'food', note: '必吃章魚燒' },
    ]
  },
  {
    date: '2026-04-15',
    weekday: '週三',
    dayLabel: '第 5 天',
    city: 'Nara',
    items: [
      { id: '14', time: '09:00', title: '搭車前往奈良', type: 'transport' },
      { id: '15', time: '10:30', title: '奈良公園餵鹿', type: 'activity' },
      { id: '16', time: '12:00', title: '東大寺', type: 'activity' },
    ]
  },
  {
    date: '2026-04-16',
    weekday: '週四',
    dayLabel: '第 6 天',
    city: 'Osaka',
    items: [
      { id: '17', time: '10:00', title: '移動至大阪', type: 'transport' },
      { id: '18', time: '14:00', title: '大阪城公園', type: 'activity' },
      { id: '19', time: '19:00', title: '道頓堀吃美食', type: 'food' },
    ]
  },
  {
    date: '2026-04-17',
    weekday: '週五',
    dayLabel: '第 7 天',
    city: 'Osaka',
    items: [
      { id: '20', time: '08:30', title: '環球影城 USJ', type: 'activity', note: '10:00 瑪利歐園區入場' },
    ]
  },
  {
    date: '2026-04-18',
    weekday: '週六',
    dayLabel: '第 8 天',
    city: 'Osaka',
    items: [
      { id: '21', time: '11:00', title: '梅田藍天大廈', type: 'activity' },
      { id: '22', time: '15:00', title: '橘子街逛街', type: 'activity' },
    ]
  },
  {
    date: '2026-04-19',
    weekday: '週日',
    dayLabel: '第 9 天',
    city: 'Osaka',
    items: [
      { id: '23', time: '10:00', title: '黑門市場', type: 'food' },
      { id: '24', time: '14:00', title: '美國村', type: 'activity' },
    ]
  },
  {
    date: '2026-04-20',
    weekday: '週一',
    dayLabel: '第 10 天',
    city: 'Airport',
    items: [
      { id: '25', time: '09:00', title: '搭乘 Rapi:t 前往機場', type: 'transport' },
      { id: '26', time: '12:00', title: '搭機返家', type: 'transport' },
    ]
  },
];

export const getIconForType = (type: string) => {
  switch (type) {
    case 'transport': return Train;
    case 'food': return Utensils;
    case 'hotel': return BedDouble;
    case 'activity': return Camera;
    default: return MapPin;
  }
};