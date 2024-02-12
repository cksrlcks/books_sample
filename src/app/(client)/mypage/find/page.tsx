import BackButton from "@/components/BackButton";
import FindPassword from "@/components/FindPassword";

export default function findPasswordPage() {
  return (
    <>
      <BackButton path="/mypage" />
      <FindPassword />
    </>
  );
}
