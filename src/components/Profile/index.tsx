"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/types/user";
import { createClient } from "@/lib/supabase/client";
import styles from "./style.module.css";

export default async function Profile({ user }: { user: User | null }) {
  const supabase = createClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <>
      {user ? (
        <>
          <figure className={styles.avatar}>
            {/* {user.image ? (
              <img src={user.image} alt={user.user_metadata.username} />
            ) : (
              
              
            )} */}
            <div className={styles.defaultImage}></div>
          </figure>
          <div className={styles.name}>{user.username}님 안녕하세요.</div>
          <div className={styles.email}>{user.email}</div>
          <br />
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <div>
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      )}
    </>
  );
}
