import styles from "./style.module.css";
import { getUserName } from "@/app/util/getUserName";
import { getUser } from "@/services/authServer";

export default async function Welcome() {
  const {
    data: { user },
    error,
  } = await getUser();
  return (
    <div>
      {!user ? (
        <div>
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
    </div>
  );
}
