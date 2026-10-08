import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  GraduationCap, 
  CheckCircle2,
  Code2
} from 'lucide-react';
import { AlgorithmDefinition } from '../types';

interface StepExecutionPanelProps {
  algorithms: Record<string, AlgorithmDefinition>;
  activeAlgorithmKey: string;
  onSelectAlgorithm: (key: string) => void;
  onStepChange?: (stepIndex: number) => void;
}

export const StepExecutionPanel: React.FC<StepExecutionPanelProps> = ({
  algorithms,
  activeAlgorithmKey,
  onSelectAlgorithm,
  onStepChange,
}) => {
  const currentAlgo = algorithms[activeAlgorithmKey] || Object.values(algorithms)[0];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = currentAlgo.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [activeAlgorithmKey]);

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStepIndex);
    }
  }, [currentStepIndex, onStepChange]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const togglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="premium-card glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Header and Operation Selector Tabs */}
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
            <GraduationCap size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
              Step-by-Step Execution
            </h3>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Classroom Teaching &amp; Algorithmic Trace
            </span>
          </div>
        </div>

        {/* Algorithm Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-app)',
            padding: '3px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
          }}
        >
          {Object.entries(algorithms).map(([key, algo]) => {
            const isSelected = key === activeAlgorithmKey;
            return (
              <button
                key={key}
                onClick={() => onSelectAlgorithm(key)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--accent-color)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textTransform: 'capitalize',
                }}
              >
                {algo.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
        {steps.map((s, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(idx);
              }}
              style={{
                flex: 1,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  height: '5px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isCurrent
                    ? 'var(--accent-color)'
                    : isDone
                    ? 'var(--color-state-found)'
                    : 'var(--border-color)',
                  transition: 'background-color var(--transition-normal)',
                }}
              />
              <span
                style={{
                  fontSize: 'clamp(8.5px, 2vw, 10.5px)',
                  fontWeight: isCurrent ? 700 : 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'center',
                  color: isCurrent
                    ? 'var(--accent-color)'
                    : isDone
                    ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                }}
              >
                S{idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current Step Description Card */}
      <div
        style={{
          padding: '14px 16px',
          backgroundColor: 'var(--bg-app)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--color-state-normal)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <h4 style={{ fontSize: '13.5px', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
              {currentStep.title}
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span>Time: <strong style={{ color: 'var(--color-state-found)' }}>{currentAlgo.timeComplexity}</strong></span>
            <span>Space: <strong style={{ color: 'var(--color-state-inserted)' }}>{currentAlgo.spaceComplexity}</strong></span>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
          {currentStep.description}
        </p>
      </div>

      {/* Pseudocode with active line highlighting */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
          <Code2 size={13} />
          <span>Interactive Pseudocode Execution</span>
        </div>
        <div className="code-pre" style={{ margin: 0, padding: '12px' }}>
          {currentAlgo.pseudocode.map((line, idx) => {
            const lineNum = idx + 1;
            const isActive = lineNum === currentStep.pseudocodeLine;
            return (
              <div
                key={idx}
                className={`code-line ${isActive ? 'active' : ''}`}
                style={{
                  fontSize: '12.5px',
                  backgroundColor: isActive ? 'var(--accent-glow)' : 'transparent',
                }}
              >
                <span className="code-line-number">{lineNum}</span>
                <span style={{ color: isActive ? 'var(--text-primary)' : undefined }}>
                  {line}
                </span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '10px',
                      color: 'var(--color-state-comparing)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Executing Line
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '12px',
        }}
      >
        <button
          className="btn-secondary"
          onClick={handleReset}
          style={{ fontSize: '12px', padding: '6px 10px' }}
          title="Reset to step 1"
        >
          <RotateCcw size={13} />
          Reset
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
          <button
            className="btn-secondary"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            style={{ fontSize: '12px', padding: '6px 10px' }}
          >
            <ChevronLeft size={14} />
            Prev
          </button>

          <button
            className="btn-primary"
            onClick={togglePlay}
            style={{ fontSize: '12px', padding: '6px 14px' }}
          >
            {isPlaying ? (
              <>
                <Pause size={13} /> Pause
              </>
            ) : (
              <>
                <Play size={13} /> {currentStepIndex >= steps.length - 1 ? 'Replay' : 'Play'}
              </>
            )}
          </button>

          <button
            className="btn-secondary"
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            style={{ fontSize: '12px', padding: '6px 10px' }}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
