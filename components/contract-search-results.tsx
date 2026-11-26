'use client';

import { cityContractRates, type ContractRate } from '../data/contract-rates';
import { contractHotelCity, contractHotelRegion, formatHotelPrice, matchesHotelSearch } from '../data/hotel-search';
import { ctripHotelLink } from '../data/hotel-links';

const asPrice = (rate: ContractRate) => rate.priceText || rate.price || '';

export function filterCityHotels(query: string, region: string, today: string, date: string) {
  return cityContractRates.flatMap(group => group.hotels.flatMap(hotel => {
    const city = contractHotelCity(group.city, hotel.name);
    const area = contractHotelRegion(group.city, city);
    if ((region !== '全部' && area !== region) || !matchesHotelSearch(query, city, area, hotel.name, group.city)) return [];
    const rates = hotel.rates.filter(r => !r.expiresOn || (r.expiresOn >= today && (!date || r.expiresOn >= date)));
    return rates.length ? [{ group: group.city, city, name: hotel.name, rates }] : [];
  }));
}

export default function ContractSearchResults({ results, limit, showMore, date, inquire }:{
  results: ReturnType<typeof filterCityHotels>;
  limit: number; showMore: () => void; date: string;
  inquire: (title: string, text: string) => void;
}) {
  return (
    <section id="found-contract" className="search-contract" aria-labelledby="contract-results-title">
      <div className="discovery-section-title">
        <div><span>02 / CITY RATES</span><h2 id="contract-results-title">城市协议价与房券</h2></div>
        <p>{results.length} 家</p>
      </div>
      <p className="search-hint">{date ? '以下是参考报价，不代表所选日期有房；周末、节假日和房券适用日期请询。' : '协议价为参考价。房券和灵活日期请看各项条件，最终价格与房态需确认。'}</p>
      {results.length === 0 && <div className="discovery-empty">没有符合条件的协议价或房券，试试其他城市。</div>}
      <div className="search-contract-grid">
        {results.slice(0,limit).map(({group, city, name, rates}) => {
          const link = ctripHotelLink(name);
          return <article className="search-contract-card" key={`${group}/${name}`}>
            <span className="card-eyebrow">{city} · 参考报价</span>
            <h3>{name}</h3>
            {rates.map((rate, index) => <div className="search-contract-rate" key={index}>
              <span>{rate.room || '房型请询'}{rate.kind === 'flexible' && <small>房券 / 灵活日期 · {rate.validity}</small>}</span>
              {rate.periodPrices ? <b>{rate.periodPrices.map(p => <small key={p.period}>{p.period} {formatHotelPrice(p.price)}</small>)}</b> : <b>{formatHotelPrice(asPrice(rate))}{rate.unit && <small>{rate.unit}</small>}</b>}
            </div>)}
            <div className="discovery-card-actions">
              <button type="button" onClick={() => inquire(`${name}询价`, [`Voyage Travel｜${city}｜${name}`, date && `意向入住：${date}`, '想确认房价、房态和适用条件。'].filter(Boolean).join('\n'))}>询价</button>
              {link && <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`在携程查看${name}价格（新窗口）`}>携程看价 ↗</a>}
            </div>
          </article>;
        })}
      </div>
      {limit < results.length && <button type="button" className="discovery-more" onClick={showMore}>查看更多协议价与房券（还有 {results.length-limit} 家）</button>}
    </section>
  );
}
