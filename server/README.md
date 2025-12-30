# C1 Chat Backend Server

Backend server for handling C1 API requests from the mobile app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Thesys API key to `.env`:
   - Get your API key from https://console.thesys.dev/keys
   - Update `THESYS_API_KEY` in `.env`

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### POST /api/chat
Send a message and get C1 response.

**Request:**
```json
{
  "message": "Show me a chart of sales data",
  "conversationId": "user123",
  "history": []
}
```

**Response:**
```json
{
  "response": "<C1 DSL response>",
  "conversationId": "user123",
  "messageCount": 2
}
```

### DELETE /api/chat/:conversationId
Clear conversation history for a specific conversation.

### GET /health
Health check endpoint.

## Environment Variables

- `THESYS_API_KEY` - Your Thesys C1 API key (required)
- `PORT` - Server port (default: 3001)
