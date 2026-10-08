import React, { useState } from 'react';
import { 
  Cpu, 
  Globe, 
  Printer, 
  RotateCcw, 
  Layers, 
  ArrowRightLeft, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Play,
  Sparkles
} from 'lucide-react';
import { ApplicationCard } from '../components/ApplicationCard';
import { STACK_APPLICATIONS } from '../data/stackData';
import { QUEUE_APPLICATIONS } from '../data/queueData';

export const ApplicationsPage: React.FC = () => {
  // Mini simulator 1: Browser Navigation Back & Forward Stacks
  const [backStack, setBackStack] = useState<string[]>(['google.com', 'github.com']);
  const [currentPage, setCurrentPage] = useState<string>('stackoverflow.com');
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>('');

  // Mini simulator 2: Printer Job Queue
  const [printQueue, setPrintQueue] = useState<string[]>([
    'CS201_Syllabus.pdf',
    'Assignment_01_Spec.docx',
    'Lecture_Slides_Stack.pptx',
  ]);
  const [lastPrintedDoc, setLastPrintedDoc] = useState<string | null>(null);

  const handleVisitUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;
    setBackStack((prev) => [...prev, currentPage]);
    setCurrentPage(urlInput.trim());
    setForwardStack([]); // Forward stack clears on new navigation
    setUrlInput('');
  };

  const handleBrowserBack = () => {
    if (backStack.length === 0) return;
    const prevPage = backStack[backStack.length - 1];
    setBackStack((prev) => prev.slice(0, prev.length - 1));
    setForwardStack((prev) => [...prev, currentPage]);
    setCurrentPage(prevPage);
  };

  const handleBrowserForward = () => {
    if (forwardStack.length === 0) return;
    const nextPage = forwardStack[forwardStack.length - 1];
    setForwardStack((prev) => prev.slice(0, prev.length - 1));
    setBackStack((prev) => [...prev, currentPage]);
    setCurrentPage(nextPage);
  };

  const handleAddPrintJob = (docName: string) => {
    setPrintQueue((prev) => [...prev, docName]);
  };

  const handlePrintNext = () => {
    if (printQueue.length === 0) return;
    const printed = printQueue[0];
    setPrintQueue((prev) => prev.slice(1));
    setLastPrintedDoc(printed);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
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
            <Cpu size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Real-World System Applications
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Hands-on interactive simulations illustrating how Stacks and Queues drive operating systems and web browsers
            </p>
          </div>
        </div>
      </div>

      {/* TWO INTERACTIVE MINI LABS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
        {/* LAB 1: BROWSER BACK/FORWARD DUAL STACK SIMULATOR */}
        <div
          className="premium-card glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} style={{ color: 'var(--color-state-normal)' }} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Browser Dual-Stack Simulator</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Back Stack &amp; Forward Stack in Action</span>
              </div>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-state-normal)', padding: '2px 8px', borderRadius: '4px' }}>
              STACK (LIFO)
            </span>
          </div>

          {/* Browser Navigation Toolbar */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className="btn-secondary"
              onClick={handleBrowserBack}
              disabled={backStack.length === 0}
              style={{ padding: '6px 10px' }}
              title="Back (Pops Back Stack, Pushes to Forward Stack)"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              className="btn-secondary"
              onClick={handleBrowserForward}
              disabled={forwardStack.length === 0}
              style={{ padding: '6px 10px' }}
              title="Forward (Pops Forward Stack, Pushes to Back Stack)"
            >
              <ArrowRight size={14} />
            </button>
            <div
              style={{
                flex: 1,
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                fontSize: '12.5px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              https://{currentPage}
            </div>
          </div>

          {/* Visit New URL Input */}
          <form onSubmit={handleVisitUrl} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. reddit.com, wikipedia.org"
              className="text-input"
              style={{ flex: 1, fontSize: '12px', padding: '6px 10px' }}
            />
            <button type="submit" className="btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>
              Visit URL
            </button>
          </form>

          {/* Stacks Inspector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', backgroundColor: 'var(--bg-app)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-state-normal)', display: 'block', marginBottom: '6px' }}>
                Back Stack ({backStack.length}):
              </span>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '4px', minHeight: '60px' }}>
                {backStack.length === 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Empty</span>
                ) : (
                  backStack.map((url, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '11px',
                        padding: '3px 6px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '3px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {url}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Forward Stack ({forwardStack.length}):
              </span>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '4px', minHeight: '60px' }}>
                {forwardStack.length === 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Empty</span>
                ) : (
                  forwardStack.map((url, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '11px',
                        padding: '3px 6px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '3px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {url}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LAB 2: PRINTER SPOOLER FIFO QUEUE SIMULATOR */}
        <div
          className="premium-card glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} style={{ color: 'var(--color-state-inserted)' }} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Printer Spooler Queue Simulator</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>FIFO Document Servicing Simulation</span>
              </div>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--color-state-inserted)', padding: '2px 8px', borderRadius: '4px' }}>
              QUEUE (FIFO)
            </span>
          </div>

          {/* Printer Actions */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={handlePrintNext}
              disabled={printQueue.length === 0}
              style={{ fontSize: '12px', padding: '6px 14px', backgroundColor: 'var(--color-state-found)' }}
            >
              Print Next Job (Dequeue)
            </button>
            <button
              className="btn-secondary"
              onClick={() => handleAddPrintJob(`Lab_Report_${Math.floor(Math.random() * 90 + 10)}.pdf`)}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              <Plus size={13} />
              Add Student Job
            </button>
          </div>

          {/* Active Spooler Queue */}
          <div style={{ backgroundColor: 'var(--bg-app)', padding: '12px', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Spool Queue: {printQueue.length} jobs waiting</span>
              <span>Servicing order: Top to Bottom (FIFO)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minHeight: '90px' }}>
              {printQueue.length === 0 ? (
                <div style={{ margin: 'auto', color: 'var(--text-muted)', fontSize: '12px' }}>
                  All print jobs completed. Spooler idle.
                </div>
              ) : (
                printQueue.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      backgroundColor: idx === 0 ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                      border: idx === 0 ? '1px solid var(--color-state-found)' : '1px solid var(--border-color)',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      {idx + 1}. {doc}
                    </span>
                    <span style={{ fontSize: '10px', color: idx === 0 ? 'var(--color-state-found)' : 'var(--text-muted)', fontWeight: 600 }}>
                      {idx === 0 ? 'NEXT IN LINE' : 'WAITING'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {lastPrintedDoc && (
            <div style={{ fontSize: '12px', color: 'var(--color-state-found)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓ Printed:</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{lastPrintedDoc}</strong>
            </div>
          )}
        </div>
      </section>

      {/* FULL DIRECTORY OF APPLICATIONS */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} style={{ color: 'var(--color-state-normal)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>All Stack Applications</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {STACK_APPLICATIONS.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowRightLeft size={18} style={{ color: 'var(--color-state-inserted)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>All Queue Applications</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {QUEUE_APPLICATIONS.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
};
