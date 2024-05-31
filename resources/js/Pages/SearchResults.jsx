import React from "react";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";
import CategoryLayout from "@/Pages/Category/CategoryLayout";
import { usePage } from "@inertiajs/react";
import ArticleDisplay from "@/Components/ArticleDisplay";

export default function SearchResults() {
    const { user, categories, admin, regular, documents, keywords} = usePage().props;

    return (
        <>
            <CategoryLayout
                user={user}
                regular={regular}
                categories={categories}
                admin={admin}
            >
                <div className="text-2xl font-semibold text-gray-900 tracking-wider px-4 py-2">
                    Résultats de recherche
                </div>
                {/* <div className="text-gray-400 px-4  italic">
                    </div> */}
                <hr className="mt-4 mx-2" />
                <div className="flex flex-col text-xs p-2 justify-center items-center">
                    {documents && documents.length > 0 ? (
                        documents.map((article, index) => (
                            <ArticleDisplay key={index} article={article} />
                        ))
                    ) : (
                        <div className="text-lg w-full text-gray-600  px-4 py-4 ">
                            Aucun résultat trouvé
                        </div>
                    )}
                </div>
            </CategoryLayout>
        </>
    );
}
