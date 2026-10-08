export type PageType = 'home' | 'stack' | 'queue' | 'compare' | 'complexity' | 'applications';

export type ThemeType = 'dark' | 'light';

export interface OperationLogItem {
  id: string;
  type: 'push' | 'pop' | 'peek' | 'enqueue' | 'dequeue' | 'clear' | 'reset' | 'info';
  timestamp: string;
  description: string;
  value?: number | string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

export interface StepDefinition {
  stepNumber: number;
  title: string;
  description: string;
  pseudocodeLine: number; // 1-indexed line to highlight in algorithm panel
  actionState?: {
    highlightIndex?: number | number[];
    pointerState?: {
      top?: number;
      front?: number;
      rear?: number;
    };
    alertMessage?: string;
  };
}

export interface AlgorithmDefinition {
  id: string;
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  pseudocode: string[];
  steps: StepDefinition[];
}

export type CodeLanguage = 'c' | 'cpp' | 'java' | 'python';

export interface CodeSnippet {
  language: CodeLanguage;
  code: string;
}

export interface ComplexityItem {
  operation: string;
  averageTime: string;
  worstTime: string;
  space: string;
  reason: string;
}

export interface ApplicationItem {
  id: string;
  title: string;
  category: 'stack' | 'queue';
  subtitle: string;
  description: string;
  howItWorks: string;
  exampleScenario: string;
  iconName: string;
}
