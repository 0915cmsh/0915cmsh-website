'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import { formatKoreanDate } from '@/lib/utils';

interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminNoticeEdit({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    published: true
  });

  useEffect(() => {
    fetchNotice();
  }, [resolvedParams.id]);

  const fetchNotice = async () => {
    try {
      console.log('Fetching notice with ID:', resolvedParams.id); // 디버깅 로그
      const res = await fetch(`/api/notice/${resolvedParams.id}`, { 
        cache: 'no-store' 
      });
      console.log('API Response status:', res.status); // 디버깅 로그
      
      if (res.ok) {
        const data = await res.json();
        console.log('Notice data:', data); // 디버깅 로그
        setNotice(data.item || null);
        if (data.item) {
          setEditData({
            title: data.item.title,
            content: data.item.content,
            published: data.item.published
          });
        }
      } else {
        const errorData = await res.json();
        console.error('API Error:', errorData); // 디버깅 로그
      }
    } catch (error) {
      console.error('Error fetching notice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Updating notice with data:', editData); // 디버깅 로그
      const res = await fetch(`/api/notice/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      console.log('Update response status:', res.status); // 디버깅 로그

      if (res.ok) {
        setIsEditing(false);
        fetchNotice(); // Refresh notice data
        alert('공지사항이 수정되었습니다.');
      } else {
        const errorData = await res.json();
        console.error('Update error:', errorData); // 디버깅 로그
        alert('공지사항 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('공지사항 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;

    try {
      console.log('Deleting notice with ID:', resolvedParams.id); // 디버깅 로그
      const res = await fetch(`/api/notice/${resolvedParams.id}`, {
        method: 'DELETE',
      });

      console.log('Delete response status:', res.status); // 디버깅 로그

      if (res.ok) {
        alert('공지사항이 삭제되었습니다.');
        window.location.href = '/admin/dashboard';
      } else {
        const errorData = await res.json();
        console.error('Delete error:', errorData); // 디버깅 로그
        alert('공지사항 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('공지사항 삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
        <Link href="/admin/dashboard" className="btn-primary">
          관리자 대시보드로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">공지사항 관리</h1>
            <p className="text-xl text-purple-100">
              공지사항을 수정하고 관리합니다
            </p>
          </div>
        </Section>
      </section>

      {/* Notice Edit Content */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Notice Header */}
            <div className="bg-gray-50 px-8 py-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{notice.title}</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  notice.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {notice.published ? '게시됨' : '비공개'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>작성자: {notice.author}</span>
                <span>작성일: {formatKoreanDate(notice.createdAt)}</span>
                <span>수정일: {formatKoreanDate(notice.updatedAt)}</span>
              </div>
            </div>

            {/* Notice Content (Editable) */}
            <div className="px-8 py-8">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">공지사항 내용</h3>
                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                      <textarea
                        value={editData.content}
                        onChange={(e) => setEditData({...editData, content: e.target.value})}
                        rows={10}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="published"
                        checked={editData.published}
                        onChange={(e) => setEditData({...editData, published: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                        공개 게시
                      </label>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        수정 완료
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: notice.content.replace(/\n/g, '<br>') }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/admin/dashboard" 
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              대시보드로 돌아가기
            </Link>
            <div className="space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제하기
              </button>
              <Link 
                href={`/notice/${notice.id}`} 
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                사용자 화면 보기
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
