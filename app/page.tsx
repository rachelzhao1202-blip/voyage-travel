'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { hotelOffers, isHotelOfferCurrent, formatAvailableHotelDates, type HotelOffer } from '../data/hotels';
import { offerRegions, hotelRegion } from '../data/offer-regions';
import SiteTabs from '../components/site-tabs';
import ContractSearchResults, { filterCityHotels } from '../components/contract-search-results';
import { ctripHotelLink } from '../data/hotel-links';
import { formatHotelPrice, hasConfirmedStayNight, isSearchDate, matchesHotelSearch } from '../data/hotel-search';

const cnDate = (date: string) => {
  const [, month, day] = date.split('-');
  return `${Number(month)}月${Number(day)}日`;
};

const displayPrice = (value: string) => value.trim().toUpperCase();
const hotelPrice = formatHotelPrice;

const hotelDateText = (offer: HotelOffer) => {
  if (offer.availableDates?.length) return `${formatAvailableHotelDates(offer.availableDates, chinaToday())}入住${offer.availableDates.length > 1 ? ' · 可按晚拆订' : ''}`;
  if (offer.dateLabel) return offer.dateLabel;
  if (offer.checkIn && offer.checkOut) return `${cnDate(offer.checkIn)} — ${cnDate(offer.checkOut)}`;
  return '日期请询';
};

const consolidateHotelOffers = (offers: HotelOffer[]) => {
  const groups = new Map<string, HotelOffer[]>();
  offers.forEach((offer) => groups.set(offer.hotel, [...(groups.get(offer.hotel) || []), offer]));

  return Array.from(groups.values()).map((group) => {
    if (group.length === 1) return group[0];

    const sorted = [...group].sort((a, b) =>
      (a.checkIn || a.expiresOn || '9999-12-31').localeCompare(b.checkIn || b.expiresOn || '9999-12-31')
    );
    const featured = sorted.find((offer) => offer.featured || offer.highlight || offer.recommendation);
    const rateOptions = sorted.map((offer) => ({
      date: hotelDateText(offer),
      detail: [offer.room, offer.breakfast, offer.stock != null ? `仅余${offer.stock}间` : undefined].filter(Boolean).join(' · '),
      price: offer.price,
      unit: offer.priceUnit || '/ 晚',
    }));
    const filterDates = Array.from(new Set(sorted.flatMap((offer) =>
      offer.filterDates || (offer.checkIn ? [offer.checkIn] : [])
    )));
    const expiries = sorted.flatMap((offer) => (offer.expiresOn || offer.checkIn) ? [offer.expiresOn || offer.checkIn || ''] : []);

    return {
      ...sorted[0],
      id: `group-${sorted[0].id}`,
      checkIn: undefined,
      checkOut: undefined,
      availableDates: undefined,
      dateLabel: `${rateOptions.length} 个价格方案`,
      expiresOn: expiries.sort().at(-1),
      room: '全部价格已合并展示',
      breakfast: undefined,
      price: rateOptions[0].price,
      priceUnit: rateOptions[0].unit,
      referencePrice: undefined,
      stock: undefined,
      recommendation: featured?.recommendation,
      featured: featured?.featured,
      highlight: featured?.highlight,
      filterDates,
      rateOptions,
      status: sorted.some((offer) => offer.status === 'limited') ? 'limited' as const : 'available' as const,
    };
  });
};

const chinaToday = () => {
  const chinaTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
  return chinaTime.toISOString().slice(0, 10);
};

async function shareOffer(offer: HotelOffer) {
  const rateLines = offer.rateOptions?.map((option) =>
    `${option.date}｜${option.detail}｜${hotelPrice(option.price)}${option.price ? option.unit || '/晚' : ''}`
  );
  const text = [
    `Voyage Travel｜${offer.hotel}`,
    offer.rateOptions ? hotelDateText(offer) : `${hotelDateText(offer)}｜${offer.room}${offer.breakfast ? `｜${offer.breakfast}` : ''}`,
    ...(rateLines || [`${hotelPrice(offer.price)}${offer.price ? offer.priceUnit || '/晚' : ''}${offer.stock ? `｜${offer.stock}间` : ''}`]),
    '具体价格与房态请咨询确认',
  ].join('\n');

  return shareInquiry(`${offer.hotel}特价`, text);
}

async function shareInquiry(title: string, text: string) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return '已打开分享，请发送给顾问';
    } catch {
      // 微信内置浏览器不支持系统分享时继续复制。
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement('textarea');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  return '咨询内容已复制，可粘贴发给顾问';
}

async function sharePage() {
  const shareData = {
    title: 'Voyage Travel｜精选酒店特价',
    text: '精选酒店特价，免登录直接查看。',
    url: window.location.href,
  };
  const inWechat = /MicroMessenger/i.test(navigator.userAgent);

  if (inWechat) return '请点击右上角 ···，分享到朋友圈或发给朋友';
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return '已打开分享';
    } catch {
      // 用户取消时继续提供复制链接。
    }
  }
  await navigator.clipboard.writeText(shareData.url);
  return '链接已复制，可以直接发送';
}

