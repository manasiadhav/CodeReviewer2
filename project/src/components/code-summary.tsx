import React from 'react';
import { ReviewResult } from '../types';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '../lib/utils';
import { CodeIcon, CalendarIcon } from 'lucide-react';

interface CodeSummaryProps {
  review: ReviewResult;
}

const CodeSummary: React.FC<CodeSummaryProps> = ({ review }) => {
  const { summary, language, createdAt, metrics } = review;

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-500 bg-success-50 dark:bg-success-900/20';
    if (score >= 60) return 'text-accent-500 bg-accent-50 dark:bg-accent-900/20';
    if (score >= 40) return 'text-warning-500 bg-warning-50 dark:bg-warning-900/20';
    return 'text-destructive-500 bg-destructive-50 dark:bg-destructive-900/20';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-1">Code Analysis Summary</h2>
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center gap-1">
              <CodeIcon className="h-4 w-4" />
              <span className="capitalize">{language}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full font-medium ${getOverallScoreColor(metrics.overallScore)}`}>
          {getScoreLabel(metrics.overallScore)} ({metrics.overallScore}/100)
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-card rounded-lg p-4 border shadow-sm">
        <h3 className="font-medium mb-2">Overview</h3>
        <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
          {summary}
        </ReactMarkdown>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Complexity</div>
          <div className="font-medium text-lg">{metrics.complexity}/100</div>
        </div>
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Maintainability</div>
          <div className="font-medium text-lg">{metrics.maintainability}/100</div>
        </div>
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Readability</div>
          <div className="font-medium text-lg">{metrics.readability}/100</div>
        </div>
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Duplication</div>
          <div className="font-medium text-lg">{metrics.duplication}/100</div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-card rounded-lg p-4 border shadow-sm">
        <h3 className="font-medium mb-2">Next Steps</h3>
        <ul className="space-y-2 text-sm">
          {metrics.complexity < 70 && (
            <li className="flex items-start gap-2">
              <span className="text-warning-500">•</span>
              <span>Consider breaking down complex functions into smaller, more manageable pieces</span>
            </li>
          )}
          {metrics.maintainability < 70 && (
            <li className="flex items-start gap-2">
              <span className="text-warning-500">•</span>
              <span>Add more comments explaining the purpose of your code and improve structure</span>
            </li>
          )}
          {metrics.readability < 70 && (
            <li className="flex items-start gap-2">
              <span className="text-warning-500">•</span>
              <span>Improve formatting, use meaningful variable names, and break down long lines</span>
            </li>
          )}
          {metrics.duplication < 70 && (
            <li className="flex items-start gap-2">
              <span className="text-warning-500">•</span>
              <span>Refactor duplicated code into reusable functions or components</span>
            </li>
          )}
          {Object.values(metrics).every(score => score >= 70) && (
            <li className="flex items-start gap-2">
              <span className="text-success-500">•</span>
              <span>Your code looks great! Consider adding more tests or documentation to make it even better</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CodeSummary;