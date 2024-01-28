import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import PageTitle from "@/components/PageTitle";
import Profile from "@/components/Profile";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Mypage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return (
    <div>
      <PageTitle name="마이페이지" />

      <div className={styles.me}>
        <Profile
          user={
            user ? { ...user, username: user.user_metadata.username } : null
          }
        />
      </div>

      <ul className={styles.myNav}>
        <li>
          <Link href="/mypage/me" className={styles.link}>
            내정보
          </Link>
        </li>
        <li>
          <Link href="/mypage/liked" className={styles.link}>
            좋아한 책
          </Link>
        </li>
        <li>
          <Link href="/mypage/comment" className={styles.link}>
            내가작성한 글
          </Link>
        </li>
        <li>
          <Link href="/mypage/notice" className={styles.link}>
            공지사항
          </Link>
        </li>
        <li>
          <Link href="/mypage/faq" className={styles.link}>
            자주묻는질문
          </Link>
        </li>
      </ul>
    </div>
  );
}
