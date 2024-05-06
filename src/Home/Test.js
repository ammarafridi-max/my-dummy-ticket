import { useState, useEffect } from "react";
import styles from "./Test.module.css";

export default function Test() {
  const review = [
    {
      key: 1,
      value: 0,
      text: "Dissatisfied",
    },
    {
      key: 2,
      value: 5,
      text: "OK",
    },
    {
      key: 3,
      value: 10,
      text: "Very Good",
    },
    {
      key: 4,
      value: 20,
      text: "Amazing",
    },
  ];

  const [bill, setBill] = useState();
  const [user1Tip, setUser1Tip] = useState();
  const [user2Tip, setUser2Tip] = useState();

  const tip = Number(bill * ((user1Tip + user2Tip) / 2 / 100));

  function handleChange(e) {
    setBill(e.target.value);
  }

  return (
    <div className="col-lg-10 mx-auto">
      <p>
        How much was the bill?
        <input type="text" value={bill} onChange={handleChange} />
      </p>
      <p>
        How did you like the food?
        <select onChange={(e) => setUser1Tip(e.target.value)}>
          {review.map((review) => {
            return (
              <option
                id={review.key}
                value={review.value}
              >{`${review.text} (${review.value})`}</option>
            );
          })}
        </select>
      </p>
      <p>
        How did your friend like the food?
        <select onChange={(e) => setUser2Tip(e.target.value)}>
          {review.map((review) => {
            return (
              <option
                id={review.key}
                value={review.value}
              >{`${review.text} (${review.value})`}</option>
            );
          })}
        </select>
      </p>
      <p>Total: ${bill}</p>
      <p>Tip: {tip}</p>
    </div>
  );
}
