import Inner from "../Inner";
import styles from "./style.module.css";
import Skeleton from "react-loading-skeleton";
export default function Loading() {
  return (
    <div className={styles.skeleton}>
      <figure className={styles.frame}>
        <Skeleton className={styles.img} />
      </figure>
      <Inner>
        <Skeleton className={styles.bookName} />
        <Skeleton className={styles.writter} />
        <Skeleton className={styles.bookDate} />
        <Skeleton className={styles.bookText} />
      </Inner>
    </div>
  );
}
