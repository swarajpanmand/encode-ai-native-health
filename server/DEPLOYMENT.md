# Deploying C1 Chat Server to Render

## Quick Setup

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add C1 chat server"
   git push
   ```

2. **Create a new Web Service on Render**
   - Go to https://render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `encode-ai-native-health` repository

3. **Configure the service:**
   - **Name**: `c1-chat-server` (or your preferred name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preferred plan)

4. **Add Environment Variables:**
   - Click "Environment" tab
   - Add: `THESYS_API_KEY` = `your_api_key_from_thesys`
   - Add: `PORT` = `3001` (optional, Render will set this automatically)

5. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the deployed URL (e.g., `https://c1-chat-server.onrender.com`)

## Update Mobile App

After deployment, update the API URL in your mobile app:

**File**: `client-mobile/hooks/useC1Chat.ts`

```typescript
const API_URL = 'https://your-app-name.onrender.com/api/chat';
```

Replace `your-app-name` with your actual Render service name.

## Testing

Test your deployed server:
```bash
curl https://your-app-name.onrender.com/health
```

Should return:
```json
{"status":"ok","message":"C1 Chat Server is running"}
```

## Important Notes

- **Free tier**: Render's free tier spins down after 15 minutes of inactivity
- **First request**: May take 30-60 seconds to wake up
- **CORS**: Already configured to allow all origins (`*`)
- **Environment variables**: Make sure to set `THESYS_API_KEY` in Render dashboard

## Troubleshooting

**Build fails:**
- Check that `package.json` has the `build` script
- Verify Node.js version compatibility

**Server doesn't start:**
- Check environment variables are set
- Review Render logs for errors

**API calls fail:**
- Verify CORS settings
- Check that API key is valid
- Ensure mobile app uses HTTPS URL
