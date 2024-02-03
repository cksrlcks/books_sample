import useSWR from "swr";
import styles from "./style.module.css";
import { BookData } from "@/types/book";
import { User } from "@/types/user";

export default function Comments({
  user,
  book,
}: {
  user: User | null;
  book: BookData;
}) {
  const comments = book.comments;
  if (!comments.length) {
    return <div>작성된 코멘트가 없습니다.</div>;
  }
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {comment.username} : {comment.comment}
        </div>
      ))}
    </div>
  );
}
