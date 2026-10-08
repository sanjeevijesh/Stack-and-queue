import React, { useState } from 'react';
import { 
  Cpu, 
  RotateCcw, 
  Globe, 
  Code, 
  Calculator, 
  GitBranch, 
  Printer, 
  Server, 
  Network, 
  Wifi, 
  PhoneCall, 
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { ApplicationItem } from '../types';

interface ApplicationCardProps {
  app: ApplicationItem;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ app }) => {
  const [expanded, setExpanded] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu size={20} />;
      case 'RotateCcw': return <RotateCcw size={20} />;
      case 'Globe': return <Globe size={20} />;
      case 'Code': return <Code size={20} />;
      case 'Calculator': return <Calculator size={20} />;
      case 'GitBranch': return <GitBranch size={20} />;
      case 'Printer': return <Printer size={20} />;
      case 'Server': return <Server size={20} />;
      case 'Network': return <Network size={20} />;
      case 'Wifi': return <Wifi size={20} />;
      case 'PhoneCall': return <PhoneCall size={20} />;
      case 'Clock': return <Clock size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  const isStack = app.category === 'stack';

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isStack ? 'rgba(99, 102, 241, 0.12)' : 'rgba(6, 182, 212, 0.12)',
              color: isStack ? 'var(--color-state-normal)' : 'var(--color-state-inserted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getIcon(app.iconName)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                {app.title}
              </h3>
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: isStack ? 'rgba(99, 102, 241, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                  color: isStack ? 'var(--color-state-normal)' : 'var(--color-state-inserted)',
                }}
              >
                {app.category}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
              {app.subtitle}
            </span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label={expanded ? 'Collapse application details' : 'Expand application details'}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
        {app.description}
      </p>

      {/* Expanded deep dive */}
      {expanded && (
        <div
          style={{
            marginTop: '4px',
            padding: '12px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
              How {isStack ? 'LIFO' : 'FIFO'} is Utilized:
            </span>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              {app.howItWorks}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-state-normal)', display: 'block' }}>
              Concrete Example:
            </span>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {app.exampleScenario}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
