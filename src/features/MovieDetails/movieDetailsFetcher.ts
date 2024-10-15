import { fetch } from "@/lib/fetcher";
import axios from "axios";

export const fetchMovieDetailsData = async (
  params: { id: number },
  token: any
) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/${params.id}`,
    axios.get,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/bribrain-json",
      },
    }
  );
};

export const fetchMovieCreditsData = async (
  params: { id: number },
  token: any
) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/${params.id}/credits`,
    axios.get,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/bribrain-json",
      },
    }
  );
};