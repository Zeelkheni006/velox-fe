/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["192.168.29.69"], // ✅ just hostname, no http://
    },
};

module.exports = nextConfig;