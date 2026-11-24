export const offerRegions = ['全部', '粤港澳', '江浙沪', '国内其他', '海外'] as const;
export type OfferRegion = Exclude<(typeof offerRegions)[number], '全部'>;

const greaterBayCities = new Set(['广州', '深圳', '香港', '澳门', '珠海', '佛山', '东莞', '惠州', '中山', '江门', '肇庆']);
const eastChinaCities = new Set(['上海', '杭州', '苏州', '南京', '常州', '莫干山', '德清', '湖州', '无锡', '宁波', '绍兴', '嘉兴', '丽水', '扬州', '镇江', '徐州', '南通', '温州', '台州', '金华', '舟山', '衢州', '连云港', '盐城', '淮安', '宿迁', '泰州']);
const overseasCities = new Set(['曼谷', '济州岛', '新加坡', '悉尼', '吉隆坡', '富国岛', '东京', '首尔', '马尔代夫', '大阪', '伦敦', '巴黎']);

export function hotelRegion(city: string, explicit?: OfferRegion): OfferRegion {
  if (explicit) return explicit;
  if (greaterBayCities.has(city)) return '粤港澳';
  if (eastChinaCities.has(city)) return '江浙沪';
  if (overseasCities.has(city)) return '海外';
  return '国内其他';
}
