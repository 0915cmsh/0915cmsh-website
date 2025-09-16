// 날짜 포맷 함수
export const formatKoreanDate = (iso: string) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '날짜 오류';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}. ${mm}. ${dd}.`;
};

// 역번호 계산 함수
export const calculateDisplayNumber = (totalCount: number, startIndex: number, rowIndex: number) => {
  return totalCount - (startIndex + rowIndex);
};

