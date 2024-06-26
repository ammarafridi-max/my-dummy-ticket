import { Helmet, HelmetProvider } from "react-helmet-async";
import Hero from "./Hero/Hero.js";
import Process from "./Process/Process.js";
import About from "./About/About";
import FAQ from "./FAQ/FAQ.js";
import Benefits from "./Benefits/Benefits.js";

export default function Home() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>My Dummy Ticket | Verifiable Dummy Ticket From AED 49</title>
        </Helmet>
      </HelmetProvider>
      <Hero />
      <Process />
      <Benefits />
      <FAQ />
      <About />
    </div>
  );
}
