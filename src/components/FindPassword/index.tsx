"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/AuthContext";
import Inner from "@/components/Inner";
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
});

type FormData = yup.InferType<typeof schema>;

export default function Signin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { findPassword } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    const { data, error } = await findPassword({
      email: email,
    });
    if (error) {
      setError(translateErrorMessage(error.message));
      return;
    }
    alert(`${email}로 비밀번호 재설정 메일을 보냈습니다.`);
    router.replace("/");
  };

  return (
    <>
      <Inner>
        <PageTitle name="비밀번호 찾기" heading={3} />
        {error && <div className={styles.formError}>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="이메일"
            register={register("email")}
            error={errors.email}
          />

          {isSubmitting ? (
            <div>처리중...</div>
          ) : (
            <Button type="submit">비밀번호 재설정 메일보내기</Button>
          )}
        </form>
      </Inner>
    </>
  );
}
