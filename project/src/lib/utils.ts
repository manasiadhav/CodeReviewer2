import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IssueSeverity, CodeIssue, CodeMetrics } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSeverityColor(severity: IssueSeverity): string {
  switch (severity) {
    case 'error':
      return 'text-destructive-500';
    case 'warning':
      return 'text-warning-500';
    case 'info':
      return 'text-accent-500';
    case 'style':
      return 'text-primary-500';
    default:
      return 'text-gray-500';
  }
}

export function getSeverityBgColor(severity: IssueSeverity): string {
  switch (severity) {
    case 'error':
      return 'bg-destructive-100';
    case 'warning':
      return 'bg-warning-100';
    case 'info':
      return 'bg-accent-100';
    case 'style':
      return 'bg-primary-100';
    default:
      return 'bg-gray-100';
  }
}

export function getSeverityIcon(severity: IssueSeverity): string {
  switch (severity) {
    case 'error':
      return 'alert-circle';
    case 'warning':
      return 'alert-triangle';
    case 'info':
      return 'info';
    case 'style':
      return 'paintbrush';
    default:
      return 'circle';
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function calculateReadability(code: string): number {
  // Basic readability calculation (simplified)
  const lines = code.split('\n');
  const longLines = lines.filter(line => line.length > 100).length;
  const codeLength = code.length;
  
  // Penalize long lines and long functions
  const longLinesPenalty = Math.min(longLines / lines.length, 0.5);
  const lengthPenalty = Math.min(codeLength / 5000, 0.5);
  
  return Math.max(0, Math.min(100, 100 - (longLinesPenalty + lengthPenalty) * 100));
}

export function calculateComplexity(code: string): number {
  // Basic complexity calculation (simplified)
  const conditionals = (code.match(/if|else|switch|case|for|while|do/g) || []).length;
  const nestedDepth = Math.max(0, ...code.split('\n').map(line => {
    return (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
  }));
  
  return Math.max(0, Math.min(100, 100 - (conditionals / 20 + nestedDepth / 3) * 10));
}

export function calculateMaintainability(code: string): number {
  // Basic maintainability calculation (simplified)
  const comments = (code.match(/\/\/|\/\*|\*\/|#/g) || []).length;
  const lines = code.split('\n').length;
  const commentRatio = comments / lines;
  
  return Math.max(0, Math.min(100, 50 + commentRatio * 100 + calculateReadability(code) / 4));
}

export function calculateDuplication(code: string): number {
  // Basic duplication calculation (simplified)
  const lines = code.split('\n');
  const uniqueLines = new Set(lines).size;
  const duplicationRatio = 1 - (uniqueLines / lines.length);
  
  return Math.max(0, Math.min(100, 100 - duplicationRatio * 100));
}

export function calculateOverallScore(metrics: Omit<CodeMetrics, 'overallScore'>): number {
  const { complexity, maintainability, readability, duplication } = metrics;
  
  // Weight the metrics according to importance
  const weightedScore = (
    complexity * 0.25 + 
    maintainability * 0.3 + 
    readability * 0.25 + 
    duplication * 0.2
  );
  
  return Math.round(weightedScore);
}

export function analyzeCode(code: string, language: string): { issues: CodeIssue[], metrics: CodeMetrics } {
  const issues: CodeIssue[] = [];
  
  // Perform simple code analysis
  const lines = code.split('\n');
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Check for console logs in production code
    if ((language === 'javascript' || language === 'typescript') && line.includes('console.log')) {
      issues.push({
        id: generateId(),
        lineNumber,
        message: 'Avoid using console.log in production code',
        severity: 'warning',
        suggestion: 'Use a proper logging library or remove this statement before deploying',
      });
    }
    
    // Check for TODOs
    if (line.includes('TODO')) {
      issues.push({
        id: generateId(),
        lineNumber,
        message: 'TODO comment found',
        severity: 'info',
        suggestion: 'Consider addressing this TODO before finalizing the code',
      });
    }
    
    // Check for long lines
    if (line.length > 100) {
      issues.push({
        id: generateId(),
        lineNumber,
        message: 'Line exceeds 100 characters',
        severity: 'style',
        suggestion: 'Consider breaking this line into multiple lines for better readability',
      });
    }
    
    // Language-specific checks
    if (language === 'javascript' || language === 'typescript') {
      // Check for non-strict equality
      if (line.includes('==') && !line.includes('===') && !line.includes('!==')) {
        issues.push({
          id: generateId(),
          lineNumber,
          message: 'Using non-strict equality (==)',
          severity: 'warning',
          suggestion: 'Use strict equality (===) for better type safety',
        });
      }
    }

    // Check for empty catch blocks
    if (line.includes('catch') && lines[index + 1]?.includes('{}')) {
      issues.push({
        id: generateId(),
        lineNumber,
        message: 'Empty catch block',
        severity: 'error',
        suggestion: 'Handle errors properly instead of using empty catch blocks',
      });
    }
  });
  
  // Calculate code metrics
  const complexity = calculateComplexity(code);
  const maintainability = calculateMaintainability(code);
  const readability = calculateReadability(code);
  const duplication = calculateDuplication(code);
  const overallScore = calculateOverallScore({ complexity, maintainability, readability, duplication });
  
  const metrics: CodeMetrics = {
    complexity,
    maintainability,
    readability,
    duplication,
    overallScore,
  };
  
  return { issues, metrics };
}

export function exportAsMarkdown(review: ReviewResult): string {
  const { issues, metrics, summary } = review;
  
  let markdown = `# Code Review Summary\n\n`;
  
  markdown += `## Overview\n\n${summary}\n\n`;
  
  markdown += `## Metrics\n\n`;
  markdown += `- Overall Score: ${metrics.overallScore}/100\n`;
  markdown += `- Complexity: ${metrics.complexity}/100\n`;
  markdown += `- Maintainability: ${metrics.maintainability}/100\n`;
  markdown += `- Readability: ${metrics.readability}/100\n`;
  markdown += `- Duplication: ${metrics.duplication}/100\n\n`;
  
  markdown += `## Issues\n\n`;
  
  // Group issues by severity
  const errorIssues = issues.filter(issue => issue.severity === 'error');
  const warningIssues = issues.filter(issue => issue.severity === 'warning');
  const infoIssues = issues.filter(issue => issue.severity === 'info');
  const styleIssues = issues.filter(issue => issue.severity === 'style');
  
  if (errorIssues.length > 0) {
    markdown += `### Errors\n\n`;
    errorIssues.forEach(issue => {
      markdown += `- Line ${issue.lineNumber}: ${issue.message}\n`;
      if (issue.suggestion) {
        markdown += `  - Suggestion: ${issue.suggestion}\n`;
      }
    });
    markdown += `\n`;
  }
  
  if (warningIssues.length > 0) {
    markdown += `### Warnings\n\n`;
    warningIssues.forEach(issue => {
      markdown += `- Line ${issue.lineNumber}: ${issue.message}\n`;
      if (issue.suggestion) {
        markdown += `  - Suggestion: ${issue.suggestion}\n`;
      }
    });
    markdown += `\n`;
  }
  
  if (infoIssues.length > 0) {
    markdown += `### Information\n\n`;
    infoIssues.forEach(issue => {
      markdown += `- Line ${issue.lineNumber}: ${issue.message}\n`;
      if (issue.suggestion) {
        markdown += `  - Suggestion: ${issue.suggestion}\n`;
      }
    });
    markdown += `\n`;
  }
  
  if (styleIssues.length > 0) {
    markdown += `### Style Issues\n\n`;
    styleIssues.forEach(issue => {
      markdown += `- Line ${issue.lineNumber}: ${issue.message}\n`;
      if (issue.suggestion) {
        markdown += `  - Suggestion: ${issue.suggestion}\n`;
      }
    });
    markdown += `\n`;
  }
  
  markdown += `## Date\n\n`;
  markdown += `Generated on ${formatDate(review.createdAt)}\n`;
  
  return markdown;
}

// Function to generate summary based on review results
export function generateSummary(code: string, issues: CodeIssue[], metrics: CodeMetrics): string {
  const totalIssues = issues.length;
  const errorCount = issues.filter(issue => issue.severity === 'error').length;
  const warningCount = issues.filter(issue => issue.severity === 'warning').length;
  const infoCount = issues.filter(issue => issue.severity === 'info').length;
  const styleCount = issues.filter(issue => issue.severity === 'style').length;
  
  let summary = '';
  
  // Overall assessment
  if (metrics.overallScore >= 90) {
    summary += 'This code is of excellent quality. ';
  } else if (metrics.overallScore >= 75) {
    summary += 'This code is of good quality with some minor issues. ';
  } else if (metrics.overallScore >= 50) {
    summary += 'This code has several issues that should be addressed. ';
  } else {
    summary += 'This code has significant quality issues that require attention. ';
  }
  
  // Issues summary
  if (totalIssues === 0) {
    summary += 'No issues were found during the analysis.';
  } else {
    summary += `Found ${totalIssues} issue${totalIssues !== 1 ? 's' : ''}: `;
    const issueCounts = [];
    
    if (errorCount > 0) {
      issueCounts.push(`${errorCount} error${errorCount !== 1 ? 's' : ''}`);
    }
    
    if (warningCount > 0) {
      issueCounts.push(`${warningCount} warning${warningCount !== 1 ? 's' : ''}`);
    }
    
    if (infoCount > 0) {
      issueCounts.push(`${infoCount} info${infoCount !== 1 ? 's' : ''}`);
    }
    
    if (styleCount > 0) {
      issueCounts.push(`${styleCount} style issue${styleCount !== 1 ? 's' : ''}`);
    }
    
    summary += issueCounts.join(', ') + '. ';
  }
  
  // Metrics assessment
  const metricAssessments = [];
  
  if (metrics.complexity < 60) {
    metricAssessments.push('The code is overly complex and could benefit from simplification.');
  }
  
  if (metrics.maintainability < 60) {
    metricAssessments.push('Maintainability could be improved with better documentation and structure.');
  }
  
  if (metrics.readability < 60) {
    metricAssessments.push('Readability is an issue - consider improving formatting and naming.');
  }
  
  if (metrics.duplication < 60) {
    metricAssessments.push('There appears to be code duplication that could be refactored.');
  }
  
  if (metricAssessments.length > 0) {
    summary += metricAssessments.join(' ');
  }
  
  return summary;
}