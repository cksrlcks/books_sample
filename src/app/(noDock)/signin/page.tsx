"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Inner from "@/components/Inner";
import { useUser } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function signIn() {
  const { signInWithPassword, signInWithGoogle } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert("로그인을 실패했습니다.");
    }
    if (data.user) {
      router.replace("/mypage");
    }
  };

  const handleGoogleSignin = async () => await signInWithGoogle();

  return (
    <>
      <BackButton />
      <Inner>
        <div className={styles.pageTitle}>로그인</div>
        <button onClick={handleGoogleSignin} className={styles.google}>
          <FcGoogle /> <span className={styles.text}>구글로그인하기</span>
        </button>
        <div className={styles.hr} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            label="아이디"
            value={formData.email}
            name="email"
            placeholder="아이디를 입력해주세요"
            onChange={handleChange}
          />
          <Input
            type="password"
            label="비밀번호"
            value={formData.password}
            name="email"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
          />
          <Button type="submit">로그인</Button>
        </form>
      </Inner>
    </>
  );
}
