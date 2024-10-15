"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  AiOutlineClockCircle,
  AiOutlinePlaySquare,
  AiOutlineStar,
  AiOutlineTeam,
  AiOutlineVideoCamera,
} from "react-icons/ai";

interface IDefaultLayoutProps {
  children?: ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayoutProps) {
  const menu = [
    {
      title: "Now Playing",
      icon: <AiOutlinePlaySquare />,
      route: "/now-playing",
    },
    { title: "Popular", icon: <AiOutlineTeam />, route: "/popular" },
    { title: "Top Rated", icon: <AiOutlineStar />, route: "/top-rated" },
    { title: "Upcoming", icon: <AiOutlineClockCircle />, route: "/upcoming" },
  ];
  const router = useRouter();

  return (
    <div className="relative flex">
      <div
        id="sidebar"
        className="sticky left-0 top-0 h-screen shadow-md w-auto p-8 cursor-pointer flex flex-col gap-8 shrink-0"
      >
        <div
          id="web-title"
          className="flex gap-2 p-2 items-center"
          onClick={() => router.push("/")}
        >
          <AiOutlineVideoCamera />
          <span>RIZ MOVIE APP</span>
        </div>

        <div id="menu" className="grid gap-2">
          {menu.map((item, id) => (
            <div
              key={id}
              className="p-2 flex gap-2 items-center hover:bg-purple-600 hover:text-white rounded-md"
              onClick={() => router.push(item.route)}
            >
              {item?.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        id="body"
        className="w-full bg-gradient-to-br from-background to-purple-800"
      >
        {children}
      </div>
    </div>
  );
}
