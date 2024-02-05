"use client";
import { useRouter } from "next/navigation";
import Inner from "@/components/Inner";
import { translateErrorMessage } from "@/app/util/errorMessage";
import { useUser } from "@/context/AuthContext";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import PageTitle from "../PageTitle";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "비밀번호는 최소6자이상으로 해주세요")
    .required("비밀번호를 입력해주세요"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호를 똑같이 입력해주세요"),
});

type FormData = yup.InferType<typeof schema>;

export default function PasswordChange() {
  const [error, setError] = useState<string | null>(null);
  const { passwordChange } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    const { data, error } = await passwordChange({
      new_password: password,
    });

    if (error) {
      setError(translateErrorMessage(error.message));
    }
    if (data.user) {
      router.push("/mypage");
    }
  };

  return (
    <>
      <Inner>
        <PageTitle name="비밀번호 재설정" heading={3} />
        {error && <div className={styles.formError}>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="비밀번호"
            type="password"
            register={register("password")}
            error={errors.password}
          />
          <Input
            label="비밀번호확인"
            type="password"
            register={register("passwordConfirm")}
            error={errors.passwordConfirm}
          />
          {isSubmitting ? (
            "패스워드 변경중..."
          ) : (
            <Button type="submit">변경하기</Button>
          )}
        </form>
      </Inner>
    </>
  );
}
