export const env = {
  nodeEnv: process.env.NODE_ENV,
  api: process.env.NEXT_PUBLIC_API_URL,
  siteUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SITE_URL : '/',
  serverUrl: process.env.SERVER_API_URL,
} as const;
