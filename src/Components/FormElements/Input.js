import styles from "./Input.module.css";

export default function Input({
  icon,
  type,
  placeholder,
  value,
  style,
  onClick,
  onChange,
  onFocus,
  id,
  name,
  autoComplete,
  pattern,
  min,
  max,
  className,
}) {
  return (
    <div className={`${styles.InputDiv} ${className}`}>
      {icon && <span className={styles.Icon}>{icon}</span>}
      <input
        type={type}
        className={styles.Input}
        placeholder={placeholder}
        value={value}
        style={style}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        id={id}
        name={name}
        autoComplete={autoComplete}
        pattern={pattern}
        min={min}
        max={max}
      />
    </div>
  );
}
