import { useState } from "react";
import styles from "./SelectTitle.module.css";

export default function SelectTitle({ value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const titles = [{ value: "Mr." }, { value: "Mrs." }, { value: "Ms." }];

  const handleSelect = (title) => {
    onChange({ target: { value: title } });
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      <div className={styles.selectedItem} onClick={() => setIsOpen(!isOpen)}>
        {/* <span className={styles.icon}>
          {titles.find((title) => title.value === value)?.icon || <FaUser />}
        </span> */}
        <span>{value}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {titles.map((title) => (
            <div
              key={title.value}
              className={styles.dropdownItem}
              onClick={() => handleSelect(title.value)}
            >
              {title.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
