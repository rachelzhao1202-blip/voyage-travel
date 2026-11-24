'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Static hosting uses document navigation. */
import { useEffect, useState } from 'react';
import SiteTabs from '../../components/site-tabs';
import { flightOffers, type FlightOffer } from '../../data/flights';
import { activeFlightOffers, groupFlightDates, shanghaiDate } from '../../data/flight-utils';

const cities = (field: 'origin' | 'destination') =>
  [...new Set(flightOffers.flatMap((offer) => offer[field]?.split('/') || []))];
const origins = cities('origin');
const destinations = cities('destination');
const priceText = (offer: FlightOffer) => offer.priceLabel || `¥${offer.price}`;

export default function FlightsList() {
  const [today, setToday] = useState(shanghaiDate);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  useEffect(() => {
    const timer = window.setInterval(() => setToday(shanghaiDate()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const active = activeFlightOffers(flightOffers, today);
  const scheduled = active.filter((offer) => offer.origin &&
    (!origin || offer.origin.split('/').includes(origin)) &&
    (!destination || offer.destination?.split('/').includes(destination)));
  const other = active.filter((offer) => !offer.origin);

  function renderOffer(offer: FlightOffer) {
    const months = groupFlightDates(offer.travelDates || []);
    return (
      <article className="airfare-card" key={offer.id}>
        <div className="airfare-heading">
          <div><span className="airfare-cabin">{offer.cabin}</span><h2>{offer.route}</h2></div>
          <strong className="airfare-price">{priceText(offer)}</strong>
        </div>
        {months.length ? (
          <div className="airfare-dates" aria-label="可订出发日期">
            {months.map(([month, dates]) => (
              <div className="airfare-month" key={month}>
                <span>{Number(month.slice(5))}月</span>
                <div>{dates.map((date) => <time dateTime={date} key={date}>{Number(date.slice(8))}日</time>)}</div>
              </div>
            ))}
          </div>
        ) : <p className="airfare-period">{offer.travelPeriod}</p>}
        {offer.note && <p className="airfare-note">{offer.note}</p>}
      </article>
    );
  }
  return (
    <main>
      <header className="topbar"><a className="brand" href="/">VOYAGE <span>TRAVEL</span></a></header>
      <section className="intro">
        <p>SELECTED FLIGHT OFFERS</p><h1>机票特价</h1>
        <div className="intro-note"><span>航线 · 舱位 · 出发日期</span><span>具体航班及票价请询</span></div>
      </section>
      <SiteTabs active="flights" />
      <section className="airfare-filters" aria-label="航线筛选">
        <label>出发地<select value={origin} onChange={(event) => setOrigin(event.target.value)}><option value="">全部出发地</option>{origins.map((city) => <option key={city}>{city}</option>)}</select></label>
        <label>目的地<select value={destination} onChange={(event) => setDestination(event.target.value)}><option value="">全部目的地</option>{destinations.map((city) => <option key={city}>{city}</option>)}</select></label>
      </section>
      <section className="rate-list" aria-label="机票航线特价">
        <div className="list-head"><span>精选航线 · {today.slice(0,4)}年</span><span>{scheduled.length} 条航线</span></div>
        {scheduled.map(renderOffer)}
        {!scheduled.length && <div className="empty"><p>暂无匹配航线，请更换筛选条件</p></div>}
      </section>
      {!origin && !destination && other.length > 0 && (
        <section className="rate-list" aria-label="其他机票特价">
          <div className="list-head"><span>其他机票特价</span></div>{other.map(renderOffer)}
        </section>
      )}
      <footer><span>VOYAGE TRAVEL</span><p>日期按北京时间更新，已过期日期不再显示。<br />具体航班、税费、行李及退改条件请咨询确认。</p></footer>
    </main>
  );
}
