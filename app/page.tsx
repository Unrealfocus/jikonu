
import Loader from "./components/animation/loader";
import Banner from "./components/banner";
import Features from "./components/feature";
import GetStartedBanner from "./components/getStartedBanner";
import Services from "./components/service";
import { Suspense } from 'react'


export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Loader delay={1000} />
        <Banner />
        <Services />
        <Features />
        <GetStartedBanner />
      </Suspense>
    </>
  );
}