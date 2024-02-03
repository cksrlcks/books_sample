import styles from "./style.module.css";
import BookSlide from "@/components/BookSlide";
import Inner from "@/components/Inner";
import Welcome from "@/components/Welcome";

export default async function Home() {
  return (
    <Inner>
      <Welcome />
      {/* <section className={styles.section}>
        <div className={styles.title}>공지사항</div>
        {recentNotice.map((notice) => (
          <div className={styles.notice} key={notice.id}>
            <NoticeItem item={notice} />
          </div>
        ))}
      </section> */}

      {/* 아직 즐겨찾기한 책이 없으시네요 : 닫아서 없애는것도 가능하게 */}
      {/* 아직 코멘트한 책이 없으시네요 : 닫아서 없애는것도 가능하게 */}

      <section className={styles.section}>
        <div className={styles.title}>최근 등록된 책</div>
        <BookSlide filter="recent" />
      </section>
      <section className={styles.section}>
        <div className={styles.title}>좋아요가 많은 책</div>
        <BookSlide filter="likes" />
      </section>
      <section className={styles.section}>
        <div className={styles.title}>코멘트가 많은 책</div>
        <BookSlide filter="comments" />
      </section>
    </Inner>
  );
}
