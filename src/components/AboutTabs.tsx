'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { name: '인사말', href: '/about/greeting' },
  { name: '회사개요', href: '/about/overview' },
  { name: '조직도', href: '/about/org' },
  { name: '오시는 길', href: '/about/contact' },
];

export default function AboutTabs() {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap gap-3">
      {TABS.map(t => {
        const active = pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`rounded-xl px-5 py-2 text-sm font-medium ${
              active ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.name}
          </Link>
        );
      })}
    </div>
  );
}
