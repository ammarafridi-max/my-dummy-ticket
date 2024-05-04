import airports from "airport-codes/airports.json";
import Hero from "./Hero.js";
import Process from "./Process.js";
import About from "./About.js";
import Contact from "./Contact.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Test from "./Test.js";

export default function Home() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>MyDummyTicket.ae - Get Your Dummy Ticket Online</title>
        </Helmet>
      </HelmetProvider>
      <Hero />
      <Process />
      {/* <About /> */}
      <Contact />
    </div>
  );
}
