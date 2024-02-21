"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { PutBlobResult } from "@vercel/blob";

export default function page() {
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    writter: yup.string().required(),
    publisher: yup.string().required(),
  });
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    description,
    writter,
    publisher,
  }) => {
    try {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const response = await fetch(`/api/book/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);

      await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify({
          coverImgUrl: newBlob.url,
          name,
          description,
          writter,
          publisher,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    router.push("/admin/book");
  };

  return (
    <>
      <h2>책추가하기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input
          type="text"
          {...register("coverImgUrl")}
          placeholder="책커버이미지 url"
        /> */}
        <input name="file" ref={inputFileRef} type="file" required />
        <br />
        <input type="text" {...register("name")} placeholder="책이름" />
        <br />
        <input type="text" {...register("description")} placeholder="책설명" />
        <br />
        <input type="text" {...register("writter")} placeholder="작가" />
        <br />
        <input type="text" {...register("publisher")} placeholder="출판사" />
        <br />
        {!isSubmitting ? (
          <button type="submit">등록하기</button>
        ) : (
          <div>등록중...</div>
        )}
      </form>
    </>
  );
}
