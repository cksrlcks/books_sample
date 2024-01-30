"use client";
import BackButton from "@/components/BackButton";
import React, { ChangeEventHandler, useState } from "react";
import { signUp } from "@/services/authClient";
import { useRouter } from "next/navigation";
import Inner from "@/components/Inner";
export default function singUp() {
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
      alert("회원가입을 실패했습니다.");
    }
    if (data.user) {
      router.push("/");
    }
  };

  return (
    <>
      <BackButton />
      <Inner>
        <div></div>
        <div>회원가입 페이지</div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="이름"
            />
          </div>
          {loading ? (
            "회원가입 진행중..."
          ) : (
            <button type="submit">회원가입</button>
          )}
        </form>
      </Inner>
    </>
  );
}
