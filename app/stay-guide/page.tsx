import type { Metadata } from 'next';
/* eslint-disable @next/next/no-html-link-for-pages -- Use document navigation on the static deployment. */
import SiteTabs from '../../components/site-tabs';

export const metadata: Metadata = {
  title: '入住说明｜Voyage Travel',
  description: '了解 Voyage Travel 常见的实名预订、房券预订和同住人预订方式。',
};

export default function StayGuidePage() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="/">VOYAGE <span>TRAVEL</span></a>
      </header>
      <section className="intro">
        <p>STAY GUIDE</p>
        <h1>入住说明</h1>
        <div className="intro-note"><span>预订前看一眼</span><span>具体以每单确认为准</span></div>
      </section>
      <SiteTabs active="guide" />
      <section className="stay-guide">
        <article>
          <small>01 / 预订方式</small>
          <h2>实名预订</h2>
          <p>通常用于协议价房源。用客人的姓名预订，方式和常见订房平台类似；到店后向前台报预订姓名，出示有效证件办理入住。</p>
        </article>
        <article>
          <small>02 / 预订方式</small>
          <h2>房券预订</h2>
          <p>实体房券会提前邮寄给客人。请妥善保管房券，入住时携带房券及有效证件，到前台报预订姓名办理入住。具体使用日期和规则以房券及订单确认为准。</p>
        </article>
        <article>
          <small>03 / 预订方式</small>
          <h2>同住人预订</h2>
          <p>由我们的会员预订并添加客人为同住人。房间确认后，客人可在前台报预订信息和本人姓名，出示有效证件办理登记、领取房卡；通常无需重复支付房费。押金或额外消费以酒店要求和订单确认为准。</p>
        </article>
        <article>
          <small>TIP / 儿童早餐</small>
          <h2>带孩子入住</h2>
          <p>各酒店集团及门店的儿童早餐政策不同，年龄、身高和房价所含早餐人数都可能影响收费。预订时请告知儿童年龄与人数，建议在入住前确认；是否免费以酒店当日政策为准。</p>
        </article>
        <p className="guide-note">入住方式会因酒店、房型和日期不同而变化，成交前请以对应房源的确认信息为准。</p>
      </section>
      <footer><span>VOYAGE TRAVEL</span><p>具体房态和入住安排以人工确认为准。</p></footer>
    </main>
  );
}
