import styles from "./ReviewDetails.module.css";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import { useEffect } from "react";

export default function ReviewDetails() {

  useEffect(() => {
    async function fetchFlights(){
      try{
        const res = await fetch(``)
      } catch (error){
        console.log(error)
      }
    }
  }, [])

  return (
    <PrimarySection py="100px">
      <Container>
        <h2>Review Your Details</h2>
      </Container>
    </PrimarySection>
  );
}
