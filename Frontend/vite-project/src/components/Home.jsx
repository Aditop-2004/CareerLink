import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import usegetAllJobs from "./customhooks/usegetAllJobs";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

export default function Home() {
  const dispatch = useDispatch();
  usegetAllJobs();
  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, []);
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
