# Next.js TypeScript Example

# project
- run: npm run dev

# db
- update: npx prisma db push
- ui: npx prisma studio

# stripe cli
- run: npm run stripe:listen 
  - might have to copy the webhook signing secret it outputs upon running this command to .env for STRIPE_WEBHOOK_SECRET

# Creation
Project bootstrapped with [T3 Stack](https://create.t3.gg/).
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
