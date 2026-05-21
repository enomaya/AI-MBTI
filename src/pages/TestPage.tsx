import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { questions } from '../data/questions';
import { calculateMbtiType } from '../utils/calculateMbti';
import ProgressBar from '../components/ProgressBar';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function TestPage() {
  const navigate = useNavigate();
  const { currentQuestion, answers, setAnswer, goBack, reset } = useTestStore();

  useEffect(() => {
    reset();
  }, []);

  // 12문항 완료 시 결과 계산
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
  const direction = 1;

  function handleSelect(v: 'A' | 'B') {
    setAnswer(currentQuestion, v);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-5 pt-6 pb-4">
        <ProgressBar value={currentQuestion} max={12} />
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 flex flex-col justify-center py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col gap-6"
          >
            {/* 질문 번호 뱃지 */}
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500 text-white text-xs font-black px-3 py-1 rounded-full">
                Q{currentQuestion}
              </span>
              <span className="text-xs text-gray-400">{q.dimension}</span>
            </div>

            {/* 질문 텍스트 */}
            <h2 className="text-xl font-bold text-gray-800 leading-snug">
              {q.text}
            </h2>

            {/* 선택지 */}
            <div className="flex flex-col gap-3">
              {(['A', 'B'] as const).map(key => (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`w-full p-5 rounded-2xl border-2 text-left text-base font-medium transition-all active:scale-98 ${
                    answers[currentQuestion] === key
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-100 bg-white text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/50'
                  }`}
                >
                  <span className="inline-block w-7 h-7 rounded-full bg-indigo-100 text-indigo-500 text-xs font-black text-center leading-7 mr-3">
                    {key}
                  </span>
                  {q.options[key].text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 이전 문항 버튼 */}
      <div className="max-w-2xl mx-auto w-full px-5 pb-8">
        <button
          onClick={goBack}
          disabled={currentQuestion === 1}
          className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← 이전 문항
        </button>
      </div>
    </div>
  );
}
