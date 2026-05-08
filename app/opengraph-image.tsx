import { ImageResponse } from 'next/og';

import { personal, seo } from '@/data/content';

// Next.js Metadata Files API: this file becomes /opengraph-image at build
// time, emitted as a 1200×630 PNG. The `<head>` tags `<meta property="og:image">`
// and `<meta name="twitter:image">` (Twitter falls back to OG when no
// dedicated twitter-image is provided) are auto-injected by Next.

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${personal.name} | ${personal.title}`;

export default async function Image() {
  const host = seo.url.replace(/^https?:\/\//, '');

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: 'linear-gradient(180deg, #1a1b26 0%, #1c1d2c 100%)',
        color: '#c0caf5',
      }}
    >
      {/* Top: comment-style site marker, mirrors the on-site
            `// projects` / `// experience` section headers. */}
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          color: '#565f89',
          letterSpacing: 0.5,
        }}
      >
        {`// ${personal.domain}`}
      </div>

      {/* Center: name + role stacked. Name uses the syntax-string
            green that's the site's hero accent ("Ben Hu" in the hero,
            "shipped" in the projects headline, etc.). */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 132,
            fontWeight: 800,
            color: '#9ece6a',
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {personal.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 500,
            color: '#c0caf5',
            letterSpacing: -0.5,
          }}
        >
          {personal.title}
        </div>
      </div>

      {/* Bottom: status (left) and host (right). Status mirrors the
            hero's "open to work" pill — small green dot + status text. */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#9ece6a',
              boxShadow: '0 0 14px rgba(158,206,106,0.6)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 26, color: '#9aa5ce' }}>{personal.status}</div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#565f89',
            letterSpacing: 0.5,
          }}
        >
          {host}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
