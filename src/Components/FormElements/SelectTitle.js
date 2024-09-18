import { useState } from "react";
import styles from "./SelectTitle.module.css";
import { FaUser, FaUserCircle, FaUserAlt, FaUserTie } from "react-icons/fa";

export default function SelectTitle({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const titles = [
    { value: "Mr.", icon: <FaUserTie /> },
    { value: "Mrs.", icon: <FaUserCircle /> },
    { value: "Ms.", icon: <FaUserAlt /> },
  ];

  const handleSelect = (title) => {
    onChange({ target: { value: title } });
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.selectedItem} onClick={() => setIsOpen(!isOpen)}>
        <span>
          {" "}
          {titles.find((title) => title.value === value)?.icon || (
            <FaUser />
          )}{" "}
        </span>
        <span style={{ marginLeft: 15 }}> {value}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {titles.map((title) => (
            <div
              key={title.value}
              className={styles.dropdownItem}
              onClick={() => handleSelect(title.value)}
            >
              {title.icon} {title.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
