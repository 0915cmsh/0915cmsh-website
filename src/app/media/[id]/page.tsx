import Section from '@/components/Section';
import YouTubeEmbed from '@/components/YouTubeEmbed';

export const metadata = {
  title: '미디어 - CMSH',
  description: 'CMSH의 미디어 콘텐츠를 확인해보세요.',
};

interface MediaPageProps {
  params: {
    id: string;
  };
}

export default function MediaPage({ params }: MediaPageProps) {
  // 임시 미디어 데이터
  const mediaData = {
    '75': {
      title: 'CMSH 소개 영상',
      description: 'CMSH의 비전과 미션, 그리고 다양한 서비스를 소개하는 영상입니다.',
      videoId: 'dQw4w9WgXcQ', // 예시 YouTube 비디오 ID
      date: '2024-01-15',
      views: 1234
    }
  };

  const media = mediaData[params.id as keyof typeof mediaData];

  if (!media) {
    return (
      <div>
        <Section className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">미디어를 찾을 수 없습니다</h1>
            <p className="text-gray-600">요청하신 미디어 콘텐츠를 찾을 수 없습니다.</p>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">미디어</h1>
            <p className="text-xl text-blue-100">
              CMSH의 미디어 콘텐츠를 확인해보세요
            </p>
          </div>
        </Section>
      </section>

      {/* 미디어 상세 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* 미디어 헤더 */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {media.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>작성일: {media.date}</span>
                <span>조회수: {media.views.toLocaleString()}</span>
              </div>
            </div>

            {/* YouTube 임베드 */}
            <div className="mb-8">
              <YouTubeEmbed 
                videoId={media.videoId} 
                title={media.title}
              />
            </div>

            {/* 미디어 설명 */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {media.description}
              </p>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                목록으로
              </button>
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  공유하기
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  좋아요
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 관련 미디어 */}
      <Section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">관련 미디어</h2>
          <p className="text-lg text-gray-600">
            더 많은 미디어 콘텐츠를 확인해보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🎥</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">서비스 소개 영상</h3>
              <p className="text-gray-600 text-sm">CMSH의 다양한 서비스를 소개합니다.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🎥</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">고객 후기</h3>
              <p className="text-gray-600 text-sm">CMSH를 이용한 고객들의 후기를 들어보세요.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🎥</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">채용 박람회 현장</h3>
              <p className="text-gray-600 text-sm">채용 박람회 현장 모습을 확인해보세요.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
