import React, { useEffect } from "react";
import { AboutHeader, Statistic, Tagline, Testimonials } from "../../components";

const AboutPage = () => {

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
