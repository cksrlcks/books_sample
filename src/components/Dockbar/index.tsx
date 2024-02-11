"use client";
import styles from "./style.module.css";
import ActiveLink from "./ActiveLink";
import { useEffect, useRef, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useUser } from "@/context/AuthContext";
export default function Dockbar() {
  const { profile } = useUser();
  const segement = useSelectedLayoutSegment();
  const [currentIdx, setCurrentIdx] = useState<string | null>(null);
  useEffect(() => {
    if (segement === "book") {
      setCurrentIdx("1");
    } else if (segement === "mypage") {
      setCurrentIdx("2");
    } else if (segement === null) {
      setCurrentIdx("0");
    } else {
      setCurrentIdx("none");
    }
  }, [segement]);

  const NavLinks = [
    { id: 1, name: "홈", path: "/" },
    { id: 2, name: "책", path: "/book" },
    { id: 3, name: "마이", path: "/mypage" },
  ];
  return (
    <nav className={styles.nav}>
      <div className={`${styles.navwrapper}`}>
        <span
          className={`${styles.pin} ${
            currentIdx ? styles[`index-${currentIdx}`] : styles.hide
          }`}
        >
          <span className={styles.bar}></span>
        </span>
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
      </div>
    </nav>
  );
}
