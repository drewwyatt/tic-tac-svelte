export const ENVIRONMENT = process.env.NODE_ENV as 'production' | 'development'
export const isProd = () => ENVIRONMENT === 'production'
export const isDev = () => !isProd()
