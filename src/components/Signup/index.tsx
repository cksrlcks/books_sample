"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Inner from "@/components/Inner";
import { translateErrorMessage } from "@/lib/supabase/errorMessage";
import { useUser } from "@/context/AuthContext";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Singup() {
  const { signUp } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await signUp({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    });

    if (error) {
      setLoading(false);
      setError(translateErrorMessage(error.message));
    }
    if (data.user) {
      router.push("/");
    }
  };

  return (
    <>
      <BackButton />
      <Inner>
        <div className={styles.pageTitle}>회원가입 페이지</div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            name="email"
            label="이메일"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <Input
            type="text"
            name="email"
            label="이름"
            value={formData.username}
            onChange={handleChange}
            placeholder="이름을 입력해주세요"
          />
          {loading ? (
            "회원가입 진행중..."
          ) : (
            <Button type="submit">회원가입</Button>
          )}
        </form>
      </Inner>
    </>
  );
}
