"use client";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import { User } from "@supabase/supabase-js";
import Button from "../Button";
import BeforeLogin from "../BeforeLogin";
import { useUser } from "@/context/AuthContext";
export default function Profile({ user }: { user: User | null }) {
  const router = useRouter();
  const { user: updatedUser, signOut } = useUser();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  const avatar = user && user.user_metadata.avatar_url;
  const username =
    user &&
    (user.user_metadata.name ||
      user?.user_metadata.full_name ||
      user?.user_metadata.username ||
      "");
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
          <div>내가쓴 코멘트수, 좋아요한 숫자 넣기(csr)</div>
          <br />
          <Button onClick={handleLogout}>로그아웃</Button>
        </>
      ) : (
        <BeforeLogin />
      )}
    </>
  );
}
