from flask import Flask, render_template, request, jsonify
from code_analyzer import CodeAnalyzer
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# Initialize without API key first
analyzer = CodeAnalyzer(api_key=None)

ALLOWED_EXTENSIONS = {'py', 'js', 'cpp'}

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
            return jsonify({'error': 'Invalid file type'}), 400

        code_content = file.read().decode('utf-8')
        
        # For testing without API key
        mock_result = {
            'total_score': 85,
            'breakdown': {
                'efficiency': 90,
                'readability': 85,
                'security': 80,
                'complexity': 85,
                'error_handling': 85
            },
            'suggestions': [
                'Consider adding more comments',
                'Optimize the nested loops',
                'Add input validation'
            ]
        }
        return jsonify(mock_result)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
