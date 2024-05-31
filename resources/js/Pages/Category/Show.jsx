import CategoryGrid from "@/Components/CategoryGrid";
import { usePage } from "@inertiajs/react";
import React from "react";
import CategoryLayout from "./CategoryLayout";
import ArticleGrid from "@/Components/ArticleGrid";
import ArticleDisplay from "@/Components/ArticleDisplay";
import MultiSelectComboBox from "@/Components/MultiSelectComboBox";

export default function Show() {
    const { category, user, categories, admin, regular, subcategories} =
        usePage().props;

    return (
        <>
            <CategoryLayout
                user={user}
                regular={regular}
                categories={categories}
                admin={admin}
            >
                    <div className="text-2xl font-semibold text-gray-900 tracking-wider px-4 py-2">
                        {category.title}
                    </div>
                    <div className="text-gray-400 px-4  italic">
                        {category.description}
                    </div>
                    <hr className="mt-4 mx-2" />
                <div className="flex justify-center items-center">
                    <CategoryGrid sub="yes" categories={subcategories} />
                </div>
            </CategoryLayout>
        </>
    );
}
