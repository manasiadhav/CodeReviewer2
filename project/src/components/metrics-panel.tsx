import React from 'react';
import { CodeMetrics } from '../types';
import { Progress } from './ui/progress';
import { Tooltip } from './ui/tooltip';
import { 
  Activity, 
  BookOpen, 
  Code2, 
  Copy, 
  HelpCircle 
} from 'lucide-react';

interface MetricsPanelProps {
  metrics: CodeMetrics;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-accent-500';
    if (score >= 40) return 'text-warning-500';
    return 'text-destructive-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success-500';
    if (score >= 60) return 'bg-accent-500';
    if (score >= 40) return 'bg-warning-500';
    return 'bg-destructive-500';
  };

  const renderMetric = (
    title: string, 
    score: number, 
    icon: React.ReactNode, 
    description: string
  ) => (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-accent-600 dark:text-accent-400">
            {icon}
          </span>
          <h3 className="font-medium">{title}</h3>
        </div>
        <Tooltip content={description}>
          <span className="cursor-help text-muted-foreground">
            <HelpCircle className="h-4 w-4" />
          </span>
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Progress 
            value={score} 
            max={100} 
            className="h-2 bg-gray-100 dark:bg-gray-800"
            progressClassName={getProgressColor(score)}
          />
        </div>
        <span className={`text-xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-card rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
        <h2 className="text-lg font-medium mb-3">Overall Score</h2>
        <div className="inline-flex items-center justify-center rounded-full h-32 w-32 border-8 border-gray-100 dark:border-gray-800 mb-4">
          <span className={`text-4xl font-bold ${getScoreColor(metrics.overallScore)}`}>
            {metrics.overallScore}
          </span>
        </div>
        
        <div className="max-w-md mx-auto">
          <p className="text-sm text-muted-foreground mb-4">
            This score represents the overall quality of your code based on the metrics below
          </p>
          
          <Progress 
            value={metrics.overallScore} 
            max={100} 
            className="h-3 bg-gray-100 dark:bg-gray-800"
            progressClassName={getProgressColor(metrics.overallScore)}
          />
        </div>
      </div>
      
      {/* Individual Metrics */}
      <div className="grid md:grid-cols-2 gap-4">
        {renderMetric(
          "Complexity", 
          metrics.complexity, 
          <Activity className="h-5 w-5" />,
          "Measures how complex your code is based on conditionals, nesting, and logic branches"
        )}
        
        {renderMetric(
          "Maintainability", 
          metrics.maintainability, 
          <Code2 className="h-5 w-5" />,
          "Indicates how easy it is to understand and maintain your code"
        )}
        
        {renderMetric(
          "Readability", 
          metrics.readability, 
          <BookOpen className="h-5 w-5" />,
          "Evaluates how readable your code is based on line length and formatting"
        )}
        
        {renderMetric(
          "Duplication", 
          metrics.duplication, 
          <Copy className="h-5 w-5" />,
          "Measures the amount of duplicated code that could be refactored"
        )}
      </div>
      
      {/* Recommendations */}
      <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 border border-accent-100 dark:border-accent-800">
        <h3 className="font-medium text-accent-800 dark:text-accent-300 mb-2">
          Recommendations
        </h3>
        <ul className="space-y-2 text-sm text-accent-700 dark:text-accent-400">
          {metrics.complexity < 70 && (
            <li>• Consider simplifying complex functions and reducing nesting</li>
          )}
          {metrics.maintainability < 70 && (
            <li>• Add more comments and improve code structure</li>
          )}
          {metrics.readability < 70 && (
            <li>• Break long lines of code and improve formatting</li>
          )}
          {metrics.duplication < 70 && (
            <li>• Refactor duplicated code into reusable functions</li>
          )}
          {Object.values(metrics).every(score => score >= 70) && (
            <li>• Great job! Your code quality is good across all metrics</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MetricsPanel;