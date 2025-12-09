import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from config import Config
from utils import validate_code_snippet, format_error_response, format_success_response

Config.validate()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = OpenAI(api_key=Config.OPENAI_API_KEY)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route('/api/review', methods=['POST'])
def review_code():
    try:
        data = request.get_json()
        if not data:
            return jsonify(format_error_response("Invalid request format")), 400
        
        code_snippet = data.get('code', '').strip()
        
        validation_error = validate_code_snippet(code_snippet, Config.MAX_CODE_LENGTH)
        if validation_error:
            return jsonify(format_error_response(validation_error)), 400
        
        logger.info(f"Processing review request (code length: {len(code_snippet)})")
        
        response = client.chat.completions.create(
            model=Config.MODEL_NAME,
            messages=[
                {"role": "system", "content": Config.REVIEW_SYSTEM_PROMPT},
                {"role": "user", "content": code_snippet}
            ],
            temperature=Config.MODEL_TEMPERATURE,
            max_tokens=Config.MAX_TOKENS
        )
        
        review_content = response.choices[0].message.content
        logger.info("Review completed successfully")
        
        return jsonify(format_success_response(review_content)), 200
    
    except Exception as e:
        logger.error(f"Error during review: {str(e)}")
        return jsonify(format_error_response(
            "Failed to process review. Please try again."
        )), 500

if __name__ == '__main__':
    debug_mode = Config.FLASK_ENV == 'development'
    app.run(host='0.0.0.0', port=Config.PORT, debug=debug_mode)