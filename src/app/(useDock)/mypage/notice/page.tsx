import BackButton from "@/components/BackButton";
import Inner from "@/components/Inner";
import PageTitle from "@/components/PageTitle";

export default function NoticePage() {
  return (
    <>
      <BackButton path="/mypage" />
      <Inner>
        <PageTitle name="공지사항" />
        <div>공지시항 리스트</div>
      </Inner>
    </>
  );
}
