import React from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Enregistrements({ favs }) {

    const removeBookmark = (favID) => {
        // setBookmark(!bookmark);
        router.post(route('favourites.remove.dashboard'), { document_id: favID })
        .then(() => {
          // Force reload the page to reflect the changes
          router.reload({ only: ['favs'] });
      })
      .catch((error) => {
          console.error("Error:", error);
      });
    };

    function formatDate(
        dateString,
        formatString = "d MMMM, yyyy",
        locale = fr
    ) {
        return format(parseISO(dateString), formatString, { locale });
    }
    
    return (
        <div className="overflow-auto h-[320px] ">
            {favs.map(
                (fav, index) => (
                        <div
                            key={index}
                            className="group h-auto w-full flex  my-2 "
                        >
                            <div
                                className={`flex-1 w-full m-2 rounded-md shadow-md bg-[url('/${fav.imgurl}.jpg')] bg-cover bg-center`}
                            ></div>
                            <div className="p-5 w-3/4 tracking-wider">
                                <a
                                    href={fav.url}
                                    className="text-base block text-gray-900 font-bold py-2"
                                >
                                    {fav.title}
                                </a>
                                <a
                                    href={fav.url}
                                    className="w-4/5 block text-xs text-gray-800"
                                >
                                    {fav.description}
                                </a>
                                <div className="flex justify-between">
                                    <div className="flex text-left items-center gap-6 pt-4 text-gray-500 flex-wrap md:overflow-hidden">
                                        <div className="text-xxs">
                                            {formatDate(fav.published_date)}
                                        </div>
                                        <div className="text-xxs">
                                            {fav.author}
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => removeBookmark(fav.id)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <BookmarkIcon />
                                    </div>
                                </div>
                            </div>
                            <hr className="border-t border-gray-300 group-hover:border-gray-700 " />
                        </div>
                    )
            )}
        </div>
    );
}

{
    /* <div key={index}>
    <a href="#" className="group h-auto flex flex-col  ">
        <div className=" py-8  ">
            <div className="text-base text-gray-900 font-semibold py-2 group-hover:text-un">
                {fav.title}
            </div>
            <div className=" w-3/4 text-gray-900 text-xs">
                {fav.description}
            </div>
            <div className="flex justify-between">
                <div className="flex text-left items-center text-xs gap-6 pt-4 text-gray-600  flex-wrap md:overflow-hidden ">
                    <div className="">12 march,2024</div>
                    <div className="">John Doe</div>
                </div>
            </div>
        </div>
    </a>
    <hr className="border-t border-gray-300 group-hover:border-gray-700 " />
</div>; */
}
