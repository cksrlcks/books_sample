import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href="/admin/book/add">책추가하기</Link>
      <br />
      책리스트
    </div>
  );
}
