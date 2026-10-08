import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Eye, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Plus, 
  Sparkles,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { STACK_CAPACITY } from '../data/stackData';
import { OperationLogItem } from '../types';

interface StackVisualizerProps {
  stack: number[];
  onPush: (value: number) => void;
  onPop: () => void;
  onPeek: () => void;
  onClear: () => void;
  isPeeking: boolean;
  peekingValue: number | null;
  lastPoppedValue: number | null;
  animatingAction: 'push' | 'pop' | null;
  statusMessage: { text: string; type: 'info' | 'success' | 'warning' | 'error' } | null;
  implementation: 'array' | 'linked-list';
  onToggleImplementation: (impl: 'array' | 'linked-list') => void;
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({
  stack,
  onPush,
  onPop,
  onPeek,
  onClear,
  isPeeking,
  peekingValue,
  lastPoppedValue,
  animatingAction,
  statusMessage,
  implementation,
  onToggleImplementation,
}) => {
  const [inputValue, setInputValue] = useState<string>('42');
  const isFull = stack.length >= STACK_CAPACITY;
  const isEmpty = stack.length === 0;
  const topIndex = stack.length - 1;

  const handlePushSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    onPush(val);
    // Auto-generate next suggested value
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
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--color-state-normal)',
            }}
          >
            <Layers size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                Interactive Stack Simulator
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
                {isEmpty ? 'EMPTY' : isFull ? 'FULL' : `SIZE: ${stack.length}/${STACK_CAPACITY}`}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              LIFO (Last In, First Out) • Single-ended insertion &amp; deletion
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
            onClick={() => onToggleImplementation('array')}
            style={{
              padding: '5px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: implementation === 'array' ? 600 : 500,
              color: implementation === 'array' ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: implementation === 'array' ? 'var(--accent-color)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Array Implementation
          </button>
          <button
            onClick={() => onToggleImplementation('linked-list')}
            style={{
              padding: '5px 12px',
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
            Linked List Implementation
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
        {/* Push Form */}
        <form onSubmit={handlePushSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
            style={{ fontSize: '12.5px', padding: '6px 12px' }}
            title="Push new value onto the top of the stack"
          >
            <ArrowDown size={14} />
            Push
          </button>
        </form>

        <div className="controls-divider" />

        {/* Pop Button */}
        <button
          className="btn-secondary"
          onClick={onPop}
          disabled={isEmpty}
          style={{ fontSize: '12.5px', padding: '6px 12px' }}
          title="Pop and return the top element from the stack"
        >
          <ArrowUp size={14} style={{ color: isEmpty ? undefined : 'var(--color-state-deleted)' }} />
          Pop
        </button>

        {/* Peek Button */}
        <button
          className="btn-secondary"
          onClick={onPeek}
          disabled={isEmpty}
          style={{ fontSize: '12.5px', padding: '6px 12px' }}
          title="Inspect the top element without removing it"
        >
          <Eye size={14} style={{ color: isEmpty ? undefined : 'var(--color-state-comparing)' }} />
          Peek
        </button>

        <div className="controls-divider" />

        {/* Quick Diagnostics */}
        <button
          className="btn-secondary"
          onClick={() => {
            const msg = isEmpty ? 'Stack is EMPTY (TOP == -1)' : `Stack is NOT empty (TOP == ${topIndex})`;
            alert(msg);
          }}
          style={{ fontSize: '11.5px', padding: '6px 10px' }}
          title="Check if stack has zero elements"
        >
          Is Empty?
        </button>

        <button
          className="btn-secondary"
          onClick={() => {
            const msg = isFull ? 'Stack is FULL (Overflow condition)' : `Stack is NOT full (${stack.length}/${STACK_CAPACITY})`;
            alert(msg);
          }}
          style={{ fontSize: '11.5px', padding: '6px 10px' }}
          title="Check if stack has reached MAX capacity"
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
          title="Clear all elements from stack"
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
                : 'rgba(99, 102, 241, 0.12)',
            color:
              statusMessage.type === 'error'
                ? 'var(--color-state-deleted)'
                : statusMessage.type === 'warning'
                ? 'var(--color-state-comparing)'
                : statusMessage.type === 'success'
                ? 'var(--color-state-found)'
                : 'var(--color-state-normal)',
            border: `1px solid ${
              statusMessage.type === 'error'
                ? 'rgba(239, 68, 68, 0.25)'
                : statusMessage.type === 'warning'
                ? 'rgba(245, 158, 11, 0.25)'
                : statusMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.25)'
                : 'rgba(99, 102, 241, 0.25)'
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
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {implementation === 'array' ? (
          /* ================= ARRAY STACK VIEW ================= */
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(14px, 3vw, 32px)',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(6px, 2vw, 20px)', flexShrink: 0 }}>
              {/* Pointer Column on Left */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  gap: '8px',
                  height: `${STACK_CAPACITY * 46 + (STACK_CAPACITY - 1) * 8}px`,
                  justifyContent: 'flex-start',
                  position: 'relative',
                  width: 'clamp(65px, 16vw, 95px)',
                }}
              >
                {Array.from({ length: STACK_CAPACITY }).map((_, slotIdx) => {
                  const isCurrentTop = slotIdx === topIndex;
                  return (
                    <div
                      key={slotIdx}
                      style={{
                        height: '46px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                      }}
                    >
                      {isCurrentTop && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: isPeeking ? 'var(--color-state-comparing)' : 'var(--color-state-normal)',
                            fontWeight: 700,
                            fontSize: '11px',
                            backgroundColor: isPeeking ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                            padding: '3px 6px',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${isPeeking ? 'var(--color-state-comparing)' : 'var(--color-state-normal)'}`,
                            animation: 'slideUp 0.2s ease-out',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span>TOP ({slotIdx})</span>
                          <span>→</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Base empty indicator if top == -1 */}
                {isEmpty && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-28px',
                      right: 0,
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>TOP = -1</span>
                    <span>→</span>
                  </div>
                )}
              </div>

              {/* Vertical Stack Frame Tube */}
              <div
                style={{
                  width: 'clamp(130px, 36vw, 180px)',
                  borderLeft: '3px solid var(--border-color)',
                  borderRight: '3px solid var(--border-color)',
                  borderBottom: '4px solid var(--accent-color)',
                  borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  gap: '8px',
                  backgroundColor: 'rgba(15, 21, 36, 0.3)',
                  boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.2)',
                  position: 'relative',
                }}
              >
                {Array.from({ length: STACK_CAPACITY }).map((_, slotIdx) => {
                  const element = stack[slotIdx];
                  const hasItem = element !== undefined;
                  const isTop = slotIdx === topIndex;
                  const isItemPeeking = isTop && isPeeking;
                  const isAnimatingPush = isTop && animatingAction === 'push';

                  return (
                    <div
                      key={slotIdx}
                      style={{
                        height: '46px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: hasItem
                          ? isItemPeeking
                            ? 'rgba(245, 158, 11, 0.2)'
                            : isTop
                            ? 'var(--bg-card-hover)'
                            : 'var(--bg-card)'
                          : 'rgba(255, 255, 255, 0.015)',
                        border: hasItem
                          ? isItemPeeking
                            ? '2px solid var(--color-state-comparing)'
                            : isTop
                            ? '2px solid var(--accent-color)'
                            : '1px solid var(--border-color)'
                          : '1px dashed var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 10px',
                        color: hasItem ? 'var(--text-primary)' : 'var(--text-muted)',
                        boxShadow: isTop ? '0 2px 8px var(--accent-glow)' : 'none',
                        transition: 'all var(--transition-normal)',
                        animation: isAnimatingPush ? 'slideDownIntoStack 0.35s ease-out' : undefined,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        [{slotIdx}]
                      </span>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isItemPeeking
                            ? 'var(--color-state-comparing)'
                            : isTop
                            ? 'var(--text-primary)'
                            : 'var(--text-secondary)',
                        }}
                      >
                        {hasItem ? element : ''}
                      </span>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                        {hasItem ? (isTop ? 'TOP' : '') : 'empty'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side Index & Capacity Helper */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(0,0,0,0.18)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                minWidth: '170px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }} />
                <span>MAX_SIZE: <strong>{STACK_CAPACITY}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-state-found)' }} />
                <span>Capacity Left: <strong>{STACK_CAPACITY - stack.length}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-state-comparing)' }} />
                <span>TOP Index: <strong>{topIndex}</strong></span>
              </div>
            </div>
          </div>
        ) : (
          /* ================= LINKED LIST STACK VIEW ================= */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              maxWidth: '650px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)', fontWeight: 600, fontSize: '13px' }}>
              <span>TOP POINTER</span>
              <ArrowDown size={16} />
            </div>

            {isEmpty ? (
              <div
                style={{
                  padding: '24px',
                  border: '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>TOP = NULL (Empty Linked List Stack)</span>
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
                {/* Linked List Nodes in reverse order (Top node first) */}
                {[...stack].reverse().map((val, revIdx) => {
                  const actualIdx = stack.length - 1 - revIdx;
                  const isTop = actualIdx === topIndex;
                  return (
                    <React.Fragment key={actualIdx}>
                      {/* Node Box */}
                      <div
                        style={{
                          display: 'flex',
                          borderRadius: 'var(--radius-sm)',
                          border: isTop ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                          backgroundColor: isTop ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                          overflow: 'hidden',
                          boxShadow: isTop ? '0 2px 10px var(--accent-glow)' : 'var(--shadow-sm)',
                          transition: 'all var(--transition-normal)',
                        }}
                      >
                        {/* Data Partition */}
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
                        {/* Next Pointer Partition */}
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

                      {/* Arrow to Next Node */}
                      <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: 700 }}>
                        →
                      </span>
                    </React.Fragment>
                  );
                })}

                {/* NULL Terminator */}
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

      {/* Peek / Last Popped Value Banner */}
      {(peekingValue !== null || lastPoppedValue !== null) && (
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
                Inspected TOP Element:{' '}
                <strong style={{ color: 'var(--color-state-comparing)', fontSize: '15px' }}>
                  {peekingValue}
                </strong>{' '}
                (No elements modified)
              </span>
            </div>
          )}

          {lastPoppedValue !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUp size={15} style={{ color: 'var(--color-state-deleted)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Last Popped Value:{' '}
                <strong style={{ color: 'var(--color-state-deleted)', fontSize: '15px' }}>
                  {lastPoppedValue}
                </strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
