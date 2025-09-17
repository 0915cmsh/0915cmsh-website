'use client';
import Image from 'next/image';

type Partner = { name: string; logo?: string; image?: string };
const partners: Partner[] = Array.from({ length: 20 }).map((_, i) => ({ 
  name: `파트너 ${i + 1}`, 
  logo: '🏢',
  image: `/images/partners/partner-${(i % 10) + 1}.png` // 10개 이미지 순환
}));

export default function PartnerMarquee() {
  const items = [...partners, ...partners]; // seamless
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">신뢰받는 파트너사</h2>
          <p className="opacity-85">다양한 산업의 기업과 함께 성장하고 있습니다</p>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-[mar_28s_linear_infinite] will-change-transform">
            {items.map((p, idx) => (
              <div key={idx} className="partner-chip">
                <div className="partner-logo">
                  <Image
                    src={p.image || '/images/partners/default.png'}
                    alt="파트너 로고"
                    width={120}
                    height={90}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes mar { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .partner-chip { 
          background:#fff; 
          color:#111; 
          border-radius:16px; 
          padding:20px 24px; 
          display:flex; 
          align-items:center; 
          justify-content:center;
          min-width:180px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        .partner-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .partner-logo {
          width: 120px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}