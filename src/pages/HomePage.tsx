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
    <div className="min-h-[calc(100vh-56px)] flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10">

        {/* Hero */}
        <section className="pt-16 pb-14 border-b border-[#DDD9CE] fade-in">
          <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#9A9790] mb-8">
            MBTI Personality Test
          </p>
          <h1 className="text-[clamp(52px,12vw,96px)] font-black leading-[0.92] tracking-tight text-[#1A1916]">
            나는 어떤
          </h1>
          <h1 className="text-[clamp(52px,12vw,96px)] font-black leading-[0.92] tracking-tight text-[#1A1916] mt-1 mb-10">
            사람일까?<span className="inline-block w-[0.55em] h-[0.12em] bg-[#EDE84B] ml-3 mb-2 align-middle" />
          </h1>
          <p className="text-sm text-[#5A5750] leading-relaxed mb-10 max-w-xs">
            12개의 직관적인 질문으로 알아보는 나의 MBTI 유형. 약 3분 소요.
          </p>

          {/* 이전 결과 */}
          {lastResult && (
            <div className="flex items-center gap-6 py-4 border-t border-b border-[#DDD9CE] mb-10">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#9A9790] flex-shrink-0">
                이전 결과
              </span>
              <span className="text-sm font-black text-[#1A1916]">
                {lastResult.typeCode} — {mbtiTypes[lastResult.typeCode]?.typeName}
              </span>
              <Link
                to={`/result/${lastResult.typeCode}`}
                className="ml-auto text-xs font-bold tracking-[0.12em] uppercase text-[#1A1916] underline underline-offset-4 decoration-[#DDD9CE] hover:decoration-[#1A1916] transition-all duration-150 flex-shrink-0"
              >
                보기 →
              </Link>
            </div>
          )}

          <button
            onClick={handleStart}
            className="group inline-flex items-center gap-4 bg-[#1A1916] text-[#F3F0E8] px-8 py-4 text-xs font-black tracking-[0.18em] uppercase hover:bg-[#EDE84B] hover:text-[#1A1916] transition-all duration-150"
          >
            테스트 시작하기
            <span className="group-hover:translate-x-1.5 transition-transform duration-150">→</span>
          </button>
        </section>

        {/* Type Grid */}
        <section className="py-14 fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#9A9790] mb-8">
            16가지 유형 탐색하기
          </p>
          {/* 1px 그리드 구분선 효과 */}
          <div className="grid grid-cols-4 gap-px bg-[#DDD9CE] border border-[#DDD9CE]">
            {mbtiTypeCodes.map(code => (
              <Link
                key={code}
                to={`/result/${code}`}
                className="group bg-[#F3F0E8] py-5 px-3 flex flex-col items-center gap-2 hover:bg-[#EDE84B] transition-colors duration-150"
              >
                <span className="text-xl leading-none">{mbtiTypes[code].emoji}</span>
                <span className="text-[11px] font-black tracking-[0.14em] text-[#1A1916]">{code}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DDD9CE]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
          <p className="text-xs text-[#9A9790] tracking-wide">© 2026 TypeMe</p>
          <Link
            to="/stats"
            className="text-xs font-bold tracking-[0.15em] uppercase text-[#9A9790] hover:text-[#1A1916] transition-colors duration-150"
          >
            Statistics
          </Link>
        </div>
      </footer>
    </div>
  );
}
