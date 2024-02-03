import React from "react";
import styles from "./style.module.css";
export default function PageTitle({
  name,
  heading = 2,
}: {
  name: string;
  heading?: number;
}) {
  if (heading === 2) {
    return <h2 className={styles.title}>{name}</h2>;
  } else if (heading === 3) {
    return <h3 className={styles.title}>{name}</h3>;
  } else {
    return <div className={styles.title}>{name}</div>;
  }
}
