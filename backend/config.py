import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    PORT = int(os.getenv('PORT', 5000))
    MAX_CODE_LENGTH = 10000
    MODEL_NAME = 'gpt-4o'
    MODEL_TEMPERATURE = 0.6
    MAX_TOKENS = 2000
    REQUEST_TIMEOUT = 30
    
    REVIEW_SYSTEM_PROMPT = """Analyze this code thoroughly and provide feedback on:
- Potential bugs or logical errors
- Security concerns or vulnerabilities
- Performance issues and time complexity
- Code quality and best practices

Format your response in clear markdown with specific examples."""

    @staticmethod
    def validate():
        if not Config.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        return True
