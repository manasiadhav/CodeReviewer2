import React from 'react';
import { useCodeStore } from '../store/codeStore';
import MetricsPanel from './metrics-panel';
import IssuesList from './issues-list';
import CodeSummary from './code-summary';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { AlertCircle, BarChart2, FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import { exportAsMarkdown } from '../lib/utils';

const ReviewPanel: React.FC = () => {
  const { getActiveReview } = useCodeStore();
  const activeReview = getActiveReview();

  // No active review
  if (!activeReview) {
    return (
      <div className="h-full flex items-center justify-center bg-card">
        <div className="max-w-md text-center p-6">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2 text-primary-900 dark:text-primary-100">No code analysis yet</h3>
          <p className="text-muted-foreground mb-4">
            Click the "Analyze Code" button in the editor to get feedback on your code
          </p>
        </div>
      </div>
    );
  }

  const handleExportMarkdown = () => {
    if (!activeReview) return;
    
    const markdown = exportAsMarkdown(activeReview);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-review-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
        <h2 className="text-lg font-medium">Code Analysis</h2>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}
          onClick={handleExportMarkdown}
        >
          Export
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="flex-1 flex flex-col">
        <TabsList className="border-b bg-card">
          <TabsTrigger value="summary" icon={<FileText className="h-4 w-4" />}>
            Summary
          </TabsTrigger>
          <TabsTrigger value="issues" icon={<AlertCircle className="h-4 w-4" />}>
            Issues ({activeReview.issues.length})
          </TabsTrigger>
          <TabsTrigger value="metrics" icon={<BarChart2 className="h-4 w-4" />}>
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="flex-1 p-4 overflow-auto">
          <CodeSummary review={activeReview} />
        </TabsContent>

        <TabsContent value="issues" className="flex-1 overflow-auto">
          <IssuesList issues={activeReview.issues} />
        </TabsContent>

        <TabsContent value="metrics" className="flex-1 p-4 overflow-auto">
          <MetricsPanel metrics={activeReview.metrics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewPanel;