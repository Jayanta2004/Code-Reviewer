# Code Review Assistant

An AI-powered code review tool that provides instant feedback on code quality, security vulnerabilities, and performance issues.

## Features

- Real-time code analysis using GPT-4
- Security vulnerability detection
- Performance and complexity analysis
- Clean, modern UI with dark mode
- Support for multiple programming languages

## Tech Stack

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios

**Backend:**
- Flask
- OpenAI API
- Python 3.x

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_api_key_here
```

6. Run the server:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Paste your code into the left panel
3. Click "Analyze Code" or press `Ctrl+Enter`
4. View the AI-generated review in the right panel

## API Endpoints

### `POST /api/review`

Analyzes the provided code and returns a review.

**Request Body:**
```json
{
  "code": "your code here"
}
```

**Response:**
```json
{
  "review": "markdown formatted review"
}
```

### `GET /api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## Configuration

### Backend Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `FLASK_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5000)

### Frontend Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://127.0.0.1:5000)

## License

MIT
