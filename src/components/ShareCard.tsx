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
        background: '#F3F0E8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
        fontFamily: 'sans-serif',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Top: branding */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em', color: '#9A9790' }}>
          TYPEME
        </span>
        <span style={{ fontSize: '32px' }}>{t.emoji}</span>
      </div>

      {/* Center: type code */}
      <div>
        <div style={{ width: '48px', height: '6px', background: '#EDE84B', marginBottom: '20px' }} />
        <div style={{ fontSize: '88px', fontWeight: 900, color: '#1A1916', lineHeight: 1, letterSpacing: '-2px', marginBottom: '12px' }}>
          {t.typeCode}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#5A5750', marginBottom: '24px' }}>
          {t.typeName}
        </div>
        <div style={{ fontSize: '13px', color: '#9A9790', lineHeight: 1.8 }}>
          {t.strengths.slice(0, 3).join('  ·  ')}
        </div>
      </div>

      {/* Bottom: url */}
      <div style={{ borderTop: '1px solid #DDD9CE', paddingTop: '16px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#9A9790' }}>
          typeme.kr
        </span>
      </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
export default ShareCard;
