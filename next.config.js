/** @type {import('next').NextConfig} */
const DEBUG = process.env.NODE_ENV === "development";

module.exports = {
  reactStrictMode: true,
  assetPrefix: !DEBUG ? "/vouchergen" : "",
};
