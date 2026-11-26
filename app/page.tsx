'use client';

import { useEffect, useState } from 'react';
import { hotelOffers, isHotelOfferCurrent, formatAvailableHotelDates, type HotelOffer } from '../data/hotels';
import { offerRegions, hotelRegion } from '../data/offer-regions';
import SiteTabs from '../components/site-tabs';

const cnDate = (date: string) => {
  const [, month, day] = date.split('-');
  return `${Number(month)}月${Number(day)}日`;
};

const displayPrice = (value: string) => value.trim().toUpperCase();
const hotelPrice = (value: string) => value.trim() ? `¥${displayPrice(value)}` : '价格请询';

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

const xhsUrl = (name: string) =>
  `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(name)}`;

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

  useEffect(() => {
    const refreshDate = () => setToday(chinaToday());
    refreshDate();
    const selectedRegion = new URLSearchParams(window.location.search).get('region');
    let regionTimer: number | undefined;
    if (offerRegions.some((value) => value === selectedRegion)) {
      regionTimer = window.setTimeout(() => setRegion(selectedRegion as (typeof offerRegions)[number]), 0);
    }
    const timer = window.setInterval(refreshDate, 60 * 1000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(regionTimer);
    };
  }, []);

  const available = consolidateHotelOffers(hotelOffers.filter((offer) =>
    Boolean(offer.checkIn || offer.homepage) && isHotelOfferCurrent(offer, today)
  ));
  const featuredOffers = available.sort((a, b) =>
    Number(Boolean(b.featured || b.highlight)) - Number(Boolean(a.featured || a.highlight))
  );
  const visibleOffers = featuredOffers.filter((offer) =>
    region === '全部' || hotelRegion(offer.city, offer.region) === region
  );

  function chooseRegion(value: (typeof offerRegions)[number]) {
    setRegion(value);
    const url = new URL(window.location.href);
    if (value === '全部') url.searchParams.delete('region');
    else url.searchParams.set('region', value);
    window.history.replaceState({}, '', url);
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
    <main>
      <header className="topbar">
        <a className="brand" href="#top">VOYAGE <span>TRAVEL</span></a>
        <div className="top-actions">
          <span className="updated">精选特价</span>
          <button onClick={shareList}>分享清单</button>
        </div>
      </header>

      <section className="intro" id="top">
        <p>PRIVATE HOTEL RATES</p>
        <h1>近期酒店<br />精选特价</h1>
        <div className="intro-note">
          <span>{featuredOffers.length} 家酒店</span>
          <span>无需登录 · 人工确认</span>
        </div>
      </section>
      <SiteTabs active="offers" />

      <nav className="filter-panel offer-region-filter" aria-label="按地区查看特价">
        <div className="city-scroll">
          {offerRegions.map((value) => (
            <button key={value} className={region === value ? 'active' : ''}
              aria-pressed={region === value} onClick={() => chooseRegion(value)}>
              {value}
            </button>
          ))}
        </div>
      </nav>

      <section className="rate-list" aria-live="polite">
        <div className="list-head"><span>{region === '全部' ? '酒店特价' : `${region}酒店特价`}</span><span>{visibleOffers.length} 家酒店</span></div>
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
                <a href={xhsUrl(offer.hotel)} target="_blank" rel="noreferrer">小红书看看 ↗</a>
                <button onClick={() => consult(offer)}>询价</button>
              </div>
            </div>
          </article>
        )) : (
          <div className="empty"><p>{region === '全部' ? '近期暂无主页特价' : '该地区暂无酒店特价'}</p></div>
        )}
      </section>

      <footer>
        <span>VOYAGE TRAVEL</span>
        <p>价格与房态以人工最终确认为准</p>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}

