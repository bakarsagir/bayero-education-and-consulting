[![Netlify Status](https://api.netlify.com/api/v1/badges/f4bbf6c2-5cda-4b3e-9ee9-dcd15f3e2ed8/deploy-status)](https://app.netlify.com/sites/bayeroeducation/deploys)

# Bayero Education & Consulting

A comprehensive education consulting platform built with Next.js and Supabase.

## Features

- University Database with Search & Filters
- Educational Resources
- Consulting Services
- Contact Management
- Student Resources

## Tech Stack

- Next.js 14
- Supabase
- TailwindCSS
- TypeScript

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

The site is automatically deployed to Netlify on every push to the main branch.