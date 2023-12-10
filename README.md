# Dropbox Clone

This is based on a video https://www.youtube.com/watch?v=FdEY-ZnEikg&t=3077s

Uses:
- Shadcn/UI, 
- Clerk Auth
- react dropzone
- Firebase

NextJS 14 uses Node 18+ so make sure your `nvm` is set to a version up in the 18s.


## Clerk
https://dashboard.clerk.com/apps/new?signed_up=true

- used github auth to create an account
- App called Files App
- Keys are added to `.env.local` file
- middleware file allows routes

Docs for Clerk NextJS (here)[https://clerk.com/docs/quickstarts/nextjs?_gl=1*pmsci4*_gcl_au*ODU2MjU1NjA2LjE3MDEyMDM1MDU.]

## Firebase
https://console.firebase.google.com/project/files-clone/overview
- login with MOP-gmail account 
- project name = files-clone

## Based on Next Create App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
