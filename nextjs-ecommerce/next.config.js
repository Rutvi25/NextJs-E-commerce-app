// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  env: {
    'BASE_URL': 'http://localhost:3000',
    'MONGODB_URL': 'mongodb+srv://root:root123@cluster0.8qqva.mongodb.net/nextjs-ecommerce?retryWrites=true&w=majority'
  }
}