import bcrypt from 'bcrypt';

export const checkPassword = async (password : string, passwordHash : string) => {
  const match = await bcrypt.compare(password, passwordHash);
  if (match) {
    return true;
  }
  return false;
};
