"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signInWithPassword } from "@/services/authClient";
export default function signIn() {
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

  const handleGoogleSignin = async () => {
    const { data, error } = await signInWithGoogle();

    // if (error) {
    //   alert("로그인을 실패했습니다.");
    //   return;
    // }
    // router.replace("/mypage");
  };

  return (
    <div>
      <div>
        <BackButton />
      </div>
      <div>로그인 페이지</div>
      <div>
        <div>구글로그인</div>
        <button onClick={handleGoogleSignin}>구글로그인하기</button>
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
