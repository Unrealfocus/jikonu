import Banner from "./components/banner";
import Features from "./components/feature";
import GetStartedBanner from "./components/getStartedBanner";
import Services from "./components/service";

export default function Home() {
  return (
    <>
     
      <Banner />
      <Services />
      <Features />
      <GetStartedBanner/>
    </>
  );
}