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
            }}
          >
            {/* The Real Mockup Background */}
            {isPink ? (
              <img 
                src="https://www.taklifnoma.asia/assets/pink_invite_mockup.png"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1200px',
                  height: '630px',
                  objectFit: 'cover',
                }}
                alt="Pink Mockup"
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

            {/* Premium Minimal Overlay */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(4px)',
                padding: '50px 70px',
                borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                width: '700px',
              }}
            >
              <div style={{ color: isPink ? '#9333EA' : '#D4AF37', fontSize: '24px', letterSpacing: '8px', marginBottom: '20px', fontWeight: 'bold' }}>
                TAKLIFNOMA.ASIA
              </div>

              <div style={{ display: 'flex', fontSize: '80px', fontWeight: '900', color: '#1A1A1A', textAlign: 'center', marginBottom: '10px', fontFamily: 'serif' }}>
                 {groom} & {bride}
              </div>

              <div style={{ fontSize: '24px', color: '#4B5563', letterSpacing: '4px', marginBottom: '40px', fontWeight: 'bold' }}>
                 SIZNI TO'YIMIZGA TAKLIF ETAMIZ
              </div>

              <div style={{ display: 'flex', padding: '16px 80px', background: 'linear-gradient(to right, #9333EA, #EC4899)', borderRadius: '100px', color: 'white', fontSize: '28px', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)' }}>
                TAKLIFNOMANI OCHISH
              </div>
            </div>
            
            {/* Decorative Wax Seal if in assets */}
             <img 
               src="https://www.taklifnoma.asia/assets/gold-wax-seal.png"
               style={{
                 position: 'absolute',
                 bottom: '60px',
                 right: '100px',
                 width: '120px',
                 height: '120px',
                 opacity: 0.8,
                 transform: 'rotate(-10deg)',
               }}
               alt="Seal"
             />
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
