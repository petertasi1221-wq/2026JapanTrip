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
      { id: 'd1-1', time: '10:10', title: '抵達關西機場 (KIX)', type: 'transport', note: '入境、領行李、搭乘 HARUKA' },
      { id: 'd1-2', time: '13:30', title: '京都 TUNE STAY Check-in', type: 'hotel', note: 'Check-in 放行李' },
      { id: 'd1-3', time: '14:30', title: '伏見稻荷周邊商店', type: 'activity', note: '先吃點東西' },
      { id: 'd1-4', time: '16:00', title: '荒木神社 -> 伏見稻荷大社', type: 'activity', note: '荒木17:00休息；稻荷爬鳥居' },
      { id: 'd1-5', time: '19:00', title: '旅館周邊居酒屋用餐', type: 'food', note: '吃完視時間逛 Yodobashi、唐吉訶德' },
    ]
  },
  {
    date: '2026-04-12',
    weekday: '週日',
    dayLabel: '第 2 天',
    city: 'Nara',
    items: [
      { id: 'd2-1', time: '08:00', title: '前往奈良', type: 'transport', note: 'JR奈良線奈良站' },
      { id: 'd2-2', time: '09:30', title: '興福寺 -> 奈良公園', type: 'activity', note: '途中會經過許多地方可以吃飯' },
      { id: 'd2-3', time: '12:00', title: '東大寺', type: 'activity', note: '大佛必拍' },
      { id: 'd2-4', time: '13:30', title: '春日大社', type: 'activity', note: '燈籠海' },
      { id: 'd2-5', time: '16:00', title: '回京都車站 -> Aeon Mall', type: 'activity', note: '包山包海的大型商場' },
    ]
  },
  {
    date: '2026-04-13',
    weekday: '週一',
    dayLabel: '第 3 天',
    city: 'Kyoto',
    items: [
      { id: 'd3-1', time: '08:00', title: '前往嵐山', type: 'transport', note: 'JR 嵯峨野線->馬堀站' },
      { id: 'd3-2', time: '09:30', title: '嵐山觀光小火車', type: 'transport', note: '龜岡站->嵐山站' },
      { id: 'd3-3', time: '10:30', title: '嵐山', type: 'activity', note: '一路往渡月橋走，逛街至傍晚' },
      { id: 'd3-4', time: '17:00', title: '仁和寺 -> 北野天滿宮', type: 'activity', note: '嵐電（京福電鐵）' },
      { id: 'd3-5', time: '19:00', title: '旅館旁鳥貴族晚餐', type: 'food', note: '吃完可逛唐吉訶德' },
    ]
  },
  {
    date: '2026-04-14',
    weekday: '週二',
    dayLabel: '第 4 天',
    city: 'Kyoto',
    items: [
      { id: 'd4-1', time: '08:00', title: '飯店出發', type: 'activity', note: '前往和服店' },
      { id: 'd4-2', time: '10:00', title: '和服體驗換和服', type: 'activity', note: '這邊兩組暫時分開' },
      { id: 'd4-3', time: '12:00', title: '圓山公園各自拍照', type: 'activity', note: '視情況可能改拍照地點' },
      { id: 'd4-4', time: '13:00', title: '集合', type: 'activity', note: '當天決定和服穿脫' },
      { id: 'd4-5', time: '15:00', title: '八坂神社 -> 二三年坂 -> 清水寺', type: 'activity', note: '逛、買、吃' },
      { id: 'd4-6', time: '16:30', title: '二三年坂 -> 八坂神社 -> 花見小路', type: 'activity', note: '逛、買、吃' },
      { id: 'd4-7', time: '18:00', title: '河原町商店街', type: 'activity', note: '逛、買、吃' },
    ]
  },
  {
    date: '2026-04-15',
    weekday: '週三',
    dayLabel: '第 5 天',
    city: 'Kyoto',
    items: [
      { id: 'd5-1', time: '08:00', title: '前往宇治', type: 'transport', note: 'JR奈良線宇治站' },
      { id: 'd5-2', time: '09:00', title: '平等院 (鳳凰堂)', type: 'activity', note: '周邊逛街採買' },
      { id: 'd5-3', time: '12:30', title: '搭乘京阪電車', type: 'transport', note: '往出町柳方向' },
      { id: 'd5-4', time: '13:30', title: '鴨川跳烏龜 -> 河合神社 -> 下鴨神社', type: 'activity', note: '鴨川漂亮；河合鏡子御守；下鴨四季御守' },
      { id: 'd5-5', time: '15:00', title: '河原町商店街', type: 'activity', note: '逛街、吃飯' },
    ]
  },
  {
    date: '2026-04-16',
    weekday: '週四',
    dayLabel: '第 6 天',
    city: 'Osaka',
    items: [
      { id: 'd6-1', time: '09:00', title: '退房', type: 'hotel', note: '旅館可以寄放行李' },
      { id: 'd6-2', time: '10:00', title: '因幡堂 (平等寺)', type: 'activity', note: '貓狗御守' },
      { id: 'd6-3', time: '11:00', title: '錦市場', type: 'food', note: '吃海鮮囉' },
      { id: 'd6-4', time: '15:00', title: '京都車站', type: 'transport', note: '回旅館拿行李 -> 搭車前往大阪' },
      { id: 'd6-5', time: '16:00', title: '大阪民宿 Check-in', type: 'hotel', note: '花園町站最近' },
      { id: 'd6-6', time: '18:00', title: '通天閣、新世界商店街', type: 'activity', note: '吃飯' },
      { id: 'd6-7', time: '20:00', title: '隨意逛逛', type: 'activity', note: '當天決定' },
    ]
  },
  {
    date: '2026-04-17',
    weekday: '週五',
    dayLabel: '第 7 天',
    city: 'Osaka',
    items: [
      { id: 'd7-1', time: '08:00', title: '民宿出發', type: 'transport', note: '四橋線 (花園町->大國町) -> 御堂筋線 (大國町->箕面萱野)' },
      { id: 'd7-2', time: '10:00', title: '勝尾寺', type: 'activity', note: '搭計程車上山' },
      { id: 'd7-3', time: '13:00', title: '移動至神戶', type: 'transport', note: '梅田轉車 (要到1樓), JR神戶線 (梅田->三宮)' },
      { id: 'd7-4', time: '14:30', title: '生田神社 -> 北野異人館 -> 天滿宮', type: 'activity', note: '逛、吃' },
      { id: 'd7-5', time: '17:00', title: '摩耶山', type: 'activity', note: '搭計程車前往纜車處；看夜景' },
      { id: 'd7-6', time: '18:30', title: '馬賽克廣場', type: 'activity', note: '逛街、吃飯' },
      { id: 'd7-7', time: '20:00', title: '美利堅公園', type: 'activity', note: '散步、BE KOBE拍照' },
      { id: 'd7-8', time: '21:00', title: '回大阪', type: 'transport', note: '搭車當天查' },
    ]
  },
  {
    date: '2026-04-18',
    weekday: '週六',
    dayLabel: '第 8 天',
    city: 'Osaka',
    items: [
      { id: 'd8-1', time: '08:00', title: '民宿出發', type: 'transport', note: '四橋線 (花園町->大國町)' },
      { id: 'd8-2', time: '09:00', title: '難波八阪神社', type: 'activity', note: '超大獅子頭' },
      { id: 'd8-3', time: '10:00', title: '木津市場', type: 'food', note: '吃海鮮囉' },
      { id: 'd8-4', time: '11:00', title: '日本橋電氣街', type: 'activity', note: '動漫街' },
      { id: 'd8-5', time: '14:00', title: '道頓堀、心齋橋', type: 'activity', note: '逛街' },
      { id: 'd8-6', time: '19:00', title: '晚餐：燒肉力丸', type: 'food', note: '和牛吃到飽' },
    ]
  },
  {
    date: '2026-04-19',
    weekday: '週日',
    dayLabel: '第 9 天',
    city: 'Osaka',
    items: [
      { id: 'd9-1', time: '09:00', title: '民宿出發', type: 'transport', note: '四橋線 (花園町->西梅田)' },
      { id: 'd9-2', time: '10:00', title: '露天神社', type: 'activity', note: '情侶愛來' },
      { id: 'd9-3', time: '11:30', title: '壽喜燒 (しゃぶ禪 梅田店)', type: 'food', note: '和牛吃到飽' },
      { id: 'd9-4', time: '13:30', title: '道頓堀、心齋橋 愛電王 (難波總店)', type: 'activity', note: '逛街；兩對可能分開逛' },
      { id: 'd9-5', time: '19:00', title: '晚餐：超市採購 -> 返回民宿', type: 'food', note: '開趴' },
    ]
  },
  {
    date: '2026-04-20',
    weekday: '週一',
    dayLabel: '第 10 天',
    city: 'Airport',
    items: [
      { id: 'd10-0', time: '10:00', title: '退房', type: 'hotel', note: '搭南海電鐵' },
      { id: 'd10-1', time: '11:30', title: '臨空城站', type: 'transport', note: '老地方寄放行李' },
      { id: 'd10-2', time: '12:00', title: '臨空城', type: 'activity', note: '吃完午餐後開始逛街' },
      { id: 'd10-3', time: '16:30', title: '前往關西機場 (KIX) 報到', type: 'transport', note: '南海坐一站很近' },
      { id: 'd10-4', time: '18:30', title: '起飛回台', type: 'transport', note: '回家了鳴鳴鳴' },
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