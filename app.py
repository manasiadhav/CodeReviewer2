from flask import Flask, render_template, request, jsonify
from code_analyzer import CodeAnalyzer
import os

app = Flask(__name__)
analyzer = CodeAnalyzer()

ALLOWED_EXTENSIONS = {'py', 'js', 'cpp','java', 'ts'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_code():
    try:
        if 'code_file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['code_file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            allowed = ", ".join(ALLOWED_EXTENSIONS)
            return jsonify({'error': f'Unsupported file type. Only {allowed} files are supported for analysis.'}), 400


        code_content = file.read().decode('utf-8')
        analysis_result = analyzer.analyze_code(code_content)
        return jsonify(analysis_result)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
