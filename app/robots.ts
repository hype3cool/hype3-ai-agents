import type { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
    const environment = process.env.NEXT_PUBLIC_ENV;

    // Define the rules based on the environment
    const rules = environment === 'prod'
        ? [{ userAgent: '*', allow: '/' }]
        : [{ userAgent: '*', disallow: '/' }];

    return {
        rules: rules,
        // sitemap: 'https://yourdomain.com/sitemap.xml', // Change to your actual sitemap URL
    };
}

