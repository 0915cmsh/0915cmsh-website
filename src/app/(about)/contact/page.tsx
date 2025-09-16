import { COMPANY } from '@/lib/company';

function GoogleMap({ q }: { q: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
  return <iframe className="w-full h-[420px] rounded-2xl border" style={{borderColor:'var(--border)'}} src={src} loading="lazy" />;
}

export default function ContactPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">오시는 길</h2>
        <p className="mt-2 opacity-85">{COMPANY.address}</p>
        <ul className="mt-4 space-y-1">
          <li><span className="font-medium">대표전화</span> {COMPANY.tel}</li>
          <li><span className="font-medium">대표핸드폰</span> {COMPANY.mobile}</li>
          <li><span className="font-medium">이메일</span> {COMPANY.email}</li>
        </ul>
      </div>
      <div>
        <GoogleMap q={COMPANY.address} />
      </div>
    </div>
  );
}
