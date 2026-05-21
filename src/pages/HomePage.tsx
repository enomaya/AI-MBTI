import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { mbtiTypes, mbtiTypeCodes } from '../data/mbtiTypes';
import type { LastResult } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const reset = useTestStore(s => s.reset);
  const [lastResult, setLastResult] = useState<LastResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('last_result');
    if (saved) setLastResult(JSON.parse(saved));
  }, []);

  function handleStart() {
    reset();
    navigate('/test');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-10 flex flex-col items-center">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-3xl font-black text-gray-800 mb-3 leading-tight">
            나는 어떤 사람일까?
          </h1>
          <p className="text-base text-gray-500 mb-2">
            12개의 질문으로 알아보는 나의 MBTI 유형
          </p>
          <span className="inline-block bg-indigo-50 text-indigo-500 text-xs font-bold px-3 py-1 rounded-full">
            ⏱ 약 3분 소요
          </span>
        </div>

        {/* 이전 결과 배너 */}
        {lastResult && (
          <div className="w-full mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-400 font-medium mb-1">이전 결과</p>
              <p className="text-base font-bold text-indigo-600">
                {lastResult.typeCode} — {mbtiTypes[lastResult.typeCode]?.typeName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(lastResult.completedAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <Link
              to={`/result/${lastResult.typeCode}`}
              className="text-sm font-bold text-indigo-500 hover:text-indigo-700"
            >
              보기 →
            </Link>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleStart}
          className="w-full max-w-sm py-4 bg-indigo-500 text-white text-lg font-bold rounded-2xl hover:bg-indigo-600 active:scale-95 transition-all shadow-lg shadow-indigo-200 mb-10"
        >
          테스트 시작하기
        </button>

        {/* 유형 그리드 */}
        <div className="w-full">
          <p className="text-xs text-gray-400 text-center mb-4 font-medium">16가지 MBTI 유형 탐색하기</p>
          <div className="grid grid-cols-4 gap-2">
            {mbtiTypeCodes.map(code => {
              const t = mbtiTypes[code];
              return (
                <Link
                  key={code}
                  to={`/result/${code}`}
                  className="flex flex-col items-center p-3 rounded-2xl hover:scale-105 transition-transform cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${t.color.gradient[0]}22, ${t.color.gradient[1]}44)`,
                  }}
                >
                  <span className="text-2xl mb-1">{t.emoji}</span>
                  <span className="text-xs font-bold text-gray-700">{code}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-5 text-center">
        <p className="text-xs text-gray-400">
          © 2026 TypeMe · <Link to="/stats" className="hover:text-indigo-500">통계</Link>
        </p>
      </footer>
    </div>
  );
}
