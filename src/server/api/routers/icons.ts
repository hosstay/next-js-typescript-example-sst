import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const iconsRouter = createTRPCRouter({
  getIcons: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.icon.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.icon.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      }
    });
  }),
});
