import { flexibleOffers } from './flexible-offers';
import { hotelRegion } from './offer-regions';

export type ContractRate = {
  room: string;
  price?: number;
  priceText?: string;
  periodPrices?: { period: string; price: number }[];
  kind?: 'flexible';
  validity?: string;
  expiresOn?: string;
  unit?: string;
};
export type ContractHotel = { name: string; rates: ContractRate[] };
export type CityContractRates = {
  city: string;
  updatedOn: string;
  cooperationNotes?: string[];
  hotels: ContractHotel[];
};

// 用户提供的常规协议价；不是限日期特价，不随特价日期自动下架。
// 具体日期和房态需人工确认。
const regularCityRates: CityContractRates[] = [
  {
    city: '深圳', updatedOn: '2026-11-19',
    hotels: [
      { name: '深圳前海瑞吉酒店', rates: [{ room: '摩天轮景观房 · 双早 · 需提前1天预约', price: 1888, unit: '/ 晚' }] },
      {"name":"深圳辉盛阁","rates":[{"room":"房型、早餐请询 · 华强北商业区","price":787,"unit":"/ 晚"}]},
      {"name":"深圳兰赫美特酒店","rates":[{"room":"房型、早餐请询 · 科技园","price":605,"unit":"/ 晚"}]},
      {"name":"深圳好日子皇冠假日酒店","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":770,"unit":"/ 晚"}]},
      {"name":"深圳前海JEN酒店","rates":[{"room":"房型、早餐请询 · 前海自贸区","price":686,"unit":"/ 晚"}]},
      {"name":"深圳富临大酒店","rates":[{"room":"房型、早餐请询 · 罗湖口岸/火车站","price":491,"unit":"/ 晚"}]},
      {"name":"深圳坪山格兰云天国际酒店","rates":[{"room":"房型、早餐请询 · 坪山高铁站商圈","price":680,"unit":"/ 晚"}]},
      {"name":"深圳东门凯悦嘉轩","rates":[{"room":"房型、早餐请询 · 东门商业区","price":550,"unit":"/ 晚"}]},
      {"name":"深圳绿景","rates":[{"room":"房型、早餐请询 · 皇岗口岸/福田口岸","price":394,"unit":"/ 晚"}]},
      {"name":"深圳龙岗珠江皇冠假日","rates":[{"room":"房型、早餐请询 · 龙岗中心区/大运新城","price":724,"unit":"/ 晚"}]},
      {"name":"深圳湾万怡","rates":[{"room":"房型、早餐请询 · 科技园","price":747,"unit":"/ 晚"}]},
      {"name":"深圳湾万丽","rates":[{"room":"房型、早餐请询 · 科技园","price":971,"unit":"/ 晚"}]},
      {"name":"深圳机场凯悦","rates":[{"room":"房型、早餐请询 · 宝安机场商圈","price":660,"unit":"/ 晚"}]},
      {"name":"深圳同泰万怡","rates":[{"room":"房型、早餐请询 · 深圳国际会展中心商圈","price":550,"unit":"/ 晚"}]},
      {"name":"深圳海景嘉途酒店","rates":[{"room":"房型、早餐请询 · 华侨城","price":550,"unit":"/ 晚"}]},
      {"name":"深圳星河吉酒店","rates":[{"room":"房型、早餐请询 · 坂田","price":653,"unit":"/ 晚"}]},
      {"name":"深圳安达仕","rates":[{"room":"房型、早餐请询 · 海岸城/后海","price":2343,"unit":"/ 晚"}]},
      {"name":"深圳大中华喜来登","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":839,"unit":"/ 晚"}]},
      {"name":"深圳中洲万豪","rates":[{"room":"房型、早餐请询 · 海岸城/后海","price":1119,"unit":"/ 晚"}]},
      {"name":"深圳康莱德","rates":[{"room":"房型、早餐请询 · 前海自贸区","price":1927,"unit":"/ 晚"}]},
      {"name":"深圳四季酒店","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":1265,"unit":"/ 晚"}]},
      {"name":"深圳金茂jw万豪","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":933,"unit":"/ 晚"}]},
      {"name":"深圳北站Moxy酒店","rates":[{"room":"房型、早餐请询 · 深圳北站地区","price":550,"unit":"/ 晚"}]},
      {"name":"深圳益田威斯汀","rates":[{"room":"房型、早餐请询 · 华侨城","price":792,"unit":"/ 晚"}]},
      {"name":"深圳瑞吉","rates":[{"room":"房型、早餐请询 · 万象城/京基100","price":1410,"unit":"/ 晚"}]},
      {"name":"深圳君悦","rates":[{"room":"房型、早餐请询 · 万象城/京基100","price":1136,"unit":"/ 晚"}]},
      {"name":"深圳香格里拉大酒店","rates":[{"room":"房型、早餐请询 · 罗湖口岸/火车站","price":605,"unit":"/ 晚"}]},
      {"name":"深圳科技园丽雅查尔顿","rates":[{"room":"房型、早餐请询 · 科技园","price":550,"unit":"/ 晚"}]},
      {"name":"深圳国际会展中心希尔顿","rates":[{"room":"房型、早餐请询 · 深圳国际会展中心商圈","price":660,"unit":"/ 晚"}]},
      {"name":"深圳南山中成美爵","rates":[{"room":"房型、早餐请询 · 海岸城/后海","price":630,"unit":"/ 晚"}]},
      {"name":"深圳南山逸衡","rates":[{"room":"房型、早餐请询 · 前海自贸区","price":715,"unit":"/ 晚"}]},
      {"name":"深圳福田香格里拉大酒店","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":1013,"unit":"/ 晚"}]},
      {"name":"深圳东海朗廷","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":1020,"unit":"/ 晚"}]},
      {"name":"深圳温德姆至尊","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":871,"unit":"/ 晚"}]},
      {"name":"深圳彭年万丽酒店","rates":[{"room":"房型、早餐请询 · 罗湖口岸/火车站","price":672,"unit":"/ 晚"}]},
      {"name":"深圳凯宾斯基","rates":[{"room":"房型、早餐请询 · 海岸城/后海","price":770,"unit":"/ 晚"}]},
      {"name":"深圳华侨城洲际大酒店","rates":[{"room":"房型、早餐请询 · 华侨城","price":1100,"unit":"/ 晚"}]},
      {"name":"深圳机场凯悦嘉轩酒店","rates":[{"room":"房型、早餐请询 · 宝安机场商圈","price":605,"unit":"/ 晚"}]},
      {"name":"深圳机场凯悦嘉寓酒店","rates":[{"room":"房型、早餐请询 · 宝安机场商圈","price":605,"unit":"/ 晚"}]},
      {"name":"深圳机场希尔顿逸林","rates":[{"room":"房型、早餐请询 · 宝安机场商圈","price":638,"unit":"/ 晚"}]},
      {"name":"深圳大中华希尔顿","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":825,"unit":"/ 晚"}]},
      {"name":"深圳龙华希尔顿逸林","rates":[{"room":"房型、早餐请询 · 深圳北站地区","price":745,"unit":"/ 晚"}]},
      {"name":"深圳南山科技园希尔顿花园","rates":[{"room":"房型、早餐请询 · 科技园","price":769,"unit":"/ 晚"}]},
      {"name":"深圳南山皇冠","rates":[{"room":"房型、早餐请询 · 深南大道9819号","price":933,"unit":"/ 晚"}]},
      {"name":"深圳会展中心皇冠假日","rates":[{"room":"房型、早餐请询 · 深圳国际会展中心商圈","price":820,"unit":"/ 晚"}]},
      {"name":"深圳富苑皇冠假日酒店","rates":[{"room":"套房 · 早餐请询 · 罗湖口岸/火车站","price":636,"unit":"/ 晚"}]},
      {"name":"深圳福朋喜来登","rates":[{"room":"房型、早餐请询 · 皇岗口岸/福田口岸","price":660,"unit":"/ 晚"}]},
      {"name":"深圳蛇口希尔顿南海","rates":[{"room":"房型、早餐请询","price":850,"unit":"/ 晚"}]},
      {"name":"深圳东门智选假日","rates":[{"room":"房型、早餐请询 · 东门商业区","price":481,"unit":"/ 晚"}]},
      {"name":"深圳东华假日","rates":[{"room":"房型、早餐请询 · 海岸城/后海","price":691,"unit":"/ 晚"}]},
      {"name":"深圳星河丽思卡尔顿","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":1276,"unit":"/ 晚"}]},
      {"name":"深圳柏悦","rates":[{"room":"房型、早餐请询 · 会展中心/CBD","price":1430,"unit":"/ 晚"}]},
      {"name":"深圳前海华侨城jw万豪","rates":[{"room":"房型、早餐请询 · 宝安商业区","price":1035,"unit":"/ 晚"}]},
      {"name":"深圳宝安中天美景华美达","rates":[{"room":"房型、早餐请询 · 深圳国际会展中心商圈","price":427,"unit":"/ 晚"}]},
      {"name":"深圳硬石饭店","rates":[{"room":"房型、早餐请询 · 观澜","price":880,"unit":"/ 晚"}]},
      {"name":"深圳博林天瑞喜来登","rates":[{"room":"房型、早餐请询 · 大学城/西丽动物园","price":1020,"unit":"/ 晚"}]},
    ],
  },
  {
    city: '海外', updatedOn: '2026-11-16',
    hotels: [
      { name: '富国岛柏悦酒店', rates: [{ room: '12月18日之后可订 · 房型、早餐请询', priceText: '2000+' }] },
      { name: '首尔康莱德酒店', rates: [{ room: '长期好价 · 具体日期、房型及早餐请询', priceText: '2千多起' }] },
    ],
  },
  {
    city: '澳门', updatedOn: '2026-10-10',
    hotels: [
      { name: '澳门摩柏斯', rates: [
        { room: '厅房', periodPrices: [{ period: '周中', price: 1800 }, { period: '周五', price: 2000 }, { period: '周六', price: 2100 }] },
        { room: '摩柏斯套房' },
      ] },
      { name: '澳门四季酒店', rates: [{ room: '房型请询 · 可询双早' }] },
      { name: '澳门四季名汇', rates: [{ room: '一房一厅' }, { room: '两房一厅' }] },
      { name: '澳门新濠影汇', rates: [
        { room: '明星汇 · 厅房', periodPrices: [{ period: '周中', price: 1050 }, { period: '周五', price: 1150 }, { period: '周六', price: 1450 }] },
        { room: '巨星汇 · 厅房', periodPrices: [{ period: '周中', price: 1200 }, { period: '周五', price: 1400 }, { period: '周六', price: 1500 }] },
        { room: '映星汇 · 厅房', periodPrices: [{ period: '周中', price: 1400 }, { period: '周五', price: 1500 }, { period: '周六', price: 1600 }] },
      ] },
      { name: '澳门W酒店', rates: [{ room: '房型请询' }] },
      { name: '澳门伦敦人', rates: [
        { room: '御园 · 实名预订', periodPrices: [{ period: '周中', price: 3100 }, { period: '周五', price: 3300 }, { period: '周六', price: 3700 }] },
        { room: '御园 · 卡房', periodPrices: [{ period: '周中', price: 2300 }, { period: '周五', price: 2500 }, { period: '周六', price: 2800 }] },
        { room: '御园一房一厅 · 可询双早' },
        { room: '御园两房一厅 · 可询双早' },
        { room: '套房系列 · 会员卡', periodPrices: [{ period: '周中', price: 1500 }, { period: '周五', price: 1700 }, { period: '周六', price: 1800 }] },
      ] },
      { name: '澳门伦敦人名汇', rates: [{ room: '房型请询' }] },
      { name: '澳门永利皇宫', rates: [
        { room: '大床 / 双床', periodPrices: [{ period: '平日', price: 1700 }, { period: '周末', price: 2000 }] },
        { room: '湖景大床 / 双床', periodPrices: [{ period: '平日', price: 2000 }, { period: '周末', price: 2200 }] },
        { room: '湖景套房 · 会员卡', periodPrices: [{ period: '周中', price: 1700 }, { period: '周五', price: 1900 }, { period: '周六', price: 2000 }] },
        { room: '行政套房' },
        { room: '柏丽套房' },
      ] },
      { name: '澳门威尼斯人', rates: [
        { room: '厅房', periodPrices: [{ period: '周中', price: 1600 }, { period: '周五', price: 1800 }, { period: '周六', price: 1900 }] },
        { room: '会员卡', periodPrices: [{ period: '周中', price: 1200 }, { period: '周五', price: 1400 }, { period: '周六', price: 1500 }] },
      ] },
      { name: '澳门瑞吉', rates: [{ room: '房型请询' }] },
      { name: '澳门康莱德', rates: [{ room: '房型请询' }] },
      { name: '澳门巴黎人', rates: [{ room: '厅房', periodPrices: [{ period: '周中', price: 1100 }, { period: '周五', price: 1400 }, { period: '周六', price: 1600 }] }] },
      { name: '澳门美狮美高梅', rates: [{ room: '房型请询' }] },
      { name: '澳门银河', rates: [{ room: '房型请询' }] },
      { name: '澳门JW万豪', rates: [{ room: '房型请询' }] },
      { name: '澳门悦榕庄', rates: [{ room: '房型请询' }] },
      { name: '澳门丽思卡尔顿', rates: [{ room: '房型请询' }] },
      { name: '澳门莱佛士', rates: [{ room: '房型请询' }] },
      { name: '澳门范思哲', rates: [{ room: '房型请询' }] },
      { name: '澳门上葡京', rates: [{ room: '房型请询' }] },
      { name: '澳门老佛爷', rates: [{ room: '房型请询' }] },
      { name: '澳门颐居', rates: [{ room: '厅房', periodPrices: [{ period: '周中', price: 1600 }, { period: '周五', price: 1700 }, { period: '周六', price: 1900 }] }] },
      { name: '澳门君悦', rates: [
        { room: '嘉宾轩 · 厅房', periodPrices: [{ period: '周中', price: 1100 }, { period: '周五', price: 1400 }, { period: '周六', price: 1500 }] },
        { room: '厅房', periodPrices: [{ period: '周中', price: 1000 }, { period: '周五', price: 1200 }, { period: '周六', price: 1300 }] },
      ] },
      { name: '澳门大仓', rates: [{ room: '房型请询' }] },
    ],
  },
  {
    city: '香港', updatedOn: '2026-10-08',
    hotels: [
      { name: '香港丽晶', rates: [{ room: '高级房 · 双早', price: 2300 }, { room: '海景房 · 双早', price: 3600 }] },
      { name: '香港嘉里', rates: [{ room: '海景 · 双早', price: 1500 }] },
      { name: '香港美利尼依格罗', rates: [{ room: 'N2 · 双早', price: 2300 }] },
      { name: '马哥孛罗香港', rates: [{ room: '海景 · 双早', price: 1000 }] },
      { name: '马哥孛罗港威', rates: [{ room: '尊贵 · 双早', price: 1000 }] },
      { name: '马哥孛罗太子', rates: [{ room: '尊贵 · 双早', price: 1000 }] },
      { name: '香港港丽', rates: [{ room: '海景 · 双早', price: 1700 }] },
      { name: '香港丽思卡尔顿', rates: [{ room: '维港客房', price: 3300 }] },
      { name: '香港海景嘉福洲际', rates: [{ room: '半海景 · 双早', price: 1300 }] },
      { name: '香港喜来登', rates: [{ room: '海景 · 双早', price: 1600 }] },
      { name: '香港九龙香格里拉', rates: [{ room: '海景 · 双早', price: 1600 }] },
      { name: '港岛香格里拉', rates: [{ room: '海景 · 双早', price: 2300 }] },
      { name: '香港万丽', rates: [{ room: '海景 · 双早', price: 1600 }] },
      { name: '香港JW万豪', rates: [{ room: '海景 · 双早', price: 2100 }] },
      { name: '香港W', rates: [{ room: '海景 · 双早', price: 2200 }] },
      { name: '海洋公园万豪', rates: [{ room: '池景 · 双早', price: 1500 }] },
    ],
  },
  {
    city: '北京', updatedOn: '2026-11-02',
    cooperationNotes: [
      '客名预订合作：北京宝格丽、怡亨、璞瑄、华侨；具体门店、房型及房态请询。',
      '北京洲际、皇冠、假日酒店可询75折合作报价；适用门店、比价口径及具体日期请询。',
    ],
    hotels: [
      { name: '北京王府井文华东方', rates: [{ room: '双早', price: 4599 }] },
      { name: '北京宝格丽', rates: [{ room: '高级客房 · 早餐请询', price: 4950 }] },
      { name: '北京瑰丽', rates: [{ room: '特色豪华 · 双早', price: 2599 }] },
      { name: '北京王府半岛', rates: [{ room: '豪华套 · 双早', price: 2250 }] },
      { name: '北京华尔道夫', rates: [{ room: '贵宾', price: 1999 }] },
      { name: '北京璞瑄', rates: [{ room: '经典 · 双早', price: 1950 }, { room: '经典 · 无早', price: 1750 }] },
      { name: '北京柏悦', rates: [{ room: 'CBD', price: 1799 }, { room: '豪华', price: 1399 }] },
      { name: '北京三里屯洲际', rates: [{ room: '高级套房 · 双早', price: 2640 }] },
      { name: '北京四季', rates: [{ room: '尊贵 · 双早', price: 1550 }] },
      { name: '北京丽思卡尔顿', rates: [{ room: '花园景', price: 1450 }] },
      { name: '北京国贸大', rates: [{ room: '超豪华', price: 1350 }] },
      { name: '北京三里屯CHAO', rates: [{ room: '50开间 · 单早', price: 1540 }] },
      { name: '北京金融街丽思卡尔顿', rates: [{ room: '豪华', price: 1199 }] },
      { name: '北京金茂万丽', rates: [{ room: '尊贵', price: 1199 }] },
      { name: '北京瑞吉', rates: [{ room: '外交', price: 1199 }] },
      { name: '北京康莱德', rates: [{ room: '超豪华', price: 1150 }] },
      { name: '北京JW万豪', rates: [{ room: '行政', price: 1099 }] },
      { name: '北京粤财JW万豪', rates: [{ room: '豪华', price: 1099 }] },
      { name: '北京金融街威斯汀', rates: [{ room: '行政', price: 1099 }] },
      { name: '北京丽晶', rates: [{ room: '高楼层', price: 1099 }] },
      { name: 'JEN北京新国贸', rates: [{ room: '央视景', price: 1099 }] },
      { name: '北京北辰洲际', rates: [{ room: '鸟巢景', price: 1099 }, { room: '城景', price: 999 }] },
      { name: '北京东方君悦', rates: [{ room: '客房', price: 1099 }, { room: '公寓', price: 999 }] },
      { name: '北京新青海喜来登', rates: [{ room: '行政', price: 950 }] },
      { name: '北京金隅喜来登', rates: [{ room: '行政', price: 899 }] },
      { name: '北京望京凯悦', rates: [{ room: '城景', price: 899 }] },
      { name: '北京嘉里', rates: [{ room: '豪华', price: 899 }] },
      { name: '北京前门万达颐华', rates: [{ room: '高级豪华', price: 899 }] },
      { name: '北京万达文华', rates: [{ room: '高级豪华', price: 880 }] },
      { name: '北京富力万丽', rates: [{ room: '行政', price: 850 }] },
      { name: '北京中关村万丽', rates: [{ room: '行政', price: 850 }] },
      { name: '北京西南华邑', rates: [{ room: '行政', price: 850 }] },
      { name: '北京索菲特', rates: [{ room: '豪华 / 景观房 · 早餐请询', price: 990 }] },
      { name: '北京中国大', rates: [{ room: '豪华', price: 850 }] },
      { name: '北京海航万豪', rates: [{ room: '行政', price: 799 }] },
      { name: '北京中关村皇冠假日', rates: [{ room: '行政', price: 799 }] },
      { name: '北京前门万达美华', rates: [{ room: '高级豪华', price: 799 }] },
      { name: '北京朝阳悠唐皇冠假日', rates: [{ room: '行政', price: 750 }] },
      { name: '北京希尔顿', rates: [{ room: '高级豪华 / 行政', price: 750 }] },
      { name: '北京港澳中心瑞士', rates: [{ room: '优势', price: 750 }] },
      { name: '北京三里屯福朋喜来登', rates: [{ room: '景观', price: 699 }] },
      { name: '北京丽都皇冠假日', rates: [{ room: '行政', price: 699 }] },
      { name: '北京新云南皇冠假日', rates: [{ room: '行政', price: 699 }] },
      { name: '北京希尔顿逸林', rates: [{ room: '套房', price: 880 }, { room: '行政', price: 680 }] },
      { name: '北京海淀福朋喜来登', rates: [{ room: '商务', price: 650 }] },
      { name: '北京通州皇冠假日', rates: [{ room: '城景', price: 650 }] },
      { name: '北京东三环希尔顿逸林', rates: [{ room: '豪华', price: 650 }] },
      { name: '北京首北兆龙', rates: [{ room: '景观', price: 650 }] },
      { name: '北京江西大厦voco', rates: [{ room: '豪华', price: 599 }] },
      { name: '北京兴基铂尔曼', rates: [{ room: '行政', price: 599 }] },
    ],
  },
  {
    city: '上海', updatedOn: '2026-10-08',
    hotels: [
      { name: '上海康莱德', rates: [{ room: '行政 · 双早', price: 950 }] },
      { name: '阿丽拉石库门', rates: [{ room: '双早', price: 2000 }] },
      { name: '外滩英迪格', rates: [{ room: '豪华江景 · 双早', price: 1050 }] },
      { name: '外滩华尔道夫', rates: [{ room: '城景 · 双早', price: 1800 }] },
      { name: '海鸥丽晶酒店', rates: [{ room: '外滩景观 · 双早', price: 3288 }] },
      { name: '前滩华尔道夫', rates: [{ room: '江景 · 双早', price: 2100 }] },
      { name: '浦东丽思卡尔顿', rates: [{ room: '明珠 / 外滩', price: 2200 }] },
      { name: '浦东香格里拉', rates: [{ room: '行政 · 双早', price: 1050 }] },
      { name: '浦东丽晶', rates: [{ room: '明珠 / 俱乐部城景 · 双早', price: 1200 }] },
      { name: '外滩W', rates: [{ room: '壮美江景 · 双早', price: 2400 }] },
      { name: '城中希尔顿', rates: [{ room: '行政 · 双早', price: 950 }] },
      { name: '新天地安达仕', rates: [{ room: '景观 · 双早', price: 1100 }] },
      { name: '环球港凯悦', rates: [{ room: '嘉宾轩 · 双早', price: 750 }] },
      { name: '金茂君悦', rates: [{ room: '嘉宾轩江景 · 双早', price: 1100 }] },
      { name: '中山公园凯悦尚萃', rates: [{ room: '豪华 · 双早', price: 750 }] },
      { name: '上海柏悦', rates: [{ room: '江景明珠 · 双早', price: 1800 }] },
      { name: '外滩瑞吉', rates: [{ room: '外滩景大床 · 双早', price: 1900 }] },
      { name: '外滩艾迪逊', rates: [{ room: '外滩景观 · 双早', price: 1988 }] },
      { name: '静安瑞吉酒店', rates: [{ room: '尊贵豪华 · 双早', price: 1300 }] },
      { name: '静安香格里拉', rates: [{ room: '尊华 · 双早', price: 1400 }] },
      { name: '静安洲际酒店', rates: [{ room: '行政 · 双早', price: 900 }] },
      { name: '绿发JW侯爵万豪', rates: [{ room: '江景 · 双早', price: 1400 }] },
      { name: '前滩香格里拉', rates: [{ room: '江景 · 双早', price: 1300 }] },
      { name: '瑞金洲际', rates: [{ room: '尊享 · 双早', price: 1100 }] },
    ],
  },
  {
    city: '苏杭', updatedOn: '2026-10-12',
    hotels: [
      { name: '杭州凯宾斯基', rates: [{ room: '行政房', price: 950 }] },
      { name: '杭州中心四季酒店', rates: [{ room: '运河景房', price: 1699 }] },
      { name: '杭州西子湖四季酒店', rates: [{ room: '园景房', price: 3900 }] },
      { name: '杭州君悦酒店', rates: [{ room: '基础房', price: 1300 }] },
      { name: '杭州武林洲际酒店', rates: [{ room: '城景大床 · 双早', price: 1100 }] },
      { name: '杭州城中香格里拉', rates: [{ room: '房型请询', price: 1099 }] },
      { name: '杭州西溪喜来登', rates: [{ room: '行政房 · 双早', price: 900 }] },
      { name: '杭州尊蓝钱江豪华精选', rates: [{ room: '江景房 · 双早', price: 1000 }] },
      { name: '杭州柏悦酒店', rates: [{ room: '城景房 · 双早', price: 1988 }] },
      { name: '杭州洲际酒店', rates: [{ room: '江景房 · 双早', price: 1099 }] },
      { name: '杭州滨奥皇冠假日', rates: [{ room: '房型请询 · 双早', price: 898 }] },
      { name: '杭州康莱德酒店', rates: [{ room: '房型请询 · 双早', price: 1300 }] },
      { name: '杭州西溪悦榕庄', rates: [{ room: '房型请询 · 双早', price: 2600 }] },
      { name: '杭州上城英迪格酒店', rates: [{ room: '房型请询 · 双早', price: 1000 }] },
      { name: '苏州柏悦', rates: [{ room: '摩天轮景观 · 大床 · 双早' }] },
      { name: '苏州凯悦', rates: [{ room: '嘉宾轩湖景 · 双早' }] },
      { name: '苏州凯悦尚选', rates: [{ room: '房型请询' }] },
      { name: '苏州逸扉', rates: [{ room: '房型请询' }] },
    ],
  },
  {
    city: '南京', updatedOn: '2026-10-12',
    hotels: [
      { name: '南京涵碧楼', rates: [{ room: '江景房 · 双早', price: 1060 }, { room: '江景房 · 单早', price: 980 }] },
      { name: '南京金鹰G', rates: [{ room: '山景房 · 双早', price: 980 }, { room: '山景房 · 单早', price: 880 }] },
      { name: '南京圣和府邸豪华精选酒店', rates: [
        { room: '尊享城景 · 无早', price: 880 },
        { room: '尊享城景 · 单早', price: 1030 },
        { room: '尊享城景 · 双早', price: 1030 },
      ] },
      { name: '南京金奥国际酒店（原费尔蒙）', rates: [
        { room: '豪华市景 · 单早（江景另加¥100）', price: 730 },
        { room: '豪华市景 · 双早（江景另加¥100）', price: 830 },
      ] },
      { name: '南京华邑酒店', rates: [{ room: '高级房 · 单早 · 视房态升级', price: 580 }] },
      { name: '南京涵月楼', rates: [{ room: '至尊豪华房 · 双早', priceText: '530–560' }] },
      { name: '南京悦榕庄', rates: [{ room: '崖景房 · 双早', priceText: '1830起' }] },
      { name: '南京希尔顿', rates: [{ room: '行政房 · 双早', price: 730 }] },
      { name: '南京世贸希尔顿', rates: [{ room: '行政江景房 · 双早', priceText: '600–630' }] },
      { name: '南京丽思卡尔顿', rates: [{ room: '豪华湖景房', priceText: '2330起' }] },
      { name: '南京安达仕', rates: [
        { room: '豪华江景房 · 免费升尊贵全景', price: 1330 },
        { room: '尊贵江景房 · 双早', price: 1400 },
      ] },
      { name: '南京香格里拉', rates: [{ room: '豪华湖景房', price: 1060 }] },
      { name: '南京威斯汀', rates: [{ room: '行政湖景房 · 双早', priceText: '830起' }] },
      { name: '南京金丝利喜来登', rates: [{ room: '城市景观房', price: 760 }] },
    ],
  },
  {
    city: '广州', updatedOn: '2026-10-08',
    hotels: [
      { name: '广州四季', rates: [{ room: '豪华江景 · 双早', price: 2099 }] },
      { name: '广州丽思', rates: [{ room: '塔景 · 双早', price: 1788 }] },
      { name: '广州文华东方', rates: [{ room: '豪华 · 双早', price: 1788 }] },
      { name: '广州君悦', rates: [{ room: '园景 · 双早', price: 950 }] },
      { name: '广州W', rates: [{ room: '', price: 1000 }] },
      { name: '广州海心沙英迪格', rates: [{ room: '', price: 1000 }] },
      { name: '广州正佳万豪', rates: [{ room: '尊贵 · 双早', price: 988 }] },
      { name: '广州天河希尔顿', rates: [{ room: '豪华 · 双早', price: 750 }] },
      { name: '广州海航威斯汀', rates: [{ room: '行政 · 双早', price: 800 }] },
      { name: '广州越秀宾馆', rates: [{ room: '豪华 · 双早', price: 800 }] },
      { name: '广州希尔顿逸林', rates: [{ room: '美景 · 双早', price: 700 }] },
      { name: '广州中心皇冠', rates: [{ room: '豪华房 · 双早', price: 700 }] },
      { name: '广州白云越秀万豪', rates: [{ room: '精选 · 双早', price: 700 }] },
    ],
  },
];

