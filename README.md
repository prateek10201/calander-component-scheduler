# Spur Scheduler

[Demo - Find the Scheduler here](https://spur-test-scheduler.vercel.app/)

- A Test Suite Scheduler built for predefined test suites, allowing you to schedule test when ever you want.

- Simple to use, no code scheduler.

## Getting Started

This is a Next.js project integrated with Supabase. Follow the instructions below to set up and run the project.

## Environment Variables

Create a `.env.local` file in the root directory of your project and add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Replace `<your-supabase-url>` and `<your-supabase-anon-key>` with the credentials from your Supabase dashboard.

## Prerequisites

- Node.js (version 19 or higher recommended)
- npm
- Supabase account
- NextJS

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/prateek10201/spur-scheduler.git

   git checkout develop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root of the project as described in the **Environment Variables** section.

4. Initialize Supabase:

   Ensure you have a Supabase project set up. You can do this by logging into the [Supabase dashboard](https://app.supabase.io) and creating a new project. Add the relevant database schema required for this project.

## Running the Project

To start the development server, run:

```bash
npm run dev
```

This starts the server on `http://localhost:3000` by default.

## Build and Deployment

To build the project for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```plaintext
├── components/      # React components
├── app/             # Next.js pages
├── lib/             # Utility Functions
├── utils/           # Supabase Utility functions
├── .env.local       # Environment variables
└── hooks/           # Component hooks
```

## Troubleshooting

- Ensure your `.env.local` file contains the correct Supabase URL and keys.
- Check that your Supabase instance is running and accessible.
- Use the browser console or server logs to debug issues.

## To Be Implemented

- Cron job support.
- Fetching Test Suites from UpStream Systems dynamically.
- Implementing List view.
- Custom Interval support for Test Scheduling.
