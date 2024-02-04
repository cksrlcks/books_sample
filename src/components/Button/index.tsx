"use client";
import React from "react";
import styles from "./styles.module.css";

export type ButtonProps = {
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  bg?: string;
  disabled?: boolean;
};
export default function Button({
  type = "button",
  onClick,
  children,
  bg = "black",
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${bg ? styles[bg] : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
