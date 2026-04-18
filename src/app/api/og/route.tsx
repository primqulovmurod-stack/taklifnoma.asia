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
              backgroundColor: styleConfig.bg,
              backgroundImage: styleConfig.gradient,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              flexDirection: 'column',
              padding: '60px',
            }}
          >
            {/* Background for Pink */}
            {isPink && (
              <img 
                src="https://www.taklifnoma.asia/assets/floral-pearl.png"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1200px',
                  height: '630px',
                  objectFit: 'cover',
                  opacity: 0.6,
                }}
                alt="Floral Background"
              />
            )}

            {/* Content for Dark Theme (as per request) */}
            {isDark ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: styleConfig.subtext, fontSize: '24px', letterSpacing: '8px', marginBottom: '30px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  taklifnoma.asia
                </div>

                <div style={{ color: styleConfig.accent, fontSize: '60px', marginBottom: '20px' }}>
                  ❤️
                </div>

                <div style={{ color: 'white', fontSize: '90px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                  {groom} & {bride}
                </div>

                <div style={{ color: '#9CA3AF', fontSize: '28px', letterSpacing: '6px', marginBottom: '40px', fontWeight: 'bold' }}>
                  {styleConfig.label}
                </div>

                <div style={{ display: 'flex', padding: '12px 60px', backgroundColor: styleConfig.accent, borderRadius: '100px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>
                  {date}
                </div>

                <div style={{ position: 'absolute', bottom: '40px', color: '#4B5563', fontSize: '18px', letterSpacing: '4px', fontWeight: 'bold' }}>
                  2026 PREMIUM VIRTUAL EDITION
                </div>
              </div>
            ) : (
              /* Content for Floral/Light Themes */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '50px 70px',
                  borderRadius: '40px',
                  width: '740px',
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ color: styleConfig.accent, fontSize: '24px', letterSpacing: '4px', marginBottom: '30px', fontWeight: 'bold' }}>
                  TAKLIFNOMA.ASIA
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '140px', height: '140px', borderRadius: '70px', border: `1px solid ${styleConfig.accent}`, marginBottom: '30px', color: styleConfig.accent, fontSize: '60px', opacity: 0.3 }}>
                  {groom[0]}&{bride[0]}
                </div>

                <div style={{ display: 'flex', fontSize: '70px', fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: '10px' }}>
                  {groom} & {bride}
                </div>

                <div style={{ fontSize: '24px', color: '#6B7280', marginBottom: '30px', fontWeight: 600, letterSpacing: '2px' }}>
                  SIZ UCHUN MAXSUS TAKLIFNOMA
                </div>

                <div style={{ display: 'flex', padding: '14px 50px', backgroundColor: styleConfig.accent, borderRadius: '100px', color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
                  {date}
                </div>
              </div>
            )}
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
