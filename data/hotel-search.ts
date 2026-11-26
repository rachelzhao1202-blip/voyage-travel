import { hotelRegion } from './offer-regions';
import type { HotelOffer } from './hotels';

const tokens: Record<string, string> = {
  香港: 'Hong Kong 港岛 九龙 九龍 尖沙咀', 广州: 'Guangzhou 廣州',
  深圳: 'Shenzhen', 澳门: 'Macao Macau 澳門', 珠海: 'Zhuhai',
  杭州: 'Hangzhou', 苏州: 'Suzhou 蘇州', 上海: 'Shanghai',
  三亚: 'Sanya 三亞', 北京: 'Beijing', 南京: 'Nanjing',
  粤港澳: '大湾区 粵港澳 大灣區 Greater Bay Area', 江浙沪: '长三角 江浙滬 長三角',
};
const normalize = (s: string) => s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const terms = (s: string) => [s, ...(tokens[s]?.split(' ') || [])];
export const isSearchDate = (s: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s;

export function matchesHotelSearch(query: string, city: string, region: string, ...names: string[]) {
  const key = normalize(query);
  if (!key) return true;
  return [...terms(city), ...terms(region), ...names].some((value) => normalize(value).includes(key))
    || (key === 'greaterbayarea' && region === '粤港澳')
    || (key === 'hongkong' && city === '香港');
}

// An expiry date is not an available night. Use it only to resolve the year
// of an explicitly dated, single-night label that matches the same day/month.
export function hasConfirmedStayNight(offer: HotelOffer, date: string) {
  if (!date) return true;
  if (offer.availableDates?.length) return offer.availableDates.includes(date);
  if (offer.filterDates?.length) return offer.filterDates.includes(date);
  if (offer.checkIn) {
    return date === offer.checkIn
      || Boolean(offer.checkOut && offer.dateLabel?.includes('可按晚拆订') && date >= offer.checkIn && date < offer.checkOut);
  }
  const [year, month, day] = date.split('-');
  const exact = new RegExp(`^(?:${year}年)?${Number(month)}月${Number(day)}日入住(?:$|[ ·，])`);
  return date === offer.expiresOn && exact.test(offer.dateLabel || '');
}

export function contractHotelCity(group: string, name: string) {
  if (group === '苏杭') {
    if (name.startsWith('杭州')) return '杭州';
    if (name.startsWith('苏州')) return '苏州';
  }
  return group;
}

export function contractHotelRegion(group: string, city: string) {
  return group === '海外' ? '海外' : group === '苏杭' ? '江浙沪' : hotelRegion(city);
}

export function formatHotelPrice(value: string | number) {
  const str = String(value).trim();
  if (!str) return '价格请询';
  return `¥${str.replace(/\d{4,}(?:\.\d+)?/g, (amount) => {
    const [whole, fraction] = amount.split('.');
    return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (fraction === undefined ? '' : '.' + fraction);
  })}`;
}
