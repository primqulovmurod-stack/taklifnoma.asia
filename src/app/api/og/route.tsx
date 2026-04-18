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
              backgroundColor: isDark ? '#0A0A0A' : '#FFF5F7',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              flexDirection: 'column',
              padding: '60px',
            }}
          >
            {/* Background Image Layer */}
            {isPink ? (
              <img 
                src="https://www.taklifnoma.asia/assets/premium-pink-bg.png"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1200px',
                  height: '630px',
                  objectFit: 'cover',
                }}
                alt="Background"
              />
            ) : isDark ? (
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, #1A1A1A 0%, #000000 100%)',
                }}
              />
            ) : (
                <img 
                src="https://www.taklifnoma.asia/assets/floral-pearl.png"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1200px',
                  height: '630px',
                  objectFit: 'cover',
                }}
                alt="Floral Background"
              />
            )}

            {/* Glass Card Layer */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '60px 80px',
                borderRadius: '50px',
                width: '800px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
              }}
            >
              {/* Gold Wax Seal (Floating) */}
              <img 
                src="https://www.taklifnoma.asia/assets/gold-wax-seal.png"
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '40px',
                  width: '120px',
                  height: '120px',
                  zIndex: 2,
                }}
                alt="Wax Seal"
              />

              {/* Logo / Site Title */}
              <div style={{ color: isPink ? '#E11D48' : '#D4AF37', fontSize: '20px', letterSpacing: '8px', marginBottom: '30px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                taklifnoma.asia
              </div>

              {/* Circular Initials (Subtle) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px', borderRadius: '60px', border: `1px solid ${isPink ? '#E11D48' : '#D4AF37'}`, marginBottom: '20px', color: isPink ? '#E11D48' : '#D4AF37', fontSize: '48px', opacity: 0.15 }}>
                {groom[0]}&{bride[0]}
              </div>

              {/* The Names (Premium Look) */}
              <div style={{ display: 'flex', fontSize: '80px', fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: '10px' }}>
                {groom} & {bride}
              </div>

              <div style={{ fontSize: '24px', color: '#4B5563', letterSpacing: '4px', marginBottom: '40px' }}>
                NIKOH TO'YI TAKLIFNOMASI
              </div>

              {/* Date Badge */}
              <div style={{ display: 'flex', padding: '14px 60px', backgroundColor: isPink ? '#E11D48' : '#D4AF37', borderRadius: '100px', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
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
