import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../src/utils/hashpassword";

const prisma = new PrismaClient();

export const userSeeding = async () => {
  //ลบข้อมูล initData
  await prisma.user.deleteMany();

  //reset sequence id number
  await prisma.$executeRaw`ALTER SEQUENCE user_id_seq RESTART WITH 1;`;

  const password = await hashPassword("Passw0rd");
  //init user
  await prisma.user.create({
    data: {
      username: "arteyo14",
      password,
      email: "arteyo14@gmail.com",
    },
  });
};
