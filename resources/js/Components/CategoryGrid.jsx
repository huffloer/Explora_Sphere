import React from "react";
import CatCard from "./CatCard";

export default function CategoryGrid( {categories, sub} ) {
    return (
        <>
            <div
                className="w-auto py-10 mx-auto h-auto grid grid-cols-2 gap-x-auto gap-y-7 place-content-center lg:grid-cols-3 xl:grid-cols-4">
              
                {categories.map((category) => (
                    <CatCard sub={sub} key={category.id} category={category}/>
                ))}
            </div>
        </>
    );
}
