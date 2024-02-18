import React from "react";
import styles from "./style.module.css";
import ActiveLink from "./ActiveLink";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <ActiveLink
                href="/admin"
                activeCss={styles.active}
                className={styles.navItem}
              >
                대시보드
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                href="/admin/book"
                activeCss={styles.active}
                className={styles.navItem}
              >
                책관리
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                href="/admin/comment"
                activeCss={styles.active}
                className={styles.navItem}
              >
                코멘트관리
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                href="/admin/notice"
                activeCss={styles.active}
                className={styles.navItem}
              >
                공지사항
              </ActiveLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.inner}>{children}</div>
      </main>
    </>
  );
}
