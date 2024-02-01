import BookList from "@/components/BookList";
import PageTitle from "@/components/PageTitle";
import FakeSearchButton from "@/components/FakeSearchButton";
import Inner from "@/components/Inner";
export default async function BookPage() {
  return (
    <Inner>
      <PageTitle name="책" />
      <FakeSearchButton placeholder="책제목이나 저자이름으로 검색해보세요" />
      <BookList />
    </Inner>
  );
}
