class CodeAnalyzer:
    def __init__(self, api_key=None):
        self.api_key = api_key

    def analyze_code(self, code):
        # Analyze efficiency
        efficiency_score = self._analyze_efficiency(code)
        
        # Analyze readability
        readability_score = self._analyze_readability(code)
        
        # Analyze security
        security_score = self._analyze_security(code)
        
        # Analyze complexity
        complexity_score = self._analyze_complexity(code)
        
        # Analyze error handling
        error_handling_score = self._analyze_error_handling(code)
        
        # Calculate total score
        total_score = (efficiency_score + readability_score + security_score + 
                      complexity_score + error_handling_score) / 5
        
        return {
            'total_score': round(total_score),
            'breakdown': {
                'efficiency': efficiency_score,
                'readability': readability_score,
                'security': security_score,
                'complexity': complexity_score,
                'error_handling': error_handling_score
            },
            'suggestions': self._generate_suggestions(code)
        }

    def _analyze_efficiency(self, code):
        score = 100
        
        # Check for nested loops
        if 'for' in code and code.count('for') > 1:
            score -= 10
            
        # Check for large data structures
        if 'list' in code or 'dict' in code:
            score -= 5
            
        # Check for inefficient string concatenation
        if '+=' in code and ("'" in code or '"' in code):
            score -= 5
            
        return max(0, min(100, score))

    def _analyze_readability(self, code):
        score = 100
        
        # Check for comments
        if code.count('#') < 3:
            score -= 15
            
        # Check for meaningful variable names
        if any(var in code for var in ['x', 'y', 'z', 'a', 'b', 'c']):
            score -= 10
            
        # Check for proper indentation
        if '    ' not in code:
            score -= 20
            
        return max(0, min(100, score))

    def _analyze_security(self, code):
        score = 100
        
        # Check for hardcoded credentials
        if 'password' in code.lower() or 'secret' in code.lower():
            score -= 30
            
        # Check for SQL injection vulnerabilities
        if 'execute' in code and '%s' in code:
            score -= 25
            
        # Check for file operations without proper checks
        if 'open(' in code and 'try' not in code:
            score -= 15
            
        return max(0, min(100, score))

    def _analyze_complexity(self, code):
        score = 100
        
        # Check cyclomatic complexity
        if code.count('if') > 5:
            score -= 15
            
        # Check function length
        if code.count('\n') > 50:
            score -= 20
            
        # Check for nested conditions
        if code.count('    if') > 2:
            score -= 10
            
        return max(0, min(100, score))

    def _analyze_error_handling(self, code):
        score = 100
        
        # Check for try-except blocks
        if 'try' not in code:
            score -= 25
            
        # Check for specific exceptions
        if 'except:' in code and 'except ' not in code:
            score -= 15
            
        # Check for error messages
        if 'raise' in code and 'Exception(' not in code:
            score -= 10
            
        return max(0, min(100, score))

    def _generate_suggestions(self, code):
        suggestions = []
        
        # Efficiency suggestions
        if 'for' in code and code.count('for') > 1:
            suggestions.append('Consider using list comprehension or map() instead of nested loops')
        if '+=' in code and ("'" in code or '"' in code):
            suggestions.append('Use join() method for string concatenation instead of += operator')
            
        # Readability suggestions
        if code.count('#') < 3:
            suggestions.append('Add more comments to explain complex logic')
        if any(var in code for var in ['x', 'y', 'z', 'a', 'b', 'c']):
            suggestions.append('Use descriptive variable names instead of single letters')
            
        # Security suggestions
        if 'password' in code.lower() or 'secret' in code.lower():
            suggestions.append('Avoid hardcoding sensitive information, use environment variables')
        if 'execute' in code and '%s' in code:
            suggestions.append('Use parameterized queries to prevent SQL injection')
            
        # Complexity suggestions
        if code.count('if') > 5:
            suggestions.append('Consider breaking down complex conditions into smaller functions')
        if code.count('\n') > 50:
            suggestions.append('Break long functions into smaller, more manageable pieces')
            
        # Error handling suggestions
        if 'try' not in code:
            suggestions.append('Add try-except blocks to handle potential errors')
        if 'except:' in code and 'except ' not in code:
            suggestions.append('Catch specific exceptions instead of using bare except clauses')
            
        return suggestions
