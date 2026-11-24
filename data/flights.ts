import type { OfferRegion } from './offer-regions';

export type FlightOffer = {
  id: string;
  route: string;
  origin?: string;
  destination?: string;
  travelDates?: string[];
  region?: OfferRegion;
  travelPeriod: string;
  cabin: string;
  price: string;
  priceLabel?: string;
  note?: string;
  stock?: number;
  expiresOn?: string;
  featured?: boolean;
  highlight?: string;
  status: 'available' | 'limited' | 'soldout';
};

// 2026-10-28 用户提供的商务舱清单；公开字段只保留售价。
const businessFlightOffers: FlightOffer[] = [
  {
    "id": "business-20261028-15",
    "origin": "新加坡",
    "destination": "香港",
    "route": "新加坡 → 香港",
    "region": "海外",
    "travelPeriod": "日期请询",
    "cabin": "商务舱",
    "price": "3773",
    "status": "available"
  },
  {
    "id": "business-20261028-30",
    "origin": "香港",
    "destination": "新加坡",
    "route": "香港 → 新加坡",
    "region": "海外",
    "travelPeriod": "日期请询",
    "cabin": "商务舱",
    "price": "3773",
    "status": "available"
  }
];

// 仅展示用户提供并明确要求发布的机票特价。
export const flightOffers: FlightOffer[] = [
  {
    id: 'air-china-new-york-washington-beijing-premium-20261106',
    route: '纽约 / 华盛顿 → 北京',
    origin: '纽约/华盛顿',
    destination: '北京',
    region: '海外',
    travelPeriod: '出发日期请询',
    cabin: '国航 · 公务舱 / 头等舱',
    price: '2XXXX起',
    note: '具体舱位价格请询；可开票，类型及条件请确认；税费、行李及退改规则请询。其他航线也可咨询。',
    status: 'available',
  },
  ...businessFlightOffers,
  {
    id: 'greater-bay-domestic-ctrip-tax-inclusive-discount',
    route: '粤港澳五城 ↔ 国内 · 单程',
    region: '粤港澳',
    travelPeriod: '7天内的机票',
    cabin: '携程含税机票',
    price: '9折',
    priceLabel: '9折',
    note: '单张票价须超过¥1500；出发地或目的地任一端为澳门、香港、珠海、广州、深圳即可。',
    status: 'available',
  },
  {
    id: 'macau-third-country-ctrip-tax-inclusive-discount',
    route: '澳门 ↔ 第三国 · 单程',
    region: '海外',
    travelPeriod: '7天内的机票',
    cabin: '携程含税机票',
    price: '9折',
    priceLabel: '9折',
    note: '单张票价须超过¥1500；支持澳门至第三国或第三国至澳门的单程票。',
    status: 'available',
  },
  {
    id: 'china-london-business-nov-dec-2026',
    route: '国内直飞伦敦',
    region: '海外',
    travelPeriod: '2026年11月–12月 · 具体日期请询',
    cabin: '商务舱',
    price: '8XXX',
    note: '可免费接驳国内多个城市 · 可接连体',
    expiresOn: '2026-12-31',
    status: 'available',
  },
];
