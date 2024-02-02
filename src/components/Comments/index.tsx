import useSWR from "swr";
import styles from "./style.module.css";
import { comments } from "@/types/book";

export default function Comments({ book_id }: { book_id: number }) {
  const { data, isLoading } = useSWR<comments[]>(`/api/comment/${book_id}`);
  if (isLoading) {
    return <div>코멘트를 가져오는중입니다.</div>;
  }
  if (data) {
    if (!data.length) {
      return <div>작성된 코멘트가 없습니다.</div>;
    }
    return (
      <div>
        {data.map((comment) => (
          <div key={comment.id}>
            {comment.username} : {comment.comment}
          </div>
        ))}
      </div>
    );
  }
}
