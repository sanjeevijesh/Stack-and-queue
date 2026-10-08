import React, { useState, useEffect } from 'react';
import { PageType, ThemeType } from './types';
import { Navbar } from './components/Navbar';
import { Watermark } from './components/Watermark';
import { LectureModeModal } from './components/LectureModeModal';
import { HomePage } from './pages/HomePage';
import { StackPage } from './pages/StackPage';
import { QueuePage } from './pages/QueuePage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ComplexityPage } from './pages/ComplexityPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { Layers, ArrowRightLeft, BookOpen, GraduationCap, Github, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('rajalakshmi-ds-theme');
    return (saved as ThemeType) || 'dark';
  });
  const [isLectureModeOpen, setIsLectureModeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rajalakshmi-ds-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Subtle academic background watermark */}
      <Watermark />

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenLectureMode={() => setIsLectureModeOpen(true)}
      />

      {/* Main Page Area */}
      <main className="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenLectureMode={() => setIsLectureModeOpen(true)}
          />
        )}
        {currentPage === 'stack' && <StackPage />}
        {currentPage === 'queue' && <QueuePage />}
        {currentPage === 'compare' && <ComparisonPage />}
        {currentPage === 'complexity' && <ComplexityPage />}
        {currentPage === 'applications' && <ApplicationsPage />}
      </main>

      {/* Classroom Lecture Mode Presentation Overlay */}
      <LectureModeModal
        isOpen={isLectureModeOpen}
        onClose={() => setIsLectureModeOpen(false)}
      />

      {/* Institutional Academic Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
          padding: '28px clamp(12px, 3vw, 24px)',
          marginTop: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Layers size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-state-normal)' }}>
                  Raja lakshmi AP CSE
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Stack &amp; Queue Visualizer
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Interactive Data Structures Lecturing Platform for Higher Education &amp; Engineering Classrooms
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <button
              onClick={() => handleNavigate('home')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('stack')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Stack
            </button>
            <button
              onClick={() => handleNavigate('queue')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Queue
            </button>
            <button
              onClick={() => handleNavigate('compare')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Compare
            </button>
            <button
              onClick={() => handleNavigate('complexity')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Complexity
            </button>
            <button
              onClick={() => handleNavigate('applications')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Applications
            </button>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>
            <span>Raja lakshmi AP CSE • Data Structures Lecturing Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
