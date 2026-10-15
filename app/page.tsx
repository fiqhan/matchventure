import FeatureCards from "./components/FeatureCards";
import HeroBanner from "./components/HeroBanner";
import LevelSection from "./components/LevelSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroBanner />
      <FeatureCards />
      <LevelSection />
    </main>
  );
}
