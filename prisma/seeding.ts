import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/hashpassword";

const prisma = new PrismaClient();

export const main = async () => {
  //ลบข้อมูล initData
  await prisma.user.deleteMany();
  await prisma.status.deleteMany();
  await prisma.icon.deleteMany();

  //reset sequence id number
  await prisma.$executeRaw`ALTER SEQUENCE user_id_seq RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE status_id_seq RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE icon_id_seq RESTART WITH 1;`;

  const password = await hashPassword("password");

  //init user
  await prisma.user.create({
    data: {
      username: "arteyo14",
      password,
      email: "arteyo14@gmail.com",
    },
  });

  //init status
  await prisma.status.createMany({
    data: [
      { name: "Won't do", color: "#DD514C" },
      { name: "In Progress", color: "#E9A23B" },
      { name: "Completed", color: "#33D657" },
    ],
  });

  //init incon
  await prisma.icon.createMany({
    data: [
      { path: "https://example.com/star.png" },
      { path: "https://example.com/calendar.png" },
      { path: "https://example.com/check.png" },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
