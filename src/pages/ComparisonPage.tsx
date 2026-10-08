import React from 'react';
import { GitCompare, Layers, ArrowRightLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { SideBySideVisualizer } from '../components/SideBySideVisualizer';
import { COMPARISON_FEATURES } from '../data/comparisonData';

export const ComparisonPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--color-state-normal)',
            }}
          >
            <GitCompare size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Stack vs. Queue Comparison
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Direct side-by-side visual analysis of LIFO versus FIFO mechanics and architectural differences
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simultaneous Visualizer */}
      <SideBySideVisualizer />

      {/* Key Principle Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
        <div
          className="premium-card glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            borderLeft: '4px solid var(--color-state-normal)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} style={{ color: 'var(--color-state-normal)' }} />
            <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Stack (LIFO Core Truth)</h3>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            Because insertion and deletion happen at the identical end (TOP), the stack inherently <strong>inverts the temporal order</strong> of elements.
            This makes it the quintessential data structure for backtracking, nested recursion, undo mechanisms, and parsing syntax trees.
          </p>
        </div>

        <div
          className="premium-card glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            borderLeft: '4px solid var(--color-state-inserted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowRightLeft size={20} style={{ color: 'var(--color-state-inserted)' }} />
            <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Queue (FIFO Core Truth)</h3>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            Because items enter at REAR and leave from FRONT, the queue <strong>preserves temporal arrival order</strong> faithfully.
            This makes it ideal for fair resource allocation (printer spoolers, CPU scheduling, network packet routing) and level-order graph searches (BFS).
          </p>
        </div>
      </div>

      {/* Detailed Side-by-Side Comparison Table */}
      <div className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <BookOpen size={18} style={{ color: 'var(--accent-color)' }} />
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Comprehensive Technical Comparison Matrix</h2>
        </div>

        <div className="scroll-container-touch">
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontWeight: 600, width: '22%' }}>Feature</th>
                <th style={{ padding: '12px 14px', color: 'var(--color-state-normal)', fontWeight: 700, width: '24%' }}>Stack</th>
                <th style={{ padding: '12px 14px', color: 'var(--color-state-inserted)', fontWeight: 700, width: '24%' }}>Queue</th>
                <th style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontWeight: 600, width: '30%' }}>Technical Distinction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                  }}
                >
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '12.5px' }}>
                    {row.stack}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '12.5px' }}>
                    {row.queue}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.45 }}>
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
