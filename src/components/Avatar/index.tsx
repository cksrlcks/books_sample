import React from "react";
import styles from "./style.module.css";
import Avvvatars from "avvvatars-react";

export default function Avatar({
  avatar,
  username,
}: {
  avatar: string;
  username: string;
}) {
  return (
    <figure className={styles.avatarFrame}>
      {avatar ? (
        <div className={styles.avatar}>
          <img src={avatar} alt={username} />
        </div>
      ) : (
        <Avvvatars value={username} displayValue={username[0]} size={70} />
      )}
    </figure>
  );
}
