/* eslint-disable @next/next/no-html-link-for-pages -- Static hosting uses full document navigation; the client RSC router fails here. */
type SiteTab = 'offers' | 'flights' | 'contract' | 'guide';

export default function SiteTabs({ active }: { active: SiteTab }) {
  return (
    <nav className="site-tabs" aria-label="网站栏目">
      <a href="/" aria-current={active === 'offers' ? 'page' : undefined}>酒店特价</a>
      <a href="/flights" aria-current={active === 'flights' ? 'page' : undefined}>机票特价</a>
      <a href="/contract?city=%E9%A6%99%E6%B8%AF" aria-current={active === 'contract' ? 'page' : undefined}>城市房源</a>
      <a href="/stay-guide" aria-current={active === 'guide' ? 'page' : undefined}>入住说明</a>
    </nav>
  );
}
