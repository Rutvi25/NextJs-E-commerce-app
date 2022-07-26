/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  env: {
    'BASE_URL': 'https://next-js-e-commerce-app-five.vercel.app/',
    'MONGODB_URL': 'mongodb+srv://root:root123@cluster0.8qqva.mongodb.net/nextjs-ecommerce?retryWrites=true&w=majority',
    'ACCESS_TOKEN_SECRET': 'U!UeRea%0Yn=+KHTW>Z*U8H0Jj%VMgstZY1jHnANUnt1d.P?Q',
    'REFRESH_TOKEN_SECRET': 'Bu+i9N+jsr*>Jdf0D466:4pX?gNj1M4Xv.~Qb_+m9cjr@#FutQq3LcmR~WNpGm=J19^pyV?uJ.A:@K',
    'PAYPAL_CLIENT_ID': 'Afmb2E0oelAwuHTYC_i7gIrzfn7EXMGT1Zr1HT-wMbA4xF6nK5XRH_ENci_j9TOz45bTIsLt4KcoVAfs',
    'CLOUD_UPDATE_PRESET': 'nextjs_store',
    'CLOUD_NAME': 'dtxxm1npa',
    'CLOUD_API': 'https://api.cloudinary.com/v1_1/dtxxm1npa/image/upload'
  }
}