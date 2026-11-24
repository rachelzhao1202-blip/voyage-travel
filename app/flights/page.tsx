import type { Metadata } from 'next';
import FlightsList from './flights-list';

export const metadata: Metadata = {
  title: '机票特价｜Voyage Travel',
  description: '精选商务舱机票特价，查看航线、可订日期与售价，具体航班和票务条件请咨询确认。',
};

export default function FlightsPage() {
  return <FlightsList />;
}
