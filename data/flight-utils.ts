import type { FlightOffer } from './flights';

export const shanghaiDate = () => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());

export function activeFlightOffers(offers: FlightOffer[], today: string): FlightOffer[] {
  return offers.filter((offer) => offer.status !== 'soldout' && (!offer.expiresOn || offer.expiresOn >= today))
    .map((offer) => offer.travelDates ? {
      ...offer, travelDates: [...new Set(offer.travelDates)].filter((date) => date >= today).sort(),
    } : offer)
    .filter((offer) => !offer.travelDates || offer.travelDates.length > 0);
}

export function groupFlightDates(dates: string[]): [string, string[]][] {
  const groups = new Map<string, string[]>();
  for (const date of dates) {
    const month = date.slice(0,7);
    groups.set(month, [...(groups.get(month) || []), date]);
  }
  return [...groups.entries()];
}
