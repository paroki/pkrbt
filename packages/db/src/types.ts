import prisma from "@/client";

export type OmedPrismaExtension = Parameters<typeof prisma.$extends>[0];
