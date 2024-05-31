import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function ArticleDisplay({ article, fav}) {
    // Check if the article is in the subscriber's favorites
    const [bookmark, setBookmark] = useState(false);

    const currentRoute = window.location.pathname;
    let addFavoriteRoute, removeFavoriteRoute;

    if (currentRoute.startsWith("/categories")) {
        addFavoriteRoute = `/categories/${article.category}/subcategories/${article.subcategory}/favourites/add`;
        removeFavoriteRoute = `/categories/${article.category}/subcategories/${article.subcategory}/favourites/remove`;
    } else if (currentRoute === "/results") {
        addFavoriteRoute = "/results/favourites/add";
        removeFavoriteRoute = "/results/favourites/remove";
    } else {
        console.error("Unknown route:", currentRoute);
    }

    useEffect(() => {
        if (fav) {
          setBookmark(true);
        }
      }, [fav]);

    const toggleBookmark = () => {
        const route = bookmark ? removeFavoriteRoute : addFavoriteRoute;
        setBookmark(!bookmark);

        router.post(route, { document_id: article.id })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
                // Revert the bookmark state if there's an error
                setBookmark(bookmark);
            });
    };

    const formattedDate = format(parseISO(article.published_date), "d MMMM, yyyy", { locale: fr });

    return (
        <>
            <div className="group h-auto w-full flex bg-gray-50 my-2 shadow-md">
                <div className={`flex-1 w-full m-2 rounded-md shadow-md bg-[url('/${article.imgurl}.jpg')] bg-cover bg-center`}></div>
                <div className="p-5 w-3/4 tracking-wider">
                    <a href={article.url} className="text-base block text-gray-900 font-bold py-2">
                        {article.title}
                    </a>
                    <a href={article.url} className="w-4/5 block text-xs text-gray-800">
                        {article.description}
                    </a>
                    <div className="flex justify-between">
                        <div className="flex text-left items-center gap-6 pt-4 text-gray-500 flex-wrap md:overflow-hidden">
                            <div className="text-xxs">{formattedDate}</div>
                            <div className="text-xxs">{article.author}</div>
                        </div>
                        <div onClick={toggleBookmark} onMouseDown={(e) => e.preventDefault()}>
                            {bookmark  ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-300 mx-8 group-hover:border-gray-700" />
        </>
    );
}

