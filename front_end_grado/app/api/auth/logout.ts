// app/api/auth/logout.ts
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
export default function logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    sameSite: 'strict',
    expires: new Date(0)  // Clear cookie by setting it to expire immediately
  }));

  res.status(200).json({ success: true });
}
