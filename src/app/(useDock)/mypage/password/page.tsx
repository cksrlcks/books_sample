import BackButton from "@/components/BackButton";
import PasswordChange from "@/components/PasswordChange";

export default function signInPage() {
  return (
    <>
      <BackButton path="/mypage" />
      <PasswordChange />
    </>
  );
}
