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
    const isGold = ['gold-white', 'gold-classic-white', 'white-gold-3d', 'goldclassic', 'rolex', 'black-gold'].includes(theme);
    const isPink = ['pink-flower', 'pink-white', 'pink-luxury', 'floral-pearl', 'floral'].includes(theme);

    const styleConfig = isDark ? {
        bg: theme === 'milliy' ? '#003366' : '#0A0A0A',
        accent: isGold ? '#D4AF37' : '#E11D48',
        text: 'white',
        subtext: '#9CA3AF',
        gradient: `radial-gradient(circle at 50% 50%, ${isGold ? '#D4AF37' : '#E11D48'}20 0%, transparent 80%)`,
        label: "NIKOH TO'YI TAKLIFNOMASI"
    } : {
        bg: '#FFF0F3',
        accent: isPink ? '#E11D48' : '#D4AF37',
        text: '#1A1A1A',
        subtext: '#6B7280',
        gradient: isPink 
          ? 'radial-gradient(circle at center, #FFE4E6 0%, #FFF0F3 100%)' 
          : 'radial-gradient(circle at 50% 50%, #FAF3E0 0%, transparent 80%)',
        label: "Nikoh To'yi Taklifnomasi"
    };

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
            {/* WARM BOKEH/FLORAL BACKGROUND */}
            <img 
              src="https://www.taklifnoma.asia/assets/floral-pearl.png?v=8"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1200px',
                height: '630px',
                objectFit: 'cover',
                filter: 'brightness(0.9)',
              }}
              alt="Main BG"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.05)' }} />

            {/* THE RED DATE BUTTON DESIGN (18:19 Screenshot) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '40px 60px',
                borderRadius: '50px',
                width: '580px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                position: 'relative',
              }}
            >
              {/* Top Red Label */}
              <div style={{ color: '#E11D48', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase' }}>
                TAKLIFNOMA.ASIA
              </div>

              {/* Initials Circle (Pinkish) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '120px',
                  height: '120px',
                  borderRadius: '60px',
                  border: '1px solid #FBCFE8',
                  background: '#FFF1F2',
                  marginBottom: '25px',
                  color: '#D946EF',
                  fontSize: '48px',
                  fontFamily: 'serif',
                }}
              >
                {groom[0]}&{bride[0]}
              </div>

              {/* Names */}
              <div style={{ display: 'flex', fontSize: '50px', fontWeight: '500', color: '#111827', textAlign: 'center', marginBottom: '5px', letterSpacing: '-1px' }}>
                {groom} <span style={{ margin: '0 10px' }}>&</span> {bride}
              </div>

              {/* Subtitle */}
              <div style={{ fontSize: '16px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>
                SIZ UCHUN MAXSUS TAKLIFNOMA
              </div>

              {/* THE RED DATE BUTTON */}
              <div
                style={{
                  display: 'flex',
                  padding: '12px 60px',
                  background: '#E11D48',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {date}
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
    console.error('OG Image Error:', e.message);
    // Fallback to a plain response if it fails
    return new Response(`Error generating image`, { status: 500 });
  }
}
