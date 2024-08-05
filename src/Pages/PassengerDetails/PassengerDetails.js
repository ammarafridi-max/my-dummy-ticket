import { useState, useEffect } from "react";
import styles from "./PassengerDetails.module.css";
import Counter from "../../Components/FormElements/Counter";
import Label from "../../Components/FormElements/Label";
import SelectTitle from "../../Components/FormElements/SelectTitle";
import Input from "../../Components/FormElements/Input";

export default function PassengerDetails() {
  const [passengers, setPassengers] = useState([]);
  const [quantity, setQuantity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  function updatePassenger(index, field, value) {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  useEffect(() => {
    const newPassengers = [];
    let adults = 0;
    let children = 0;
    let infants = 0;

    passengers.forEach((passenger) => {
      if (passenger.type === "Adult" && adults < quantity.adults) {
        newPassengers.push(passenger);
        adults += 1;
      } else if (passenger.type === "Child" && children < quantity.children) {
        newPassengers.push(passenger);
        children += 1;
      } else if (passenger.type === "Infant" && infants < quantity.infants) {
        newPassengers.push(passenger);
        infants += 1;
      }
    });

    while (adults < quantity.adults) {
      newPassengers.push({
        type: "Adult",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      adults += 1;
    }
    while (children < quantity.children) {
      newPassengers.push({
        type: "Child",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      children += 1;
    }
    while (infants < quantity.infants) {
      newPassengers.push({
        type: "Infant",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      infants += 1;
    }

    setPassengers(newPassengers);
  }, [quantity]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Passenger Information</h2>
        <div>
          <Count
            adultCount={quantity.adults}
            childrenCount={quantity.children}
            infantCount={quantity.infants}
            onAdultAdd={() => {
              setQuantity((q) => ({
                ...q,
                adults: q.adults < 10 ? q.adults + 1 : q.adults,
              }));
            }}
            onAdultSubtract={() => {
              setQuantity((q) => ({
                ...q,
                adults: q.adults > 1 ? q.adults - 1 : q.adults,
              }));
            }}
            onChildrenAdd={() =>
              setQuantity((q) => ({
                ...q,
                children: q.children < 10 ? q.children + 1 : q.children,
              }))
            }
            onChildrenSubtract={() =>
              setQuantity((q) => ({
                ...q,
                children: q.children > 0 ? q.children - 1 : q.children,
              }))
            }
            onInfantAdd={() =>
              setQuantity((q) => ({
                ...q,
                infants: q.infants < 10 ? q.infants + 1 : q.infants,
              }))
            }
            onInfantSubtract={() =>
              setQuantity((q) => ({
                ...q,
                infants: q.infants > 0 ? q.infants - 1 : q.infants,
              }))
            }
          />
        </div>

        {(() => {
          let adultCount = 0;
          let childCount = 0;
          let infantCount = 0;

          return passengers.map((passenger, index) => {
            let label;
            if (passenger.type === "Adult") {
              adultCount += 1;
              label = `Adult ${adultCount}`;
            } else if (passenger.type === "Child") {
              childCount += 1;
              label = `Child ${childCount}`;
            } else if (passenger.type === "Infant") {
              infantCount += 1;
              label = `Infant ${infantCount}`;
            }

            return (
              <div key={index}>
                <Label required>{label}</Label>
                <div className="row mb-2">
                  <div className={styles.Title}>
                    <SelectTitle
                      value={passenger.title}
                      onChange={(e) =>
                        updatePassenger(index, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.Name}>
                    <Input
                      type="text"
                      required
                      name={`firstName${index}`}
                      id={`firstName${index}`}
                      placeholder="First Name"
                      value={passenger.firstName}
                      onChange={(e) =>
                        updatePassenger(index, "firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.Name}>
                    <Input
                      type="text"
                      required
                      name={`lastName${index}`}
                      id={`lastName${index}`}
                      placeholder="Last Name"
                      value={passenger.lastName}
                      onChange={(e) =>
                        updatePassenger(index, "lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </form>
    </>
  );
}

function Count(props) {
  return (
    <div className={`row ${styles.CountSection} p-0 mx-0`}>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Adults <span className={styles.Age}>(12+)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onAdultAdd}
          onSubtract={props.onAdultSubtract}
        >
          {props.adultCount}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Children <span className={styles.Age}>(2 - 11)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onChildrenAdd}
          onSubtract={props.onChildrenSubtract}
        >
          {props.childrenCount}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Infants <span className={styles.Age}>(0 - 1)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onInfantAdd}
          onSubtract={props.onInfantSubtract}
        >
          {props.infantCount}
        </Counter>
      </div>
    </div>
  );
}
