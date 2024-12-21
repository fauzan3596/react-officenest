import React, { useEffect } from "react";
import { AboutHeader, Statistic, Tagline, Testimonials } from "../../components";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  return (
    <main className="min-h-screen w-full">
      <AboutHeader />
      <Statistic />
      <Tagline />
      <Testimonials />
    </main>
  );
};

export default AboutPage;
