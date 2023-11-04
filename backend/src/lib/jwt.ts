import { log } from "donut-shared";
import { LogType } from "donut-shared/src/log.js";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
}

export const ACCESS_TOKEN_EXPIRATION_SECONDS = 60 * 60;

export function decodeJwt(token: string): JwtPayload | null {
  let res = null;
  try {
    res = {
      userId: (jwt.verify(token, process.env.JWT_SECRET || "") as any).userId,
    };
  } catch (err) {
    log(err, LogType.Error);
    res = null;
  }
  return res;
}

export const encodeJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS,
  });
};
