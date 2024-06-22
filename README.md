# next-js-typescript-example-sst

Project for my own knowledge and learning purposes which showcases some functionality used in my work projects
and other functionality I want a template for.

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
 - on Windows run in WSL2 since it doesn't natively like open-next.
   - clone repo to WSL2 dir and don't just use it from the mnt dir, otherwise it will be slow and won't hot reload.
   - might need to run `sudo chmod -R 775 /your/dir` to get rid of webpack errors when starting frontend.
 - Install bun or change bun to npm
 - in frontend dir run `npm run db:push` to migrate db
 - in main dir run `npm run dev` to have sst deploy stack on aws for development
 - in frontend dir run `npm run dev` to have sst bind to the Next.js app and start it