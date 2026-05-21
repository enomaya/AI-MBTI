import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { questions } from '../data/questions';
import { calculateMbtiType } from '../utils/calculateMbti';
import ProgressBar from '../components/ProgressBar';

export default function TestPage() {
  const navigate = useNavigate();
  const { currentQuestion, answers, setAnswer, goBack, reset } = useTestStore();
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { reset(); }, []);

  useEffect(() => {
    if (currentQuestion > 12 && Object.keys(answers).length === 12) {
      const type = calculateMbtiType(answers);
      localStorage.setItem(
        'last_result',
        JSON.stringify({ typeCode: type, completedAt: new Date().toISOString() })
      );
      navigate(`/result/${type}`, { replace: true });
    }
  }, [currentQuestion, answers, navigate]);

  if (currentQuestion > 12) return null;

  const q = questions[currentQuestion - 1];

  function handleSelect(v: 'A' | 'B') {
    setAnimKey(k => k + 1);
    setAnswer(currentQuestion, v);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col bg-[#F3F0E8]">
      {/* 진행 바 */}
      <div className="max-w-3xl mx-auto w-full px-6 sm:px-10 pt-6">
        <ProgressBar value={currentQuestion} max={12} />
      </div>

      {/* 질문 영역 */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10 flex flex-col justify-center py-12">
        <div
          key={animKey}
          className="fade-in flex flex-col gap-10"
        >
          {/* 문항 레이블 */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-black tracking-[0.22em] uppercase text-[#9A9790]">
              Q {String(currentQuestion).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#DDD9CE]">
              {q.dimension}
            </span>
          </div>

          {/* 질문 텍스트 */}
          <h2 className="text-2xl sm:text-3xl font-black leading-snug text-[#1A1916] max-w-lg">
            {q.text}
          </h2>

          {/* 선택지 */}
          <div className="flex flex-col gap-3">
            {(['A', 'B'] as const).map(key => (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`group w-full text-left border transition-all duration-150 ${
                  answers[currentQuestion] === key
                    ? 'border-[#1A1916] bg-[#EDE84B]'
                    : 'border-[#DDD9CE] bg-[#FDFCF9] hover:border-[#1A1916] hover:bg-[#EDE84B]'
                }`}
              >
                <div className="flex items-start gap-5 p-5 sm:p-6">
                  <span className="flex-shrink-0 text-xs font-black tracking-[0.18em] text-[#9A9790] mt-0.5 w-4">
                    {key}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[#1A1916] leading-relaxed">
                    {q.options[key].text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* 이전 문항 */}
      <div className="max-w-3xl mx-auto w-full px-6 sm:px-10 pb-10">
        <button
          onClick={goBack}
          disabled={currentQuestion === 1}
          className="text-xs font-bold tracking-[0.15em] uppercase text-[#9A9790] hover:text-[#1A1916] disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-150"
        >
          ← 이전
        </button>
      </div>
    </div>
  );
}
