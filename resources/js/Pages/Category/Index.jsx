import { usePage } from "@inertiajs/react";
import React from "react";
import CategoryLayout from "./CategoryLayout";
import CategoryGrid from "@/Components/CategoryGrid";

export default function index() {
    const { categories, user, admin, regular } = usePage().props;

    if (!categories || categories.length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <CategoryLayout
                user={user}
                regular={regular}
                categories={categories}
                admin={admin}
            >
                <div className="text-2xl font-semibold px-4 pb-2  text-gray-900 tracking-wider">
                    Listes des Catégories
                </div>
                <div className="text-gray-400 px-4  italic">
                    Le savoir est une richesse qui ne se perd pas.
                </div>
                {/* <hr className="mx-2" /> */}
                <div className="flex justify-center items-center">
                    <CategoryGrid categories={categories} />
                </div>
            </CategoryLayout>
        </>
    );
}
