import PageTitle from "@/components/PageTitle";
import Profile from "@/components/Profile";
import Inner from "@/components/Inner";
import MypageNav from "@/components/MypageNav";

export default async function Mypage() {
  const menu = [
    {
      name: "내정보",
      url: "/mypage/me",
    },
    {
      name: "나의 활동",
      url: "/mypage/activity",
    },
    {
      name: "공지사항",
      url: "/mypage/notice",
    },
  ];
  return (
    <Inner>
      <PageTitle name="마이페이지" />
      <Profile />
      <MypageNav menu={menu} />
    </Inner>
  );
}
