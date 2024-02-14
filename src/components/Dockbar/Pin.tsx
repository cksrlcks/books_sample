"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./style.module.css";

export default function Pin() {
  const segement = useSelectedLayoutSegment();
  const [currentIdx, setCurrentIdx] = useState<string | null>(null);
  useEffect(() => {
    if (segement === "book") {
      setCurrentIdx("1");
    } else if (segement === "mypage") {
      setCurrentIdx("2");
    } else if (segement === null) {
      setCurrentIdx("0");
    } else {
      setCurrentIdx("none");
    }
  }, [segement]);

  return (
    <span
      className={`${styles.pin} ${
        currentIdx ? styles[`index-${currentIdx}`] : styles.hide
      }`}
    >
      <span className={styles.bar}></span>
    </span>
  );
}
