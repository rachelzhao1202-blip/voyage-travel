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
    "id": "gz-baiyun-nov27-bf-2026",
    "hotel": "广州白云万豪酒店",
    "englishName": "GUANGZHOU MARRIOTT HOTEL BAIYUN",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "大床房或双床房",
    "breakfast": "双早",
    "price": "700",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-baiyun-nov27-king-backup-2026",
    "hotel": "广州白云万豪酒店",
    "englishName": "GUANGZHOU MARRIOTT HOTEL BAIYUN",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "大床房 · 备选",
    "breakfast": "双早",
    "price": "800",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-baiyun-nov28-ro-2026",
    "hotel": "广州白云万豪酒店",
    "englishName": "GUANGZHOU MARRIOTT HOTEL BAIYUN",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "大床房或双床房",
    "breakfast": "无早",
    "price": "668",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-baiyun-dec03-05-2026",
    "hotel": "广州白云万豪酒店",
    "englishName": "GUANGZHOU MARRIOTT HOTEL BAIYUN",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03",
      "2026-12-04",
      "2026-12-05"
    ],
    "expiresOn": "2026-12-05",
    "room": "房型请询",
    "price": "700",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-baiyun-dec31-2026",
    "hotel": "广州白云万豪酒店",
    "englishName": "GUANGZHOU MARRIOTT HOTEL BAIYUN",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-31"
    ],
    "expiresOn": "2026-12-31",
    "room": "房型请询",
    "breakfast": "双早",
    "price": "788",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-ritz-nov27-tower-king-2026",
    "hotel": "广州丽思卡尔顿酒店",
    "englishName": "THE RITZ-CARLTON GUANGZHOU",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "行政塔景大床房 · 含酒廊",
    "price": "2848",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-ritz-nov27-tower-suite-2026",
    "hotel": "广州丽思卡尔顿酒店",
    "englishName": "THE RITZ-CARLTON GUANGZHOU",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "行政塔景套房 · 含酒廊",
    "price": "2958",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-ritz-dec03-tower-suite-2026",
    "hotel": "广州丽思卡尔顿酒店",
    "englishName": "THE RITZ-CARLTON GUANGZHOU",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03"
    ],
    "expiresOn": "2026-12-03",
    "room": "行政塔景套房 · 含酒廊",
    "price": "2958",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-ritz-dec03-city-suite-2026",
    "hotel": "广州丽思卡尔顿酒店",
    "englishName": "THE RITZ-CARLTON GUANGZHOU",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03"
    ],
    "expiresOn": "2026-12-03",
    "room": "行政城景套房 · 含酒廊",
    "price": "2848",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-ritz-dec03-tower-room-2026",
    "hotel": "广州丽思卡尔顿酒店",
    "englishName": "THE RITZ-CARLTON GUANGZHOU",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03"
    ],
    "expiresOn": "2026-12-03",
    "room": "行政塔景房 · 含酒廊",
    "price": "2848",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-ritz-dec31-tower-king-2026",
    "hotel": "广州丽思卡尔顿酒店",
    "englishName": "THE RITZ-CARLTON GUANGZHOU",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-31"
    ],
    "expiresOn": "2026-12-31",
    "room": "塔景大床房",
    "breakfast": "无早",
    "price": "3398",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec03-balcony-king-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03"
    ],
    "expiresOn": "2026-12-03",
    "room": "阳台大床房",
    "price": "1328",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec03-1br-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03"
    ],
    "expiresOn": "2026-12-03",
    "room": "单卧房型",
    "price": "1528",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec03-river-suite-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-03"
    ],
    "expiresOn": "2026-12-03",
    "room": "江景套房",
    "price": "1598",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec26-balcony-king-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-26"
    ],
    "expiresOn": "2026-12-26",
    "room": "阳台大床房",
    "price": "1328",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec31-a-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-31"
    ],
    "expiresOn": "2026-12-31",
    "room": "房型请询",
    "price": "2078",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec31-b-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-31"
    ],
    "expiresOn": "2026-12-31",
    "room": "房型请询",
    "price": "2298",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "gz-indigo-dec31-c-2026",
    "hotel": "广州海心沙英迪格酒店",
    "englishName": "HOTEL INDIGO GUANGZHOU HAIXINSHA",
    "city": "广州",
    "cityEnglish": "GUANGZHOU",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-12-31"
    ],
    "expiresOn": "2026-12-31",
    "room": "房型请询",
    "price": "2628",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kimpton-202611-ocean-flex",
    "hotel": "香港尖沙咀金普顿酒店",
    "englishName": "KIMPTON TSIM SHA TSUI HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-26",
      "2026-11-27",
      "2026-11-28",
      "2026-11-29"
    ],
    "expiresOn": "2026-11-29",
    "room": "海景房",
    "price": "3080",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kimpton-202611-ocean-bf",
    "hotel": "香港尖沙咀金普顿酒店",
    "englishName": "KIMPTON TSIM SHA TSUI HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-26"
    ],
    "expiresOn": "2026-11-26",
    "room": "海景房",
    "breakfast": "双早",
    "price": "2750",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kimpton-202611-premier-king",
    "hotel": "香港尖沙咀金普顿酒店",
    "englishName": "KIMPTON TSIM SHA TSUI HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "尊享海景大床房",
    "breakfast": "双早",
    "price": "3520",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kimpton-202611-premier-twin",
    "hotel": "香港尖沙咀金普顿酒店",
    "englishName": "KIMPTON TSIM SHA TSUI HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "尊享海景双床房",
    "breakfast": "双早",
    "price": "3740",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kimpton-202611-ocean-ro",
    "hotel": "香港尖沙咀金普顿酒店",
    "englishName": "KIMPTON TSIM SHA TSUI HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "海景房",
    "breakfast": "无早",
    "price": "3300",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kimpton-202611-premier-bf",
    "hotel": "香港尖沙咀金普顿酒店",
    "englishName": "KIMPTON TSIM SHA TSUI HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "尊享海景房",
    "breakfast": "双早",
    "price": "3850",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-regent-202611-harbour",
    "hotel": "香港丽晶酒店",
    "englishName": "REGENT HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-26",
      "2026-11-27"
    ],
    "expiresOn": "2026-11-27",
    "room": "维港景观房",
    "price": "6050",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-skycity-202611-nov28",
    "hotel": "香港天际万豪酒店",
    "englishName": "HONG KONG SKYCITY MARRIOTT HOTEL",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "房型请询",
    "price": "2750",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-skycity-202611-nov29",
    "hotel": "香港天际万豪酒店",
    "englishName": "HONG KONG SKYCITY MARRIOTT HOTEL",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-29"
    ],
    "expiresOn": "2026-11-29",
    "room": "房型请询",
    "price": "2198.90",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kerry-202611-deluxe-king",
    "hotel": "香港嘉里酒店",
    "englishName": "KERRY HOTEL, HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27",
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "超豪华大床房",
    "breakfast": "双早",
    "price": "2860",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kerry-202611-harbour",
    "hotel": "香港嘉里酒店",
    "englishName": "KERRY HOTEL, HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27",
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "海景房",
    "breakfast": "双早",
    "price": "3080",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-kerry-202611-deluxe-twin",
    "hotel": "香港嘉里酒店",
    "englishName": "KERRY HOTEL, HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27",
      "2026-11-28",
      "2026-11-29",
      "2026-11-30"
    ],
    "expiresOn": "2026-11-30",
    "room": "超豪华双床房",
    "breakfast": "双早",
    "price": "3080",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-grand-202611-deluxe-twin",
    "hotel": "香港君悦酒店",
    "englishName": "GRAND HYATT HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27",
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "豪华双床房",
    "breakfast": "双早",
    "price": "2860",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-grand-202611-club-king",
    "hotel": "香港君悦酒店",
    "englishName": "GRAND HYATT HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27",
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "嘉宾轩大床房",
    "breakfast": "双早",
    "price": "3410",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
  {
    "id": "hk-w-202611-ocean",
    "hotel": "香港 W 酒店",
    "englishName": "W HONG KONG",
    "city": "香港",
    "cityEnglish": "HONG KONG",
    "region": "粤港澳",
    "homepage": true,
    "availableDates": [
      "2026-11-27",
      "2026-11-28"
    ],
    "expiresOn": "2026-11-28",
    "room": "海景房",
    "breakfast": "双早",
    "price": "3080",
    "priceUnit": "人民币 / 晚",
    "status": "available"
  },
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
  {
    id: "shenzhen-qianhai-jw-twin-20261126",
    hotel: "深圳前海华侨城 JW 万豪酒店",
    englishName: "JW MARRIOTT HOTEL SHENZHEN BAO’AN",
    city: "深圳",
    cityEnglish: "SHENZHEN",
    region: "粤港澳",
    dateLabel: "11月26日入住",
    expiresOn: "2026-11-26",
    room: "主楼双床房",
    price: "1250",
    priceUnit: "（计价请询）",
    homepage: true,
    status: "available",
  },
  {
    id: "shenzhen-qianhai-jw-sunrise-20261126",
    hotel: "深圳前海华侨城 JW 万豪酒店",
    englishName: "JW MARRIOTT HOTEL SHENZHEN BAO’AN",
    city: "深圳",
    cityEnglish: "SHENZHEN",
    region: "粤港澳",
    dateLabel: "11月26日入住",
    expiresOn: "2026-11-26",
    room: "光之翼大床房",
    price: "1150",
    priceUnit: "（计价请询）",
    homepage: true,
    status: "available",
  },
  {
    id: "shenzhen-qianhai-le-meridien-20261126",
    hotel: "深圳前海华侨城艾美酒店",
    englishName: "LE MÉRIDIEN SHENZHEN, BAO’AN",
    city: "深圳",
    cityEnglish: "SHENZHEN",
    region: "粤港澳",
    dateLabel: "11月26日入住",
    expiresOn: "2026-11-26",
    room: "大床房",
    price: "1050",
    priceUnit: "（计价请询）",
    homepage: true,
    status: "available",
  },
  {
    id: "shenzhen-park-hyatt-20261127",
    hotel: "深圳柏悦酒店",
    englishName: "PARK HYATT SHENZHEN",
    city: "深圳",
    cityEnglish: "SHENZHEN",
    region: "粤港澳",
    dateLabel: "11月27日入住",
    expiresOn: "2026-11-27",
    room: "房型请询",
    price: "2200",
    priceUnit: "（计价请询）",
    homepage: true,
    status: "available",
  },
  {
    id: "guangzhou-grand-hyatt-20261128",
    hotel: "广州君悦酒店",
    englishName: "GRAND HYATT GUANGZHOU",
    city: "广州",
    cityEnglish: "GUANGZHOU",
    region: "粤港澳",
    dateLabel: "11月28日入住",
    expiresOn: "2026-11-28",
    room: "房型请询",
    breakfast: "双早",
    price: "1399",
    priceUnit: "（计价请询）",
    homepage: true,
    status: "available",
  },
  {
    id: "shenzhen-xiangmihu-intercontinental-dec-jan-2026",
    hotel: "深圳国际交流中心洲际酒店（香蜜湖）",
    englishName: "INTERCONTINENTAL SHENZHEN ICSZ",
    city: "深圳",
    cityEnglish: "SHENZHEN",
    region: "粤港澳",
    dateLabel: "2026年12月至2027年1月 · 具体可住日期请询",
    expiresOn: "2027-01-31",
    room: "大床房、双床房同价",
    breakfast: "双早",
    price: "1400",
    priceUnit: "起 / 晚",
    homepage: true,
    status: "available",
  },
  {
    id: "zhuhai-mgm-reserve-lakeside-202710",
    hotel: "珠海美高梅华府",
    englishName: "MGM RESERVE ZHUHAI",
    city: "珠海",
    cityEnglish: "ZHUHAI",
    region: "粤港澳",
    dateLabel: "有效至2027年10月 · 周一至周日可用，法定节假日除外",
    expiresMonth: "2027-10",
    room: "249㎡ 湖隐池畔泳池套房别墅",
    breakfast: "双早",
    price: "4180",
    priceUnit: "（计价请询）",
    homepage: true,
    status: "available",
  },
  {
    id: "hk-harbourview-intercontinental-20261130",
    hotel: "香港海景嘉福洲际酒店",
    englishName: "INTERCONTINENTAL GRAND STANFORD HONG KONG",
    city: "香港",
    cityEnglish: "HONG KONG",
    region: "粤港澳",
    homepage: true,
    checkIn: "2026-11-30",
    checkOut: "2026-12-07",
    expiresOn: "2026-12-06",
    dateLabel: "11月30日入住至12月7日退房 · 可按晚拆订",
    room: "房型请询",
    breakfast: "双早",
    price: "1400",
    priceUnit: "人民币 / 晚",
    status: "available",
  },
  {
    id: "hk-harbourview-intercontinental-20261217",
    hotel: "香港海景嘉福洲际酒店",
    englishName: "INTERCONTINENTAL GRAND STANFORD HONG KONG",
    city: "香港",
    cityEnglish: "HONG KONG",
    region: "粤港澳",
    homepage: true,
    checkIn: "2026-12-17",
    checkOut: "2026-12-19",
    expiresOn: "2026-12-18",
    dateLabel: "12月17日入住至12月19日退房 · 可按晚拆订",
    room: "房型请询",
    breakfast: "双早",
    price: "1400",
    priceUnit: "人民币 / 晚",
    status: "available",
  },
  {
    id: "hk-kimpton-tsim-sha-tsui-20261204",
    hotel: "香港尖沙咀金普顿酒店",
    englishName: "KIMPTON TSIM SHA TSUI HONG KONG",
    city: "香港",
    cityEnglish: "HONG KONG",
    region: "粤港澳",
    homepage: true,
    checkIn: "2026-12-04",
    checkOut: "2026-12-06",
    expiresOn: "2026-12-05",
    dateLabel: "12月4日入住至12月6日退房 · 可按晚拆订",
    room: "房型请询",
    breakfast: "双早",
    price: "2600",
    priceUnit: "人民币 / 晚",
    status: "available",
  },
  {
    id: "hk-kimpton-tsim-sha-tsui-20261217",
    hotel: "香港尖沙咀金普顿酒店",
    englishName: "KIMPTON TSIM SHA TSUI HONG KONG",
    city: "香港",
    cityEnglish: "HONG KONG",
    region: "粤港澳",
    homepage: true,
    checkIn: "2026-12-17",
    checkOut: "2026-12-19",
    expiresOn: "2026-12-18",
    dateLabel: "12月17日入住至12月19日退房 · 可按晚拆订",
    room: "房型请询",
    breakfast: "双早",
    price: "2200",
    priceUnit: "人民币 / 晚",
    status: "available",
  },
  {
    id: "hk-the-hari-20261214",
    hotel: "香港夏利酒店",
    englishName: "THE HARI HONG KONG",
    city: "香港",
    cityEnglish: "HONG KONG",
    region: "粤港澳",
    homepage: true,
    checkIn: "2026-12-14",
    checkOut: "2026-12-18",
    expiresOn: "2026-12-17",
    dateLabel: "12月14日入住至12月18日退房 · 可按晚拆订",
    room: "房型请询",
    breakfast: "双早",
    price: "1400",
    priceUnit: "人民币 / 晚",
    status: "available",
  },
];

