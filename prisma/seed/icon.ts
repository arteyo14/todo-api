import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const iconSeeding = async () => {
  //ลบข้อมูลเก่าก่อน
  await prisma.icon.deleteMany();

  //reset sequence id number
  await prisma.$executeRaw`ALTER SEQUENCE icon_id_seq RESTART WITH 1;`;
  //init incon
  await prisma.icon.createMany({
    data: [
      { path: "https://example.com/star.png" },
      { path: "https://example.com/calendar.png" },
      { path: "https://example.com/check.png" },
    ],
  });
};
