
import Banner from "./components/banner/Banner";
import FAQ from "./components/faq/FAQ.jsx";
import FeaturedHackathons from "./components/featured/FeaturedHackathons";
import Footer from "./components/footer/Footer";
import HeroBanner from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Opportunity from "./components/opportunity/Opportunity";

export default function page() {

  // UserRender();
  return (
    <>
      <HeroBanner />
      <FeaturedHackathons/>
      <Banner/>
      <Opportunity/>
      <FAQ/>

    </>
  );
}
