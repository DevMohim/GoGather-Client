# GoGather

**🌐 Live Site: [https://go-gather-devx.vercel.app](https://go-gather-devx.vercel.app)**

GoGather is a modern **social events management platform** where anyone can create, discover, and join events — from workshops and meetups to conferences. Publish an event in minutes, reserve your spot with one click, and keep track of everything you host or attend, all in one place.

## ✨ Key Features

- **Create events in minutes** — Add a title, date, venue, thumbnail, category, and description, then publish your event for everyone to see (with date validation so past dates can't be selected).
- **One-click joining** — Find an event you like and join with a single click; it's saved to your "Joined Events" list so you never lose track of it.
- **See who is attending** — Every event displays the organizer's profile and a live list of attendees, so you know what's popular before you go.
- **Manage your own events** — Edit details or delete events you created from a dedicated dashboard that keeps your upcoming events sorted by date.
- **Discover & filter upcoming events** — Browse all upcoming events sorted by date and filter them by event type (workshops, meetups, conferences, and more).
- **Secure authentication** — Sign up or log in with email/password or Google via better-auth, and personalize your account with an editable display name and avatar.
- **Dark & light mode** — A theme toggle across the whole app with a green-tinted dark palette, plus a fully responsive layout for mobile, tablet, and desktop.

## 🛠 Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19, TypeScript) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), custom design tokens |
| Auth | [better-auth](https://better-auth.com) (email/password + Google OAuth) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Backend | [Express](https://expressjs.com) 5 + MongoDB, JWT-protected routes (`jose`) |
| UX | react-hot-toast, lucide-react, embla carousel, Inter & Space Grotesk fonts |

## 📁 Project Structure

```
gogather-client/        # This repo — Next.js frontend
├── src/
│   ├── app/            # App Router pages (home, events, auth, profile)
│   ├── components/     # UI primitives (shadcn), layout, shared & home sections
│   ├── lib/            # Auth client/server helpers, utilities
│   └── assets/         # Images & logos
└── public/             # Static assets

gogather-server/        # REST API — https://github.com/DevMohim/GoGather-Server
└── server.js           # Express + MongoDB server
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+
- A MongoDB database (local or Atlas)
- The [GoGather server](https://github.com/DevMohim/GoGather-Server) running locally (default: `http://localhost:5000`)

### Installation

```bash
git clone https://github.com/DevMohim/GoGather-Client.git
cd GoGather-Client
npm install
```

### Environment Variables

Create a `.env` file in the project root:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the GoGather API (e.g. `http://localhost:5000`) |
| `BETTER_AUTH_URL` | Base URL of this app (e.g. `http://localhost:3000`) |
| `BETTER_AUTH_SECRET` | Secret used by better-auth to sign sessions |
| `MONGO_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔗 Related Repositories

- **Frontend:** [DevMohim/GoGather-Client](https://github.com/DevMohim/GoGather-Client)
- **Backend API:** [DevMohim/GoGather-Server](https://github.com/DevMohim/GoGather-Server)
