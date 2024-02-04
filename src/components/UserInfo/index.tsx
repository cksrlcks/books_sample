"use client";
import { getUserName } from "@/app/util/getUserName";
import { useUser } from "@/context/AuthContext";
import Avatar from "../Avatar";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserInfo() {
  const router = useRouter();
  const { user, signOut } = useUser();
  const avatar = user && user.user_metadata?.avatar_url;
  const username = user && getUserName(user);
  const date = user && new Date(user.created_at);

  const handlePasswordChange = async () => {};

  const handleWithdrawal = async () => {
    if (
      confirm(
        "회원탈퇴를 하시면 작성하신 글과 좋아요가 삭제됩니다. 탈퇴하시겠습니까?"
      ) &&
      user
    ) {
      await fetch("/auth/withdrawal", {
        method: "POST",
        body: JSON.stringify({
          user_id: user.id,
        }),
      });
      signOut();
      router.push("/");
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
      <div className={styles.action}>
        <Link href="/mypage/password" className={styles.button}>
          비밀번호변경
        </Link>
        <button className={styles.button} onClick={handleWithdrawal}>
          회원탈퇴
        </button>
      </div>
    </>
  );
}
