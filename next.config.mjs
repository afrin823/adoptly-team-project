// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'i.postimg.cc',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'i.ibb.co',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'i.ibb.co.com',
//                 pathname: '/**',
//             }
//         ]
//     }
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {


    experimental: {
        optimizeCss: false
    },
    images: {
        domains: [

            'lh3.googleusercontent.com',
            'i.ibb.co.com',
            'res.cloudinary.com'

        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;