import Link from "next/link";
import styles from "./style.module.css";
export default function FakeSearchButton({
  placeholder = "검색하기",
}: {
  placeholder: string;
}) {
  return (
    <Link href="/search" className={styles.button}>
      {placeholder}
    </Link>
  );
}
