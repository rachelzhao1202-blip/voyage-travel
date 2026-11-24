import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voyage Travel｜城市酒店房源清单',
  description: '按城市查看酒店协议价、房券及灵活日期房源；有效期和使用条件见各条说明，具体日期私聊询价。',
  openGraph: {
    title: 'Voyage Travel｜城市酒店房源清单',
    description: '协议价、房券与灵活日期房源按城市整理。无需登录，具体日期与房态私聊确认。',
  },
};

export default function ContractLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
