"use client";
import { useUser } from "@/context/AuthContext";
import styles from "./style.module.css";
import { getUserName } from "@/app/util/getUserName";

export default function Welcome() {
  const { user } = useUser();
  return (
    <>
      <div className={styles.icon}>📖</div>
      <div className={styles.title}>책방에 오신것을 환영합니다.</div>
      <div className={styles.profile}>
        {!user ? (
          <>
            <div className={styles.ment}>
              로그인후 관심있는 책을 즐겨찾기 하고 코멘트도 남겨주세요
            </div>
          </>
        ) : (
          <>
            <span className={styles.username}>{getUserName(user)}님</span>
            행복한하루되세요
          </>
        )}
      </div>
    </>
  );
}
