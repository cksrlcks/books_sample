import styles from "./style.module.css";
import { getUser } from "@/services/authServer";
import { getUserName } from "../util/getUserName";
import BookSlide from "@/components/BookSlide";
import BeforeLogin from "@/components/BeforeLogin";

export default async function Home() {
  const {
    data: { user },
  } = await getUser();

  return (
    <div>
      <section className={styles.section}>
        {!user ? (
          <div>
            <div className={styles.welcomeTitle}>
              책방에 오신것을 환영합니다.
            </div>
            <div className={styles.welcomeSub}>
              로그인후 관심있는 책을 즐겨찾기 하고 코멘트도 남겨주세요
            </div>
          </div>
        ) : (
          <div>
            <span className={styles.username}>{getUserName(user)}님,</span>
            행복한하루되세요
          </div>
        )}
      </section>
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
        <BookSlide filter="recent" />
      </section>
      <section className={styles.section}>
        <div className={styles.title}>코멘트가 많은 책</div>
        <BookSlide filter="recent" />
      </section>
    </div>
  );
}
