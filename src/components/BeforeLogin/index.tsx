import Link from "next/link";
import React from "react";
import styles from "./style.module.css";
import Button from "../Button";

export default function BeforeLogin() {
  return (
    <>
      <div className={styles.guide}> 로그인을 해주세요.</div>
      <div className={styles.action}>
        <Link href="/mypage/signin" className={styles.link}>
          <Button>로그인</Button>
        </Link>
        <Link href="/mypage/signup" className={styles.link}>
          <Button bg={"white"}>회원가입</Button>
        </Link>
      </div>
    </>
  );
}
