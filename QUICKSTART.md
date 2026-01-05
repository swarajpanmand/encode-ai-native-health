# Quick Start — C1 Health Copilot

C1 is an AI-native health copilot available as:
- Mobile app
- Chrome extension (Side Panel)

This guide helps you run all parts locally.

---

## 1) Setup Backend Server (Required)

```bash
cd server
cp .env.example .env
```

Add your API key in `.env` (get it from https://console.thesys.dev/keys):

```env
THESYS_API_KEY=your_key_here
```

Start the backend:

```bash
npm install
npm run dev
```

Verify the server is running:

```bash
curl http://localhost:3001/health
```

---

## 2) Run the Chrome Extension (Unpacked)

This project uses an unpacked Chrome extension (no Chrome Web Store required).

Build the extension:

```bash
cd extension
npm install
npm run build
```

The build outputs to:

```text
extension/dist/
```

Load the extension into Chrome:
1. Open Chrome
2. Visit `chrome://extensions`
3. Enable Developer mode (top-right toggle)
4. Click “Load unpacked”
5. Select the folder `extension/dist`

✅ You should now see C1 Health Copilot installed.

How to use the extension:
- Select text on any webpage → right-click → “Ask Health Copilot”
- Right-click a product image → “Ask Health Copilot”
- The Side Panel opens with:
  - Instant health summary
  - Risk badges (high sodium, ultra-processed, etc.)
  - Follow-up actions and chat input

---

## 3) Test the Mobile App

In a new terminal:

```bash
cd client-mobile
npm install
npm run android   # or: npm run ios
```

Emulator/network notes:
- Android Emulator: `http://10.0.2.2:3001/api/chat`
- iOS Simulator: `http://localhost:3001/api/chat`
- Physical Device: `http://192.168.1.XXX:3001/api/chat`

---

## 4) Try C1 Health Copilot

Chrome Extension:
- Analyze ingredient lists
- Analyze product packaging images
- Ask follow-up questions directly in the side panel

Mobile App:
- Full chat experience
- Ingredient explanations
- Health impact summaries

---

## Project Structure

```text
root
├── extension       # load this in chrome://extensions
│   ├── background
│   ├── content
│   ├── sidepanel
│   ├── dist        
│   ├── manifest.json
│   └── package.json
│
├── client-mobile
├── server
└── QUICKSTART.md
```

---

## Troubleshooting

Extension not responding?
- Ensure backend is running on `localhost:3001`
- Reload the extension after restarting the server
- Check extension DevTools → Console

“Network request failed”
- Backend not running
- Wrong API URL
- Firewall blocking localhost

Right-click actions do nothing
- Make sure you loaded `extension/dist`, not `extension/`
- Reload the page after installing the extension
