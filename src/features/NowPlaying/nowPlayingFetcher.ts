import { fetch } from "@/lib/fetcher";
import axios from "axios";

export const fetchNowPlayingData = async (params: any, token: any) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/now_playing`,
    axios.get,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/bribrain-json",
      },
      params,
    }
  );
};
