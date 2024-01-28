import Link from "next/link";
import React from "react";
import styles from "./style.module.css";
import ActiveLink from "./ActiveLink";

const NavLinks = [
  { id: 1, name: "홈", path: "/" },
  { id: 2, name: "책", path: "/book" },
  { id: 3, name: "마이", path: "/mypage" },
];

export default function Dockbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        {NavLinks.map((link) => {
          return (
            <li key={link.id}>
              <ActiveLink href={link.path} activeCss={styles.active}>
                {link.name}
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
