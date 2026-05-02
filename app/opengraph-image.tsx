import { ImageResponse } from 'next/og';
import { personalInfo } from '@/data';

export const runtime = 'edge';

export const alt = 'Sainul Abid M | AI Technology Leader';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle glowing elements */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244, 114, 182, 0.05) 0%, transparent 70%)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
          <div style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)', backgroundClip: 'text', color: 'transparent', fontSize: 24, fontWeight: 'bold', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            AI Technology Leader
          </div>
          <div style={{ color: 'white', fontSize: 72, fontWeight: '900', marginBottom: 8, letterSpacing: '-0.02em' }}>
            {personalInfo.name}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 28, maxWidth: 800, lineHeight: 1.4 }}>
            CTO at Iluzia Labs & Director at AyaTech
          </div>
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(255, 255, 255, 0.2)' }} />
            <div style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.1em' }}>www.sainul.info</div>
            <div style={{ width: 40, height: 1, background: 'rgba(255, 255, 255, 0.2)' }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
