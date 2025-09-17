'use client';
import { useEffect, useState } from 'react';

export default function PartnerGrid() {
  const partners = [
    { name: "삼성전자", logo: "🏢", category: "제조업" },
    { name: "LG전자", logo: "🏭", category: "제조업" },
    { name: "현대자동차", logo: "🚗", category: "자동차" },
    { name: "SK하이닉스", logo: "💾", category: "반도체" },
    { name: "네이버", logo: "🌐", category: "IT" },
    { name: "카카오", logo: "💬", category: "IT" },
    { name: "CJ그룹", logo: "🏪", category: "유통" },
    { name: "롯데그룹", logo: "🏬", category: "유통" },
    { name: "포스코", logo: "⚡", category: "철강" },
    { name: "한화그룹", logo: "🔋", category: "화학" },
    { name: "GS그룹", logo: "⛽", category: "에너지" },
    { name: "두산그룹", logo: "🏗️", category: "중공업" },
    { name: "한진그룹", logo: "🚢", category: "물류" },
    { name: "대림그룹", logo: "🏘️", category: "건설" },
    { name: "효성그룹", logo: "🧵", category: "섬유" },
    { name: "LS그룹", logo: "🔌", category: "전력" },
    { name: "동원그룹", logo: "🐟", category: "식품" },
    { name: "농심", logo: "🍜", category: "식품" },
    { name: "아모레퍼시픽", logo: "💄", category: "화장품" },
    { name: "LG생활건강", logo: "🧴", category: "화장품" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (partners.length - 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <section className="py-16 content-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold primary-text mb-4">
            신뢰받는 파트너사
          </h2>
          <p className="text-lg primary-text opacity-85">
            국내 주요 기업들과 함께 성장하고 있습니다
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 20}%)` }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/5 px-4"
              >
                <div className="flex flex-col items-center justify-center p-6 card-dark shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <span className="text-sm font-medium primary-text">{partner.name}</span>
                  <span className="text-xs primary-text opacity-70 mt-1">{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(partners.length / 5) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
