# PUBLIC_URL Configuration Guide

## What is PUBLIC_URL?

`PUBLIC_URL` tells Create React App (CRA) and the browser where static assets (images, videos, fonts, etc.) are located. It's used by React to construct paths like `/assets/images/find-trails.mp4`.

## Where to Set PUBLIC_URL

### 1. **For Heroku Deployment (Production)**

The `PUBLIC_URL` is already set in your `Dockerfile`:
```dockerfile
ENV PUBLIC_URL=https://trailsoftears-88ffdf9f4a82.herokuapp.com/
```

**If you need to change it**, update the Dockerfile line (e.g., if you get a custom domain):
```dockerfile
ENV PUBLIC_URL=https://your-custom-domain.com/
```

Then rebuild and push:
```bash
docker build -f Dockerfile -t trails_app:local .
docker tag trails_app:local registry.heroku.com/trailsoftears/web:latest
docker push registry.heroku.com/trailsoftears/web:latest
heroku container:release web -a trailsoftears
```

### 2. **For Local Development**

In your `.env` file (create it from `.env.example`), set:
```bash
PUBLIC_URL=http://localhost:3000
```

Then run the React dev server:
```bash
cd react-app
npm start
```
CRA will use this PUBLIC_URL for asset paths.

### 3. **In Flask Backend (if needed)**

No changes needed in `app/__init__.py` or `app/config.py`. Flask automatically serves the built React app and static assets from `app/static/` at the root path `/`.

## How It Works

1. During Docker build, `npm run build` uses `PUBLIC_URL` to set the base path for all static assets in the React bundle.
2. When the browser loads `/assets/images/find-trails.mp4`, it resolves to `https://trailsoftears-88ffdf9f4a82.herokuapp.com/assets/images/find-trails.mp4`.
3. Flask serves this file from `app/static/assets/images/find-trails.mp4` (because `static_url_path=''` in `Flask(__name__, static_folder='static', static_url_path='')`).

## Current Values

- **Heroku Production**: `https://trailsoftears-88ffdf9f4a82.herokuapp.com/`
- **Local Development**: `http://localhost:3000` (or `http://localhost:5000` if using Flask dev server)
