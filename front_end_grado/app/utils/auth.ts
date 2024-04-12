// A server component or a utility in app/utils/auth.ts
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
export function getUserFromCookie(req: NextApiRequest) {
  const cookies = req.headers.cookie || '';
  const parsedCookies = parse(cookies);
  const token = parsedCookies.auth_token;
  // Assuming you have a way to verify and decode the JWT
  return verifyAndDecodeJWT(token);
}
function verifyAndDecodeJWT(token: any) {
                throw new Error("Function not implemented.");
}

