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
    <section className="py-16 partner-marquee-mobile">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">신뢰받는 파트너사</h2>
          <p className="text-sm sm:text-base opacity-85">다양한 산업의 기업과 함께 성장하고 있습니다</p>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 sm:gap-8 animate-[mar_28s_linear_infinite] will-change-transform">
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
    </section>
  );
}