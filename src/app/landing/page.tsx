import { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: "Taklifnoma.Asia — Zamonaviy Virtual Taklifnomalar",
  description: "O'zbekistondagi eng chiroyli va interaktiv virtual taklifnomalar xizmati.",
};

export default function Page() {
  return <LandingPage />;
}
