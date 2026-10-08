import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Presentation, 
  Layers, 
  ArrowRightLeft, 
  RotateCcw, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';

interface LectureStep {
  title: string;
  operation: string;
  targetStructure: 'stack' | 'queue';
  explanation: string;
  visualState: {
    stackItems?: number[];
    queueItems?: number[];
    activePointer?: string;
    actionNote: string;
  };
}

const LECTURE_CURRICULUM: LectureStep[] = [
  {
    title: '1. Introduction to Stack & LIFO Principle',
    operation: 'CONCEPT OVERVIEW',
    targetStructure: 'stack',
    explanation: 'A Stack is a linear collection governed by LIFO (Last In, First Out). The item inserted most recently is always the first candidate for retrieval and deletion.',
    visualState: {
      stackItems: [10, 20, 30],
      activePointer: 'TOP → 30 (Index 2)',
      actionNote: 'Notice that 30 is at the very top. Any future operation occurs strictly at this top element.',
    },
  },
  {
    title: '2. Stack PUSH Operation',
    operation: 'PUSH(40)',
    targetStructure: 'stack',
    explanation: 'When PUSH(40) is invoked: first verify the stack is not full (TOP < MAX-1). Then increment TOP (TOP = TOP + 1 = 3), and place 40 into STACK[TOP].',
    visualState: {
      stackItems: [10, 20, 30, 40],
      activePointer: 'TOP → 40 (Index 3)',
      actionNote: '40 settles on top of 30. Notice TOP moved up from index 2 to 3.',
    },
  },
  {
    title: '3. Stack PEEK Operation',
    operation: 'PEEK()',
    targetStructure: 'stack',
    explanation: 'PEEK inspects the value currently situated at STACK[TOP] (here: 40) without altering the TOP pointer or removing the node.',
    visualState: {
      stackItems: [10, 20, 30, 40],
      activePointer: 'PEEKING → 40',
      actionNote: 'The value 40 is returned to the caller, while the stack state remains completely unmodified.',
    },
  },
  {
    title: '4. Stack POP Operation',
    operation: 'POP()',
    targetStructure: 'stack',
    explanation: 'POP extracts the element residing at STACK[TOP]. 40 is stored, TOP is decremented by 1 (TOP = 2), and 40 is returned.',
    visualState: {
      stackItems: [10, 20, 30],
      activePointer: 'TOP → 30 (Index 2)',
      actionNote: '40 was ejected. 30 is now the active TOP. LIFO behavior achieved in O(1) time.',
    },
  },
  {
    title: '5. Introduction to Queue & FIFO Principle',
    operation: 'CONCEPT OVERVIEW',
    targetStructure: 'queue',
    explanation: 'A Queue enforces FIFO (First In, First Out). New elements enter at the REAR, while departing elements leave from the FRONT, exactly like a checkout line.',
    visualState: {
      queueItems: [10, 20, 30],
      activePointer: 'FRONT → 10, REAR → 30',
      actionNote: '10 arrived first, so it occupies FRONT. 30 arrived last, occupying REAR.',
    },
  },
  {
    title: '6. Queue ENQUEUE Operation',
    operation: 'ENQUEUE(50)',
    targetStructure: 'queue',
    explanation: 'When ENQUEUE(50) runs: verify Queue is not full. Advance REAR pointer by 1, and place 50 into QUEUE[REAR]. FRONT pointer remains untouched.',
    visualState: {
      queueItems: [10, 20, 30, 50],
      activePointer: 'FRONT → 10, REAR → 50',
      actionNote: '50 joined at the back of the line. The waiting line preserves arrival ordering perfectly.',
    },
  },
  {
    title: '7. Queue DEQUEUE Operation',
    operation: 'DEQUEUE()',
    targetStructure: 'queue',
    explanation: 'DEQUEUE removes the item at FRONT (10). FRONT advances forward to index 1 (pointing to 20). The returned value is 10.',
    visualState: {
      queueItems: [20, 30, 50],
      activePointer: 'FRONT → 20, REAR → 50',
      actionNote: '10 has left the queue. 20 is now at the FRONT of the line. Notice FIFO fairness.',
    },
  },
];

