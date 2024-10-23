import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const statusSeeding = async () => {
  //ลบอันเก่าออกก่อน
  await prisma.status.deleteMany();

  //reset sequence id number
  await prisma.$executeRaw`ALTER SEQUENCE status_id_seq RESTART WITH 1;`;

  //init status
  await prisma.status.createMany({
    data: [
      { name: "Won't do", color: "#DD514C" },
      { name: "In Progress", color: "#E9A23B" },
      { name: "Completed", color: "#33D657" },
    ],
  });
};
