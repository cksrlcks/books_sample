"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import BackButton from "../BackButton";
import Inner from "../Inner";
import LikeBar from "./Like";
import "react-loading-skeleton/dist/skeleton.css";
import { BookData } from "@/types/book";
import Comments from "../Comments";
import CommentForm from "@/components/CommentForm";
import { useUser } from "@/context/AuthContext";
import Timeago from "../Timeago";

export default function BookDetail({ book }: { book: BookData | null }) {
  const [openComment, setOpenComment] = useState(false);
  const { user } = useUser();

  const handleOpen = () => {
    if (!user) {
      alert("로그인을 해주세요");
      return;
    }
    setOpenComment(true);
  };

  const closeComment = () => {
    setOpenComment(false);
  };
  if (!book) return <div>책정보가 없습니다.</div>;
  return (
    <>
      <BackButton path="/book" />
      <>
        <div className={styles.frameWrapper}>
          <figure className={styles.frame}>
            {book.cover_img_url ? (
              <img src={book.cover_img_url} alt={book.name} />
            ) : (
              <div>empty</div>
            )}
          </figure>
        </div>
        <Inner>
          <div className={styles.bookName}>{book.name}</div>
          <div className={styles.writter}>
            {book.writter} · {book.publisher}
          </div>
        </Inner>
        <Inner>
          <div className={styles.actionBar}>
            <LikeBar user={user} book={book} />
            <button
              type="button"
              className={styles.commentBtn}
              onClick={handleOpen}
            >
              한줄평남기기
            </button>
          </div>
        </Inner>
        {user && openComment && (
          <CommentForm book={book} user={user} onClose={closeComment} />
        )}
        <Inner>
          <div className={styles.bookDate}>
            등록일 : <Timeago date={book.created_at} />
          </div>
          <div>상세정보</div>
          <br />
          <div className={styles.bookText}>{book.description}</div>
        </Inner>
        <br />
        <Inner>
          <div>한줄평</div>
          <br />
          <Comments book={book} user={user} />
        </Inner>
      </>
    </>
  );
}