interface LectureModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LectureModeModal: React.FC<LectureModeModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const step = LECTURE_CURRICULUM[currentStepIndex];
  const isStack = step.targetStructure === 'stack';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1000px',
          width: '94%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Lecture Theater Header */}
        <div
          style={{
            padding: '12px clamp(12px, 3vw, 24px)',
            backgroundColor: 'var(--bg-app)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '7px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent-color)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Presentation size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-state-normal)', letterSpacing: '0.08em' }}>
                  CLASSROOM LECTURE MODE
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isStack ? 'rgba(99, 102, 241, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                    color: isStack ? 'var(--color-state-normal)' : 'var(--color-state-inserted)',
                  }}
                >
                  {isStack ? 'STACK (LIFO)' : 'QUEUE (FIFO)'}
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: 700, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
                {step.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            title="Exit Lecture Mode (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Big Projection Stage */}
        <div
          style={{
            padding: 'clamp(14px, 3vw, 28px) clamp(12px, 3vw, 32px)',
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(14px, 2vw, 24px)',
          }}
        >
          {/* Operation & Concept Title Banner */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Executing Operation:
              </span>
              <div style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {step.operation}
              </div>
            </div>

            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--color-state-comparing)',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {step.visualState.activePointer}
            </div>
          </div>

          {/* Centered High-Contrast Large Visualization */}
          <div
            style={{
              minHeight: '220px',
              backgroundColor: 'var(--bg-app)',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 3vw, 30px)',
              position: 'relative',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)',
            }}
          >
            {isStack ? (
              /* Centered Stack for Projector */
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 30px)' }}>
                <div style={{ color: 'var(--color-state-normal)', fontWeight: 800, fontSize: 'clamp(13px, 2.5vw, 18px)', textAlign: 'right' }}>
                  TOP →
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    gap: '8px',
                    width: 'clamp(130px, 45vw, 200px)',
                    borderLeft: '4px solid var(--accent-color)',
                    borderRight: '4px solid var(--accent-color)',
                    borderBottom: '5px solid var(--accent-color)',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                    padding: '8px',
                    backgroundColor: 'rgba(15, 21, 36, 0.5)',
                  }}
                >
                  {step.visualState.stackItems?.map((val, idx) => {
                    const isTop = idx === (step.visualState.stackItems?.length || 0) - 1;
                    return (
                      <div
                        key={idx}
                        style={{
                          height: 'clamp(40px, 8vw, 52px)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isTop ? 'var(--accent-color)' : 'var(--bg-card)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          fontSize: 'clamp(14px, 3vw, 20px)',
                          fontWeight: 800,
                          boxShadow: isTop ? '0 4px 15px var(--accent-glow)' : 'none',
                        }}
                      >
                        <span style={{ fontSize: '11px', opacity: 0.7 }}>[{idx}]</span>
                        <span>{val}</span>
                        <span style={{ fontSize: '10px', opacity: 0.9 }}>{isTop ? 'TOP' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Centered Queue for Projector */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}>
                <div
                  className="scroll-container-touch"
                  style={{
                    display: 'flex',
                    gap: '10px',
                    maxWidth: '100%',
                    justifyContent: 'center',
                    padding: '6px',
                  }}
                >
                  {step.visualState.queueItems?.map((val, idx) => {
                    const isFront = idx === 0;
                    const isRear = idx === (step.visualState.queueItems?.length || 0) - 1;
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 'clamp(52px, 14vw, 74px)',
                          height: 'clamp(52px, 14vw, 74px)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isFront
                            ? 'var(--color-state-found)'
                            : isRear
                            ? 'var(--color-state-inserted)'
                            : 'var(--bg-card)',
                          color: isFront || isRear ? '#ffffff' : 'var(--text-primary)',
                          border: '2px solid var(--border-color)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 'clamp(15px, 3.5vw, 22px)',
                          fontWeight: 800,
                          boxShadow: 'var(--shadow-md)',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: '9px', opacity: 0.8 }}>[{idx}]</span>
                        <span>{val}</span>
                        <span style={{ fontSize: '8px', fontWeight: 700 }}>
                          {isFront ? 'FRONT' : isRear ? 'REAR' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '380px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--color-state-found)', fontWeight: 700 }}>← FRONT (Dequeue)</span>
                  <span style={{ color: 'var(--color-state-inserted)', fontWeight: 700 }}>REAR (Enqueue) ←</span>
                </div>
              </div>
            )}
          </div>

          {/* Educational Explanation Box */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase' }}>
              Lecturer Walkthrough &amp; Classroom Explanation:
            </span>
            <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', lineHeight: 1.6, color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
              "{step.explanation}"
            </p>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '6px',
                marginTop: '2px',
              }}
            >
              <strong>Key takeaway:</strong> {step.visualState.actionNote}
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div
          style={{
            padding: '12px clamp(12px, 3vw, 24px)',
            backgroundColor: 'var(--bg-app)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Curriculum: <strong>{currentStepIndex + 1}</strong> / {LECTURE_CURRICULUM.length}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-secondary"
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            <button
              className="btn-primary"
              onClick={() => setCurrentStepIndex(Math.min(LECTURE_CURRICULUM.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === LECTURE_CURRICULUM.length - 1}
              style={{ fontSize: '12px', padding: '6px 16px' }}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
