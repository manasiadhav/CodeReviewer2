import React, { useState } from 'react';
import { CodeIssue, IssueSeverity } from '../types';
import { getSeverityColor, getSeverityBgColor } from '../lib/utils';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Paintbrush, 
  Filter
} from 'lucide-react';
import { Button } from './ui/button';

interface IssuesListProps {
  issues: CodeIssue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<IssueSeverity | 'all'>('all');
  
  const severityCount = {
    error: issues.filter(issue => issue.severity === 'error').length,
    warning: issues.filter(issue => issue.severity === 'warning').length,
    info: issues.filter(issue => issue.severity === 'info').length,
    style: issues.filter(issue => issue.severity === 'style').length,
  };
  
  const filteredIssues = selectedSeverity === 'all' 
    ? issues 
    : issues.filter(issue => issue.severity === selectedSeverity);

  const getSeverityIcon = (severity: IssueSeverity) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-accent-500" />;
      case 'style':
        return <Paintbrush className="h-4 w-4 text-primary-500" />;
    }
  };

  const getSeverityLabel = (severity: IssueSeverity) => {
    switch (severity) {
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      case 'style':
        return 'Style';
    }
  };

  if (issues.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="rounded-full bg-success-100 dark:bg-success-900/20 p-3 flex items-center justify-center w-12 h-12 mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-success-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No issues found</h3>
          <p className="text-muted-foreground">
            Great job! Your code looks clean and no issues were detected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filter bar */}
      <div className="bg-card border-b px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Button
          variant={selectedSeverity === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedSeverity('all')}
        >
          All ({issues.length})
        </Button>
        <Button
          variant={selectedSeverity === 'error' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedSeverity('error')}
        >
          Errors ({severityCount.error})
        </Button>
        <Button
          variant={selectedSeverity === 'warning' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedSeverity('warning')}
        >
          Warnings ({severityCount.warning})
        </Button>
        <Button
          variant={selectedSeverity === 'info' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedSeverity('info')}
        >
          Info ({severityCount.info})
        </Button>
        <Button
          variant={selectedSeverity === 'style' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedSeverity('style')}
        >
          Style ({severityCount.style})
        </Button>
      </div>

      {/* Issues list */}
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredIssues.map((issue) => (
            <li 
              key={issue.id} 
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  {getSeverityIcon(issue.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityBgColor(issue.severity)} ${getSeverityColor(issue.severity)}`}>
                      {getSeverityLabel(issue.severity)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Line {issue.lineNumber}
                    </span>
                  </div>
                  <p className="font-medium mb-1">{issue.message}</p>
                  {issue.suggestion && (
                    <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IssuesList;