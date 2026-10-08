import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { QueueVisualizer } from '../components/QueueVisualizer';
import { OperationLog } from '../components/OperationLog';
import { StepExecutionPanel } from '../components/StepExecutionPanel';
import { CodePanel } from '../components/CodePanel';
import { ComplexityCard } from '../components/ComplexityCard';
import { ApplicationCard } from '../components/ApplicationCard';
import { 
  QUEUE_CAPACITY, 
  QUEUE_ALGORITHMS, 
  QUEUE_CODE_SNIPPETS, 
  QUEUE_COMPLEXITY_DATA, 
  QUEUE_APPLICATIONS 
} from '../data/queueData';
import { OperationLogItem } from '../types';

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40]);
  const [history, setHistory] = useState<number[][]>([[10, 20, 30, 40]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [logs, setLogs] = useState<OperationLogItem[]>([
    {
      id: 'init-1',
      type: 'info',
      timestamp: '00:00:01',
      description: 'Queue initialized with default elements: [10, 20, 30, 40]',
      status: 'info',
    },
  ]);
  const [isPeeking, setIsPeeking] = useState(false);
  const [peekingValue, setPeekingValue] = useState<number | null>(null);
  const [lastDequeuedValue, setLastDequeuedValue] = useState<number | null>(null);
  const [animatingAction, setAnimatingAction] = useState<'enqueue' | 'dequeue' | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);
  const [implementation, setImplementation] = useState<'linear' | 'circular' | 'linked-list'>('linear');
  const [activeAlgorithmKey, setActiveAlgorithmKey] = useState<string>('enqueue');

  // Circular queue pointers
  const [frontPtr, setFrontPtr] = useState<number>(0);
  const [rearPtr, setRearPtr] = useState<number>(3);

  const addLog = (
    type: OperationLogItem['type'],
    description: string,
    value?: number | string,
    status?: OperationLogItem['status']
  ) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog: OperationLogItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      timestamp: timeStr,
      description,
      value,
      status,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const updateStateWithHistory = (newQueue: number[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newQueue);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setQueue(newQueue);
  };

  const handleEnqueue = (value: number) => {
    setIsPeeking(false);
    setPeekingValue(null);

    if (queue.length >= QUEUE_CAPACITY) {
      setStatusMessage({
        text: `Queue Overflow! Queue is full (${QUEUE_CAPACITY}/${QUEUE_CAPACITY}). Cannot enqueue ${value}.`,
        type: 'error',
      });
      addLog('enqueue', `Queue Overflow: Rejected ${value}. Capacity limit of ${QUEUE_CAPACITY} reached.`, value, 'error');
      return;
    }

    setAnimatingAction('enqueue');
    const newQueue = [...queue, value];
    updateStateWithHistory(newQueue);

    const nextRear = (rearPtr + 1) % QUEUE_CAPACITY;
    setRearPtr(nextRear);

    setStatusMessage({
      text: `Successfully enqueued ${value} at REAR (index ${newQueue.length - 1}).`,
      type: 'success',
    });
    addLog('enqueue', `ENQUEUE ${value}: Placed at REAR of queue. REAR advanced.`, value, 'success');

    setTimeout(() => {
      setAnimatingAction(null);
    }, 400);
  };

  const handleDequeue = () => {
    setIsPeeking(false);
    setPeekingValue(null);

    if (queue.length === 0) {
      setStatusMessage({
        text: 'Queue Underflow! Queue is empty (FRONT == -1). No element to dequeue.',
        type: 'error',
      });
      addLog('dequeue', 'Queue Underflow: Attempted DEQUEUE on an empty queue.', undefined, 'error');
      return;
    }

    const dequeued = queue[0];
    setLastDequeuedValue(dequeued);
    setAnimatingAction('dequeue');

    setTimeout(() => {
      const newQueue = queue.slice(1);
      updateStateWithHistory(newQueue);
      setAnimatingAction(null);

      const nextFront = (frontPtr + 1) % QUEUE_CAPACITY;
      setFrontPtr(nextFront);

      setStatusMessage({
        text: `Successfully dequeued ${dequeued} from FRONT. FIFO order maintained.`,
        type: 'success',
      });
      addLog('dequeue', `DEQUEUE: Removed ${dequeued} from FRONT. FRONT pointer advanced.`, dequeued, 'success');
    }, 250);
  };

  const handlePeek = () => {
    if (queue.length === 0) {
      setStatusMessage({
        text: 'Queue is empty (FRONT == -1). Cannot inspect FRONT element.',
        type: 'warning',
      });
      addLog('peek', 'PEEK failed: Queue is currently empty.', undefined, 'warning');
      return;
    }

    const frontVal = queue[0];
    setIsPeeking(true);
    setPeekingValue(frontVal);
    setStatusMessage({
      text: `Inspecting FRONT Element: ${frontVal}. Queue unmodified.`,
      type: 'info',
    });
    addLog('peek', `PEEK: Inspected FRONT element = ${frontVal}. No state changes.`, frontVal, 'info');

    setTimeout(() => {
      setIsPeeking(false);
    }, 2500);
  };

  const handleClear = () => {
    updateStateWithHistory([]);
    setIsPeeking(false);
    setPeekingValue(null);
    setLastDequeuedValue(null);
    setFrontPtr(0);
    setRearPtr(-1);
    setStatusMessage({
      text: 'Queue cleared. FRONT and REAR reset to initial states.',
      type: 'info',
    });
    addLog('clear', 'CLEAR: Cleared all items from the queue.', undefined, 'info');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setQueue(history[targetIndex]);
      addLog('info', `UNDO: Reverted queue to previous snapshot (Size: ${history[targetIndex].length}).`);
      setStatusMessage({ text: 'Reverted to previous queue state.', type: 'info' });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setQueue(history[targetIndex]);
      addLog('info', `REDO: Re-applied queue operation (Size: ${history[targetIndex].length}).`);
      setStatusMessage({ text: 'Re-applied undone queue state.', type: 'info' });
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Page Title & Subtitle */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--color-state-inserted)',
            }}
          >
            <ArrowRightLeft size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Queue
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Understand FIFO (First In, First Out) through interactive visualization &amp; step-by-step algorithms
            </p>
          </div>
        </div>
      </div>

      {/* QUEUE INTRODUCTION CARD */}
      <section className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <BookOpen size={18} style={{ color: 'var(--color-state-inserted)' }} />
          <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Queue Introduction &amp; Fundamental Concepts</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            <p style={{ margin: 0 }}>
              A <strong>Queue</strong> is a linear data structure governed by the <strong>FIFO (First In, First Out)</strong> principle.
              The element that enters first is the very first one to be serviced and deleted, ensuring strict sequential fairness.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Insertion (ENQUEUE):</strong> Takes place at the <strong>REAR</strong> (tail) of the queue.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Deletion (DEQUEUE):</strong> Takes place at the <strong>FRONT</strong> (head) of the queue.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Two Active Pointers:</strong> <code>FRONT</code> tracks the next element to depart; <code>REAR</code> tracks the most recently appended element.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Empty Queue (Underflow):</strong> Occurs when <code>FRONT == -1</code> or <code>FRONT &gt; REAR</code> and DEQUEUE is attempted.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Full Queue (Overflow):</strong> In a linear array, occurs when <code>REAR == MAX - 1</code>, even if earlier slots became vacant! Circular queues solve this memory wastage.
              </div>
            </div>
          </div>

          {/* Clean Visual Diagram */}
          <div
            style={{
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Queue Structural Diagram
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-state-found)' }}>
                FRONT →
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  borderTop: '2px solid var(--border-color)',
                  borderBottom: '2px solid var(--border-color)',
                  padding: '6px 4px',
                }}
              >
                {[10, 20, 30, 40].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: '44px',
                      height: '32px',
                      backgroundColor: i === 0 ? 'var(--color-state-found)' : i === 3 ? 'var(--color-state-inserted)' : 'var(--bg-card)',
                      color: i === 0 || i === 3 ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    [{v}]
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-state-inserted)' }}>
                ← REAR
              </div>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Dual-ended flow: Entry at REAR, departure at FRONT.
            </span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE QUEUE VISUALIZER & OPERATION LOG ROW */}
      <section className="responsive-grid-main">
        <QueueVisualizer
          queue={queue}
          onEnqueue={handleEnqueue}
          onDequeue={handleDequeue}
          onPeek={handlePeek}
          onClear={handleClear}
          isPeeking={isPeeking}
          peekingValue={peekingValue}
          lastDequeuedValue={lastDequeuedValue}
          animatingAction={animatingAction}
          statusMessage={statusMessage}
          implementation={implementation}
          onToggleImplementation={setImplementation}
          frontPointer={frontPtr}
          rearPointer={rearPtr}
        />

        <OperationLog
          logs={logs}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          undoCount={historyIndex}
          redoCount={history.length - 1 - historyIndex}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClearLogs}
        />
      </section>

      {/* STEP-BY-STEP TEACHING MODE & CODE PANEL */}
      <section className="responsive-grid-equal">
        <StepExecutionPanel
          algorithms={QUEUE_ALGORITHMS}
          activeAlgorithmKey={activeAlgorithmKey}
          onSelectAlgorithm={setActiveAlgorithmKey}
        />

        <CodePanel
          snippets={QUEUE_CODE_SNIPPETS}
          title="Queue Implementations (C, C++, Java, Python)"
        />
      </section>

      {/* COMPLEXITY SECTION */}
      <section>
        <ComplexityCard
          title="Queue Big-O Time & Space Complexity"
          subtitle="Analysis of Linear Array Queue vs Circular Queue vs Linked List Queue"
          items={QUEUE_COMPLEXITY_DATA}
        />
      </section>

      {/* QUEUE APPLICATIONS */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Real-World Queue Applications</h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            How FIFO scheduling orchestrates operating systems, networking switches, and print spoolers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
          {QUEUE_APPLICATIONS.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          section {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
