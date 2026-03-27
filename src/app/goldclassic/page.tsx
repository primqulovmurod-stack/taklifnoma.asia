import GoldClassicInvitation from '@/components/GoldClassicInvitation';

export const metadata = {
  title: "Kenjabek & Safiya - Nikoh to'yi",
  description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
};

export default function GoldClassicPage() {
  return (
    <GoldClassicInvitation 
      groomName="Kenjabek"
      brideName="Safiya"
      date="24 - APREL - 2026"
      time="19:00"
      locationName="Demir (Asr)"
      locationAddress="Jizzax Shahar"
      locationLink="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490597,67.8229612,20.75z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
      imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
      musicUrl="/assets/die_with_a_smile.mp3"
    />
  );
}
