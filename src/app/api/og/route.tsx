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
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: styleConfig.bg,
            backgroundImage: styleConfig.gradient,
            position: 'relative',
            padding: '60px',
            border: `24px solid ${styleConfig.border}`,
          }}
        >
          {/* Logo/Site Name */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: styleConfig.accent,
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
              border: `2px solid ${styleConfig.ornament}`,
              borderRadius: '20px',
            }}
          />

          {/* Simple Heart Indicator */}
          <div
            style={{
                fontSize: '40px',
                marginBottom: '10px',
                color: styleConfig.accent,
            }}
          >
            ❤️
          </div>

          {/* Main Title - The Names */}
          <div
            style={{
              display: 'flex',
              fontSize: groom.length + bride.length > 20 ? '60px' : '80px',
              fontWeight: 900,
              color: styleConfig.text,
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: '10px',
              fontFamily: 'serif',
            }}
          >
            {groom} & {bride}
          </div>

          <div
            style={{
              fontSize: '32px',
              color: styleConfig.subtext,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '40px',
            }}
          >
            {styleConfig.label}
          </div>

          {/* Date Badge */}
          <div
            style={{
              display: 'flex',
              padding: '12px 40px',
              backgroundColor: styleConfig.accent,
              borderRadius: '100px',
              color: styleConfig.bg === '#FFFFFF' ? 'white' : 'white',
              fontSize: '28px',
              fontWeight: 800,
              boxShadow: `0 20px 40px ${styleConfig.accent}40`,
            }}
          >
            {date}
          </div>

          {/* Footer Promo */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              color: styleConfig.subtext,
              opacity: 0.5,
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
  } catch (e: any) {
    console.error('OG Image Error:', e.message);
    // Fallback to a plain response if it fails
    return new Response(`Error generating image`, { status: 500 });
  }
}
