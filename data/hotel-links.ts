// Public Ctrip hotel detail pages verified by the exact hotel name and destination.
const ctripIds: Record<string, number> = {
  '广州白云万豪': 108243856, '广州白云越秀万豪': 108243856,
  '广州丽思卡尔顿': 346943, '广州丽思': 346943,
  '广州海心沙英迪格': 107151174, '广州君悦': 344853, '广州康莱德': 7530310,
  '香港尖沙咀金普顿': 130238078, '香港金普顿': 130238078,
  '香港丽晶': 106246325, '香港天际万豪': 344959, '香港嘉里': 6486217,
  '香港君悦': 344917, '香港w': 426542, '香港海景嘉福洲际': 344922,
  '香港夏利': 70797554,
  '三亚亚特兰蒂斯': 14249344, '莫干山裸心谷': 901389,
  '深圳前海华侨城jw万豪': 1647383, '深圳前海华侨城艾美': 116632641,
  '深圳柏悦': 38808142, '深圳国际交流中心洲际': 135841490,
  '珠海美高梅华府': 127345962, '曼谷苏拉旺万豪': 14121045,
};

export function ctripHotelLink(name: string) {
  const key = name.replace(/（[^）]*）|\([^)]*\)/g, '').replace(/酒店$/, '').replace(/\s+/g, '').toLowerCase();
  const id = ctripIds[key];
  return Number.isInteger(id) ? `https://hotels.ctrip.com/hotels/${id}.html` : undefined;
}
