import bcrypt from "bcrypt";

export const hashPassword = async (inputPassword: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(inputPassword, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
