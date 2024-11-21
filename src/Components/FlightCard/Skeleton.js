import React from "react";
import styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonDetails}>
          <div className={styles.skeletonTextShort}></div>
          <div className={styles.skeletonTextLong}></div>
        </div>
      </div>
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonDetail}></div>
        <div className={styles.skeletonDetail}></div>
      </div>
      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonPrice}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
}
