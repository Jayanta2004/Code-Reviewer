# 🔍 Code Review Assistant

A production-ready AI-powered code review tool that provides instant feedback on code quality, security vulnerabilities, and performance issues.

## ✨ Features

- **Real-time Analysis** - Instant code review using GPT-4
- **Security Scanning** - Detect vulnerabilities and security issues
- **Performance Analysis** - Time complexity and optimization suggestions
- **Modern UI** - Clean, responsive design with glassmorphic effects
- **Multi-language Support** - Works with Python, JavaScript, TypeScript, and more
- **Rate Limiting** - Built-in protection against abuse
- **Production Ready** - Docker support and deployment configurations

## 🚀 Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Custom API client

**Backend:**
- Flask 3.0
- OpenAI GPT-4
- Gunicorn (Production server)
- Rate limiting middleware
- Comprehensive logging

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- OpenAI API key
- Docker (optional, for containerized deployment)

## 🛠️ Development Setup

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Run development server
python app.py
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Setup environment (optional)
cp .env.local.example .env.local

# Run development server
npm run dev
```

Access the application at `http://localhost:3000`

## 🐳 Production Deployment

### Using Docker Compose

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d
```

### Manual Production Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Configure production environment variables
gunicorn --bind 0.0.0.0:5000 --workers 4 wsgi:app
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
npm start
```

## 📡 API Documentation

### POST `/api/review`
Analyze code and get review feedback.

**Request:**
```json
{
  "code": "def hello():\n    print('Hello World')"
}
```

**Response:**
```json
{
  "review": "## Code Review\n\n### Summary\nThe code looks good..."
}
```

**Rate Limits:** 10 requests per minute per IP

### GET `/api/health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy"
}
```

## ⚙️ Configuration

### Environment Variables

**Backend (.env):**
```env
OPENAI_API_KEY=sk-...
FLASK_ENV=production
PORT=5000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🔒 Security Features

- Rate limiting (10 requests/minute per IP)
- Input validation and sanitization
- CORS configuration
- Environment variable validation
- Error handling without information leakage

## 📊 Monitoring

- Structured logging with timestamps
- Health check endpoint
- Request/response tracking
- Error monitoring

## 🚀 Performance

- Optimized Docker images
- Next.js standalone output
- Gunicorn with multiple workers
- Request timeout handling
- Efficient API client with proper error handling

## 📝 Usage

1. **Paste Code** - Enter your code in the left panel
2. **Analyze** - Click "Analyze Code" or press `Ctrl+Enter`
3. **Review Results** - Get instant feedback on:
   - Bugs and logical errors
   - Security vulnerabilities
   - Performance issues
   - Code quality improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the health endpoint: `/api/health`
- Review logs for error details
- Ensure OpenAI API key is valid
- Verify environment configuration
