import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-gray-800 text-white text-sm px-5 py-3 rounded-full shadow-lg whitespace-nowrap">
        {message}
      </div>
    </div>
  );
}
