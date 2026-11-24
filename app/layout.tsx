import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://voyage-travel-h5.pages.dev'),
  title: 'Voyage Travel｜精选酒店特价',
  description: '精选酒店特价与城市房源清单，免登录直接查看。',
  openGraph: {
    title: 'Voyage Travel｜精选酒店特价',
    description: '打开清单即可查看精选酒店特价，价格与房态人工确认。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Voyage Travel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voyage Travel｜精选酒店特价',
    description: '精选酒店特价与城市房源清单，免登录直接查看。',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#1d201b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
