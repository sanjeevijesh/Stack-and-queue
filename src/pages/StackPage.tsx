import React, { useState } from 'react';
import { 
  Layers, 
  HelpCircle, 
  BookOpen, 
  ArrowDown, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StackVisualizer } from '../components/StackVisualizer';
import { OperationLog } from '../components/OperationLog';
import { StepExecutionPanel } from '../components/StepExecutionPanel';
import { CodePanel } from '../components/CodePanel';
import { ComplexityCard } from '../components/ComplexityCard';
import { ApplicationCard } from '../components/ApplicationCard';
import { 
  STACK_CAPACITY, 
  STACK_ALGORITHMS, 
  STACK_CODE_SNIPPETS, 
  STACK_COMPLEXITY_DATA, 
  STACK_APPLICATIONS 
} from '../data/stackData';
import { OperationLogItem } from '../types';

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<number[]>([10, 20, 30, 40]);
  const [history, setHistory] = useState<number[][]>([[10, 20, 30, 40]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [logs, setLogs] = useState<OperationLogItem[]>([
    {
      id: 'init-1',
      type: 'info',
      timestamp: '00:00:01',
      description: 'Stack initialized with default values: [10, 20, 30, 40]',
      status: 'info',
    },
  ]);
  const [isPeeking, setIsPeeking] = useState(false);
  const [peekingValue, setPeekingValue] = useState<number | null>(null);
  const [lastPoppedValue, setLastPoppedValue] = useState<number | null>(null);
  const [animatingAction, setAnimatingAction] = useState<'push' | 'pop' | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);
  const [implementation, setImplementation] = useState<'array' | 'linked-list'>('array');
  const [activeAlgorithmKey, setActiveAlgorithmKey] = useState<string>('push');

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

  const updateStateWithHistory = (newStack: number[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newStack);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setStack(newStack);
  };

  const handlePush = (value: number) => {
    setIsPeeking(false);
    setPeekingValue(null);

    if (stack.length >= STACK_CAPACITY) {
      setStatusMessage({
        text: `Stack Overflow! Maximum capacity (${STACK_CAPACITY}) reached. Cannot push ${value}.`,
        type: 'error',
      });
      addLog('push', `Stack Overflow: Failed to push ${value}. Stack is already at MAX_SIZE (${STACK_CAPACITY}).`, value, 'error');
      return;
    }

    setAnimatingAction('push');
    const newStack = [...stack, value];
    updateStateWithHistory(newStack);

    setStatusMessage({
      text: `Successfully pushed ${value} to TOP (index ${newStack.length - 1}).`,
      type: 'success',
    });
    addLog('push', `PUSH ${value}: Element placed at STACK[${newStack.length - 1}]. TOP incremented.`, value, 'success');

    setTimeout(() => {
      setAnimatingAction(null);
    }, 400);
  };

  const handlePop = () => {
    setIsPeeking(false);
    setPeekingValue(null);

    if (stack.length === 0) {
      setStatusMessage({
        text: 'Stack Underflow! Stack is completely empty (TOP == -1). No element to pop.',
        type: 'error',
      });
      addLog('pop', 'Stack Underflow: Attempted POP on an empty stack (TOP == -1).', undefined, 'error');
      return;
    }

    const popped = stack[stack.length - 1];
    setLastPoppedValue(popped);
    setAnimatingAction('pop');

    setTimeout(() => {
      const newStack = stack.slice(0, stack.length - 1);
      updateStateWithHistory(newStack);
      setAnimatingAction(null);
      setStatusMessage({
        text: `Successfully popped element ${popped} from the top. TOP decremented.`,
        type: 'success',
      });
      addLog('pop', `POP: Removed ${popped} from top. New TOP index: ${newStack.length - 1}.`, popped, 'success');
    }, 250);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setStatusMessage({
        text: 'Stack is empty (TOP == -1). Cannot inspect top element.',
        type: 'warning',
      });
      addLog('peek', 'PEEK failed: Stack is empty.', undefined, 'warning');
      return;
    }

    const topVal = stack[stack.length - 1];
    setIsPeeking(true);
    setPeekingValue(topVal);
    setStatusMessage({
      text: `Inspecting Top Element: ${topVal} at index ${stack.length - 1}. Stack unmodified.`,
      type: 'info',
    });
    addLog('peek', `PEEK: Inspected STACK[${stack.length - 1}] = ${topVal}. No pointer changes.`, topVal, 'info');

    setTimeout(() => {
      setIsPeeking(false);
    }, 2500);
  };

  const handleClear = () => {
    updateStateWithHistory([]);
    setIsPeeking(false);
    setPeekingValue(null);
    setLastPoppedValue(null);
    setStatusMessage({
      text: 'Stack cleared. All elements removed (TOP reset to -1).',
      type: 'info',
    });
    addLog('clear', 'CLEAR: Cleared all elements from the stack. TOP = -1.', undefined, 'info');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setStack(history[targetIndex]);
      addLog('info', `UNDO: Reverted stack to previous state (Size: ${history[targetIndex].length}).`);
      setStatusMessage({ text: 'Reverted to previous stack snapshot.', type: 'info' });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setStack(history[targetIndex]);
      addLog('info', `REDO: Re-applied stack operation (Size: ${history[targetIndex].length}).`);
      setStatusMessage({ text: 'Re-applied undone stack operation.', type: 'info' });
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
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--color-state-normal)',
            }}
          >
            <Layers size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Stack
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Understand LIFO (Last In, First Out) through interactive visualization &amp; step-by-step algorithms
            </p>
          </div>
        </div>
      </div>

      {/* STACK INTRODUCTION CARD */}
      <section className="premium-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <BookOpen size={18} style={{ color: 'var(--accent-color)' }} />
          <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Stack Introduction &amp; Fundamental Concepts</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            <p style={{ margin: 0 }}>
              A <strong>Stack</strong> is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle.
              This means the element inserted most recently into the stack is the very first element to be removed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Insertion (PUSH):</strong> Happens exclusively at the <strong>TOP</strong> of the stack.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Deletion (POP):</strong> Also happens strictly at the <strong>TOP</strong> of the stack.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• TOP Pointer:</strong> An integer index indicating the current topmost element. In an empty stack, <code>TOP = -1</code>.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Empty Stack (Underflow):</strong> Occurs when <code>TOP == -1</code> and a POP or PEEK is attempted.
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>• Full Stack (Overflow):</strong> Occurs in a fixed-size array when <code>TOP == MAX_SIZE - 1</code> and a PUSH is attempted.
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
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Stack Structural Diagram
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: 700, color: 'var(--color-state-normal)' }}>
                TOP →
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  width: '110px',
                  borderLeft: '2px solid var(--border-color)',
                  borderRight: '2px solid var(--border-color)',
                  borderBottom: '3px solid var(--accent-color)',
                  padding: '4px',
                }}
              >
                {[40, 30, 20, 10].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      height: '26px',
                      backgroundColor: i === 0 ? 'var(--color-state-normal)' : 'var(--bg-card)',
                      color: i === 0 ? '#ffffff' : 'var(--text-primary)',
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
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Elements enter and leave only from the upper boundary.
            </span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE STACK VISUALIZER & OPERATION LOG ROW */}
      <section className="responsive-grid-main">
        <StackVisualizer
          stack={stack}
          onPush={handlePush}
          onPop={handlePop}
          onPeek={handlePeek}
          onClear={handleClear}
          isPeeking={isPeeking}
          peekingValue={peekingValue}
          lastPoppedValue={lastPoppedValue}
          animatingAction={animatingAction}
          statusMessage={statusMessage}
          implementation={implementation}
          onToggleImplementation={setImplementation}
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
          algorithms={STACK_ALGORITHMS}
          activeAlgorithmKey={activeAlgorithmKey}
          onSelectAlgorithm={setActiveAlgorithmKey}
        />

        <CodePanel
          snippets={STACK_CODE_SNIPPETS}
          title="Stack Implementations (C, C++, Java, Python)"
        />
      </section>

      {/* COMPLEXITY SECTION */}
      <section>
        <ComplexityCard
          title="Stack Big-O Time & Space Complexity"
          subtitle="Theoretical bounds across all primary stack operations"
          items={STACK_COMPLEXITY_DATA}
        />
      </section>

      {/* STACK APPLICATIONS */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Real-World Stack Applications</h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            How the LIFO pattern coordinates critical systems, compilers, and browser architectures
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
          {STACK_APPLICATIONS.map((app) => (
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
