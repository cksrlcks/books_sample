"use client";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import Inner from "@/components/Inner";
import { translateErrorMessage } from "@/lib/supabase/errorMessage";
import { useUser } from "@/context/AuthContext";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("정확한 이메일을 입력해주세요")
    .required("이메일을 입력해주세요"),
  password: yup
    .string()
    .min(6, "비밀번호는 최소6자이상으로 해주세요")
    .required("비밀번호를 입력해주세요"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호를 똑같이 입력해주세요"),
  username: yup
    .string()
    .min(2, "최소 2자 이상으로 적어주세요")
    .required("닉네임을 입력해주세요"),
});

type FormData = yup.InferType<typeof schema>;

export default function Singup() {
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({
    email,
    password,
    username,
  }) => {
    const { data, error } = await signUp({
      email: email,
      password: password,
      username: username,
    });

    if (error) {
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
        {error && <div className={styles.formError}>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="이메일"
            register={register("email")}
            error={errors.email}
          />
          <Input
            label="비밀번호"
            register={register("password")}
            error={errors.password}
          />
          <Input
            label="비밀번호확인"
            register={register("passwordConfirm")}
            error={errors.passwordConfirm}
          />
          <Input
            label="이름"
            register={register("username")}
            error={errors.username}
          />
          {isSubmitting ? (
            "회원가입 진행중..."
          ) : (
            <Button type="submit">회원가입</Button>
          )}
        </form>
      </Inner>
    </>
  );
}
