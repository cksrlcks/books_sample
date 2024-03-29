"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Inner from "@/components/Inner";
import { useUser } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/Input";
import Button from "@/components/Button";
import PageTitle from "../PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { translateErrorMessage } from "@/app/util/errorMessage";
import styles from "./style.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("정확한 이메일을 입력해주세요")
    .required("이메일을 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

type FormData = yup.InferType<typeof schema>;

export default function Signin() {
  const [error, setError] = useState<string | null>(null);
  const { signInWithPassword, signInWithGoogle, findPassword } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    const { data, error } = await signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError(translateErrorMessage(error.message));
    }
    if (data.user) {
      router.replace("/mypage");
    }
  };

  const handleGoogleSignin = async () => await signInWithGoogle();
  return (
    <>
      <Inner>
        <PageTitle name="로그인" heading={3} />
        <button onClick={handleGoogleSignin} className={styles.google}>
          <FcGoogle /> <span className={styles.text}>구글로그인하기</span>
        </button>
        <div className={styles.hr} />
        {error && <div className={styles.formError}>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="이메일"
            register={register("email")}
            error={errors.email}
          />
          <Input
            label="비밀번호"
            type="password"
            register={register("password")}
            error={errors.password}
          />
          {isSubmitting ? (
            <div>로그인중입니다...</div>
          ) : (
            <Button type="submit">로그인</Button>
          )}
          <Link href="/mypage/find" className={styles.textButton}>
            비밀번호 찾기
          </Link>
        </form>
      </Inner>
    </>
  );
}
