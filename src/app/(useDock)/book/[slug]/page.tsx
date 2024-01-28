import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return <div>북아이디 "{params.slug}"의 상세정보</div>;
}
