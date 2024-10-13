import { ReactNode } from "react";
import {
  AiOutlineClockCircle,
  AiOutlinePlaySquare,
  AiOutlineStar,
  AiOutlineTeam,
} from "react-icons/ai";

interface IDefaultLayoutProps {
  children?: ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayoutProps) {
  const menu = [
    { title: "Now Playing", icon: <AiOutlinePlaySquare /> },
    { title: "Popular", icon: <AiOutlineTeam /> },
    { title: "Top Rated", icon: <AiOutlineStar /> },
    { title: "Upcoming", icon: <AiOutlineClockCircle /> },
  ];

  return (
    <div className="relative flex">
      <div
        id="sidebar"
        className="sticky left-0 top-0 h-screen shadow-md p-4 cursor-pointer flex flex-col gap-8"
      >
        <div id="web-title">RIZ MOVIE APP</div>

        <div id="menu" className="grid">
          {menu.map((item, id) => (
            <div key={id} className="p-2 flex gap-2 items-center">
              {item?.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div id="body">
        <div id="app-header" className="p-4 sticky top-0 flex gap-4">
          <span className="cursor-pointer">Movies</span>
          <span className="cursor-pointer">Series</span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
