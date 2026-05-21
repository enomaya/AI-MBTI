import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { mbtiTypes } from '../data/mbtiTypes';
import { isValidMbtiType } from '../utils/calculateMbti';
import Toast from '../components/Toast';
import ShareCard from '../components/ShareCard';

export default function ResultPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  const code = (type ?? '').toUpperCase();

  if (!isValidMbtiType(code) || !mbtiTypes[code]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-5">
        <div className="text-6xl">😕</div>
        <h2 className="text-2xl font-black text-gray-800">존재하지 않는 유형이에요</h2>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600"
        >
          테스트 시작하기
        </Link>
      </div>
    );
  }

  const t = mbtiTypes[code];

  async function handleSaveImage() {
    if (!shareCardRef.current) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `TypeMe_${code}.png`;
      a.click();
      setToast('이미지가 저장되었습니다!');
    } catch {
      setToast('이미지 생성에 실패했습니다. 스크린샷을 이용해 주세요.');
    } finally {
      setSaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast('링크가 복사되었습니다!');
    } catch {
      setToast('링크 복사에 실패했습니다.');
    }
  }

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4 },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* 히어로 배경 */}
      <div
        className="w-full py-12 px-5 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${t.color.gradient[0]}, ${t.color.gradient[1]})`,
        }}
      >
        <motion.div {...fadeIn(0.1)}>
          <div className="text-7xl mb-4">{t.emoji}</div>
        </motion.div>
        <motion.div {...fadeIn(0.3)}>
          <h1 className="text-5xl font-black tracking-wide mb-2">{code}</h1>
        </motion.div>
        <motion.div {...fadeIn(0.5)}>
          <p className="text-lg font-medium opacity-90">{t.typeName}</p>
        </motion.div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8 flex flex-col gap-6">
        {/* 유형 설명 */}
        <motion.div {...fadeIn(0.6)} className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-base text-gray-600 leading-relaxed">{t.description}</p>
        </motion.div>

        {/* 강점 */}
        <motion.div {...fadeIn(0.7)} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💪</span> 강점
          </h3>
          <ul className="flex flex-col gap-2">
            {t.strengths.map(s => (
              <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 약점 */}
        <motion.div {...fadeIn(0.8)} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>⚡</span> 약점
          </h3>
          <ul className="flex flex-col gap-2">
            {t.weaknesses.map(w => (
              <li key={w} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-orange-400 mt-0.5 flex-shrink-0">△</span>
                {w}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 추천 직업 */}
        <motion.div {...fadeIn(0.9)} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💼</span> 추천 직업
          </h3>
          <div className="flex flex-wrap gap-2">
            {t.careers.map(c => (
              <span
                key={c}
                className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ background: t.color.primary }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 잘 맞는 유형 */}
        <motion.div {...fadeIn(1.0)} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🤝</span> 잘 맞는 유형
          </h3>
          <div className="flex gap-3">
            {t.compatibleTypes.map(ct => {
              const ct_ = mbtiTypes[ct];
              if (!ct_) return null;
              return (
                <Link
                  key={ct}
                  to={`/result/${ct}`}
                  className="flex-1 p-4 rounded-xl text-center hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${ct_.color.gradient[0]}33, ${ct_.color.gradient[1]}55)`,
                  }}
                >
                  <div className="text-2xl mb-1">{ct_.emoji}</div>
                  <div className="text-sm font-black text-gray-800">{ct}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-tight">{ct_.typeName}</div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* 공유 버튼 */}
        <motion.div {...fadeIn(1.1)} className="flex flex-col gap-3">
          <button
            onClick={handleSaveImage}
            disabled={saving}
            className="w-full py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="animate-spin">⏳</span>
            ) : (
              '📷'
            )}
            이미지 저장
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 active:scale-95 transition-all"
          >
            🔗 링크 복사
          </button>
        </motion.div>

        {/* 하단 액션 */}
        <motion.div {...fadeIn(1.2)} className="flex flex-col gap-3 pt-2">
          <Link
            to={`/stats?highlight=${code}`}
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium text-center hover:bg-gray-50 transition-colors"
          >
            📊 전체 통계 보기
          </Link>
          <button
            onClick={() => {
              navigate('/');
            }}
            className="w-full py-3 rounded-xl text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
          >
            다시 테스트하기
          </button>
        </motion.div>
      </main>

      {/* 숨겨진 공유 카드 */}
      <div className="fixed -left-[9999px] top-0">
        <ShareCard ref={shareCardRef} mbtiType={t} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <footer className="border-t border-gray-100 py-5 text-center">
        <p className="text-xs text-gray-400">© 2026 TypeMe</p>
      </footer>
    </div>
  );
}
