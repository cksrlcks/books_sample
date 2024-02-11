"use client";
import { getUserName } from "@/app/util/getUserName";
import { useUser } from "@/context/AuthContext";
import Avatar from "../Avatar";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function UserInfo() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, signOut } = useUser();
  const avatar = user && user.user_metadata?.avatar_url;
  const username = user && getUserName(user);
  const date = user && new Date(user.created_at);

  const handleWithdrawal = async () => {
    if (
      confirm(
        "회원탈퇴를 하시면 작성하신 글과 좋아요가 삭제됩니다. 탈퇴하시겠습니까?"
      ) &&
      user
    ) {
      setIsLoading(true);

      signOut();

      const res = await fetch("/auth/withdrawal", {
        method: "POST",
        body: JSON.stringify({
          user_id: user.id,
        }),
      });

      if (res.ok) {
        router.refresh();
        router.replace("/");
      } else {
        console.log(res);
        alert("탈퇴에 문제가 생겼습니다.");
      }
    }
  };
  return (
    <>
      {user && (
        <div className={styles.profile}>
          <Avatar avatar={avatar} username={username} />
          <span className={styles.name}>{username}</span>
          <span className={styles.email}>{user.email}</span>
          <span className={styles.date}>
            가입일 : {date?.toLocaleDateString("ko-KR")}
          </span>
        </div>
      )}
      {isLoading ? (
        <>회원탈퇴중...</>
      ) : (
        <div className={styles.action}>
          <Link href="/mypage/password" className={styles.button}>
            비밀번호변경
          </Link>
          <button className={styles.button} onClick={handleWithdrawal}>
            회원탈퇴
          </button>
        </div>
      )}
    </>
  );
}
