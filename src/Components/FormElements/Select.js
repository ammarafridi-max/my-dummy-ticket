import { useState } from "react";
import styles from "./Select.module.css";

export function Option(props) {
  return (
    <li value={props.value} className={styles.Option} onClick={props.onClick}>
      {props.children}
    </li>
  );
}

export function OptionsDiv(props) {
  return <div className={styles.OptionsDiv}>{props.children}</div>;
}

export default function Select(props) {
  return (
    <div>
      <div className={styles.SelectDiv}>
        <input
          type="text"
          onChange={props.onChange}
          onClick={props.onClick}
          className={styles.Select}
          value={props.value}
          placeholder={props.placeholder}
        />
      </div>
      {props.children}
    </div>
  );
}
