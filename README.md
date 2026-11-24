# WorkMind Client

A lightweight WorkMind AI chat frontend. No login, registration, or admin screens.

## Requirements
- Node.js 18 or newer
- npm
- WorkMind FastAPI backend running

## Local development

From this directory:

```bash
npm install
npm run dev
```

Open http://localhost:5173.

The Vite development server proxies `/api/*` to `http://127.0.0.1:8001` by default.
If your local backend uses another address, set `VITE_DEV_API_TARGET` in your environment.

## Production build

```bash
npm install
npm run build
```

The production files are written to `dist/`.

In Stage/Live, the frontend calls `/api/v1/chat` on the same host. This relies on the existing
web-server `/api/` reverse proxy to the FastAPI backend. No backend files or configuration
are included in this package.

## API contract used by this client

Request:

```json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

Expected successful response:

```json
{
  "response": "Hello! How can I help?",
  "model": "optional-model-name"
}
```

Errors may return a JSON `detail` or `message` field.
