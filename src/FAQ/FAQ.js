import Container from "../Components/Container/Container";
import FAQCard from "../Components/FAQCard/FAQCard";
import PrimarySection from "../Components/Section/PrimarySection";
import styles from "./FAQ.module.css";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function FAQ() {
  return (
    <PrimarySection py="50px">
      <Container className="row p-0 m-0">
        <PageTitle textAlign="center" mb="50px">
          Frequently Asked Questions
        </PageTitle>
        <div className="col-12 col-lg-7 p-0">
          <FAQCard
            question="What is a dummy ticket?"
            answer={`A dummy ticket is a "fake" ticket used by travelers to show as a proof of travel, especially during visa procedures.`}
          />
          <FAQCard question="Why do I need a dummy ticket?" />
          <FAQCard question="How do I get a dummy ticket?" />
          <FAQCard question="Can I trust My Dummy Ticket with getting a dummy ticket for myself?" />
          <FAQCard question="Do I need a dummy ticket for a Schengen visa application?" />
        </div>
        <div className="col-12 col-lg-5"></div>
      </Container>
    </PrimarySection>
  );
}
