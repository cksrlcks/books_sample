import styles from "./style.module.css";

export default function Latest({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.title}>{title}</div>
      {children}
    </section>
  );
}
