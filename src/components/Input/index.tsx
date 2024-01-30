import { ChangeEvent } from "react";
import styles from "./style.module.css";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error?: string | null;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className={styles.input}>
        <input
          type={type}
          id={label}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
