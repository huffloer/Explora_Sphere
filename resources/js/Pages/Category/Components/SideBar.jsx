import React from "react";
import SideBarComponent from "./SideBarComponent";

export default function Sidebar({ categories }) {
    return (
        // <div className="h-screen">
        <nav
            className={`w-fit min-w-fit bg-sidebar h-full  flex flex-col justify-start gap-0 p-0 shadow-sm`}
        >
            <div className="text-xl font-semibold px-14 py-6 ">
                Catégories
            </div>
            <div className=" ">
                {categories.map((category) => (
                    <SideBarComponent key={category.id} category={category} />
                ))}
            </div>
        </nav>
        // </div>
    );
}
