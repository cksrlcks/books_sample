import BackButton from "@/components/BackButton";
import Inner from "@/components/Inner";
import NoticeList from "@/components/NoticeList";
import PageTitle from "@/components/PageTitle";

export default function NoticePage() {
  return (
    <>
      <BackButton path="/mypage" />
      <Inner>
        <PageTitle name="공지사항" />
        <NoticeList />
      </Inner>
    </>
  );
}
