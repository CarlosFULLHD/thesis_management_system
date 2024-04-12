// You need to import types for Next.js API route functions
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// No need to use require, use import instead for consistency and type support
import { serialize } from 'cookie';

// Explicitly type req and res to get full autocompletion and error checking
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      const { data } = await axios.post('http://backend.example.com/authenticate', {
        username,
        password
      });

      const jwt = data.token; // Assuming the token is returned in the 'token' field

      // Set HTTP-only cookie
      res.setHeader('Set-Cookie', serialize('auth_token', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        sameSite: 'strict',
        maxAge: 3600 * 24 // 24 hours
      }));

      res.status(200).json({ success: true });
    } catch (error: any) { // Type assertion to any if you're sure about the structure, or handle the unknown type properly
      // Checking if the error is axios related to provide a specific message
      if (axios.isAxiosError(error)) {
        res.status(401).json({ error: 'Authentication failed', details: error.message });
      } else {
        // Generic error message if the error type is not from axios
        res.status(401).json({ error: 'Authentication failed', details: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
