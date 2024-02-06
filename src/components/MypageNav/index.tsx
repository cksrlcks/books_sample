import Link from "next/link";
import styles from "./style.module.css";

type Menu = {
  name: string;
  url: string;
};

export default function Nav({ menu }: { menu: Menu[] }) {
  return (
    <ul className={styles.myNav}>
      {menu.map((item) => (
        <li key={item.name}>
          <Link href={item.url} className={styles.link}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
