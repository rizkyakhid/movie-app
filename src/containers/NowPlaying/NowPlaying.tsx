"use client";

import Card from "@/components/Card/Card";
import CardLoading from "@/components/Card/CardLoading";
import Pagination from "@/components/Pagination/Pagination";
import { getNowPlayingData } from "@/features/NowPlaying/nowPlayingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NowPlaying() {
  const { nowPlayingData, nowPlayingLoading } = useAppSelector(
    (state: RootState) => state.nowPlaying
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handlePagination = (value: number) => {
    if (value > 0 && value < nowPlayingData?.total_pages) {
      window.scrollTo(0, 0);
      setPage(value);
      dispatch(
        getNowPlayingData({
          params: { page: value },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  };

  const handleDetail = (id: number) => {
    router.push(`/details?mid=${id}`);
  };

  useEffect(() => {
    dispatch(
      getNowPlayingData({
        params: { page: 1 },
        token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      })
    );
  }, []);

  return (
    <div id="container-now-playing" className="p-8 flex flex-col gap-8">
      <span className="text-xl font-bold uppercase">Now Playing</span>
      <div
        id="list-now-playing-movies"
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
      >
        {nowPlayingLoading
          ? Array.from({ length: 20 }).map((_, id) => <CardLoading key={id} />)
          : nowPlayingData?.results?.map((item: any, id: number) => (
              <Card
                data={item}
                key={id}
                onClick={() => handleDetail(item?.id)}
              />
            ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={nowPlayingData?.total_pages}
        handlePage={handlePagination}
      />
    </div>
  );
}
