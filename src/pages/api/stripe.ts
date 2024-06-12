import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { buffer } from "micro";
import { prisma } from "~/server/db";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

interface StripeCheckoutSessionMetadata extends Stripe.Checkout.Session
{
  metadata: {
    userId: string;
  }
}

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object as StripeCheckoutSessionMetadata;

        await prisma.user.update({
          where: {
            id: checkoutSessionCompleted.metadata.userId
          },
          data: {
            credits: {
              increment: 100,
            },
          },
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // return a response to acknowledge receipt of the event
    res.json({ received: true});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default webhook;