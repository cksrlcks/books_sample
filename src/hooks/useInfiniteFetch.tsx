import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

type hookProps = {
  url: string;
  limit: number;
};

export default function useInfiniteFetch<T>({ url, limit }: hookProps) {
  const getKey = (pageIndex: number, prevData: T[]) => {
    if (prevData && !prevData.length) return null;
    if (!pageIndex) return `${url}?page=0&limit=${limit}`;
    return `${url}?page=${pageIndex}&limit=${limit}`;
  };

  const {
    data: items,
    error,
    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<T[]>(getKey);

  const isEmpty = items?.[0]?.length === 0;
  const isEnd = isEmpty || (items && items[items.length - 1]?.length < limit);
  const data = useMemo(() => {
    const array: T[] = [];
    if (items) {
      return array.concat.apply([], items);
    }
  }, [items]);
  return { data, error, isLoading, size, setSize, isEmpty, isEnd, mutate };
}
