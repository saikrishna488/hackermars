"use client"
import Banner from "./components/banner/Banner";
import JoinDiscordButton from "./components/DiscordButton";
import FAQ from "./components/faq/FAQ.jsx";
import FeaturedHackathons from "./components/featured/FeaturedHackathons";
import Footer from "./components/footer/Footer";
import HeroBanner from "./components/hero/Hero";
import Opportunities from "./components/most_viewed/Opportunites";
import Navbar from "./components/navbar/Navbar";
import Opportunity from "./components/opportunity/Opportunity";
import OurNumbers from "./components/our_numbers/OurNumbers";
import UserRender from "./components/login/render";
import { useEffect } from "react";

export default function page() {

  // UserRender();
  return (
    <>
      <Navbar />
      <HeroBanner />
      <FeaturedHackathons/>
      <Banner/>
      <Opportunities/>
      <Opportunity/>
      <OurNumbers/>
      <JoinDiscordButton/>
      <FAQ/>
      <Footer/>
    </>
  );
}
