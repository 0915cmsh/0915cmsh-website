import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] hero-mobile flex items-center justify-center">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png" // 이미지 경로
          alt="Hero Background"
          fill
          className="object-cover brightness-70"
          priority
        />
        {/* 어두운 오버레이 추가 */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hero-content">
        {/* 텍스트 전용 배경 박스 */}
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 mb-4 border border-white/20 shadow-2xl">
          {/* 이전 <div className="mb-8"> ... <div className="text-6xl font-black text-white mb-6 mx-auto w-fit text-shadow-2xl">CMSH</div></div> 부분이 제거되었습니다. */}
          {/* 이미지 2와 같이 "Outsourcing Consulting" 다음에 "CMSH"가 오도록 수정 */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl break-words hero-title">
            <span className="text-shadow-lg">Outsourcing Consulting</span>
            <span className="block text-blue-200 text-shadow-lg">CMSH</span> 
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-4 sm:mb-6 max-w-3xl mx-auto font-semibold drop-shadow-lg break-words hero-subtitle">
            <span className="text-shadow-md">인재와 현장을 데이터로 연결하는</span><br/>
            <strong className="text-white text-shadow-lg">전문 아웃소싱 파트너</strong>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6 hero-buttons">
          <Link href="/business" className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto hero-button">
            서비스 보기
          </Link>
          <Link href="/inquiry/board" className="btn-secondary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto hero-button">
            문의 게시판
          </Link>
        </div>

        {/* 하이라이트 카드들 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto hero-cards">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 w-full hero-card">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-lg break-words hero-card-title">48-72시간</div>
            <div className="text-blue-100 font-semibold drop-shadow-md text-xs sm:text-sm md:text-base break-words hero-card-subtitle">신속한 인력 배치</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 w-full hero-card">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-lg break-words hero-card-title">95%+</div>
            <div className="text-blue-100 font-semibold drop-shadow-md text-xs sm:text-sm md:text-base break-words hero-card-subtitle">고객 만족도</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 w-full hero-card">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-lg break-words hero-card-title">전국</div>
            <div className="text-blue-100 font-semibold drop-shadow-md text-xs sm:text-sm md:text-base break-words hero-card-subtitle">네트워크 커버리지</div>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hero-scroll-indicator">
        <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center bg-black/30 backdrop-blur-sm shadow-lg">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 drop-shadow-md"></div>
        </div>
      </div>
    </section>
  );
}