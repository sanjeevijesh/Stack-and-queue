import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRightLeft, 
  GitCompare, 
  Gauge, 
  Cpu, 
  Home, 
  Sun, 
  Moon, 
  Presentation, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { PageType, ThemeType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  theme: ThemeType;
  onToggleTheme: () => void;
  onOpenLectureMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenLectureMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={15} /> },
    { id: 'stack', label: 'Stack', icon: <Layers size={15} /> },
    { id: 'queue', label: 'Queue', icon: <ArrowRightLeft size={15} /> },
    { id: 'compare', label: 'Compare', icon: <GitCompare size={15} /> },
    { id: 'complexity', label: 'Complexity', icon: <Gauge size={15} /> },
    { id: 'applications', label: 'Applications', icon: <Cpu size={15} /> },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '64px',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(12px, 3vw, 24px)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
      }}
    >
      {/* Brand / Logo */}
      <div
        onClick={() => handleNavClick('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          userSelect: 'none',
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 8px var(--accent-glow)',
            flexShrink: 0,
          }}
        >
          <Layers size={20} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--color-state-normal)',
                padding: '2px 5px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              AP CSE
            </span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
              }}
            >
              Raja lakshmi
            </span>
          </div>
          <span
            className="brand-subtitle"
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              display: 'block',
              marginTop: '-1px',
              whiteSpace: 'nowrap',
            }}
          >
            Stack &amp; Queue Visualizer
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: 'var(--bg-card)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
        }}
        className="desktop-nav"
      >
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                boxShadow: isActive ? '0 2px 6px var(--accent-glow)' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-input)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Lecture Mode Button */}
        <button
          onClick={onOpenLectureMode}
          className="btn-primary"
          style={{
            fontSize: '12px',
            padding: '7px 12px',
            backgroundColor: 'var(--color-state-normal)',
          }}
          title="Activate Classroom Lecture Mode"
        >
          <Presentation size={15} />
          <span className="lecture-btn-text">Lecture Mode</span>
        </button>

        {/* Theme Toggle */}
        <div
          onClick={onToggleTheme}
          className="theme-toggle-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '2px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
          }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          role="button"
          aria-label="Toggle theme"
        >
          <div
            style={{
              padding: '5px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme === 'dark' ? 'var(--accent-color)' : 'transparent',
              color: theme === 'dark' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Moon size={14} />
          </div>
          <div
            style={{
              padding: '5px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme === 'light' ? 'var(--accent-color)' : 'transparent',
              color: theme === 'light' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Sun size={14} />
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-hamburger-btn"
          style={{
            display: 'none',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            minHeight: '38px',
            minWidth: '38px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle mobile navigation menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 64px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '2px solid var(--border-color)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 100,
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
          }}
        >
          {/* Lecture mode shortcut inside mobile menu */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLectureMode();
            }}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 14px',
              fontSize: '14px',
              marginBottom: '4px',
            }}
          >
            <Presentation size={16} />
            <span>Launch Classroom Lecture Mode</span>
          </button>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  backgroundColor: isActive ? 'var(--accent-color)' : 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  minHeight: '44px',
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .lecture-btn-text {
            display: none;
          }
        }
        @media (max-width: 380px) {
          .brand-subtitle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
