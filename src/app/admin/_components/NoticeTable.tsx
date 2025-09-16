'use client';
// app/admin/_components/NoticeTable.tsx
import { useEffect, useState, useTransition } from 'react';
import { formatDate } from '@/lib/date';

type Notice = { id:number; title:string; author:string|null; createdAt:string };

export default function NoticeTable() {
  const [items, setItems] = useState<Notice[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pending, startTransition] = useTransition();
  const limit = 10;

  const load = async (p=page) => {
    const r = await fetch(`/api/notice?page=${p}&limit=${limit}`, { cache: 'no-store' });
    const json = await r.json();
    setItems(json.items);
    setTotal(json.total);
  };

  useEffect(() => { load(page); }, [page]);

  const onDelete = (id:number) => {
    startTransition(async () => {
      await fetch(`/api/notice/${id}`, { method: 'DELETE' });
      await load(1);
      setPage(1);
    });
  };

  return (
    <div className="rounded-xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-center">번호</th>
            <th className="px-3 py-3">제목</th>
            <th className="px-3 py-3">작성자</th>
            <th className="px-3 py-3">작성일</th>
            <th className="px-3 py-3 text-center">작업</th>
          </tr>
        </thead>
        <tbody>
          {items.map((n, idx) => (
            <tr key={n.id} className="border-t">
              <td className="px-3 py-3 text-center">
                {total - ((page - 1) * limit + idx)}
              </td>
              <td className="px-3 py-3">{n.title}</td>
              <td className="px-3 py-3">{n.author || '관리자'}</td>
              <td className="px-3 py-3">{formatDate(n.createdAt)}</td>
              <td className="px-3 py-3 text-center">
                <div className="inline-flex gap-2">
                  <button type="button"
                          onClick={() => location.assign(`/notice/${n.id}`)}
                          className="rounded bg-gray-200 px-3 py-1">보기</button>
                  <button type="button"
                          onClick={() => location.assign(`/admin/notice/edit/${n.id}`)}
                          className="rounded bg-blue-600 px-3 py-1 text-white">수정</button>
                  <button type="button"
                          onClick={() => onDelete(n.id)}
                          className="rounded bg-red-600 px-3 py-1 text-white">삭제</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center gap-1 p-3">
        {Array.from({ length: Math.ceil(total / limit) }).map((_, i) => (
          <button key={i} type="button" onClick={() => setPage(i+1)}
            className={`rounded border px-3 py-1 ${page === i+1 ? 'bg-blue-600 text-white' : ''}`}>
            {i+1}
          </button>
        ))}
      </div>

      {pending && <p className="p-3 text-center text-sm text-gray-500">처리 중…</p>}
    </div>
  );
}
