export interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: Date;
}

export interface ReviewResult {
  id: string;
  codeSnippetId: string;
  language: string;
  issues: CodeIssue[];
  summary: string;
  metrics: CodeMetrics;
  createdAt: Date;
}

export interface CodeIssue {
  id: string;
  lineNumber: number;
  message: string;
  severity: IssueSeverity;
  suggestion?: string;
}

export interface CodeMetrics {
  complexity: number;
  maintainability: number;
  readability: number;
  duplication: number;
  overallScore: number;
}

export type IssueSeverity = 'error' | 'warning' | 'info' | 'style';

export type Language = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'go'
  | 'ruby'
  | 'php'
  | 'swift'
  | 'kotlin'
  | 'rust';

export interface ThemeConfig {
  isDarkMode: boolean;
  fontSize: number;
}