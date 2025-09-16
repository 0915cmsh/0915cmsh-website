export default function FAQPage() {
  const faqs = [
    {
      question: "파견 서비스는 어떻게 이용할 수 있나요?",
      answer: "파견 서비스는 고객사의 요구사항에 맞는 전문 인력을 선별하여 파견하는 서비스입니다. 고객센터(1544-7494)로 문의하시거나 온라인 문의를 통해 상담받으실 수 있습니다."
    },
    {
      question: "아웃소싱 서비스의 비용은 어떻게 책정되나요?",
      answer: "아웃소싱 서비스 비용은 프로젝트 규모, 기간, 인력 수준에 따라 차등적으로 책정됩니다. 정확한 견적을 위해 상담을 받으시는 것을 권장합니다."
    },
    {
      question: "헤드헌팅 서비스는 어떤 분야의 인재를 찾아주나요?",
      answer: "IT, 금융, 제조업, 서비스업 등 다양한 분야의 중견급 이상 인재를 대상으로 헤드헌팅 서비스를 제공합니다. 구체적인 요구사항을 말씀해주시면 맞춤형 서비스를 제공해드립니다."
    },
    {
      question: "RPO 서비스와 일반 채용의 차이점은 무엇인가요?",
      answer: "RPO(Recruitment Process Outsourcing)는 채용 프로세스 전체를 외부 전문업체에 위탁하는 서비스입니다. 채용 계획 수립부터 최종 합격자 확정까지 전 과정을 관리해드립니다."
    },
    {
      question: "파견직 근로자의 복리후생은 어떻게 되나요?",
      answer: "파견직 근로자도 4대 보험, 퇴직금, 연차휴가 등 법정 복리후생을 모두 제공받습니다. 또한 CMSH에서 제공하는 추가 복리후생도 있습니다."
    },
    {
      question: "계약 기간은 어떻게 되나요?",
      answer: "계약 기간은 프로젝트 성격과 고객사 요구사항에 따라 유연하게 조정 가능합니다. 단기(1-3개월), 중기(3-12개월), 장기(1년 이상) 계약 모두 가능합니다."
    },
    {
      question: "안전 교육은 필수인가요?",
      answer: "네, 모든 파견직 근로자는 근무 시작 전 안전 교육을 필수로 받아야 합니다. 고객사 현장의 특성에 맞는 맞춤형 안전 교육을 제공합니다."
    },
    {
      question: "급여는 언제 지급되나요?",
      answer: "급여는 매월 25일에 지급됩니다. 휴일인 경우 전 영업일로 지급일이 조정됩니다."
    },
    {
      question: "문의에 대한 답변은 언제 받을 수 있나요?",
      answer: "문의 접수 후 1-2일 이내에 답변드립니다. 긴급한 문의의 경우 고객센터(1544-7494)로 전화 문의하시면 더 빠른 상담이 가능합니다."
    },
    {
      question: "해지 시 위약금이 있나요?",
      answer: "계약 해지 시 위약금은 없습니다. 다만, 계약 조건에 따라 사전 통지 기간이 있을 수 있습니다. 자세한 사항은 계약서를 확인해주세요."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
          <p className="text-lg text-gray-600">
            CMSH 서비스 이용 시 자주 문의하시는 질문과 답변을 정리했습니다.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full mr-3 flex-shrink-0">
                    Q{index + 1}
                  </span>
                  {faq.question}
                </h3>
                <div className="ml-8">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-gray-600 mb-6">
            추가 문의사항이 있으시면 언제든지 연락주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1544-7494"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ color: 'white' }}
            >
              📞 1544-7494
            </a>
            <a
              href="/inquiry/board"
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ color: 'white' }}
            >
              온라인 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
