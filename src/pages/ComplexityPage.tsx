import React from 'react';
import { Gauge, CheckCircle2, AlertTriangle, Layers, ArrowRightLeft, Cpu } from 'lucide-react';
import { ComplexityCard } from '../components/ComplexityCard';
import { STACK_COMPLEXITY_DATA } from '../data/stackData';
import { QUEUE_COMPLEXITY_DATA } from '../data/queueData';

export const ComplexityPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--color-state-found)',
            }}
          >
            <Gauge size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Big-O Complexity Reference
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Time and space algorithmic performance analysis, memory models, and implementation trade-offs
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
        <div className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Stack Insertion &amp; Removal
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-state-found)', fontFamily: 'var(--font-mono)' }}>
            O(1) Constant
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            PUSH and POP operate solely via the single TOP pointer without shifting data elements.
          </span>
        </div>

        <div className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Queue Insertion &amp; Removal
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-state-found)', fontFamily: 'var(--font-mono)' }}>
            O(1) Constant
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            ENQUEUE and DEQUEUE operate in constant time when using Circular Buffer or Linked List pointers.
          </span>
        </div>

        <div className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Arbitrary Search
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-state-comparing)', fontFamily: 'var(--font-mono)' }}>
            O(n) Linear
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Neither structure provides index random access; searching requires inspecting every element sequentially.
          </span>
        </div>

        <div className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Auxiliary Space
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-state-normal)', fontFamily: 'var(--font-mono)' }}>
            O(n) Total
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Stores exactly n elements. Operations themselves require only O(1) extra scratch variables.
          </span>
        </div>
      </div>

      {/* Stack Complexity Table */}
      <ComplexityCard
        title="Stack Complexity Breakdown"
        subtitle="Mathematical bounds for Array-based and Linked-List-based Stacks"
        items={STACK_COMPLEXITY_DATA}
      />

      {/* Queue Complexity Table */}
      <ComplexityCard
        title="Queue Complexity Breakdown"
        subtitle="Mathematical bounds for Linear, Circular, and Linked-List-based Queues"
        items={QUEUE_COMPLEXITY_DATA}
      />

      {/* Critical Implementation Trade-Offs (Lecture Insight) */}
      <section className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <Cpu size={18} style={{ color: 'var(--color-state-comparing)' }} />
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Critical Implementation Trade-offs &amp; Pitfalls</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
          {/* Naive Array Queue Pitfall */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-state-comparing)' }}>
              <AlertTriangle size={18} />
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>
                The Naive Linear Array Queue Pitfall
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              If a queue simply uses an array and shifts every remaining element one position to the left on every dequeue, dequeue degenerates from <strong>O(1)</strong> to <strong>O(n)</strong>!
            </p>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
              <strong>Solution:</strong> Use a <em>Circular Queue</em> where FRONT advances via <code>(FRONT + 1) % MAX</code>. This preserves genuine <strong>O(1)</strong> dequeuing without copying elements.
            </p>
          </div>

          {/* Array vs Linked List Memory */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-state-normal)' }}>
              <CheckCircle2 size={18} />
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>
                Array Buffer vs. Linked List Memory Footprint
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              <strong>Array implementation</strong> provides exceptional CPU cache locality and zero pointer overhead, but requires a fixed capacity limit (or amortized doubling).
            </p>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
              <strong>Linked List implementation</strong> grows dynamically without arbitrary capacity limits, but incurs extra memory for <code>next</code> pointers and pointer dereferencing latency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
