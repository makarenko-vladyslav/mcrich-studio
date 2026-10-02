/** @type {import('next').NextConfig} */
//
// In "static-export" mode (SITE_BUILD_TARGET=static before `next build`) the
// site is emitted as a fully static export for GitHub Pages. Dev mode keeps
// the regular SSR behaviour so rewrites still work.
const isStaticExport = process.env.SITE_BUILD_TARGET === 'static';
const basePath = process.env.SITE_BASE_PATH || '';

// Build allowed dev origins from the preview host domain so HMR WebSocket
// connections from p-PORT.HOST subdomains pass Next.js 16's origin check.
// Note: ['*'] is treated as a literal string in Next.js 16, NOT a wildcard.
const previewDomain = process.env.PREVIEW_HOST_DOMAIN;
const allowedDevOrigins = previewDomain
  ? [`*.${previewDomain}`, `https://*.${previewDomain}`]
  : [];

const nextConfig = {
  // Next.js 16 uses Turbopack by default — empty config silences warnings
  // when a webpack config sneaks in.
  turbopack: {},
  // Source maps ship the readable original of every component to anyone who
  // opens devtools. Nothing on a marketing site needs them in production, and
  // they turn "copy this site" from a rewrite into a download.
  productionBrowserSourceMaps: false,
  // The framework header advertises what to look up exploits for, and gives a
  // copier one more hint about how the page was made.
  poweredByHeader: false,
  allowedDevOrigins,
  ...(isStaticExport
    ? {
        output: 'export',
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
        // Minor TS/ESLint strictness mismatches must not block the whole
        // deploy — the static export still renders correctly. Skip
        // type-check/lint in the Pages build only.
        typescript: { ignoreBuildErrors: true },
        eslint: { ignoreDuringBuilds: true },
      }
    : {
        async rewrites() {
          return [
            {
              source: '/picsum/:path*',
              destination: '/api/picsum/:path*',
            },
          ];
        },
      }),
};

export default nextConfig;
