import bcrypt from 'bcrypt';

const saltRounds = 12;
export const hashPassword = async (userPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  userPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashedPassword);
};
