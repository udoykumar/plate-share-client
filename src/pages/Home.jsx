import React from "react";
import Banner from "../components/Banner";
import FeatureFood from "../components/FeatureFood";
import HowItWorks from "../components/HowItWorks";
import OurMission from "../components/OurMission";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner />
      <FeatureFood />
      <HowItWorks />
      <OurMission />
    </div>
  );
};

export default Home;
