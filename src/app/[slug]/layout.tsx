import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Read route params
    if (!params) throw new Error("No params");
    const { slug } = await params;
    if (!slug) throw new Error("No slug");

    // 1. Fetch invitation from DB
    const { data: invitations } = await supabase
      .from('invitations')
      .select('*')
      .eq('slug', slug)
      .order('created_at', { ascending: false })
      .limit(1);

    const invitation = invitations && invitations.length > 0 ? invitations[0] : null;

    if (!invitation || !invitation.content) {
      return {
        title: 'Taklifnoma.Asia | To\'yingiz uchun eng go\'zal dizaynlar',
      };
    }

  const { groomName, brideName, date } = invitation.content;
  const title = `${groomName} & ${brideName} — Nikoh to'yi taklifnomasi 💍`;
  const description = `${date} kuni bo'ladigan baxtli kunimizga lutfan taklif etamiz! ✨`;

  // 2. Generate Dynamic OG Image URL
  // We use the full URL if we're in production, or fallback for localhost
  const theme = invitation.content.theme || 'pink-flower';
  const ogSearchParams = new URLSearchParams({
    groom: groomName,
    bride: brideName,
    date: date,
    theme: theme
  }).toString();
  const ogImage = `/api/og?${ogSearchParams}`;

    return {
      metadataBase: new URL('https://www.taklifnoma.asia'),
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/${slug}`,
        siteName: 'Taklifnoma.Asia',
        locale: 'uz_UZ',
        type: 'website',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${groomName} & ${brideName} Wedding`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Taklifnoma.Asia | To\'yingiz uchun eng go\'zal dizaynlar',
    };
  }
}

export default function InvitationLayout({ children }: Props) {
  return <>{children}</>;
}
