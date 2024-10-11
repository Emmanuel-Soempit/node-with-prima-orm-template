import Jwt, { decode } from "jsonwebtoken";
import env from "../../env";

export const generateWebToken = ({
  email,
  id,
  duration,
}: {
  email: string;
  id: number;
  duration: string;
}) => {
  const token = Jwt.sign({ email, id }, env.JWT_SECRET, {
    expiresIn: duration,
  });

  return token;
};

export const decodeWebToken = (
  token: string
): { email: string; id: number } => {
  const data = Jwt.verify(token, env.JWT_SECRET);

  return data as { email: string; id: number };
};
