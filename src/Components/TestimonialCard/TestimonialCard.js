import styles from "./TestimonialCard.module.css";
import img from "./david.png";

export default function TestimonialCard({ title, name, src, children, type }) {
  return (
    <div
      className={`${styles.testimonialCard} ${
        type === "secondary" && styles.secondary
      }`}
    >
      <h3 className={styles.Title}>{title}</h3>
      <div className={styles.Content}>
        <p>{children}</p>
      </div>
      <p className={styles.Author}>{name}</p>
      <div className={styles.ImageContainer}>
        <img
          src={src}
          alt={`Testimonial by ${name} about My Dummy Ticket`}
          title={`Testimonial by ${name} about My Dummy Ticket`}
        />
      </div>
    </div>
  );
}
