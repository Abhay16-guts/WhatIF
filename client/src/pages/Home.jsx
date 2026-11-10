import HomeHero from '../components/HomeHero';
import FeaturedScenario from '../components/FeaturedScenario';
import AtlasMethodology from '../components/AtlasMethodology';

export default function Home() {
  return (
    <div className="paper-texture">
      <HomeHero />
      <FeaturedScenario />
      <AtlasMethodology />
    </div>
  );
}
