import { create } from 'zustand';
import { 
  CodeSnippet, 
  ReviewResult, 
  Language, 
  CodeIssue, 
  CodeMetrics 
} from '../types';
import { 
  generateId, 
  analyzeCode, 
  generateSummary 
} from '../lib/utils';

interface CodeStore {
  // Current code state
  currentCode: string;
  currentLanguage: Language;
  isAnalyzing: boolean;
  
  // Snippets and reviews
  codeSnippets: CodeSnippet[];
  reviewResults: ReviewResult[];
  
  // Active items
  activeSnippetId: string | null;
  activeReviewId: string | null;
  
  // Actions
  setCurrentCode: (code: string) => void;
  setCurrentLanguage: (language: Language) => void;
  analyzeCurrentCode: () => void;
  saveCodeSnippet: (name: string) => void;
  loadCodeSnippet: (id: string) => void;
  deleteCodeSnippet: (id: string) => void;
  clearCurrentCode: () => void;
  
  // Get active items
  getActiveSnippet: () => CodeSnippet | null;
  getActiveReview: () => ReviewResult | null;
}

export const useCodeStore = create<CodeStore>((set, get) => ({
  // Initial state
  currentCode: '',
  currentLanguage: 'javascript',
  isAnalyzing: false,
  codeSnippets: [],
  reviewResults: [],
  activeSnippetId: null,
  activeReviewId: null,
  
  // Actions
  setCurrentCode: (code) => set({ currentCode: code }),
  
  setCurrentLanguage: (language) => set({ currentLanguage: language }),
  
  analyzeCurrentCode: async () => {
    const { currentCode, currentLanguage, activeSnippetId } = get();
    
    if (!currentCode.trim()) {
      return; // Don't analyze empty code
    }
    
    set({ isAnalyzing: true });
    
    // Simulate delay for analysis (would be replaced with actual API call in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const { issues, metrics } = analyzeCode(currentCode, currentLanguage);
    const summary = generateSummary(currentCode, issues, metrics);
    
    const newReview: ReviewResult = {
      id: generateId(),
      codeSnippetId: activeSnippetId || 'unsaved',
      language: currentLanguage,
      issues,
      summary,
      metrics,
      createdAt: new Date(),
    };
    
    set((state) => ({
      reviewResults: [newReview, ...state.reviewResults],
      activeReviewId: newReview.id,
      isAnalyzing: false,
    }));
  },
  
  saveCodeSnippet: (name) => {
    const { currentCode, currentLanguage, activeSnippetId } = get();
    
    if (!currentCode.trim()) {
      return; // Don't save empty code
    }
    
    // If we're updating an existing snippet
    if (activeSnippetId) {
      set((state) => ({
        codeSnippets: state.codeSnippets.map((snippet) =>
          snippet.id === activeSnippetId
            ? { ...snippet, code: currentCode, language: currentLanguage }
            : snippet
        ),
      }));
      return;
    }
    
    // Otherwise create a new snippet
    const newSnippet: CodeSnippet = {
      id: generateId(),
      name,
      language: currentLanguage,
      code: currentCode,
      createdAt: new Date(),
    };
    
    set((state) => ({
      codeSnippets: [newSnippet, ...state.codeSnippets],
      activeSnippetId: newSnippet.id,
    }));
  },
  
  loadCodeSnippet: (id) => {
    const snippet = get().codeSnippets.find((s) => s.id === id);
    
    if (snippet) {
      set({
        currentCode: snippet.code,
        currentLanguage: snippet.language,
        activeSnippetId: snippet.id,
      });
    }
  },
  
  deleteCodeSnippet: (id) => {
    const { activeSnippetId } = get();
    
    set((state) => ({
      codeSnippets: state.codeSnippets.filter((snippet) => snippet.id !== id),
      reviewResults: state.reviewResults.filter((review) => review.codeSnippetId !== id),
      activeSnippetId: activeSnippetId === id ? null : activeSnippetId,
      currentCode: activeSnippetId === id ? '' : state.currentCode,
    }));
  },
  
  clearCurrentCode: () => {
    set({
      currentCode: '',
      activeSnippetId: null,
    });
  },
  
  // Getters
  getActiveSnippet: () => {
    const { codeSnippets, activeSnippetId } = get();
    
    if (!activeSnippetId) return null;
    
    return codeSnippets.find((snippet) => snippet.id === activeSnippetId) || null;
  },
  
  getActiveReview: () => {
    const { reviewResults, activeReviewId } = get();
    
    if (!activeReviewId) return null;
    
    return reviewResults.find((review) => review.id === activeReviewId) || null;
  },
}));