import styles from './Testimonials.module.css';
import { useEffect, useState } from 'react';
import { HiStar } from 'react-icons/hi2';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import testimonialImage from '../../../assets/images/testimonial.png';
import Container from '../../../components/Container/Container';
import PrimarySection from '../../../components/Section/PrimarySection';
import SectionTitle from '../../../components/Typography/SectionTitle';
import Paragraph from '../../../components/Typography/Paragraph';

const testimonials = [
  {
    id: 1,
    author: 'Justin D-Souza',
    text: 'Well first would like to appriciate Umar for all this help at non working hours to be precise 7am today get my dummy ticket issued without any trouble just few hours from my travel. Appreciate the assistance. Keep up the good job and assistance.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Waseem Moosa K.',
    text: 'The booking confirmation was instant, and I received all the necessary details in my email immediately. I also liked how transparent the pricing was—no hidden fees, which made the whole experience even more pleasant. The customer service team was also very responsive and helpful with any questions I had.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Tricia Domingo',
    text: 'Thanks Omar for your assistance with our dummy tickets. We were approved a Schengen Multiple Entry visa! We will definitely get in touch with you again when we apply for another visa in the future.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleIncrease() {
    if (activeIndex < testimonials.length - 1) {
      setActiveIndex((index) => index + 1);
    } else {
      setActiveIndex(0);
    }
  }

  function handleDecrease() {
    if (activeIndex > 0) {
      setActiveIndex((index) => index - 1);
    } else {
      setActiveIndex(testimonials.length - 1);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <PrimarySection pt="100px" backgroundColor="white">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="What our customers say about us"
        >
          Testimonials
        </SectionTitle>
        <div className={styles.container}>
          <div className={styles.image}>
            <img src={testimonialImage} />
          </div>
          <div className={styles.slider}>
            <span>
              <FaCircleChevronLeft
                className={styles.chevronLeft}
                onClick={handleDecrease}
              />
            </span>
            <div>
              <Card
                text={testimonials[activeIndex].text}
                author={testimonials[activeIndex].author}
                rating={testimonials[activeIndex].rating}
              />
            </div>
            <span>
              <FaCircleChevronRight
                className={styles.chevronRight}
                onClick={handleIncrease}
              />
            </span>
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}

function Card({ text, author, rating }) {
  return (
    <div>
      <Paragraph
        fontWeight="300"
        fontSize="20px"
        className={styles.testimonialText}
      >
        {text}
      </Paragraph>
      <div className={styles.author}>
        <Paragraph fontWeight={500} fontSize="20px">
          {author}
        </Paragraph>
      </div>
      {Array.from({ length: rating }, () => (
        <HiStar className={styles.starIcon} />
      ))}
    </div>
  );
}
