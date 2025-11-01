
import Loader from "./components/animation/loader";
import { Suspense } from 'react'

// AbaTrade Components
import HeroSearch from "./components/abatrade/hero-search";
import AbaTradeGuarantee from "./components/abatrade/guarantee";
import CuratedCollections from "./components/abatrade/curated-collections";
import FeaturedArtisan from "./components/abatrade/featured-artisan";
import PlatformFeatures from "./components/abatrade/platform-features";
import HowItWorks from "./components/abatrade/how-it-works";
import Protection from "./components/abatrade/protection";
import SocialProof from "./components/abatrade/social-proof";


export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Loader delay={1000} />
        <HeroSearch />
        <SocialProof />
        <AbaTradeGuarantee />
        <CuratedCollections />
        <FeaturedArtisan />
        <PlatformFeatures />
        <HowItWorks />
        <Protection />
      </Suspense>
    </>
  );
}