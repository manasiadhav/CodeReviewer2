import React, { useState } from 'react';
import { useCodeStore } from '../store/codeStore';
import { useThemeStore } from '../store/themeStore';
import { CodeSnippet } from '../types';
import { Button } from './ui/button';
import { formatDate } from '../lib/utils';
import {
  Menu,
  X,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  History,
  Code,
  Trash2,
  ArrowRight,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { 
    codeSnippets, 
    loadCodeSnippet, 
    deleteCodeSnippet, 
    activeSnippetId 
  } = useCodeStore();
  
  const { 
    theme, 
    toggleDarkMode, 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize 
  } = useThemeStore();
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-card shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-10 h-full w-64 bg-card border-r shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center">
                <Code className="h-5 w-5 mr-2 text-accent-600" />
                CodeReviewer
              </h2>
              <button
                className="md:hidden"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Settings */}
          <div className="p-4 border-b space-y-2">
            <h3 className="text-sm font-medium mb-3">Settings</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label={theme.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme.isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Font Size: {theme.fontSize}px</span>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseFontSize}
                  aria-label="Decrease font size"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseFontSize}
                  aria-label="Increase font size"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Saved Snippets */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium flex items-center">
                <History className="h-4 w-4 mr-2 text-muted-foreground" />
                Saved Snippets
              </h3>
            </div>
            
            {codeSnippets.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-xs text-muted-foreground">
                  No saved snippets yet
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {codeSnippets.map((snippet: CodeSnippet) => (
                  <li
                    key={snippet.id}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      activeSnippetId === snippet.id
                        ? 'bg-accent-100 dark:bg-accent-900/20'
                        : 'hover:bg-secondary cursor-pointer'
                    }`}
                  >
                    <div 
                      className="flex items-center justify-between"
                      onClick={() => loadCodeSnippet(snippet.id)}
                    >
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-medium truncate">
                          {snippet.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {snippet.language} · {formatDate(snippet.createdAt)}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this snippet?')) {
                              deleteCodeSnippet(snippet.id);
                            }
                          }}
                          aria-label={`Delete ${snippet.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => loadCodeSnippet(snippet.id)}
                          aria-label={`Load ${snippet.name}`}
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 text-xs text-center text-muted-foreground border-t">
            <p>© 2025 CodeReviewer</p>
            <p>Version 0.1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;