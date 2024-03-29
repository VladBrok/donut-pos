import { logError } from "donut-shared/src/lib/log.js";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
}

export const ACCESS_TOKEN_EXPIRATION_SECONDS = 604800;

export function decodeJwt(token: string): JwtPayload | null {
  let res = null;
  try {
    res = {
      userId: (jwt.verify(token, process.env.JWT_SECRET || "") as any).userId,
    };
  } catch (err) {
    logError(err);
    res = null;
  }
  return res;
}

export const encodeJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS,
  });
};
