"use client";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import Button from "../Button";
import BeforeLogin from "../BeforeLogin";
import { useUser } from "@/context/AuthContext";
import { getUserName } from "@/app/util/getUserName";
import ActivityBar from "../Activity";
export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useUser();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  const avatar = user && user.user_metadata?.avatar_url;
  const username = user && getUserName(user);
  return (
    <>
      {user ? (
        <>
          <figure className={styles.avatar}>
            {avatar ? (
              <img src={avatar} alt={username} />
            ) : (
              <div className={styles.defaultImage}>avatar</div>
            )}
          </figure>
          <div className={styles.name}>{username}님 안녕하세요.</div>
          <div className={styles.email}>{user.email}</div>
          <ActivityBar userId={user.id} />
          <br />
          <Button onClick={handleLogout}>로그아웃</Button>
        </>
      ) : (
        <BeforeLogin />
      )}
    </>
  );
}
