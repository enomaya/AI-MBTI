import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { mbtiTypes } from '../data/mbtiTypes';
import { isValidMbtiType } from '../utils/calculateMbti';
import Toast from '../components/Toast';
import ShareCard from '../components/ShareCard';

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-b border-[#DDD9CE]">
      <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#9A9790] mb-5">{label}</p>
      {children}
    </div>
  );
}

export default function ResultPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  const code = (type ?? '').toUpperCase();

  if (!isValidMbtiType(code) || !mbtiTypes[code]) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center gap-8 px-6 fade-in">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#9A9790]">오류</p>
        <h2 className="text-4xl font-black text-[#1A1916]">존재하지 않는 유형이에요</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#1A1916] text-[#F3F0E8] px-7 py-3.5 text-xs font-black tracking-[0.18em] uppercase hover:bg-[#EDE84B] hover:text-[#1A1916] transition-all duration-150"
        >
          테스트 시작하기 →
        </Link>
      </div>
    );
  }

  const t = mbtiTypes[code];

  async function handleSaveImage() {
    if (!shareCardRef.current) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, { scale: 2, useCORS: true, backgroundColor: null });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `TypeMe_${code}.png`;
      a.click();
      setToast('이미지가 저장되었습니다');
    } catch {
      setToast('이미지 생성에 실패했습니다');
    } finally {
      setSaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast('링크가 복사되었습니다');
    } catch {
      setToast('링크 복사에 실패했습니다');
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10">

        {/* 히어로 */}
        <section className="pt-14 pb-10 border-b border-[#DDD9CE] fade-in">
          <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#9A9790] mb-6">
            나의 유형
          </p>
          {/* 옐로우 액센트 바 */}
          <div className="w-12 h-1.5 bg-[#EDE84B] mb-6" />
          {/* 유형 코드 — 초대형 */}
          <h1 className="text-[clamp(72px,18vw,128px)] font-black leading-none tracking-tight text-[#1A1916] mb-3">
            {code}
          </h1>
          {/* 유형명 */}
          <p className="text-lg sm:text-xl font-bold text-[#5A5750]">{t.typeName}</p>
          {/* 이모지 */}
          <p className="text-4xl mt-4">{t.emoji}</p>
        </section>

        {/* 설명 */}
        <Section label="소개">
          <p className="text-base text-[#1A1916] leading-[1.9] max-w-xl">{t.description}</p>
        </Section>

        {/* 강점 */}
        <Section label="강점">
          <ul className="flex flex-col gap-3">
            {t.strengths.map((s, i) => (
              <li key={s} className="flex items-baseline gap-4">
                <span className="text-xs font-black text-[#DDD9CE] w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-[#1A1916]">{s}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 약점 */}
        <Section label="약점">
          <ul className="flex flex-col gap-3">
            {t.weaknesses.map((w, i) => (
              <li key={w} className="flex items-baseline gap-4">
                <span className="text-xs font-black text-[#DDD9CE] w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-[#5A5750]">{w}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 추천 직업 */}
        <Section label="추천 직업">
          <div className="flex flex-wrap gap-2">
            {t.careers.map(c => (
              <span
                key={c}
                className="border border-[#DDD9CE] px-3 py-1.5 text-xs font-bold text-[#1A1916] tracking-wide"
              >
                {c}
              </span>
            ))}
          </div>
        </Section>

        {/* 잘 맞는 유형 */}
        <Section label="잘 맞는 유형">
          <div className="grid grid-cols-2 gap-px bg-[#DDD9CE] border border-[#DDD9CE]">
            {t.compatibleTypes.map(ct => {
              const ct_ = mbtiTypes[ct];
              if (!ct_) return null;
              return (
                <Link
                  key={ct}
                  to={`/result/${ct}`}
                  className="group bg-[#F3F0E8] p-6 hover:bg-[#EDE84B] transition-colors duration-150"
                >
                  <p className="text-2xl mb-3">{ct_.emoji}</p>
                  <p className="text-xl font-black text-[#1A1916] mb-1">{ct}</p>
                  <p className="text-xs text-[#9A9790] font-medium">{ct_.typeName}</p>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* 공유 */}
        <section className="py-10 flex flex-col gap-3">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#9A9790] mb-2">공유하기</p>
          <button
            onClick={handleSaveImage}
            disabled={saving}
            className="w-full py-4 border border-[#1A1916] text-xs font-black tracking-[0.18em] uppercase text-[#1A1916] hover:bg-[#1A1916] hover:text-[#F3F0E8] disabled:opacity-40 transition-all duration-150 flex items-center justify-center gap-3"
          >
            {saving ? '생성 중…' : '이미지 저장'}
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full py-4 border border-[#DDD9CE] text-xs font-black tracking-[0.18em] uppercase text-[#5A5750] hover:border-[#1A1916] hover:text-[#1A1916] transition-all duration-150"
          >
            링크 복사
          </button>
        </section>

        {/* 하단 네비 */}
        <section className="border-t border-[#DDD9CE] py-8 flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
          <Link
            to={`/stats?highlight=${code}`}
            className="text-xs font-bold tracking-[0.18em] uppercase text-[#9A9790] hover:text-[#1A1916] transition-colors duration-150"
          >
            전체 통계 보기 →
          </Link>
          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold tracking-[0.18em] uppercase text-[#9A9790] hover:text-[#1A1916] transition-colors duration-150 text-left"
          >
            다시 테스트하기 →
          </button>
        </section>
      </main>

      {/* 숨겨진 공유 카드 */}
      <div className="fixed -left-[9999px] top-0" aria-hidden>
        <ShareCard ref={shareCardRef} mbtiType={t} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <footer className="border-t border-[#DDD9CE]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-6">
          <p className="text-xs text-[#9A9790] tracking-wide">© 2026 TypeMe</p>
        </div>
      </footer>
    </div>
  );
}
