import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="text-7xl">🔍</div>
      <h1 className="text-3xl font-black text-gray-800">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-500">주소를 다시 확인해 주세요.</p>
      <Link
        to="/"
        className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors"
      >
        테스트 시작하기
      </Link>
    </div>
  );
}
