import Image from "next/image";
import { AiFillStar, AiOutlineTeam } from "react-icons/ai";

interface ICardProps {
  data: {
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
    popularity: number;
  };
  rating?: boolean;
  popularity?: boolean;
}

export default function Card({ data, rating, popularity }: ICardProps) {
  return (
    <div className="shadow-lg rounded-lg p-4 flex flex-col gap-2 w-100 bg-background w-full flex-shrink-0 flex-grow hover:bg-purple-600 cursor-pointer justify-between">
      <div id="upper-section" className="flex flex-col gap-2">
        <Image
          width={200}
          height={300}
          src={`${process.env.NEXT_PUBLIC_MOVIEDB_IMG}${data.poster_path}`}
          alt=""
        />
        <div>{data?.title}</div>
      </div>
      <div id="lower-section" className="flex flex-col gap-2">
        <span>{data?.release_date}</span>
        {rating && (
          <div className="flex items-center gap-2">
            <AiFillStar color="#FFDF00" />
            <span>{data.vote_average?.toFixed(1)}</span>
          </div>
        )}
        {popularity && (
          <div className="flex items-center gap-2">
            <AiOutlineTeam color="#FFFFFF" />
            <span>{data.popularity.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
