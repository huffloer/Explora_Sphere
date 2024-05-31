import React from "react";

export default function ({ category ,sub }) {
    const bg = "Books";
    return (
        <>
            {/* <div className="box-border bg-gray-200 w-screen h-screen flex justify-center items-center"> */}
            <a
                href={`/categories/${sub ? category.category_id + '/subcategories/' + category.id : category.id}`}
                className={`group w-60 mx-2 ${
                    category.imgurl
                        ? `bg-[url('/${category.imgurl}')] bg-cover bg-center`
                        : "bg-white"
                } rounded-lg h-52 p-5 flex flex-col justify-end items-center border border-1 hover:shadow-md min-w-52`}
            >
                <div className="w-full mb-2 p-4 hover:cursor-pointer">
                    <hr className="border-gray-300 border group-hover:border-gray-700" />
                    <div className="text-gray-50 mt-4 tracking-wider text-xl font-medium group-hover:text-gray-900">
                        {category.title}
                        <span className="float-right" aria-hidden="true">
                            &rarr;
                        </span>
                    </div>
                </div>
            </a>

            {/* </div> */}
        </>
    );
}
