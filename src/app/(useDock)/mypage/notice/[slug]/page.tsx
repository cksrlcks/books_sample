import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return <div>공지 아이디 {params.slug}의 페이지</div>;
}
