import { afterAll } from "vitest";
import prisma from "../db/prisma.js";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

// need this to convert zod schemas to openapi
extendZodWithOpenApi(z);

afterAll(async () => {
  console.log("Tearing down test...");
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
