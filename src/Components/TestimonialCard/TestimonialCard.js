import styles from "./TestimonialCard.module.css";
import img from "./david.png";

export default function TestimonialCard({ name, src, children }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.ImageContainer}>
        <img src={src} />
      </div>
      <p className={styles.Author}>{name}</p>
      <div className={styles.Content}>
        <p>{children}</p>
      </div>
    </div>
  );
}

// alt={`Testimonial about City Tours UAE by ${name}`}
