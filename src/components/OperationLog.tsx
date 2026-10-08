import React from 'react';
import { History, RotateCcw, RotateCw, Trash2, Clock } from 'lucide-react';
import { OperationLogItem } from '../types';

interface OperationLogProps {
  logs: OperationLogItem[];
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;
  redoCount: number;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

export const OperationLog: React.FC<OperationLogProps> = ({
  logs,
  canUndo,
  canRedo,
  undoCount,
  redoCount,
  onUndo,
  onRedo,
  onClear,
}) => {
  const getBadgeStyle = (type: OperationLogItem['type']) => {
    switch (type) {
      case 'push':
      case 'enqueue':
        return {
          bg: 'rgba(6, 182, 212, 0.12)',
          text: 'var(--color-state-inserted)',
          border: 'rgba(6, 182, 212, 0.3)',
        };
      case 'pop':
      case 'dequeue':
        return {
          bg: 'rgba(239, 68, 68, 0.12)',
          text: 'var(--color-state-deleted)',
          border: 'rgba(239, 68, 68, 0.3)',
        };
      case 'peek':
        return {
          bg: 'rgba(245, 158, 11, 0.12)',
          text: 'var(--color-state-comparing)',
          border: 'rgba(245, 158, 11, 0.3)',
        };
      case 'clear':
      case 'reset':
        return {
          bg: 'rgba(148, 163, 184, 0.12)',
          text: 'var(--text-secondary)',
          border: 'rgba(148, 163, 184, 0.3)',
        };
      default:
        return {
          bg: 'rgba(99, 102, 241, 0.12)',
          text: 'var(--color-state-normal)',
          border: 'rgba(99, 102, 241, 0.3)',
        };
    }
  };

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        height: '100%',
        minHeight: '340px',
      }}
    >
      {/* Header */}
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
          <History size={16} style={{ color: 'var(--accent-color)' }} />
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Operation History</h3>
        </div>

        <button
          onClick={onClear}
          disabled={logs.length === 0}
          style={{
            background: 'none',
            border: 'none',
            color: logs.length > 0 ? 'var(--text-muted)' : 'var(--border-color)',
            fontSize: '11.5px',
            cursor: logs.length > 0 ? 'pointer' : 'default',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 6px',
            borderRadius: '4px',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            if (logs.length > 0) e.currentTarget.style.color = 'var(--color-state-deleted)';
          }}
          onMouseLeave={(e) => {
            if (logs.length > 0) e.currentTarget.style.color = 'var(--text-muted)';
          }}
          title="Clear all logs"
        >
          <Trash2 size={13} />
          Clear
        </button>
      </div>

      {/* Undo / Redo Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button
          className="btn-secondary"
          onClick={onUndo}
          disabled={!canUndo}
          style={{
            fontSize: '12px',
            padding: '6px 10px',
            justifyContent: 'center',
          }}
          title="Undo last operation"
        >
          <RotateCcw size={13} />
          Undo ({undoCount})
        </button>
        <button
          className="btn-secondary"
          onClick={onRedo}
          disabled={!canRedo}
          style={{
            fontSize: '12px',
            padding: '6px 10px',
            justifyContent: 'center',
          }}
          title="Redo previous operation"
        >
          <RotateCw size={13} />
          Redo ({redoCount})
        </button>
      </div>

      {/* Log Entries List */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
          maxHeight: '380px',
          paddingRight: '4px',
        }}
      >
        {logs.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--text-muted)',
              fontSize: '12.5px',
              textAlign: 'center',
              padding: '36px 12px',
            }}
          >
            <Clock size={24} style={{ opacity: 0.5 }} />
            <span>No operations logged yet.</span>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>
              Execute push, pop, enqueue, or dequeue to record actions.
            </span>
          </div>
        ) : (
          logs.map((log) => {
            const badge = getBadgeStyle(log.type);
            return (
              <div
                key={log.id}
                style={{
                  padding: '9px 12px',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      backgroundColor: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {log.type}
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {log.timestamp}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {log.description}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
