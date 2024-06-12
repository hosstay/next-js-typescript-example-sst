import { env } from '~/env.mjs';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import Stripe from "stripe";
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure
    .mutation(async ({ ctx }) => {
      return stripe.checkout.sessions.create({
        payment_method_types: ["card", "us_bank_account"],
        metadata: {
          userId: ctx.session.user.id,
        },
        success_url: `${env.NEXTAUTH_URL}`,
        cancel_url: `${env.NEXTAUTH_URL}`,
        line_items: [
          {price: env.PRICE_ID_TEST_100_CREDITS, quantity: 1},
        ],
        mode: "payment",
      });
    }),
});
