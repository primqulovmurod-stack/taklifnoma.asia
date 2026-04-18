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

    // Configuration based on theme
    const isDark = ['luxury', 'goldclassic', 'rolex', 'milliy', 'premium-3d', 'luxury-dark', 'shadcn-animated'].includes(theme);
    const isGold = ['gold-white', 'gold-classic-white', 'white-gold-3d', 'goldclassic', 'rolex'].includes(theme);
    const isPink = ['pink-flower', 'pink-white', 'pink-luxury', 'floral-pearl', 'floral'].includes(theme);

    if (isDark) {
      styleConfig = {
        bg: theme === 'milliy' ? '#003366' : '#0A0A0A',
        accent: theme === 'milliy' || isGold ? '#FFD700' : '#E11D48',
        text: 'white',
        subtext: theme === 'milliy' ? '#B0C4DE' : '#9CA3AF',
        gradient: theme === 'milliy' 
          ? 'radial-gradient(circle at 50% 50%, #004080 0%, transparent 80%)' 
          : `radial-gradient(circle at 50% 50%, ${isGold ? '#D4AF37' : '#E11D48'}20 0%, transparent 80%)`,
        border: theme === 'milliy' ? '#00264d' : '#141416',
        ornament: isGold ? 'rgba(212, 175, 55, 0.1)' : 'rgba(225, 29, 72, 0.1)',
        label: theme.includes('Premium') ? "Premium Nikoh Taklifnomasi" : "Nikoh To'yi Taklifnomasi"
      };
    } else {
      // Light Themes (Pink, Flower, White Gold, etc)
      styleConfig = {
        bg: '#FFFFFF',
        accent: isPink ? '#E11D48' : '#D4AF37',
        text: '#1A1A1A',
        subtext: '#6B7280',
        gradient: isPink 
          ? 'radial-gradient(circle at 50% 50%, #FFE4E6 0%, transparent 80%)' 
          : 'radial-gradient(circle at 50% 50%, #FAF3E0 0%, transparent 80%)',
        border: '#F3F4F6',
        ornament: isPink ? 'rgba(225, 29, 72, 0.05)' : 'rgba(212, 175, 55, 0.1)',
        label: "Nikoh To'yi Taklifnomasi"
      };
    }

    return new ImageResponse(
      (
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              backgroundColor: '#FCE4EC',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Image Layer */}
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

            {/* Simple Overlay for Depth */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

            {/* The Central Card */}
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
              }}
            >
              {/* Circular Logo Initials */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '160px',
                  height: '160px',
                  borderRadius: '100px',
                  border: '1px solid #E11D48',
                  marginBottom: '30px',
                  color: '#E11D48',
                  fontSize: '80px',
                  fontFamily: 'serif',
                  opacity: 0.2,
                }}
              >
                {groom[0]}&{bride[0]}
              </div>

              {/* Names */}
              <div
                style={{
                  display: 'flex',
                  fontSize: '80px',
                  fontWeight: 'bold',
                  color: '#1A1A1A',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                {groom} & {bride}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: '28px',
                  color: '#6B7280',
                  marginBottom: '30px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                }}
              >
                SIZ UCHUN MAXSUS TAKLIFNOMA
              </div>

              {/* Date */}
              <div
                style={{
                  display: 'flex',
                  padding: '16px 50px',
                  background: 'linear-gradient(to right, #E11D48, #FF4D94)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '32px',
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
