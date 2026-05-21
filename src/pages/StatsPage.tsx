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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-800 mb-1">
            지금까지 총 <span className="text-indigo-500">{total.toLocaleString()}</span>명이 테스트했어요
          </h1>
          <p className="text-sm text-gray-400">MBTI 유형 분포 통계</p>
        </div>

        {/* 정렬 탭 */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setSortBy('count')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              sortBy === 'count'
                ? 'bg-white text-indigo-500 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            비율 순
          </button>
          <button
            onClick={() => setSortBy('alpha')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              sortBy === 'alpha'
                ? 'bg-white text-indigo-500 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            유형명 순
          </button>
        </div>

        {/* 차트 */}
        {stats.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-10 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map(entry => {
              const t = mbtiTypes[entry.typeCode];
              const isHighlight = entry.typeCode === highlight;
              const barWidth = (entry.count / maxCount) * 100;

              return (
                <Link
                  key={entry.typeCode}
                  to={`/result/${entry.typeCode}`}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all hover:scale-[1.01] ${
                    isHighlight ? 'bg-indigo-50 border-2 border-indigo-300' : 'bg-white border-2 border-transparent'
                  }`}
                >
                  {/* 이모지 */}
                  <div className="text-2xl w-10 text-center flex-shrink-0">{t.emoji}</div>

                  {/* 유형 코드 & 바 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black text-gray-800">{entry.typeCode}</span>
                        {isHighlight && (
                          <span className="text-xs text-indigo-500 font-bold">★ 내 유형</span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-600">{entry.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${barWidth}%`,
                          background: `linear-gradient(90deg, ${t.color.gradient[0]}, ${t.color.gradient[1]})`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{t.typeName}</p>
                  </div>

                  {/* 수 */}
                  <div className="text-xs text-gray-400 flex-shrink-0 w-16 text-right">
                    {entry.count.toLocaleString()}명
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 하단 CTA */}
        <div className="mt-8 flex flex-col gap-3">
          {highlight ? (
            <Link
              to={`/result/${highlight}`}
              className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold text-center hover:bg-indigo-600 transition-colors"
            >
              내 결과 다시 보기 ({highlight})
            </Link>
          ) : (
            <Link
              to="/"
              className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold text-center hover:bg-indigo-600 transition-colors"
            >
              테스트 시작하기
            </Link>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-5 text-center">
        <p className="text-xs text-gray-400">© 2026 TypeMe</p>
      </footer>
    </div>
  );
}
