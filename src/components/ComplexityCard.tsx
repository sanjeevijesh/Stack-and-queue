import React from 'react';
import { Gauge, Info } from 'lucide-react';
import { ComplexityItem } from '../types';

interface ComplexityCardProps {
  title: string;
  subtitle?: string;
  items: ComplexityItem[];
}

export const ComplexityCard: React.FC<ComplexityCardProps> = ({
  title,
  subtitle,
  items,
}) => {
  const getBadgeColor = (complexity: string) => {
    if (complexity.includes('1')) {
      return {
        bg: 'rgba(16, 185, 129, 0.12)',
        text: 'var(--color-state-found)',
        border: 'rgba(16, 185, 129, 0.3)',
      };
    }
    if (complexity.includes('log')) {
      return {
        bg: 'rgba(6, 182, 212, 0.12)',
        text: 'var(--color-state-inserted)',
        border: 'rgba(6, 182, 212, 0.3)',
      };
    }
    return {
      bg: 'rgba(245, 158, 11, 0.12)',
      text: 'var(--color-state-comparing)',
      border: 'rgba(245, 158, 11, 0.3)',
    };
  };

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--color-state-found)',
            }}
          >
            <Gauge size={17} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{title}</h3>
            {subtitle && (
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="scroll-container-touch">
        <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Operation</th>
              <th style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Average Time</th>
              <th style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Worst Time</th>
              <th style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Space</th>
              <th style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Mechanism &amp; Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, idx) => {
              const avgBadge = getBadgeColor(row.averageTime);
              const worstBadge = getBadgeColor(row.worstTime);
              return (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {row.operation}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: avgBadge.bg,
                        color: avgBadge.text,
                        border: `1px solid ${avgBadge.border}`,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {row.averageTime}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: worstBadge.bg,
                        color: worstBadge.text,
                        border: `1px solid ${worstBadge.border}`,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {row.worstTime}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--color-state-normal)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {row.space}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.4 }}>
                    {row.reason}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
