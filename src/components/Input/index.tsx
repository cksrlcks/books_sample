import { ChangeEvent, LegacyRef, forwardRef } from "react";
import styles from "./style.module.css";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
};

export default forwardRef(function Input(
  { label, register, error, type = "text" }: Props,
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className={styles.input}>
        <input {...register} type={type} ref={ref} />
      </div>
      {error?.message}
    </div>
  );
});
