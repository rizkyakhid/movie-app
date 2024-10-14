interface ICardProps {
  data: {
    poster_path: string;
    title: string;
    release_date: string;
  };
}

export default function Card({ data }: ICardProps) {
  return (
    <div className="shadow-lg rounded-lg p-4 flex flex-col gap-2 w-100 bg-background w-full flex-shrink-0 flex-grow hover:bg-purple-600 cursor-pointer">
      <img src={`${process.env.NEXT_PUBLIC_MOVIEDB_IMG}${data.poster_path}`} alt="" />
      <div>{data?.title}</div>
      <div>{data?.release_date}</div>
    </div>
  );
}
