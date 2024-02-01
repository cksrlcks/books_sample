import { ChangeEvent } from "react";
import styles from "./style.module.css";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

export default function Input({ label, register, error }: Props) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className={styles.input}>
        <input {...register} />
      </div>
      {error?.message}
    </div>
  );
}