const normalizeName = (name: string) => name.replace(/大酒店$|酒店$/, '').replace(/\s/g, '');

// Add flexible offers to their destination city while preserving regular rates.
// Room variants remain in one hotel entry, just like the homepage grouping.
export const cityContractRates: CityContractRates[] = (() => {
  const cities = regularCityRates.map((city) => ({
    ...city, hotels: city.hotels.map((hotel) => ({ ...hotel, rates: [...hotel.rates] })),
  }));
  for (const offer of flexibleOffers.filter((offer) => offer.status !== 'soldout')) {
    const cityName = hotelRegion(offer.city, offer.region) === '海外'
      ? '海外' : ['杭州', '苏州'].includes(offer.city) ? '苏杭' : offer.city;
    let city = cities.find((city) => city.city === cityName);
    if (!city) {
      city = { city: cityName, updatedOn: '2026-10-23', hotels: [] };
      cities.push(city);
    }
    if (city.updatedOn < '2026-10-23') city.updatedOn = '2026-10-23';
    let hotel = city.hotels.find((hotel) => normalizeName(hotel.name) === normalizeName(offer.hotel));
    if (!hotel) {
      hotel = { name: offer.hotel, rates: [] };
      city.hotels.push(hotel);
    }
    const rates = offer.rateOptions || [{
      date: offer.dateLabel || '具体日期请询',
      detail: [offer.room, offer.breakfast].filter(Boolean).join(' · '),
      price: offer.price,
      unit: offer.priceUnit || '/ 晚',
    }];
    hotel.rates.push(...rates.map((rate) => ({
      room: [rate.detail, offer.stock ? `仅余${offer.stock}${(rate.unit || '').includes('张') ? '张' : '间'}` : ''].filter(Boolean).join(' · '),
      priceText: rate.price,
      unit: rate.unit || '/ 晚',
      kind: 'flexible' as const,
      validity: Array.from(new Set([rate.date, offer.dateLabel].filter(Boolean))).join(' · '),
      expiresOn: offer.expiresOn,
    })));
  }
  return cities;
})();
