import { useState } from "react";
import Container from "../Components/Container/Container";
import Select from "../Components/FormElements/Select";
import { OptionsDiv, Option } from "../Components/FormElements/Select";
import airports from "airport-codes/airports.json";

export default function About() {
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAirport, setSelectedAirport] = useState("");
  const [airportsData, setAirportsData] = useState([
    { city: "Dubai", code: "DXB" }, // Sample data
    { city: "New York", code: "JFK" }, // Sample data
    { city: "London", code: "LHR" }, // Sample data
  ]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowOptions(true);
  };

  const handleSelectAirport = (airport) => {
    setSelectedAirport(airport);
    setSearchTerm(airport);
    setShowOptions(false);
  };

  return (
    <div>
      <Container>
        <Select
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => {
            setShowOptions(true);
          }}
          placeholder="Search for an airport..."
        >
          {showOptions && <OptionsDiv></OptionsDiv>}
        </Select>
      </Container>
    </div>
  );
}
