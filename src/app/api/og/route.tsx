import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get parameters
    const groom = searchParams.get('groom') || 'Kuyov';
    const bride = searchParams.get('bride') || 'Kelin';
    const date = searchParams.get('date') || '2026';
    const theme = searchParams.get('theme') || 'luxury';

    const isDark = ['luxury', 'goldclassic', 'rolex', 'milliy', 'premium-3d', 'luxury-dark', 'shadcn-animated', 'black-gold', 'dark-luxury'].includes(theme);

    // Standard labels for all themes
    const labelText = "NIKOH TO'YI TAKLIFNOMASI";

    if (isDark) {
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
              backgroundColor: '#0A0A0A',
              position: 'relative',
              padding: '60px',
              border: '24px solid #141416',
            }}
          >
            {/* Background Image */}
            <img 
              src="https://taklifnoma.asia/assets/wedding-bg-new.jpg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1200px',
                height: '630px',
                objectFit: 'cover',
                opacity: 0.4,
              }}
              alt="Wedding BG"
            />

            {/* Logo/Site Name */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#E11D48',
                fontSize: '24px',
                fontWeight: 900,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Taklifnoma.Asia
            </div>

            {/* Decorative Border */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                border: '2px solid rgba(225, 29, 72, 0.1)',
                borderRadius: '20px',
              }}
            />

            {/* Icon/Heart */}
            <div
              style={{
                  display: 'flex',
                  marginBottom: '20px',
                  color: '#E11D48',
                  opacity: 0.8
              }}
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Main Title - The Names */}
            <div
              style={{
                display: 'flex',
                fontSize: '100px',
                fontWeight: 900,
                color: 'white',
                textAlign: 'center',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                fontFamily: 'serif',
              }}
            >
              {groom} & {bride}
            </div>

            <div
              style={{
                fontSize: '32px',
                color: '#9CA3AF',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                marginBottom: '40px',
              }}
            >
              {labelText}
            </div>

            {/* Date Badge */}
            <div
              style={{
                display: 'flex',
                padding: '12px 40px',
                backgroundColor: '#E11D48',
                borderRadius: '100px',
                color: 'white',
                fontSize: '28px',
                fontWeight: 800,
                boxShadow: '0 20px 40px rgba(225, 29, 72, 0.3)',
              }}
            >
              {date}
            </div>

            {/* Footer Promo */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              2026 PREMIUM VIRTUAL EDITION
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }
      );
    }

    // Default Light Theme (White Card)
    return new ImageResponse(
      (
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              backgroundColor: '#FFF5F7',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              flexDirection: 'column',
            }}
          >
            <img 
              src="https://taklifnoma.asia/assets/wedding-bg-new.jpg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1200px',
                height: '630px',
                objectFit: 'cover',
              }}
              alt="Wedding BG"
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                padding: '50px 60px',
                borderRadius: '70px',
                width: '600px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.12)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '160px',
                  height: '160px',
                  borderRadius: '100px',
                  border: '2px solid #E9D5FF',
                  background: 'white',
                  marginBottom: '35px',
                  color: '#9333EA',
                  fontSize: '68px',
                  fontFamily: 'serif',
                  fontStyle: 'italic',
                  position: 'relative',
                }}
              >
                {(groom || 'K')[0]}&{(bride || 'B')[0]}
              </div>

              <div style={{ display: 'flex', fontSize: '52px', fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: '8px' }}>
                {groom} <span style={{ color: '#9333EA', margin: '0 12px' }}>&</span> <span style={{ color: '#9333EA' }}>{bride}</span>
              </div>

              <div style={{ fontSize: '24px', color: '#1F2937', fontWeight: '500', marginBottom: '10px' }}>
                {labelText}
              </div>

              <div style={{ fontSize: '16px', color: '#6B7280', textAlign: 'center', marginBottom: '40px' }}>
                {date} kuni bo'ladigan baxtli kunimizga taklif etamiz!
              </div>

              <div
                style={{
                  display: 'flex',
                  padding: '24px 80px',
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '26px',
                  fontWeight: 'bold',
                }}
              >
                Taklifnomani ochish →
              </div>
            </div>
          </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (e: any) {
    return new Response(`Error generating image`, { status: 500 });
  }
}
