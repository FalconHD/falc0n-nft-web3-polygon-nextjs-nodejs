import jwt from "jsonwebtoken";

const roles = [
  process.env.BOSS_JWT_SECRET,
  process.env.MANAGER_JWT_SECRET,
  process.env.SUPERVISOR_JWT_SECRET,
  process.env.DRIVER_JWT_SECRET,
] as string[];

export const generateToken = (
  { _id, email }: { _id: string; email: string },
  secret: string,
  role: string
) => {
  const token = jwt.sign(
    {
      id: _id,
      email,
      role,
    },
    secret,
    {
      expiresIn: "1y",
    }
  );
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
export const isTokenValid = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return false;
  }
};

export const randomToken = (token: string) => {
  let auth = roles
    .map((role) =>
      isTokenValid(token, role) ? verifyToken(token, role) : null
    )
    .filter((item) => item !== null)[0];
  if (!auth) throw new Error("Invalid token");
  return auth as { id: string; email: string; role: string };
};
