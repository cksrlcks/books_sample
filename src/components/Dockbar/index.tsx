import styles from "./style.module.css";
import ActiveLink from "./ActiveLink";
import Pin from "./Pin";

export default async function Dockbar() {
  const NavLinks = [
    { id: 1, name: "홈", path: "/" },
    { id: 2, name: "책", path: "/book" },
    { id: 3, name: "마이", path: "/mypage" },
  ];
  return (
    <>
      <nav className={styles.nav}>
        <div className={`${styles.navwrapper}`}>
          <Pin />
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
    </>
  );
}
