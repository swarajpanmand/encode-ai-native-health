# Quick Start Guide - C1 Chat

## 🚀 Get Started in 3 Steps

### Step 1: Setup Backend Server

```bash
cd server
cp .env.example .env
```

Edit `.env` and add your API key from https://console.thesys.dev/keys:
```env
THESYS_API_KEY=your_key_here
```

Start server:
```bash
npm run dev
```

### Step 2: Test the Mobile App

In a new terminal:
```bash
cd client-mobile
npm run android  # or npm run ios
```

### Step 3: Chat!

1. Type a message in the input field
2. Press Send
3. Watch C1 generate a response!

---

## 📱 What You'll See

- **Home Screen**: Full chat interface
- **Input**: Text field at bottom with Send button
- **Messages**: User messages (blue, right) and AI messages (left, with 🤖)
- **Loading**: Typing indicator while waiting for response

---

## ⚠️ Important Notes

### For Android Emulator
Update `API_URL` in `client-mobile/hooks/useC1Chat.ts`:
```typescript
const API_URL = 'http://10.0.2.2:3001/api/chat';
```

### For iOS Simulator
Default `localhost:3001` should work fine.

### For Physical Device
Use your computer's IP address:
```typescript
const API_URL = 'http://192.168.1.XXX:3001/api/chat';
```

---

## 🔍 Troubleshooting

**"Network request failed"**
- Ensure backend server is running
- Check API_URL matches your setup
- Verify firewall allows connections

**"No response from server"**
- Check backend logs for errors
- Verify API key is valid
- Test health endpoint: `curl http://localhost:3001/health`

---

## 📚 Full Documentation

See [walkthrough.md](file:///home/swaraj31/.gemini/antigravity/brain/03243d45-f519-4ac3-9365-0ebd966f3cba/walkthrough.md) for complete setup guide, testing checklist, and enhancement ideas.
