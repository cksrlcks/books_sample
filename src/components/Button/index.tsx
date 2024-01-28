import React from "react";
import styles from "./styles.module.css";

export default function Button({
  children,
  bg,
  onClick,
}: {
  children: React.ReactNode;
  bg?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={`${styles.button} ${bg ? styles[bg] : ""}`}>
      {children}
    </button>
  );
}
