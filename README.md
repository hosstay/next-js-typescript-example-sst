# next-js-typescript-example-sst

Project for my own knowledge and learning purposes which generally replicates one of my projects at work.

## Technologies
Bootstrapped with create-sst, and create-t3-app for the frontend package.
- [SST](https://sst.dev/)
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Bun](https://bun.sh/)

## Getting Started
 - Install bun or change bun to npm
 - in frontend dir run `npm run db:push` to migrate db
 - in main dir run `npm run dev` to have sst deploy stack on aws for development
 - in frontend dir run `npm run dev` to have sst bind to the nextjs app and start it