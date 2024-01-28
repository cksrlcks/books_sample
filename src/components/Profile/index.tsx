import { User } from "@/types/user";
import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import Button from "../Button";
export default function Profile({ me }: { me: User }) {
  const handleSignOut = () => {
    console.log("로그아웃");
  };
  return (
    <>
      <figure className={styles.avatar}>
        {me.image ? (
          <img src={me.image} alt={me.username} />
        ) : (
          <div className={styles.defaultImage}></div>
        )}
      </figure>
      <div className={styles.name}>{me.username}님 안녕하세요.</div>
      <div className={styles.email}>{me.email}</div>
      <Button onClick={handleSignOut}>로그아웃</Button>
    </>
  );
}
