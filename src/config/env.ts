export const env = {
  nodeEnv: process.env.NODE_ENV,
  api: process.env.API_URL,
  siteUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SITE_URL : '/',
} as const;
