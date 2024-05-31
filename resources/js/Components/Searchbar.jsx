import React from "react";

export default function Searchbar({ small }) {
    return (
        <div className="searchbar w-[400px] p-1 lg:p-5 flex justify-start">
            <form action="/results" method="GET" className="flex w-[400px] justify-start">
                <input
                    className={`bar py-2 px-4 bg-white text-lg w-[88%] rounded-l-[20px] outline-none border border-none border-r-0`}
                    type="text"
                    name="search"
                    id="search-input"
                    placeholder="Explorez..."
                />
                <button
                    type="submit"
                    id="search-button"
                    className="border outline-none bg-white w-fit px-3 rounded-r-[20px] border-white border-l-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}
