import React from 'react';

export const Watermark: React.FC = () => {
  return (
    <div className="watermark-bg" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="watermark-item">
          <span>Raja lakshmi AP CSE</span>
          <span style={{ fontSize: '13px', fontWeight: 600, opacity: 0.85, letterSpacing: '0.08em' }}>STACK &amp; QUEUE</span>
        </div>
      ))}
    </div>
  );
};
