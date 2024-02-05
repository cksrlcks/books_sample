import BackButton from "@/components/BackButton";
import Signup from "@/components/Signup";
export default async function SignupPage() {
  return (
    <>
      <BackButton path="/mypage" />
      <Signup />
    </>
  );
}
