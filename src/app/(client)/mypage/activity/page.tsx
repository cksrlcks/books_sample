import BackButton from "@/components/BackButton";
import Inner from "@/components/Inner";
import MyList from "@/components/MyList";
import PageTitle from "@/components/PageTitle";

export default function LikedPage() {
  return (
    <>
      <BackButton path="/mypage" />
      <Inner>
        <PageTitle name="나의 활동" />
        <MyList />
      </Inner>
    </>
  );
}
