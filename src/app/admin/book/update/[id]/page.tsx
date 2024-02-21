"use client";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { PutBlobResult } from "@vercel/blob";
import Image from "next/image";

export default function UpdateBookPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    writter: yup.string().required(),
    publisher: yup.string().required(),
  });
  type FormData = yup.InferType<typeof schema>;

  const { data, isLoading, mutate } = useSWR(`/api/book/${params.id}`);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [newImg, setNewImg] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    description,
    writter,
    publisher,
  }) => {
    try {
      let newBlob;

      if (newImg) {
        if (!inputFileRef.current?.files) {
          throw new Error("No file selected");
        }

        const file = inputFileRef.current.files[0];

        const response = await fetch(`/api/book/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        newBlob = (await response.json()) as PutBlobResult;
        setBlob(newBlob);
      }
      await fetch(`/api/book/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          coverImgUrl: newImg ? newBlob?.url : data.cover_img_url,
          name,
          description,
          writter,
          publisher,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    mutate();
    router.push("/admin/book");
  };

  const handleNewImage = () => {
    setNewImg(true);
  };

  if (isLoading) {
    return <div>책정보 가져오는중</div>;
  }
  return (
    <>
      <h2>책수정하기</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        {!newImg && (
          <Image
            src={data.cover_img_url}
            width={140}
            height={200}
            alt={data.name}
          />
        )}
        <br />
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          onChange={handleNewImage}
        />
        <br />
        <input
          type="text"
          {...register("name")}
          placeholder="책이름"
          defaultValue={data.name}
        />
        <br />
        <input
          type="text"
          {...register("description")}
          placeholder="책설명"
          defaultValue={data.description}
        />
        <br />
        <input
          type="text"
          {...register("writter")}
          placeholder="작가"
          defaultValue={data.writter}
        />
        <br />
        <input
          type="text"
          {...register("publisher")}
          placeholder="출판사"
          defaultValue={data.publisher}
        />
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
