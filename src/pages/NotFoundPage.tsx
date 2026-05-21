import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 fade-in">
      <div className="max-w-3xl w-full">
        <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#9A9790] mb-6">404</p>
        <div className="w-12 h-1.5 bg-[#EDE84B] mb-6" />
        <h1 className="text-[clamp(48px,12vw,96px)] font-black leading-none tracking-tight text-[#1A1916] mb-6">
          페이지를
          <br />찾을 수
          <br />없어요
        </h1>
        <p className="text-sm text-[#9A9790] mb-10">주소를 다시 확인해 주세요.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#1A1916] text-[#F3F0E8] px-8 py-4 text-xs font-black tracking-[0.18em] uppercase hover:bg-[#EDE84B] hover:text-[#1A1916] transition-all duration-150"
        >
          테스트 시작하기 →
        </Link>
      </div>
    </div>
  );
}
