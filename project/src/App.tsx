import React from 'react';
import Sidebar from './components/sidebar';
import CodeEditor from './components/code-editor';
import ReviewPanel from './components/review-panel';
import { useThemeStore } from './store/themeStore';

function App() {
  const { theme } = useThemeStore();
  
  // Apply dark mode class to the document
  React.useEffect(() => {
    if (theme.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme.isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme.isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Code Editor Section */}
          <div className="flex-1 md:w-1/2 h-[50vh] md:h-screen overflow-hidden border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <CodeEditor />
          </div>
          
          {/* Review Results Section */}
          <div className="flex-1 md:w-1/2 h-[50vh] md:h-screen overflow-auto">
            <ReviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;