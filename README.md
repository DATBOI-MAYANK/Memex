# Memex 🧠

### *Your second brain — save anything, find everything.*

Memex is a personal knowledge base that lets you save anything from the internet — articles, tweets, videos, PDFs — and automatically organizes it using AI. Stop losing things you saved. 

---

## What it does

You save. Memex thinks.

Every time you save something, Memex automatically generates tags, creates a semantic embedding, and links it to related items in your knowledge base. When you search, you don't need exact words — just describe what you remember and Memex finds it.

---

## Features

- **One-click save** — Browser extension to save any webpage instantly
- **AI tagging** — Automatic tags generated for every saved item
- **Semantic search** — Search by meaning, not just keywords
- **Memory resurfacing** — Rediscover things you saved months ago

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL + pgvector) |
| AI | Google Gemini API |
| Browser Extension | Chrome Manifest V3 |
| Deploy | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Google Gemini API key

### Installation

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/memex.git
cd memex
```

**2. Setup backend**
```bash
cd server
npm install
```

Create `server/.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

**3. Setup frontend**
```bash
cd client
npm install
```

Create `client/.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**4. Setup Supabase**

Run this in Supabase SQL Editor:
```sql
create extension if not exists vector;

create table items (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  url text,
  title text not null,
  content_text text,
  type text check (type in ('article', 'tweet', 'image', 'video', 'pdf', 'note')),
  tags text[] default '{}',
  embedding vector(768),
  created_at timestamptz default now()
);

create table collections (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  name text not null,
  created_at timestamptz default now()
);

create table collection_items (
  collection_id uuid references collections(id) on delete cascade,
  item_id uuid references items(id) on delete cascade,
  primary key (collection_id, item_id)
);
```

**5. Run the app**

Terminal 1 (backend):
```bash
cd server
node index.js
```

Terminal 2 (frontend):
```bash
cd client
npm run dev
```

Open `http://localhost:5173`

### Browser Extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `memex-extension` folder

---

## Project Structure

```
memex/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Collections.jsx
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   └── App.jsx
│   └── .env
├── server/                 #  backend
│   ├── lib/
│   │   ├── supabase.js
│   │   └── ai.js
│   ├── index.js
│   └── .env
└── memex-extension/        # Chrome extension
    ├── manifest.json
    ├── popup.html
    └── popup.js
```

---



## License

MIT
