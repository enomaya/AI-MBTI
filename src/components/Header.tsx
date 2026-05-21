import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#DDD9CE] bg-[#F3F0E8]">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-black tracking-[0.22em] uppercase text-[#1A1916] hover:opacity-60 transition-opacity duration-150"
        >
          TypeMe
        </Link>
        <Link
          to="/stats"
          className="text-xs font-bold tracking-[0.18em] uppercase text-[#9A9790] hover:text-[#1A1916] transition-colors duration-150"
        >
          Stats
        </Link>
      </div>
    </header>
  );
}
