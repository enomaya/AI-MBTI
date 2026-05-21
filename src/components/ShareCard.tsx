import { forwardRef } from 'react';
import type { MbtiType } from '../types';

interface ShareCardProps {
  mbtiType: MbtiType;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ mbtiType: t }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '540px',
        height: '540px',
        background: `linear-gradient(135deg, ${t.color.gradient[0]}, ${t.color.gradient[1]})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* 로고 */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 900,
          fontSize: '22px',
          letterSpacing: '-0.5px',
        }}
      >
        TypeMe
      </div>

      {/* 이모지 */}
      <div style={{ fontSize: '80px', marginBottom: '16px' }}>{t.emoji}</div>

      {/* 유형 코드 */}
      <div
        style={{
          color: 'white',
          fontSize: '56px',
          fontWeight: 900,
          letterSpacing: '2px',
          marginBottom: '8px',
        }}
      >
        {t.typeCode}
      </div>

      {/* 유형명 */}
      <div
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '24px',
        }}
      >
        {t.typeName}
      </div>

      {/* 강점 요약 */}
      <div
        style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: '1.8',
        }}
      >
        {t.strengths.slice(0, 3).join(' · ')}
      </div>

      {/* URL */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
        }}
      >
        typeme.kr
      </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
export default ShareCard;
