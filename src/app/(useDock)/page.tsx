import BookSlide from "@/components/BookSlide";
import Inner from "@/components/Inner";
import Latest from "@/components/Latest";
import Welcome from "@/components/Welcome";

export default async function Home() {
  return (
    <Inner>
      <Welcome />
      <Latest title="최근 등록된 책">
        <BookSlide filter="recent" />
      </Latest>
      <Latest title="좋아요가 많은 책">
        <BookSlide filter="likes" />
      </Latest>
      <Latest title="코멘트가 많은 책">
        <BookSlide filter="comments" />
      </Latest>
    </Inner>
  );
}
