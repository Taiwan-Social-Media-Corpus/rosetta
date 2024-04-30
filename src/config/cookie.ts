import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const cookieOptions: Pick<ResponseCookie, 'httpOnly' | 'secure' | 'sameSite' | 'expires'> = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};
