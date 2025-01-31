AI-Powered Code Reviewer
Welcome to the AI-Powered Code Review Bot! This simple yet powerful web application allows you to upload your code files, analyze them using advanced AI models, and receive a quality score along with detailed suggestions for improvement. The bot evaluates your code for various factors such as efficiency, readability, security, complexity, and error handling to help you improve your coding skills.

Features:-

File Upload System: Upload Python, JavaScript, or C++ files for analysis.

AI Code Analysis: The AI model evaluates your code on:

Efficiency: Checks for optimized loops, best practices, and data structure choices.

Readability: Ensures proper indentation, comments, and meaningful variable names.

Security: Detects vulnerabilities like hardcoded credentials and SQL injection risks.

Code Length & Complexity: Reviews code for redundancy, clean structure, and simplicity.

Error Handling: Verifies the presence of proper error handling (e.g., try-except).

Score Calculation: Assigns a score between 0 and 100 based on the quality of your code.

AI-Suggested Fixes: If your code has a low score, the AI will give you suggestions.

Score Breakdown: View detailed scores for different aspects of your code (e.g., Efficiency: 85, Readability: 92).

Minimalistic UI: The frontend uses basic HTML, CSS, and JavaScript, making it easy to use and lightweight.

Fast Backend: Built with Flask, leveraging the OpenAI API  for code analysis.


Tech Stack:-


Frontend: HTML, CSS, JavaScript (Simple UI, no heavy frameworks).

Backend: Flask (Python) – Provides a simple REST API to handle code file uploads and interactions.

AI Integration: OpenAI API  – Used to analyze the code and generate suggestions.

Project is deployed on Vercel.
