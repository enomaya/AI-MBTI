import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-indigo-500 tracking-tight">
          TypeMe
        </Link>
        <Link
          to="/stats"
          className="text-sm text-gray-500 hover:text-indigo-500 transition-colors"
        >
          통계 보기
        </Link>
      </div>
    </header>
  );
}
