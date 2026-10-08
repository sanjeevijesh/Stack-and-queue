import React from 'react';
import { 
  Layers, 
  ArrowRightLeft, 
  ArrowRight, 
  Sparkles, 
  Presentation, 
  Code2, 
  Gauge, 
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenLectureMode: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLectureMode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Hero Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '48px 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--color-state-normal)',
          }}
        >
          <Sparkles size={14} />
          <span>Raja lakshmi AP CSE • Interactive Lecturing Platform</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          Master <span style={{ color: 'var(--color-state-normal)' }}>Stack</span> &amp;{' '}
          <span style={{ color: 'var(--color-state-inserted)' }}>Queue</span> Through Visualization
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: 0,
          }}
        >
          Learn how <strong>LIFO</strong> and <strong>FIFO</strong> operate through interactive operations, step-by-step
          animations, algorithmic execution traces, and real-world system applications.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginTop: '8px' }}>
          <button
            onClick={() => onNavigate('stack')}
            className="btn-primary"
            style={{ fontSize: '15px', padding: '12px 28px' }}
          >
            <Layers size={18} />
            Explore Stack
          </button>

          <button
            onClick={() => onNavigate('queue')}
            className="btn-secondary"
            style={{ fontSize: '15px', padding: '12px 28px' }}
          >
            <ArrowRightLeft size={18} />
            Explore Queue
          </button>

          <button
            onClick={onOpenLectureMode}
            className="btn-secondary"
            style={{ fontSize: '15px', padding: '12px 24px', color: 'var(--color-state-normal)' }}
          >
            <Presentation size={18} />
            Start Lecture Mode
          </button>
        </div>
      </section>

      {/* Two Large Interactive Learning Cards */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
        }}
      >
        {/* STACK CARD */}
        <div
          className="premium-card glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            padding: 'clamp(16px, 3vw, 28px)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={() => onNavigate('stack')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--color-state-normal)',
                }}
              >
                <Layers size={24} />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--color-state-normal)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                LIFO PRINCIPLE
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>STACK</h2>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-state-normal)', display: 'block', marginTop: '2px' }}>
                Last In, First Out
              </span>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              A stack is a linear data structure where elements are added and removed from the exact same end, known as the <strong>TOP</strong>.
            </p>

            {/* Small Visual Stack Representation */}
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-state-normal)' }}>
                TOP →
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  gap: '4px',
                  width: '120px',
                  borderLeft: '2px solid var(--border-color)',
                  borderRight: '2px solid var(--border-color)',
                  borderBottom: '3px solid var(--color-state-normal)',
                  padding: '4px',
                }}
              >
                {[10, 20, 30, 40].map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: '28px',
                      borderRadius: '4px',
                      backgroundColor: idx === 3 ? 'var(--color-state-normal)' : 'var(--bg-card)',
                      color: idx === 3 ? '#ffffff' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-state-normal)',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            <span>Learn Stack</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* QUEUE CARD */}
        <div
          className="premium-card glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            padding: 'clamp(16px, 3vw, 28px)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={() => onNavigate('queue')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--color-state-inserted)',
                }}
              >
                <ArrowRightLeft size={24} />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--color-state-inserted)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                FIFO PRINCIPLE
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>QUEUE</h2>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-state-inserted)', display: 'block', marginTop: '2px' }}>
                First In, First Out
              </span>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              A queue is a linear data structure where elements are inserted at the <strong>REAR</strong> and removed from the <strong>FRONT</strong>.
            </p>

            {/* Small Visual Queue Representation */}
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '240px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--color-state-found)', fontWeight: 700 }}>FRONT ↓</span>
                <span style={{ color: 'var(--color-state-inserted)', fontWeight: 700 }}>REAR ↓</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  borderTop: '2px solid var(--border-color)',
                  borderBottom: '2px solid var(--border-color)',
                  padding: '4px 0',
                }}
              >
                {[10, 20, 30, 40].map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '42px',
                      height: '32px',
                      borderRadius: '4px',
                      backgroundColor: idx === 0 ? 'var(--color-state-found)' : idx === 3 ? 'var(--color-state-inserted)' : 'var(--bg-card)',
                      color: idx === 0 || idx === 3 ? '#ffffff' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-state-inserted)',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            <span>Learn Queue</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '16px',
        }}
      >
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ color: 'var(--accent-color)' }}><Presentation size={20} /></div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Classroom Lecture Mode</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            Projector-friendly theater display designed specifically for professors and educators to explain concepts one step at a time.
          </p>
        </div>

        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ color: 'var(--color-state-normal)' }}><Code2 size={20} /></div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Multi-Language Code</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            Review production-grade implementations in C, C++, Java, and Python with clean syntax highlighting and copy buttons.
          </p>
        </div>

        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ color: 'var(--color-state-found)' }}><Gauge size={20} /></div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Big-O Complexity Matrix</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            Master worst-case and average-case analysis for Push, Pop, Peek, Enqueue, and Dequeue with clear technical rationales.
          </p>
        </div>

        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ color: 'var(--color-state-inserted)' }}><Cpu size={20} /></div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Real-World Applications</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            Discover how call stacks, undo buffers, printer spoolers, and CPU schedulers power modern operating systems.
          </p>
        </div>
      </section>
    </div>
  );
};
