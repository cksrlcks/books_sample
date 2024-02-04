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
import { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import { createClient } from "@/lib/supabase/client";
import { passwordChange } from "@/services/authClient";

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

export default function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      setAccessToken(hashParams.get("access_token") || "");
      setRefreshToken(hashParams.get("refresh_token") || "");
    }
  }, []);

  useEffect(() => {
    // Authenticate the user using the access token and refresh token
    const supabase = createClient();
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          alert(`문제가 발생했습니다.: ${error.message}`);
        }
      }
    };
    if (accessToken && refreshToken) {
      getSessionWithTokens();
    }
  }, [accessToken, refreshToken]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    const { data, error } = await passwordChange({ new_password: password });
    if (error) {
      console.log(error.message);
      alert("비밀번호 변경에 실패했습니다.");
      return;
    }
    alert("비밀번호 변경에 성공했습니다.");
    router.push("/");
  };

  return (
    <>
      <BackButton path="/mypage" />
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
