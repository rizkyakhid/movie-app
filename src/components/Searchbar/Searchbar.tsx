"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface ISearchbarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Searchbar({
  placeholder,
  onChange = () => null,
}: ISearchbarProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`flex justify-between items-center p-4 gap-4 rounded-md w-full text-black outline-none border border-background bg-foreground ${
        focus ? "border-purple-600" : ""
      }`}
      id="searchbar"
    >
      <input
        type="text"
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="bg-transparent w-full outline-none"
        onChange={(e) => onChange(e?.target?.value)}
      />
      <AiOutlineSearch />
    </div>
  );
}
