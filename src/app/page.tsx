import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import PartnerMarquee from "@/components/PartnerMarquee";
import Section from "@/components/Section";

export default function Home() {
  const services = [
    {
      title: "파견 서비스",
      description: "전문 인력을 필요로 하는 기업에 맞춤형 파견 서비스를 제공합니다.",
      href: "/business/dispatch",
      icon: "👥"
    },
    {
      title: "아웃소싱",
      description: "비즈니스 프로세스를 효율적으로 관리할 수 있는 아웃소싱 솔루션을 제공합니다.",
      href: "/business/outsourcing",
      icon: "🏢"
    },
    {
      title: "헤드헌팅",
      description: "최고의 인재를 찾아드리는 전문 헤드헌팅 서비스를 제공합니다.",
      href: "/business/headhunting",
      icon: "🎯"
    },
    {
      title: "RPO",
      description: "채용 프로세스 전체를 아웃소싱하는 RPO 서비스를 제공합니다.",
      href: "/business/rpo",
      icon: "📋"
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* 서비스 소개 */}
      <Section className="section-pad">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            우리의 서비스
          </h2>
          <p className="text-lg opacity-85">
            다양한 인재 솔루션으로 고객의 성공을 지원합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              href={service.href}
              icon={service.icon}
            />
          ))}
        </div>
      </Section>

      {/* 파트너 마퀴 */}
      <PartnerMarquee />

      {/* 연락처 섹션 */}
      <Section className="section-pad relative overflow-hidden">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* 장식적 요소들 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-indigo-200/25 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center">
          {/* 아이콘 추가 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">🚀</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            지금 시작하세요
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
            전문가와 상담하여 <span className="text-blue-600 font-bold">최적의 솔루션</span>을 찾아보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto">
            <a
              href="/inquiry/corporate"
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-blue-800"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                기업 문의
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="/inquiry/jobseeker"
              className="group relative bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                구직자 문의
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </a>

            <a
              href="/inquiry/employee"
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-purple-700 hover:to-purple-800"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                재직자 문의
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* 추가 정보 카드 */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">빠른 상담</h3>
              <p className="text-gray-600 text-sm">24시간 내 전문가 상담</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">맞춤 솔루션</h3>
              <p className="text-gray-600 text-sm">고객별 최적화된 서비스</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-gray-800 mb-2">신뢰할 수 있는 파트너</h3>
              <p className="text-gray-600 text-sm">검증된 전문성과 경험</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}