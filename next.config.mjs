/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
const withPWAConfig = withPWA({
    dest: 'public',
});

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "images.clerk.dev",
            },
            {
                protocol: "https",
                hostname: "uploadthing.com",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

export default withPWAConfig(nextConfig);
