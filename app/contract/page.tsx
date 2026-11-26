'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Use document navigation on the static deployment. */

import { useEffect, useState } from 'react';
import { cityContractRates, type ContractHotel } from '../../data/contract-rates';
import SiteTabs from '../../components/site-tabs';
import { ctripHotelLink } from '../../data/hotel-links';

const cityNames = cityContractRates.map((item) => item.city);

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const input = document.createElement('textarea');
  input.value = value;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();
}

export default function ContractRatesPage() {
  const [city, setCity] = useState('香港');
  const [notice, setNotice] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    const refresh = () => setToday(new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10));
    refresh();
    const timer = window.setInterval(refresh, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get('city');
    const resolved = selected === '杭州' || selected === '苏州' ? '苏杭' : selected;
    if (resolved && cityNames.includes(resolved)) {
      const timer = window.setTimeout(() => setCity(resolved), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const selectedCity = cityContractRates.find((item) => item.city === city) || cityContractRates[0];
  const current = {
    ...selectedCity,
    hotels: selectedCity.hotels.map((hotel) => ({
      ...hotel, rates: hotel.rates.filter((rate) => !today || !rate.expiresOn || rate.expiresOn >= today),
    })).filter((hotel) => hotel.rates.length),
  };
  const hasFlexible = current.hotels.some((hotel) => hotel.rates.some((rate) => rate.kind === 'flexible'));
  const hasPrices = current.hotels.some((hotel) => hotel.rates.some((rate) => rate.price != null || rate.priceText || rate.periodPrices?.length));
  const listTitle = hasFlexible ? '房源清单' : city === '澳门' ? '房源价格' : city === '苏杭' ? '协议价与可询房源' : '协议价';

  function chooseCity(value: string) {
    setCity(value);
    const url = new URL(window.location.href);
    url.searchParams.set('city', value);
    window.history.replaceState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function shareCity() {
    const url = `${window.location.origin}/contract?city=${encodeURIComponent(city)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Voyage Travel｜${city}${listTitle}`, url });
        return;
      } catch {
        // 用户取消或微信内置浏览器不支持时，继续复制链接。
      }
    }
    await copyText(url);
    setNotice('城市清单链接已复制');
    window.setTimeout(() => setNotice(''), 2600);
  }

  async function consult(hotel: ContractHotel) {
    const lines = hotel.rates.map((rate) => {
      const prices = rate.periodPrices?.map((item) => `${item.period} ¥${item.price}`).join(' · ');
      return `${rate.room}｜${prices || (rate.priceText ? `¥${rate.priceText}` : rate.price == null ? '价格请询' : `¥${rate.price}`)}${rate.unit || ''}${rate.validity ? `｜${rate.validity}` : ''}`;
    }).join('\n');
    await copyText(`Voyage Travel｜${city}｜${hotel.name}\n${lines}\n请确认入住日期、房态和实际价格。`);
    setNotice('询价内容已复制，可发给顾问');
    window.setTimeout(() => setNotice(''), 2600);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="/">VOYAGE <span>TRAVEL</span></a>
        <div className="top-actions">
          <button onClick={shareCity}>分享清单</button>
        </div>
      </header>

      <section className="intro contract-intro">
        <p>HOTEL COLLECTION</p>
        <h1>城市<br />房源清单</h1>
        <div className="intro-note">
          <span>{cityContractRates.length} 个城市 · {current.hotels.length} 家酒店</span>
          <span>无需登录 · 直接查看</span>
        </div>
      </section>
      <SiteTabs active="contract" />

      <nav className="filter-panel" aria-label="选择城市">
        <div className="city-scroll">
          {cityContractRates.map((item) => (
            <button key={item.city} className={city === item.city ? 'active' : ''}
              onClick={() => chooseCity(item.city)} aria-current={city === item.city ? 'page' : undefined}>
              {item.city}
            </button>
          ))}
        </div>
      </nav>

      <section className="contract-list" aria-live="polite">
        <div className="contract-heading">
          <div><span>VOYAGE TRAVEL / {city}</span><h2>{city}{listTitle}</h2></div>
          <span>{current.hotels.length} 家</span>
        </div>
        <p className="contract-notice">
          {hasFlexible ? '协议价为平日参考；房券及灵活日期报价以各条使用条件、计价单位和有效期为准。具体日期与房态请私聊确认。'
            : city === '澳门' ? '按周中、周五、周六等时段展示；具体日期、房态和最终价格请私聊确认。'
            : `${hasPrices ? '所示为平日协议价，' : ''}具体日期、价格与房态请私聊确认。`}
        </p>
        {current.cooperationNotes?.length ? (
          <aside className="contract-cooperation" aria-label="城市合作说明">
            {current.cooperationNotes.map((note) => <p key={note}>{note}</p>)}
          </aside>
        ) : null}
        {current.hotels.map((hotel, index) => (
          <article className="contract-hotel" key={hotel.name}>
            <span className="contract-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="contract-hotel-info">
              <h3>{hotel.name}</h3>
              {hotel.rates.map((rate, rateIndex) => (
                <div className={`contract-rate${rate.periodPrices ? ' contract-rate-schedule' : ''}`} key={`${rate.room}-${rateIndex}`}>
                  <span>{rate.room || '房型请询'}
                    {rate.kind === 'flexible' && <small className="contract-validity">房券 / 灵活日期 · {rate.validity}</small>}
                  </span>
                  {rate.periodPrices ? (
                    <div className={`contract-period-prices${rate.periodPrices.length === 2 ? ' two' : ''}`}>
                      {rate.periodPrices.map((item) => (
                        <div key={item.period}><small>{item.period}</small><strong>¥{item.price}</strong></div>
                      ))}
                    </div>
                  ) : <strong>{rate.priceText ? `¥${rate.priceText}` : rate.price == null ? '价格请询' : `¥${rate.price}`}
                    {rate.unit && <small className="contract-price-unit">{rate.unit}</small>}
                  </strong>}
                </div>
              ))}
              {ctripHotelLink(hotel.name) && <a className="contract-platform-link" href={ctripHotelLink(hotel.name)} target="_blank" rel="noopener noreferrer" aria-label={`在携程查看${hotel.name}价格（新窗口）`}>携程看价 ↗</a>}
            </div>
            <button className="contract-consult" onClick={() => consult(hotel)}>询价</button>
          </article>
        ))}
      </section>

      <footer>
        <span>VOYAGE TRAVEL</span>
        <p>具体日期、房态及最终价格以人工确认为准。</p>
      </footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
