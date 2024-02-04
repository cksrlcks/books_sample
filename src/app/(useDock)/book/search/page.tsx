import BackButton from "@/components/BackButton";
import SearchPage from "@/components/Search";

export default async function Search() {
  return (
    <>
      <BackButton path="/book" />
      <SearchPage />
    </>
  );
}
