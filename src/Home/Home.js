import airports from "airport-codes/airports.json";
import Hero from "./Hero.js";
import Process from "./Process.js";
import About from "./About.js";
import Contact from "./Contact.js";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>MyDummyTicket.ae - Get Your Dummy Ticket Online</title>
      </Helmet>
      <Hero />
      <Process />
      {/* <About /> */}
      <Contact />
    </div>
  );
}