export default function Home() {
  const [notice, setNotice] = useState('');
  const [today, setToday] = useState('');
  const [region, setRegion] = useState<(typeof offerRegions)[number]>('全部');
  const [filters, setFilters] = useState({ query: '', date: '' });
  const [queryDraft, setQueryDraft] = useState('');
  const [dateDraft, setDateDraft] = useState('');
  const [contractLimit, setContractLimit] = useState(10);

  useEffect(() => {
    const refreshDate = () => setToday(chinaToday());
    refreshDate();
    const readFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const regionParam = params.get('region');
      const query = (params.get('q') || '').trim().slice(0, 60);
      const value = params.get('date') || '';
      const date = isSearchDate(value) && value >= chinaToday() ? value : '';
      setRegion(offerRegions.find(item => item === regionParam) || '全部');
      setFilters({ query, date });
      setQueryDraft(query);
      setDateDraft(date);
      setContractLimit(10);
    };
    readFilters();
    window.addEventListener('popstate', readFilters);
    const timer = window.setInterval(refreshDate, 60 * 1000);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('popstate', readFilters);
    };
  }, []);

  const active = hotelOffers.filter(offer => Boolean(offer.checkIn || offer.homepage) && isHotelOfferCurrent(offer, today));
  const totalHotels = new Set(active.map(offer => offer.hotel)).size;
  const isSearching = Boolean(filters.query || filters.date || region !== '全部');
  const visibleOffers = consolidateHotelOffers(active.filter(offer => {
    const area = hotelRegion(offer.city, offer.region);
    return (region === '全部' || region === area)
      && matchesHotelSearch(filters.query, offer.city, area, offer.hotel, offer.englishName, offer.cityEnglish)
      && (!filters.date || (filters.date >= today && hasConfirmedStayNight(offer, filters.date)));
  })).sort((a, b) => Number(Boolean(b.featured || b.highlight)) - Number(Boolean(a.featured || a.highlight)));
  const contractResults = isSearching ? filterCityHotels(filters.query, region, today, filters.date) : [];
  const searchSummary = [filters.query, filters.date && `${cnDate(filters.date)}入住`, region !== '全部' && region].filter(Boolean).join(' · ');

  function updateSearch(query: string, date: string, area: (typeof offerRegions)[number]) {
    setFilters({ query, date });
    setRegion(area);
    setContractLimit(10);
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    if (date) url.searchParams.set('date', date); else url.searchParams.delete('date');
    if (area !== '全部') url.searchParams.set('region', area); else url.searchParams.delete('region');
    window.history.replaceState({}, '', url);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const date = dateDraft && isSearchDate(dateDraft) && dateDraft >= chinaToday() ? dateDraft : '';
    updateSearch(queryDraft.trim(), date, region);
  }

  function selectDestination(query: string) {
    setQueryDraft(query);
    updateSearch(query, dateDraft, '全部');
  }

  function resetSearch() {
    setQueryDraft('');
    setDateDraft('');
    updateSearch('', '', '全部');
  }

  async function consultContract(title: string, text: string) {
    setNotice(await shareInquiry(title, text));
    window.setTimeout(() => setNotice(''), 2600);
  }

  async function consult(offer: HotelOffer) {
    setNotice(await shareOffer(offer));
    window.setTimeout(() => setNotice(''), 2600);
  }

  async function shareList() {
    setNotice(await sharePage());
    window.setTimeout(() => setNotice(''), 3200);
  }

  return (
    <main className="discovery-home">
      <header className="topbar">
        <a className="brand" href="#top">VOYAGE <span>TRAVEL</span></a>
        <div className="top-actions">
          <span className="updated">精选特价</span>
          <button onClick={shareList}>分享清单</button>
        </div>
      </header>

      <section className="discovery-hero" id="top">
        <p>VOYAGE TRAVEL / HOTEL COLLECTION</p>
        <h1>下一站，住哪里？</h1>
        <p className="hero-caption">限时特价、城市协议价，一起找。</p>
        <span className="hero-meta">{totalHotels} 家近期特价酒店 · 无需登录</span>
      </section>

      <div className="discovery-search">
        <form className="discovery-search-form" role="search" aria-label="搜索酒店特价和协议价" onSubmit={submitSearch}>
          <label htmlFor="stay-destination">目的地 / 酒店
            <input type="search" id="stay-destination" placeholder="例如：广州、香港、白云万豪" maxLength={60} value={queryDraft} onChange={e => setQueryDraft(e.target.value)} />
          </label>
          <label htmlFor="stay-date">入住日期 <small>选填</small>
            <input type="date" id="stay-date" min={today || undefined} value={dateDraft} onChange={e => setDateDraft(e.target.value)} />
          </label>
          <button className="discovery-search-submit" type="submit">搜索</button>
        </form>
        <nav className="discovery-destinations" aria-label="热门目的地">
          <span>热门目的地</span>
          {['广州', '香港', '深圳', '澳门', '杭州', '上海'].map(city => (
            <button type="button" key={city} aria-pressed={filters.query === city && region === '全部'} onClick={() => selectDestination(city)}>{city}</button>
          ))}
        </nav>
      </div>
      <SiteTabs active="offers" />
      <nav className="filter-panel offer-region-filter" aria-label="按地区查看酒店">
        <div className="city-scroll">
          {offerRegions.map((value) => (
            <button key={value} className={region === value ? 'active' : ''}
              aria-pressed={region === value} onClick={() => updateSearch(filters.query, filters.date, value)}>
              {value}
            </button>
          ))}
        </div>
      </nav>
      {isSearching && <div className="discovery-result-strip" role="status">
        <div><strong>{searchSummary}</strong><small>{visibleOffers.length} 家特价 · {contractResults.length} 家协议价或房券</small></div>
        <div>{contractResults.length > 0 && <a href="#found-contract">看协议价 ↓</a>}<button type="button" onClick={resetSearch}>清除筛选</button></div>
      </div>}

      <section className="rate-list" aria-live="polite">
        <div className="discovery-section-title"><div><span>01 / LIMITED OFFERS</span><h2>近期酒店特价</h2></div><p>{visibleOffers.length} 家</p></div>
        {filters.date && <p className="search-hint">只显示明确涵盖所选入住日的特价。未注明具体入住日的房源，可清除日期后查看。</p>}
        {visibleOffers.length ? visibleOffers.map((offer, index) => (
          <article className={`rate-item ${offer.rateOptions ? 'has-options' : ''} ${!offer.image ? 'text-only' : ''}`} key={offer.id}>
            {offer.image && (offer.imageViewport ? (
              <svg className="hotel-cover" role="img" aria-label={`${offer.hotel}酒店图片`}
                viewBox={`${offer.imageViewport.x} ${offer.imageViewport.y} ${offer.imageViewport.width} ${offer.imageViewport.height}`}
                preserveAspectRatio="xMidYMid slice">
                <image href={offer.image} width={offer.imageViewport.sourceWidth} height={offer.imageViewport.sourceHeight} />
              </svg>
            ) : <img
              src={offer.image}
              alt={`${offer.hotel}酒店图片`}
              width="360"
              height="450"
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />)}
            <div className="rate-info">
              <div className="rate-topline">
                <span className="offer-location">{offer.city}<span className="offer-region-label">{hotelRegion(offer.city, offer.region)}</span></span>
                <span className={offer.status === 'limited' ? 'limited' : ''}>
                  {offer.status === 'limited' ? (offer.stock != null ? `仅余 ${offer.stock} 间` : '限量 · 详见各方案') : '可订'}
                </span>
              </div>
              <h2>{offer.hotel}</h2>
              <p>{hotelDateText(offer)}</p>
              <p>{offer.room}{offer.breakfast ? ` · ${offer.breakfast}` : ''}</p>
              {(offer.featured || offer.highlight || offer.recommendation) && (
                <div className={`recommendation ${offer.featured ? 'featured' : ''}`}>
                  <span>{offer.highlight || (offer.featured ? '特别推荐 · 大特价' : 'Voyage 推荐指数')}</span>
                  {offer.recommendation && <strong>{offer.recommendation.toFixed(1)}</strong>}
                </div>
              )}
              {offer.rateOptions ? (
                <div className="rate-options">
                  {offer.rateOptions.map((option, optionIndex) => (
                    <div className="rate-option" key={`${option.date}-${option.detail}-${optionIndex}`}>
                      <span><strong>{option.date}</strong><small>{option.detail}</small></span>
                      <b>{hotelPrice(option.price)}<small>{option.price ? option.unit || '/ 晚' : ''}</small></b>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rate-price"><strong>{hotelPrice(offer.price)}</strong><span>{offer.price ? offer.priceUnit || '/ 晚' : ''}{offer.referencePrice ? ` · 平台参考 ¥${displayPrice(offer.referencePrice)}` : ' · 询价确认'}</span></div>
              )}
              <div className="rate-actions">
                <button onClick={() => consult(offer)}>询价</button>
                {ctripHotelLink(offer.hotel) && <a href={ctripHotelLink(offer.hotel)} target="_blank" rel="noopener noreferrer" aria-label={`在携程查看${offer.hotel}价格（新窗口）`}>携程看价 ↗</a>}
              </div>
            </div>
          </article>
        )) : (
          <div className="discovery-empty">{isSearching ? '没有匹配的特价。试试其他日期，或查看下面的协议价。' : '近期暂无首页特价。'}</div>
        )}
      </section>

      {isSearching && <ContractSearchResults results={contractResults} limit={contractLimit} showMore={() => setContractLimit(contractLimit + 10)} date={filters.date} inquire={consultContract} />}
      <footer>
        <span>VOYAGE TRAVEL</span>
        <p>价格与房态以人工最终确认为准</p>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}

