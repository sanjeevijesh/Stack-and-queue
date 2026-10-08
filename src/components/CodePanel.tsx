import React, { useState } from 'react';
import { Code, Copy, Check, Terminal } from 'lucide-react';
import { CodeLanguage, CodeSnippet } from '../types';

interface CodePanelProps {
  snippets: Record<string, Record<string, CodeSnippet>>;
  title?: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({
  snippets,
  title = 'Implementation Code',
}) => {
  const operations = Object.keys(snippets);
  const [selectedOp, setSelectedOp] = useState<string>(operations[0] || 'push');
  const [selectedLang, setSelectedLang] = useState<CodeLanguage>('c');
  const [copied, setCopied] = useState(false);

  const currentSnippet = snippets[selectedOp]?.[selectedLang]?.code || '// Code snippet unavailable';

  const languages: { id: CodeLanguage; label: string }[] = [
    { id: 'c', label: 'C' },
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
    { id: 'python', label: 'Python' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
      }}
    >
      {/* Header and Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--color-state-normal)',
            }}
          >
            <Terminal size={17} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{title}</h3>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Industrial &amp; Academic Source Code
            </span>
          </div>
        </div>

        {/* Operation Picker */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-app)',
              padding: '2px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
            }}
          >
            {operations.map((op) => (
              <button
                key={op}
                onClick={() => setSelectedOp(op)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  fontWeight: selectedOp === op ? 600 : 500,
                  color: selectedOp === op ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: selectedOp === op ? 'var(--accent-color)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {op}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{
              fontSize: '11.5px',
              padding: '5px 10px',
              gap: '6px',
            }}
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} style={{ color: 'var(--color-state-found)' }} />
                <span style={{ color: 'var(--color-state-found)' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div
        className="scroll-container-touch"
        style={{
          display: 'flex',
          gap: '6px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '8px',
          overflowX: 'auto',
        }}
      >
        {languages.map((lang) => {
          const isSelected = selectedLang === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'transparent',
                border: isSelected ? '1px solid var(--border-color)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {lang.label}
            </button>
          );
        })}
      </div>

      {/* Code Display */}
      <div className="code-pre" style={{ margin: 0, maxHeight: '360px' }}>
        {currentSnippet.split('\n').map((line, idx) => (
          <div key={idx} className="code-line" style={{ padding: '1px 4px' }}>
            <span className="code-line-number" style={{ width: '32px' }}>
              {idx + 1}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
