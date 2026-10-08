import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Play, 
  Layers, 
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';

export const SideBySideVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [stackOutput, setStackOutput] = useState<number[]>([]);
  const [queueOutput, setQueueOutput] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('40');

  const handleSimultaneousInsert = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;

    if (stack.length < 6) {
      setStack((prev) => [...prev, val]);
    }
    if (queue.length < 6) {
      setQueue((prev) => [...prev, val]);
    }
    setInputValue(String(Math.floor(Math.random() * 89) + 10));
  };

  const handleSimultaneousExtract = () => {
    // Stack pop
    if (stack.length > 0) {
      const popped = stack[stack.length - 1];
      setStack((prev) => prev.slice(0, prev.length - 1));
      setStackOutput((prev) => [...prev, popped]);
    }
    // Queue dequeue
    if (queue.length > 0) {
      const dequeued = queue[0];
      setQueue((prev) => prev.slice(1));
      setQueueOutput((prev) => [...prev, dequeued]);
    }
  };

  const handleResetBoth = () => {
    setStack([10, 20, 30]);
    setQueue([10, 20, 30]);
    setStackOutput([]);
    setQueueOutput([]);
    setInputValue('40');
  };

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      {/* Header and Dual Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--color-state-normal)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Interactive Laboratory
            </span>
            <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>
              Simultaneous LIFO vs. FIFO Demonstration
            </h3>
          </div>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Insert identical elements into both structures simultaneously, then extract to observe order reversal vs order preservation.
          </span>
        </div>

        {/* Action Controls */}
        <div className="controls-toolbar" style={{ width: 'auto' }}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-input"
            style={{ width: '70px', fontSize: '13px', padding: '7px 8px' }}
          />

          <button
            className="btn-primary"
            onClick={handleSimultaneousInsert}
            disabled={stack.length >= 6 && queue.length >= 6}
            style={{ fontSize: '13px', padding: '7px 12px' }}
            title="Push to Stack & Enqueue to Queue simultaneously"
          >
            Insert Both ({inputValue})
          </button>

          <button
            className="btn-secondary"
            onClick={handleSimultaneousExtract}
            disabled={stack.length === 0 && queue.length === 0}
            style={{ fontSize: '13px', padding: '7px 12px' }}
            title="Pop from Stack & Dequeue from Queue simultaneously"
          >
            Extract Both
          </button>

          <button
            className="btn-secondary"
            onClick={handleResetBoth}
            style={{ fontSize: '12.5px', padding: '7px 10px' }}
            title="Reset both to initial state"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Side-by-side columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
        {/* STACK SIDE */}
        <div
          style={{
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} style={{ color: 'var(--color-state-normal)' }} />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>STACK (LIFO)</h4>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-state-normal)',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Order Inversion
            </span>
          </div>

          {/* Vertical Stack Animation Box */}
          <div
            style={{
              height: '220px',
              borderLeft: '3px solid var(--border-color)',
              borderRight: '3px solid var(--border-color)',
              borderBottom: '4px solid var(--color-state-normal)',
              borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: '6px',
              backgroundColor: 'rgba(15, 21, 36, 0.3)',
              overflow: 'hidden',
            }}
          >
            {stack.length === 0 ? (
              <div style={{ margin: 'auto', color: 'var(--text-muted)', fontSize: '12px' }}>
                Stack is empty
              </div>
            ) : (
              stack.map((item, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <div
                    key={idx}
                    style={{
                      height: '34px',
                      borderRadius: '4px',
                      backgroundColor: isTop ? 'var(--color-state-normal)' : 'var(--bg-card)',
                      color: isTop ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      animation: 'slideDownIntoStack 0.25s ease-out',
                    }}
                  >
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>[{idx}]</span>
                    <span>{item}</span>
                    <span style={{ fontSize: '9px', opacity: 0.9 }}>{isTop ? 'TOP' : ''}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Stack Extraction Output Stream */}
          <div>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Extracted Stream (Popped Sequence):
            </span>
            <div
              style={{
                display: 'flex',
                gap: '6px',
                minHeight: '34px',
                padding: '4px 8px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              {stackOutput.length === 0 ? (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>None extracted yet</span>
              ) : (
                stackOutput.map((val, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                      color: 'var(--color-state-normal)',
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {val}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* QUEUE SIDE */}
        <div
          style={{
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRightLeft size={18} style={{ color: 'var(--color-state-inserted)' }} />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>QUEUE (FIFO)</h4>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-state-inserted)',
                backgroundColor: 'rgba(6, 182, 212, 0.12)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Order Preservation
            </span>
          </div>

          {/* Horizontal Queue Animation Box */}
          <div
            style={{
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'rgba(15, 21, 36, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              borderTop: '3px solid var(--border-color)',
              borderBottom: '3px solid var(--border-color)',
            }}
          >
            {queue.length === 0 ? (
              <div style={{ margin: 'auto', color: 'var(--text-muted)', fontSize: '12px' }}>
                Queue is empty
              </div>
            ) : (
              <div
                className="scroll-container-touch"
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: queue.length > 3 ? 'flex-start' : 'center',
                  padding: '4px',
                }}
              >
                {queue.map((item, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queue.length - 1;
                  return (
                    <div
                      key={idx}
                      style={{
                        width: '46px',
                        height: '56px',
                        borderRadius: '4px',
                        backgroundColor: isFront
                          ? 'var(--color-state-found)'
                          : isRear
                          ? 'var(--color-state-inserted)'
                          : 'var(--bg-card)',
                        color: isFront || isRear ? '#ffffff' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 700,
                        animation: 'enqueueSlideIn 0.25s ease-out',
                      }}
                    >
                      <span style={{ fontSize: '9px', opacity: 0.8 }}>[{idx}]</span>
                      <span>{item}</span>
                      <span style={{ fontSize: '8px', fontWeight: 600 }}>
                        {isFront ? 'FRONT' : isRear ? 'REAR' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Queue Extraction Output Stream */}
          <div>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Extracted Stream (Dequeued Sequence):
            </span>
            <div
              style={{
                display: 'flex',
                gap: '6px',
                minHeight: '34px',
                padding: '4px 8px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              {queueOutput.length === 0 ? (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>None extracted yet</span>
              ) : (
                queueOutput.map((val, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(6, 182, 212, 0.2)',
                      color: 'var(--color-state-inserted)',
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {val}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
