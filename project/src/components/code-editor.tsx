import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useCodeStore } from '../store/codeStore';
import { useThemeStore } from '../store/themeStore';
import { Language } from '../types';
import { Button } from './ui/button';
import { Select } from './ui/select';
import { 
  Code2, 
  CheckCircle, 
  Save, 
  Trash2, 
  CheckSquare,
  Upload
} from 'lucide-react';

const LANGUAGE_OPTIONS: { label: string; value: Language }[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'PHP', value: 'php' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Rust', value: 'rust' },
];

const LANGUAGE_EXTENSIONS: Record<string, Language> = {
  'js': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  'py': 'python',
  'java': 'java',
  'cs': 'csharp',
  'cpp': 'cpp',
  'go': 'go',
  'rb': 'ruby',
  'php': 'php',
  'swift': 'swift',
  'kt': 'kotlin',
  'rs': 'rust',
};

const CodeEditor: React.FC = () => {
  const { 
    currentCode, 
    currentLanguage, 
    setCurrentCode, 
    setCurrentLanguage, 
    analyzeCurrentCode, 
    saveCodeSnippet,
    clearCurrentCode,
    isAnalyzing,
    getActiveSnippet,
  } = useCodeStore();

  const { theme } = useThemeStore();
  const [snippetName, setSnippetName] = React.useState('');
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set snippet name from active snippet if available
  useEffect(() => {
    const activeSnippet = getActiveSnippet();
    if (activeSnippet) {
      setSnippetName(activeSnippet.name);
    } else {
      setSnippetName('');
    }
  }, [getActiveSnippet]);

  const handleAnalyze = () => {
    if (currentCode.trim().length === 0) return;
    analyzeCurrentCode();
  };

  const handleSave = () => {
    if (snippetName.trim()) {
      saveCodeSnippet(snippetName);
      setIsSaveModalOpen(false);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCurrentCode(value || '');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLanguage(e.target.value as Language);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Get file extension and determine language
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const detectedLanguage = LANGUAGE_EXTENSIONS[extension];
    
    if (detectedLanguage) {
      setCurrentLanguage(detectedLanguage);
    }

    // Set snippet name to file name without extension
    const fileName = file.name.replace(`.${extension}`, '');
    setSnippetName(fileName);

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCurrentCode(content);
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
        <div className="flex items-center space-x-2">
          <Code2 className="h-5 w-5 text-accent-600" />
          <h2 className="text-lg font-medium">Code Editor</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Select 
            value={currentLanguage}
            onChange={handleLanguageChange}
            className="w-32"
          >
            {LANGUAGE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.cpp,.go,.rb,.php,.swift,.kt,.rs"
          />
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Upload className="h-4 w-4" />}
            onClick={triggerFileUpload}
          >
            Upload
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={clearCurrentCode}
          >
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Save className="h-4 w-4" />}
            onClick={() => setIsSaveModalOpen(true)}
          >
            Save
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={currentCode.trim().length === 0}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden relative">
        <Editor
          height="100%"
          language={currentLanguage}
          value={currentCode}
          onChange={handleEditorChange}
          theme={theme.isDarkMode ? 'vs-dark' : 'vs-light'}
          options={{
            minimap: { enabled: false },
            fontSize: theme.fontSize,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            folding: true,
            automaticLayout: true,
          }}
        />

        {/* Empty state */}
        {currentCode.trim().length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-75 pointer-events-none">
            <div className="text-center p-6 rounded-lg max-w-md">
              <Code2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2 text-primary-900">Upload or write code to analyze</h3>
              <p className="text-muted-foreground">
                Upload a file, paste your code, or start writing to get detailed feedback
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-md mx-auto animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">Save Code Snippet</h3>
            <div className="mb-4">
              <label htmlFor="snippet-name" className="block text-sm font-medium mb-1">
                Snippet Name
              </label>
              <input
                type="text"
                id="snippet-name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-600"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                placeholder="Enter a name for this code snippet"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsSaveModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                leftIcon={<CheckSquare className="h-4 w-4" />}
                onClick={handleSave}
                disabled={!snippetName.trim()}
              >
                Save Snippet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;