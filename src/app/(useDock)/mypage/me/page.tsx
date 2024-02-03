import BackButton from "@/components/BackButton";
import Inner from "@/components/Inner";
import React from "react";
import UserInfo from "@/components/UserInfo";
import PageTitle from "@/components/PageTitle";
export default function MyPage() {
  return (
    <>
      <BackButton />
      <Inner>
        <PageTitle name="내정보" heading={3} />
        <UserInfo />
      </Inner>
    </>
  );
}
