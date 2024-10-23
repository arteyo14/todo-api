import { PrismaClient } from "@prisma/client";
import { iconSeeding, statusSeeding, userSeeding } from "./seed";

const prisma = new PrismaClient();

export const main = async () => {
  userSeeding();
  statusSeeding();
  iconSeeding();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
