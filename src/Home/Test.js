import { useState, useEffect } from "react";

export default function Test() {
  const [airportCode, setAirportCode] = useState("");
  const [airportList, setAirportList] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ebe9ec1940msh979480d76c87d13p1b618fjsnc41978c04259",
      "X-RapidAPI-Host": "travel-hacking-tool.p.rapidapi.com",
    },
  };
  useEffect(
    function () {
      fetch(
        "https://travel-hacking-tool.p.rapidapi.com/api/listairports/",
        options
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
    [airportCode]
  );

  return (
    <div>
      <input
        type="text"
        value={airportCode}
        onChange={(e) => {
          setAirportCode(e.target.value);
        }}
      />
    </div>
  );
}
