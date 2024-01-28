import React from "react";
import styles from "./style.module.css";

export default function PageTitle({ name }: { name: string }) {
  return <h2 className={styles.title}>{name}</h2>;
}
