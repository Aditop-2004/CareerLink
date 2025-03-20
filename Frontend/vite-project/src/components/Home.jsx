import React from "react";
import Navbar from "./shared/navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <CategoryCarousel></CategoryCarousel>
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </div>
  );
}
