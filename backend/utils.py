import re
from typing import Optional

def sanitize_code_input(code: str) -> str:
    """Remove potentially harmful characters while preserving code structure."""
    return code.strip()

def estimate_tokens(text: str) -> int:
    """Rough estimation of token count (approximately 4 chars per token)."""
    return len(text) // 4

def validate_code_snippet(code: str, max_length: int) -> Optional[str]:
    """
    Validate code snippet and return error message if invalid.
    Returns None if valid.
    """
    if not code or not code.strip():
        return "Code cannot be empty"
    
    if len(code) > max_length:
        return f"Code exceeds maximum length of {max_length} characters"
    
    return None

def format_error_response(message: str) -> dict:
    """Format error response consistently."""
    return {"error": message}

def format_success_response(review: str) -> dict:
    """Format success response consistently."""
    return {"review": review}
