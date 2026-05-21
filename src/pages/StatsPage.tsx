import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mbtiTypes } from '../data/mbtiTypes';

interface StatEntry {
  typeCode: string;
  count: number;
  percentage: number;
}

function generateMockStats(): StatEntry[] {
  const totals: Record<string, number> = {
    INFP: 1240, ENFP: 1180, INFJ: 980, INTJ: 860,
    INTP: 780, ENTP: 720, ENFJ: 680, ENTJ: 580,
    ISFP: 520, ESFP: 490, ISTP: 460, ESTP: 440,
    ISFJ: 980, ESFJ: 860, ISTJ: 760, ESTJ: 660,
  };
  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  return Object.entries(totals).map(([typeCode, count]) => ({
    typeCode,
    count,
    percentage: Math.round((count / total) * 1000) / 10,
  }));
}

export default function StatsPage() {
  const [searchParams] = useSearchParams();
  const highlight = searchParams.get('highlight')?.toUpperCase() ?? '';
  const [sortBy, setSortBy] = useState<'count' | 'alpha'>('count');
  const [stats, setStats] = useState<StatEntry[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = generateMockStats();
    setStats(data);
    setTotal(data.reduce((a, b) => a + b.count, 0));
  }, []);

  const sorted = [...stats].sort((a, b) =>
    sortBy === 'count'
      ? b.count - a.count
      : a.typeCode.localeCompare(b.typeCode)
  );

  const maxCount = Math.max(...stats.map(s => s.count), 1);

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10">

        {/* 헤더 */}
        <section className="pt-14 pb-10 border-b border-[#DDD9CE] fade-in">
          <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#9A9790] mb-6">
            Statistics
          </p>
          <div className="w-12 h-1.5 bg-[#EDE84B] mb-6" />
          <h1 className="text-[clamp(36px,8vw,64px)] font-black leading-none tracking-tight text-[#1A1916]">
            {total.toLocaleString()}명이
            <br />테스트했어요
          </h1>
        </section>

        {/* 정렬 탭 */}
        <div className="flex border-b border-[#DDD9CE] fade-in" style={{ animationDelay: '0.05s' }}>
          {(['count', 'alpha'] as const).map(key => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`py-4 px-1 mr-8 text-xs font-black tracking-[0.18em] uppercase border-b-2 -mb-px transition-all duration-150 ${
                sortBy === key
                  ? 'border-[#1A1916] text-[#1A1916]'
                  : 'border-transparent text-[#9A9790] hover:text-[#1A1916]'
              }`}
            >
              {key === 'count' ? '비율 순' : '유형명 순'}
            </button>
          ))}
        </div>

        {/* 차트 */}
        <section className="py-6 fade-in" style={{ animationDelay: '0.1s' }}>
          {stats.length === 0 ? (
            <div className="flex flex-col gap-4 py-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-10 bg-[#DDD9CE] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {sorted.map((entry, i) => {
                const isHighlight = entry.typeCode === highlight;
                const barWidth = (entry.count / maxCount) * 100;
                const t = mbtiTypes[entry.typeCode];

                return (
                  <Link
                    key={entry.typeCode}
                    to={`/result/${entry.typeCode}`}
                    className={`group flex items-center gap-5 py-4 border-b border-[#DDD9CE] hover:bg-[#EDE84B] -mx-6 sm:-mx-10 px-6 sm:px-10 transition-colors duration-150 ${
                      isHighlight ? 'bg-[#EDE84B]' : ''
                    }`}
                    style={{ animationDelay: `${i * 0.02}s` }}
                  >
                    {/* 순위 */}
                    <span className="text-xs font-black text-[#DDD9CE] w-6 flex-shrink-0 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* 이모지 + 코드 */}
                    <div className="flex items-center gap-2 w-28 flex-shrink-0">
                      <span className="text-base">{t.emoji}</span>
                      <div>
                        <p className="text-xs font-black text-[#1A1916] tracking-wider">{entry.typeCode}</p>
                        {isHighlight && (
                          <p className="text-[10px] font-bold text-[#5A5750]">내 유형</p>
                        )}
                      </div>
                    </div>

                    {/* 바 */}
                    <div className="flex-1 min-w-0">
                      <div className="w-full h-1 bg-[#DDD9CE]">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${barWidth}%`,
                            background: isHighlight ? '#1A1916' : '#1A1916',
                          }}
                        />
                      </div>
                    </div>

                    {/* 퍼센트 */}
                    <span className="text-xs font-black text-[#1A1916] w-10 text-right flex-shrink-0">
                      {entry.percentage}%
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* 하단 CTA */}
        <section className="py-10 border-t border-[#DDD9CE]">
          {highlight ? (
            <Link
              to={`/result/${highlight}`}
              className="inline-flex items-center gap-3 bg-[#1A1916] text-[#F3F0E8] px-8 py-4 text-xs font-black tracking-[0.18em] uppercase hover:bg-[#EDE84B] hover:text-[#1A1916] transition-all duration-150"
            >
              내 결과 보기 ({highlight}) →
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-[#1A1916] text-[#F3F0E8] px-8 py-4 text-xs font-black tracking-[0.18em] uppercase hover:bg-[#EDE84B] hover:text-[#1A1916] transition-all duration-150"
            >
              테스트 시작하기 →
            </Link>
          )}
        </section>
      </main>

      <footer className="border-t border-[#DDD9CE]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-6">
          <p className="text-xs text-[#9A9790] tracking-wide">© 2026 TypeMe</p>
        </div>
      </footer>
    </div>
  );
}
