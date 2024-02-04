"use client";

import { Book } from "@/types/book";
import React from "react";
import Inner from "../Inner";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import Button from "../Button";
import styles from "./style.module.css";
import { getUserName } from "@/app/util/getUserName";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  comment: yup
    .string()
    .min(2, "최소 2자이상으로 써주세요")
    .max(100, "100자 이내로 작성해주세요")
    .required("내용을 작성해주세요"),
});
type FormData = yup.InferType<typeof schema>;

export default function CommentForm({
  user,
  book,
  onClose,
}: {
  user: User;
  book: Book;
  onClose: () => void;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FormData> = async ({ comment }) => {
    if (!user) {
      alert("로그인이 필요합니다.");
    }
    try {
      await fetch(`/api/comment`, {
        method: "POST",
        body: JSON.stringify({
          id: book.id,
          user_id: user?.id,
          username: getUserName(user),
          email: user.email,
          comment,
        }),
      });

      handleClose();
    } catch (error) {
      //console.log(error);
    }

    router.refresh();
  };

  return (
    <Inner style={{ marginBottom: "50px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="한줄평작성하기"
          register={register("comment")}
          error={errors.comment}
        />
        <div className={styles.actionBar}>
          <Button type="button" bg="white" onClick={handleClose}>
            닫기
          </Button>
          {isSubmitting ? (
            <Button>저장중...</Button>
          ) : (
            <Button type="submit">작성</Button>
          )}
        </div>
      </form>
    </Inner>
  );
}
