import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ name, image, children }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.ImageContainer}>
        <img src={image} alt={`Testimonial about City Tours UAE by ${name}`} />
      </div>
      <div className={styles.Content}>
        <p>{children}</p>
        <p className={styles.Author}>{name}</p>
      </div>
    </div>
  );
}
