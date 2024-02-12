import BackButton from "@/components/BackButton";
import Signin from "@/components/Signin";

export default function signInPage() {
  return (
    <>
      <BackButton path="/mypage" />
      <Signin />
    </>
  );
}
