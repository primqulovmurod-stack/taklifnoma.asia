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
        label: "NIKOH TO'YI TAKLIFNOMASI"
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
            {/* THE GENERATED NIGHT BANQUET BACKGROUND (v400) */}
            <img 
              src="https://taklifnoma.asia/assets/wedding-bg-new.jpg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1200px',
                height: '630px',
                objectFit: 'cover',
                filter: 'brightness(0.9)',
              }}
              alt="Night Banquet BG"
            />

            {/* THE WHITE CARD UI (Exactly as in 20:25 screenshot) */}
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
              {/* Initials Circle */}
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
                  filter: 'drop-shadow(0 4px 6px rgba(147, 51, 234, 0.1))',
                }}
              >
                <div style={{ position: 'absolute', top: '15px', fontSize: '14px', opacity: 0.5 }}>✦</div>
                <div style={{ position: 'absolute', bottom: '15px', fontSize: '14px', opacity: 0.5 }}>✦</div>
                {(groom || 'K')[0]}&{(bride || 'B')[0]}
              </div>

              {/* Bold Bi-Color Names */}
              <div style={{ display: 'flex', fontSize: '52px', fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: '8px', letterSpacing: '-1px' }}>
                {groom} <span style={{ color: '#9333EA', margin: '0 12px' }}>&</span> <span style={{ color: '#9333EA' }}>{bride}</span>
              </div>

              {/* Tagline */}
              <div style={{ fontSize: '24px', color: '#1F2937', fontWeight: '500', marginBottom: '10px' }}>
                Siz uchun maxsus taklifnoma
              </div>

              {/* Instruction Text */}
              <div style={{ fontSize: '16px', color: '#6B7280', textAlign: 'center', marginBottom: '40px' }}>
                Taklifnoma tafsilotlarini ko'rish uchun bosing.
              </div>

              {/* THE GRADIENT BUTTON */}
              <div
                style={{
                  display: 'flex',
                  padding: '24px 80px',
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '26px',
                  fontWeight: 'bold',
                  boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
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
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (e: any) {
    console.error('OG Image Error:', e.message);
    // Fallback to a plain response if it fails
    return new Response(`Error generating image`, { status: 500 });
  }
}
