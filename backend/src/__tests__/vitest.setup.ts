import { afterAll } from "vitest";
import prisma from "./src/db/prisma.js";

afterAll(async () => {
  console.log("Tearing down test...");
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
