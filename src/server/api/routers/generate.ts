import { z } from "zod";
import { env } from '~/env.mjs';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: env.REGION,
});

async function getImageBufferFromUrlAsync(url: string) : Promise<Buffer> {
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

const BUCKET_NAME = "next-js-typescript-example";

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
        shape: z.string(),
        numberOfIcons: z.number().min(1).max(10),
      })
    )
    .mutation(async({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: input.numberOfIcons,
          },
        },
        data: {
          credits: {
            decrement: input.numberOfIcons,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You don't have enough credits to generate an icon",
        });
      }

      try {
        const finalPrompt = `a modern ${input.shape} icon in ${input.color} of ${input.prompt}, 3d rendered, minimalistic, high quality, trending on art station, unreal engine graphics quality`;
        console.log(finalPrompt);

        const imageBuffer = await getImageBufferFromUrlAsync(ctx.session.user.image as string);

        const images = [];
        for (let i = 0; i < input.numberOfIcons; i++) {
          images.push(imageBuffer);
        }

        const createdIcons = await Promise.all(
          images.map(async(image) => {
            const icon = await ctx.prisma.icon.create({
              data: {
                prompt: input.prompt,
                userId: ctx.session.user.id,
              }
            });

            const s3SignedUrl = await s3.getSignedUrlPromise("putObject", {
              Bucket: BUCKET_NAME,
              Key: `${icon.id}.png`,
              ContentType: "image/png",
              Expires: 60 * 60,
            });
            const response = await fetch(s3SignedUrl, {
              method: "PUT",
              body: image,
              headers: {
                "Content-Type": "image/png",
              }
            });
            if (!response.ok) {
              console.log(response);
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to generate icon",
              });
            }
            return icon;
          })
        );

        return createdIcons.map((icon) => {
          return {
            imageUrl: `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${icon.id}.png`,
          };
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate icon",
        });
      }
    }),
});
