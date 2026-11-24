# WorkplaceAI frontend scaffold (Windows PowerShell)
# Usage:  .\workplaceai-client-setup.ps1
#         .\workplaceai-client-setup.ps1 -Root "D:\some\other\path"

param(
    [string]$Root = "D:\Projects_git\WorkplaceAIcopilot\workplaceai-client"
)

$ErrorActionPreference = "Stop"

# The target folder may already exist (e.g. with a .git folder). That's fine:
# missing folders/files are created, existing files are never overwritten.
if (-not (Test-Path $Root)) { New-Item -ItemType Directory -Path $Root -Force | Out-Null }

# Write text as UTF-8 WITHOUT a BOM (a BOM can break JSON tooling)
function Write-File {
    param([string]$RelPath, [string]$Content)
    $full = Join-Path $Root $RelPath
    if (Test-Path $full) {
        Write-Host "Skipped (already exists): $RelPath" -ForegroundColor Yellow
        return
    }
    $dir = Split-Path $full -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($full, $Content, $utf8)
}

# ---------------------------------------------------------------
# 1. Directories
# ---------------------------------------------------------------
$dirs = @(
    "public",
    "src\app",
    "src\assets",
    "src\components\ui",
    "src\components\layout",
    "src\components\shared",
    "src\features\auth\api",
    "src\features\auth\components",
    "src\features\auth\hooks",
    "src\features\auth\pages",
    "src\features\dashboard",
    "src\features\knowledge",
    "src\features\documents",
    "src\features\training",
    "src\features\workplace",
    "src\features\development",
    "src\hooks",
    "src\lib\api",
    "src\lib\utils",
    "src\types",
    "src\styles",
    "tests"
)

foreach ($d in $dirs) {
    New-Item -ItemType Directory -Path (Join-Path $Root $d) -Force | Out-Null
}

# ---------------------------------------------------------------
# 2. Empty files
# ---------------------------------------------------------------
$emptyFiles = @(
    "public\favicon.ico",
    "src\app\router.tsx",
    "src\app\providers.tsx",
    "src\lib\api\endpoints.ts"
)

foreach ($f in $emptyFiles) {
    Write-File $f ""
}

# ---------------------------------------------------------------
# 3. Starter files
# ---------------------------------------------------------------
Write-File "index.html" @'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WorkplaceAI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
'@

Write-File "src\main.tsx" @'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
'@

Write-File "src\app\App.tsx" @'
export default function App() {
  return <h1>WorkplaceAI</h1>;
}
'@

Write-File "src\lib\api\client.ts" @'
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
'@

Write-File "src\styles\global.css" @'
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
'@

Write-File ".env.example" @'
VITE_API_BASE_URL=http://localhost:8000
'@

Write-File ".gitignore" @'
node_modules
dist
.env
.env.local
*.log
.DS_Store
'@

Write-File "package.json" @'
{
  "name": "workplaceai-client",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
'@

Write-File "tsconfig.json" @'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vite/client"]
  },
  "include": ["src"]
}
'@

Write-File "vite.config.ts" @'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
'@

Write-File "README.md" @'
# WorkplaceAI Client

Frontend for the WorkplaceAI platform (React + TypeScript + Vite).

## Setup

```bash
copy .env.example .env
npm install
npm run dev
```
'@

# ---------------------------------------------------------------
# 4. .gitkeep in every directory that is still empty
# ---------------------------------------------------------------
Get-ChildItem -Path $Root -Recurse -Directory | ForEach-Object {
    if (-not (Get-ChildItem -Path $_.FullName -Force | Select-Object -First 1)) {
        New-Item -ItemType File -Path (Join-Path $_.FullName ".gitkeep") | Out-Null
    }
}

# ---------------------------------------------------------------
# 5. Summary
# ---------------------------------------------------------------
Write-Host ""
Write-Host "Created: $Root" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "  cd `"$Root`""
Write-Host "  npm install react react-dom react-router-dom"
Write-Host "  npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom"
Write-Host "  copy .env.example .env"
Write-Host "  npm run dev"