"use client";

import {
  getMovieCreditsData,
  getMovieDetailsData,
} from "@/features/MovieDetails/movieDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AiFillStar, AiOutlineArrowLeft } from "react-icons/ai";

export default function MovieDetails() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("mid");
  const {
    movieDetailsData,
    movieDetailsLoading,
    movieCreditsData,
    movieCreditsLoading,
  } = useAppSelector((state: RootState) => state.movieDetails);
  const router = useRouter();

  useEffect(() => {
    if (movieId !== null) {
      dispatch(
        getMovieDetailsData({
          params: { id: +movieId },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
      dispatch(
        getMovieCreditsData({
          params: { id: +movieId },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  }, [movieId]);

  return (
    <div className="flex flex-col realtive">
      <div className="flex gap-4 items-center p-8 sticky top-0 bg-gradient-to-b from-background to-transparent z-10">
        <AiOutlineArrowLeft
          size={"24px"}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <span className="uppercase font-bold text-xl">Movie Details</span>
      </div>
      <div id="movie-details" className="flex gap-8 px-8 pt-0 pb-8">
        <div className="grow">
          {movieDetailsLoading ? (
            <div className="w-[400px] h-[600px] animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_MOVIEDB_IMG}${movieDetailsData?.poster_path}`}
              alt=""
              width={400}
              height={600}
              className="shrink-0"
            />
          )}
        </div>
        <div id="right-side-details" className="flex flex-col gap-4 grow">
          {movieDetailsLoading ? (
            <div className="h-8 w-60 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
          ) : (
            <span className="font-bold text-2xl uppercase">
              {movieDetailsData?.title}
            </span>
          )}
          <div id="rating-section" className="flex items-center gap-2">
            {movieDetailsLoading ? (
              <div className="h-8 w-60 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
            ) : (
              <>
                <span>Rating:</span>
                <AiFillStar color="#FFDF00" />
                <span>{movieDetailsData?.vote_average?.toFixed(1)}</span>
              </>
            )}
          </div>
          <hr />
          <div id="overview-section" className="flex flex-col gap-2">
            <span className="uppercase font-bold">Overview</span>
            {movieDetailsLoading ? (
              <div className="h-8 w-60 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
            ) : (
              <span>{movieDetailsData?.overview}</span>
            )}
          </div>
          <div id="overview-section" className="flex flex-col gap-2">
            <span className="uppercase font-bold">Genre</span>
            {movieDetailsLoading ? (
              <div className="h-8 w-60 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
            ) : (
              <span>
                {movieDetailsData?.genres
                  ?.map((item: any) => item.name)
                  ?.join(", ")}
              </span>
            )}
          </div>
          <hr />
          <div id="cast-section" className="flex flex-col gap-2">
            <span className="uppercase font-bold">Cast & Crew</span>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {(() => {
                if (movieCreditsLoading) {
                  return Array.from({ length: 12 }).map((_, id) => (
                    <div
                      key={id}
                      className="flex gap-4 rounded-lg bg-background p-4"
                    >
                      <div className="h-[150px] w-[100px] animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md shrink-0" />
                      <div id="nameas-section" className="flex flex-col gap-2">
                        <div className="h-6 w-24 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
                        <div className="h-6 w-24 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
                      </div>
                    </div>
                  ));
                } else {
                  return movieCreditsData?.cast?.map(
                    (item: any, id: number) => (
                      <div
                        key={id}
                        className="flex gap-4 rounded-lg bg-background p-4"
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MOVIEDB_IMG}${item?.profile_path}`}
                          alt=""
                          width={100}
                          height={150}
                        />
                        <div id="nameas-section" className="flex flex-col">
                          <span className="font-bold text-purple-600 capitalize">
                            {item.name}
                          </span>
                          <span className="capitalize">{item.character}</span>
                        </div>
                      </div>
                    )
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
