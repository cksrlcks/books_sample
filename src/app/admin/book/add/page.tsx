"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export default function page() {
  const router = useRouter();
  const schema = yup.object().shape({
    coverImgUrl: yup.string().required(),
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

  const onSubmit: SubmitHandler<FormData> = async ({
    coverImgUrl,
    name,
    description,
    writter,
    publisher,
  }) => {
    try {
      await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify({
          coverImgUrl,
          name,
          description,
          writter,
          publisher,
        }),
      });
    } catch (error) {
      alert(error);
    }

    router.push("/admin/book");
  };

  return (
    <>
      <h2>책추가하기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("coverImgUrl")}
          placeholder="책커버이미지 url"
        />
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
