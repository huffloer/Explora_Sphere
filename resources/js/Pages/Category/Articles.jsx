import CategoryGrid from "@/Components/CategoryGrid";
import { usePage } from "@inertiajs/react";
import React from "react";
import CategoryLayout from "./CategoryLayout";
import ArticleGrid from "@/Components/ArticleGrid";
import ArticleDisplay from "@/Components/ArticleDisplay";
import MultiSelectComboBox from "@/Components/MultiSelectComboBox";

export default function Show() {
    const { category, user, categories, admin, regular, subcategory, subscriberFavorites ,keywords} =
        usePage().props;
        
        
    console.log("Subscriber Favorites:", subscriberFavorites);

    return (
        <>
            <CategoryLayout
                user={user}
                admin={admin}
                regular={regular}
                categories={categories}
            >
                    <div className="text-2xl text-gray-900  font-semibold px-4 py-2">
                        {subcategory.title}
                    </div>
                    <div className="text-gray-400 px-4  italic">
                        {subcategory.description}
                    </div>
                    <hr className="mt-4 mx-2" />
                <div className="flex justify-end mt-4">
                    <div className=" mb-2 px-10 ">
                        <MultiSelectComboBox
                            options={keywords}
                            placeholder="Séléctionnez vos options.."
                        />
                    </div>
                </div>
                <div className="flex flex-col text-xs p-2 justify-center items-center">
                    {/* <CategoryGrid categories={categories} /> */}
                    {subcategory.documents &&
                        subcategory.documents.map((article, index) => (
                            <ArticleDisplay regular={regular} fav={subscriberFavorites ? subscriberFavorites.includes(article.id) : false} key={index} article={article} />
                        ))}
                </div>
            </CategoryLayout>
        </>
    );
}
