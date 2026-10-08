import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRightLeft, 
  RotateCw,
  HelpCircle
} from 'lucide-react';
import { QUEUE_CAPACITY } from '../data/queueData';

interface QueueVisualizerProps {
  queue: number[];
  onEnqueue: (value: number) => void;
  onDequeue: () => void;
  onPeek: () => void;
  onClear: () => void;
  isPeeking: boolean;
  peekingValue: number | null;
  lastDequeuedValue: number | null;
  animatingAction: 'enqueue' | 'dequeue' | null;
  statusMessage: { text: string; type: 'info' | 'success' | 'warning' | 'error' } | null;
  implementation: 'linear' | 'circular' | 'linked-list';
  onToggleImplementation: (impl: 'linear' | 'circular' | 'linked-list') => void;
  // Circular queue specific pointers
  frontPointer: number;
  rearPointer: number;
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  queue,
  onEnqueue,
  onDequeue,
  onPeek,
  onClear,
  isPeeking,
  peekingValue,
  lastDequeuedValue,
  animatingAction,
  statusMessage,
  implementation,
  onToggleImplementation,
  frontPointer,
  rearPointer,
}) => {
  const [inputValue, setInputValue] = useState<string>('18');
  const isFull = queue.length >= QUEUE_CAPACITY;
  const isEmpty = queue.length === 0;

  const handleEnqueueSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    onEnqueue(val);
    setInputValue(String(Math.floor(Math.random() * 89) + 10));
  };

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Visualizer Top Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--color-state-inserted)',
            }}
          >
            <ArrowRightLeft size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                Interactive Queue Simulator
              </h3>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isEmpty
                    ? 'rgba(148, 163, 184, 0.15)'
                    : isFull
                    ? 'rgba(239, 68, 68, 0.15)'
                    : 'rgba(16, 185, 129, 0.15)',
                  color: isEmpty
                    ? 'var(--text-muted)'
                    : isFull
                    ? 'var(--color-state-deleted)'
                    : 'var(--color-state-found)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {isEmpty ? 'EMPTY' : isFull ? 'FULL' : `SIZE: ${queue.length}/${QUEUE_CAPACITY}`}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              FIFO (First In, First Out) • Enqueue at REAR, Dequeue from FRONT
            </span>
          </div>
        </div>

        {/* Implementation Mode Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-app)',
            padding: '3px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
          }}
        >
          <button
            onClick={() => onToggleImplementation('linear')}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: implementation === 'linear' ? 600 : 500,
              color: implementation === 'linear' ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: implementation === 'linear' ? 'var(--accent-color)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Linear Queue
          </button>
          <button
            onClick={() => onToggleImplementation('circular')}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: implementation === 'circular' ? 600 : 500,
              color: implementation === 'circular' ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: implementation === 'circular' ? 'var(--accent-color)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Circular Queue
          </button>
          <button
            onClick={() => onToggleImplementation('linked-list')}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: implementation === 'linked-list' ? 600 : 500,
              color: implementation === 'linked-list' ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: implementation === 'linked-list' ? 'var(--accent-color)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Linked List Queue
          </button>
        </div>
      </div>

      {/* Primary Operation Controls Bar */}
      <div
        className="controls-toolbar"
        style={{
          backgroundColor: 'var(--bg-app)',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Enqueue Form */}
        <form onSubmit={handleEnqueueSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value"
            className="text-input"
            style={{ width: '74px', fontSize: '13px', padding: '6px 8px' }}
            disabled={isFull}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={isFull || !inputValue.trim()}
            style={{ fontSize: '12.5px', padding: '6px 12px', backgroundColor: 'var(--color-state-inserted)' }}
            title="Enqueue new value at the rear of the queue"
          >
            <ArrowRight size={14} />
            Enqueue
          </button>
        </form>

        <div className="controls-divider" />

        {/* Dequeue Button */}
        <button
          className="btn-secondary"
          onClick={onDequeue}
          disabled={isEmpty}
          style={{ fontSize: '12.5px', padding: '6px 12px' }}
          title="Dequeue and remove the front element"
        >
          <ArrowLeft size={14} style={{ color: isEmpty ? undefined : 'var(--color-state-deleted)' }} />
          Dequeue
        </button>

        {/* Peek Button */}
        <button
          className="btn-secondary"
          onClick={onPeek}
          disabled={isEmpty}
          style={{ fontSize: '12.5px', padding: '6px 12px' }}
          title="Inspect front element without removing"
        >
          <Eye size={14} style={{ color: isEmpty ? undefined : 'var(--color-state-comparing)' }} />
          Peek Front
        </button>

        <div className="controls-divider" />

        {/* Quick Diagnostics */}
        <button
          className="btn-secondary"
          onClick={() => {
            const msg = isEmpty ? 'Queue is EMPTY (FRONT == -1)' : `Queue is NOT empty (Length: ${queue.length})`;
            alert(msg);
          }}
          style={{ fontSize: '11.5px', padding: '6px 10px' }}
        >
          Is Empty?
        </button>

        <button
          className="btn-secondary"
          onClick={() => {
            const msg = isFull ? 'Queue is FULL (Overflow condition)' : `Queue is NOT full (${queue.length}/${QUEUE_CAPACITY})`;
            alert(msg);
          }}
          style={{ fontSize: '11.5px', padding: '6px 10px' }}
        >
          Is Full?
        </button>

        {/* Clear Button */}
        <button
          className="btn-secondary"
          onClick={onClear}
          disabled={isEmpty}
          style={{
            fontSize: '12px',
            padding: '7px 12px',
            marginLeft: 'auto',
            color: isEmpty ? 'var(--text-muted)' : 'var(--color-state-deleted)',
          }}
          title="Clear all elements from queue"
        >
          <Trash2 size={13} />
          Clear
        </button>
      </div>

      {/* Dynamic Status / Alert Bar */}
      {statusMessage && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor:
              statusMessage.type === 'error'
                ? 'rgba(239, 68, 68, 0.12)'
                : statusMessage.type === 'warning'
                ? 'rgba(245, 158, 11, 0.12)'
                : statusMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.12)'
                : 'rgba(6, 182, 212, 0.12)',
            color:
              statusMessage.type === 'error'
                ? 'var(--color-state-deleted)'
                : statusMessage.type === 'warning'
                ? 'var(--color-state-comparing)'
                : statusMessage.type === 'success'
                ? 'var(--color-state-found)'
                : 'var(--color-state-inserted)',
            border: `1px solid ${
              statusMessage.type === 'error'
                ? 'rgba(239, 68, 68, 0.25)'
                : statusMessage.type === 'warning'
                ? 'rgba(245, 158, 11, 0.25)'
                : statusMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.25)'
                : 'rgba(6, 182, 212, 0.25)'
            }`,
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {statusMessage.type === 'error' || statusMessage.type === 'warning' ? (
            <AlertCircle size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Visual Canvas Area */}
      <div
        style={{
          minHeight: '380px',
          backgroundColor: 'var(--bg-app)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '32px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {implementation === 'linear' && (
          /* ================= LINEAR QUEUE VIEW ================= */
          <div className="scroll-container-touch" style={{ width: '100%', padding: '4px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minWidth: 'min(100%, 320px)', maxWidth: '680px', margin: '0 auto' }}>
              {/* Pointer Labels Bar Above */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${QUEUE_CAPACITY}, 1fr)`,
                  width: '100%',
                  gap: '6px',
                  textAlign: 'center',
                  minHeight: '28px',
                }}
              >
                {Array.from({ length: QUEUE_CAPACITY }).map((_, idx) => {
                  const isFront = !isEmpty && idx === 0;
                  const isRear = !isEmpty && idx === queue.length - 1;

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {isFront && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: isPeeking ? 'var(--color-state-comparing)' : 'var(--color-state-found)',
                            backgroundColor: isPeeking ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            border: `1px solid ${isPeeking ? 'var(--color-state-comparing)' : 'var(--color-state-found)'}`,
                            animation: 'slideUp 0.2s ease-out',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          FRONT ↓
                        </span>
                      )}
                      {isRear && !isFront && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--color-state-inserted)',
                            backgroundColor: 'rgba(6, 182, 212, 0.15)',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            border: '1px solid var(--color-state-inserted)',
                            animation: 'slideUp 0.2s ease-out',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          REAR ↓
                        </span>
                      )}
                      {isFront && isRear && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: 'var(--color-state-candidate)',
                            backgroundColor: 'rgba(249, 115, 22, 0.15)',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            border: '1px solid var(--color-state-candidate)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          F &amp; R ↓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Horizontal Queue Array Channel */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${QUEUE_CAPACITY}, 1fr)`,
                  width: '100%',
                  gap: '6px',
                  backgroundColor: 'rgba(15, 21, 36, 0.3)',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  borderTop: '3px solid var(--border-color)',
                  borderBottom: '3px solid var(--border-color)',
                }}
              >
              {Array.from({ length: QUEUE_CAPACITY }).map((_, slotIdx) => {
                const element = queue[slotIdx];
                const hasItem = element !== undefined;
                const isFront = !isEmpty && slotIdx === 0;
                const isRear = !isEmpty && slotIdx === queue.length - 1;
                const isItemPeeking = isFront && isPeeking;
                const isAnimatingEnqueue = isRear && animatingAction === 'enqueue';

                return (
                  <div
                    key={slotIdx}
                    style={{
                      height: '64px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: hasItem
                        ? isItemPeeking
                          ? 'rgba(245, 158, 11, 0.2)'
                          : isFront
                          ? 'var(--bg-card-hover)'
                          : 'var(--bg-card)'
                        : 'rgba(255, 255, 255, 0.015)',
                      border: hasItem
                        ? isItemPeeking
                          ? '2px solid var(--color-state-comparing)'
                          : isFront
                          ? '2px solid var(--color-state-found)'
                          : isRear
                          ? '2px solid var(--color-state-inserted)'
                          : '1px solid var(--border-color)'
                        : '1px dashed var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px',
                      color: hasItem ? 'var(--text-primary)' : 'var(--text-muted)',
                      boxShadow: hasItem ? '0 2px 6px var(--shadow-sm)' : 'none',
                      transition: 'all var(--transition-normal)',
                      animation: isAnimatingEnqueue ? 'enqueueSlideIn 0.35s ease-out' : undefined,
                    }}
                  >
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      [{slotIdx}]
                    </span>
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: isItemPeeking
                          ? 'var(--color-state-comparing)'
                          : isFront
                          ? 'var(--color-state-found)'
                          : isRear
                          ? 'var(--color-state-inserted)'
                          : 'var(--text-primary)',
                      }}
                    >
                      {hasItem ? element : ''}
                    </span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                      {hasItem ? (isFront ? 'FRONT' : isRear ? 'REAR' : '') : 'empty'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Directions Flow Label */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '680px',
                fontSize: '11.5px',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={13} style={{ color: 'var(--color-state-deleted)' }} />
                <span>Exit (DEQUEUE from FRONT)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Entry (ENQUEUE at REAR)</span>
                <ArrowRight size={13} style={{ color: 'var(--color-state-inserted)' }} />
              </div>
            </div>
            </div>
          </div>
        )}

        {implementation === 'circular' && (
          /* ================= CIRCULAR QUEUE VIEW ================= */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '100%', wordBreak: 'break-word' }}>
              Formula: <code style={{ color: 'var(--color-state-inserted)', fontFamily: 'var(--font-mono)' }}>REAR = (REAR + 1) % {QUEUE_CAPACITY}</code> &amp; <code style={{ color: 'var(--color-state-found)', fontFamily: 'var(--font-mono)' }}>FRONT = (FRONT + 1) % {QUEUE_CAPACITY}</code>
            </div>

            {/* Circular Ring Container */}
            <div
              style={{
                position: 'relative',
                width: 'min(280px, 76vw)',
                height: 'min(280px, 76vw)',
                borderRadius: '50%',
                border: '2px dashed var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px auto',
              }}
            >
              {/* Center Hub */}
              <div
                style={{
                  width: 'clamp(70px, 22vw, 90px)',
                  height: 'clamp(70px, 22vw, 90px)',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 2,
                }}
              >
                <RotateCw size={16} style={{ color: 'var(--accent-color)' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-primary)' }}>CIRCULAR</span>
                <span style={{ fontSize: '8.5px', color: 'var(--text-muted)' }}>{queue.length}/{QUEUE_CAPACITY}</span>
              </div>

              {/* Circular Array Cells arranged around 360 deg */}
              {Array.from({ length: QUEUE_CAPACITY }).map((_, i) => {
                const angle = (i * (360 / QUEUE_CAPACITY) - 90) * (Math.PI / 180);
                const radius = typeof window !== 'undefined' && window.innerWidth < 420 ? 84 : 108;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                const element = queue[i];
                const hasItem = element !== undefined;
                const isFront = !isEmpty && i === frontPointer;
                const isRear = !isEmpty && i === rearPointer;

                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      transform: `translate(${x}px, ${y}px)`,
                      width: 'clamp(38px, 11vw, 46px)',
                      height: 'clamp(38px, 11vw, 46px)',
                      borderRadius: '50%',
                      backgroundColor: hasItem
                        ? isFront
                          ? 'var(--color-state-found-glow)'
                          : isRear
                          ? 'var(--color-state-inserted-glow)'
                          : 'var(--bg-card-hover)'
                        : 'var(--bg-card)',
                      border: hasItem
                        ? isFront
                          ? '2px solid var(--color-state-found)'
                          : isRear
                          ? '2px solid var(--color-state-inserted)'
                          : '1px solid var(--border-color)'
                        : '1px dashed var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: hasItem ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: 700,
                      boxShadow: hasItem ? '0 2px 6px var(--shadow-sm)' : 'none',
                      transition: 'all var(--transition-normal)',
                      zIndex: 3,
                    }}
                    title={`Index ${i}: ${hasItem ? element : 'empty'}`}
                  >
                    <span>{hasItem ? element : i}</span>
                    <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
                      {isFront ? 'F' : isRear ? 'R' : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--color-state-found)' }}>● FRONT Index: {frontPointer}</span>
              <span style={{ color: 'var(--color-state-inserted)' }}>● REAR Index: {rearPointer}</span>
              <span>● Modulo Wrap: Active</span>
            </div>
          </div>
        )}

        {implementation === 'linked-list' && (
          /* ================= LINKED LIST QUEUE VIEW ================= */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              width: '100%',
              maxWidth: '680px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '580px', fontSize: '12px' }}>
              <span style={{ color: 'var(--color-state-found)', fontWeight: 600 }}>FRONT POINTER ↓</span>
              <span style={{ color: 'var(--color-state-inserted)', fontWeight: 600 }}>REAR POINTER ↑</span>
            </div>

            {isEmpty ? (
              <div
                style={{
                  padding: '24px',
                  border: '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                }}
              >
                FRONT = NULL &amp; REAR = NULL (Empty Linked List Queue)
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                {queue.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queue.length - 1;

                  return (
                    <React.Fragment key={idx}>
                      <div
                        style={{
                          display: 'flex',
                          borderRadius: 'var(--radius-sm)',
                          border: isFront
                            ? '2px solid var(--color-state-found)'
                            : isRear
                            ? '2px solid var(--color-state-inserted)'
                            : '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-card)',
                          overflow: 'hidden',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div
                          style={{
                            padding: '10px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRight: '1px solid var(--border-color)',
                          }}
                        >
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>data</span>
                          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {val}
                          </span>
                        </div>
                        <div
                          style={{
                            padding: '10px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.15)',
                          }}
                        >
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>next</span>
                          <span style={{ fontSize: '12px', color: 'var(--color-state-normal)', fontWeight: 600 }}>•</span>
                        </div>
                      </div>

                      <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: 700 }}>
                        →
                      </span>
                    </React.Fragment>
                  );
                })}

                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: 'var(--color-state-deleted)',
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  NULL
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Peek / Last Dequeued Banner */}
      {(peekingValue !== null || lastDequeuedValue !== null) && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          {peekingValue !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={15} style={{ color: 'var(--color-state-comparing)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Inspected FRONT Element:{' '}
                <strong style={{ color: 'var(--color-state-comparing)', fontSize: '15px' }}>
                  {peekingValue}
                </strong>{' '}
                (No elements removed)
              </span>
            </div>
          )}

          {lastDequeuedValue !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={15} style={{ color: 'var(--color-state-deleted)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Last Dequeued Value:{' '}
                <strong style={{ color: 'var(--color-state-deleted)', fontSize: '15px' }}>
                  {lastDequeuedValue}
                </strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
