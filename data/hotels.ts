import type { OfferRegion } from './offer-regions';

export type HotelRateOption = {
  date: string;
  detail: string;
  price: string;
  unit?: string;
};

export type HotelOffer = {
  id: string;
  hotel: string;
  englishName: string;
  city: string;
  cityEnglish: string;
  region?: OfferRegion;
  checkIn?: string;
  homepage?: boolean;
  checkOut?: string;
  dateLabel?: string;
  expiresOn?: string;
  expiresAt?: string;
  expiresMonth?: string;
  room: string;
  breakfast?: string;
  price: string;
  priceUnit?: string;
  referencePrice?: string;
  stock?: number;
  recommendation?: number;
  featured?: boolean;
  highlight?: string;
  filterDates?: string[];
  availableDates?: string[];
  rateOptions?: HotelRateOption[];
  status: 'available' | 'limited' | 'soldout';
  image?: string;
  imageViewport?: { x: number; y: number; width: number; height: number; sourceWidth: number; sourceHeight: number };
};

export function isHotelOfferCurrent(offer: HotelOffer, today: string): boolean {
  if (offer.status === 'soldout') return false;
  if (offer.expiresAt && Date.now() >= Date.parse(offer.expiresAt)) return false;
  if (!today) return true;
  if (offer.availableDates && !offer.availableDates.some((date) => date >= today)) return false;
  if (offer.expiresMonth) return offer.expiresMonth >= today.slice(0, 7);
  const expiry = offer.expiresOn || offer.checkIn;
  return !expiry || expiry >= today;
}

export function formatAvailableHotelDates(dates: string[], today: string): string {
  const months = new Map<string, string[]>();
  for (const date of [...new Set(dates)].filter((date) => date >= today).sort()) {
    const month = date.slice(0, 7);
    months.set(month, [...(months.get(month) || []), String(Number(date.slice(8)))]);
  }
  return [...months].map(([month, days]) =>
    `${month.slice(0, 4)}年${Number(month.slice(5))}月${days.join('、')}日`
  ).join('；') || '暂无可预约日期';
}

// 仅收录用户明确说“加入主页特价”的房源；其他资料保留在内部清单。
// 有截止日的项目会在日期过后自动从首页隐藏。
export const hotelOffers: HotelOffer[] = [
  {
    id: 'guangzhou-conrad-deluxe-20261207',
    hotel: '广州康莱德酒店',
    englishName: 'CONRAD GUANGZHOU',
    city: '广州',
    cityEnglish: 'GUANGZHOU',
    region: '粤港澳',
    homepage: true,
    dateLabel: '12月7日、8日相关房期 · 具体入住日期请询',
    expiresOn: '2026-12-08',
    room: '豪华房',
    breakfast: '不含早餐',
    price: '1149',
    priceUnit: '（计价待确认）',
    status: 'available',
  },
  {
    id: 'sanya-atlantis-ocean-202612',
    hotel: '三亚亚特兰蒂斯酒店',
    englishName: 'ATLANTIS SANYA',
    city: '三亚',
    cityEnglish: 'SANYA',
    region: '国内其他',
    homepage: true,
    dateLabel: '12月房期 · 具体入住日期请询',
    expiresOn: '2026-12-31',
    room: '海景房 · 升级至尊海景房或行政待遇以确认为准',
    price: '1800',
    priceUnit: '（计价待确认）',
    status: 'available',
  },
  {
    id: 'moganshan-naked-stables-earth-hut-20261125',
    hotel: '莫干山裸心谷',
    englishName: 'NAKED STABLES',
    city: '莫干山',
    cityEnglish: 'MOGANSHAN',
    region: '江浙沪',
    homepage: true,
    dateLabel: '房券 · 可用日期请询',
    room: '夯土小屋',
    breakfast: '双早',
    price: '1830',
    priceUnit: '（房券）',
    status: 'available',
  },
];
