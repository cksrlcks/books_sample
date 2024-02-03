"use client";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import Button from "../Button";
import BeforeLogin from "../BeforeLogin";
import { useUser } from "@/context/AuthContext";
import { getUserName } from "@/app/util/getUserName";
import ActivityBar from "../Activity";
import Avvvatars from "avvvatars-react";

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
          <figure className={styles.avatarFrame}>
            {avatar ? (
              <div className={styles.avatar}>
                <img src={avatar} alt={username} />
              </div>
            ) : (
              <Avvvatars
                value={user.email || ""}
                displayValue={username[0]}
                size={70}
              />
            )}
          </figure>
          <div className={styles.name}>{username}님 안녕하세요.</div>
          <div className={styles.email}>{user.email}</div>
          <ActivityBar userId={user.id} />
          <Button onClick={handleLogout}>로그아웃</Button>
        </>
      ) : (
        <BeforeLogin />
      )}
    </>
  );
}
