import Inner from "@/components/Inner";

export default function page({ params }: { params: { slug: string } }) {
  return <Inner>공지 아이디 {params.slug}의 페이지</Inner>;
}
