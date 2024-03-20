"use client"
import { useState } from "react";

interface SearchProps {
    onClick: (param: string) => void,
    search: string
}

const Search: React.FC<SearchProps> = ({
    onClick,
    search
}) => {

    return (
        <div className="rounded-full my-5 border-solid border-slate-400 border-[1px] px-4 py-2 flex justify-between items-center gap-2">
            <input value={search} onChange={e => onClick(e.target.value)} type="text" className="w-full outline-none text-slate-600 font-semibold" placeholder="Search Post" />
            <button onClick={() => onClick(search)} className="bg-blue-400 rounded-md text-white p-1">
                Search
            </button>
        </div>
    );
}

export default Search;