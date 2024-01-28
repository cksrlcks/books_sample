import BookSlide from "@/components/BookSlide";
import Book from "@/components/BookCard";
import { RecentList } from "@/mock/recentList";
import styles from "./style.module.css";
import { recentNotice } from "@/mock/recentNotice";
import NoticeItem from "@/components/NoticeItem";
export default function Home() {
  return (
    <div>
      <section className={styles.section}>
        <div>로그인 유/무 (로그인안내 or 내정보간략)</div>
      </section>
      <section className={styles.section}>
        <div className={styles.title}>공지사항</div>
        {recentNotice.map((notice) => (
          <div className={styles.notice}>
            <NoticeItem item={notice} />
          </div>
        ))}
      </section>
      <section className={styles.section}>
        <div className={styles.title}>최근 등록된 책</div>
        <BookSlide items={RecentList} />
      </section>
      <section className={styles.section}>
        <div className={styles.title}>댓글이 가장 많이 달린 책</div>
        <BookSlide items={RecentList} />
      </section>
      <section className={styles.section}>
        <div className={styles.title}>인기 책</div>
        <BookSlide items={RecentList} />
      </section>
    </div>
  );
}
