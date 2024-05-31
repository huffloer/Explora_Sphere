import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function SideBarComponent({ category }) {
    const [showForward, setShowForward] = useState(true);
    const location = useLocation(); // Get the current location

    const toggleComponents = () => {
        setShowForward(!showForward);
    };

    const subCategoriesHidden = showForward ? 'hidden' : '';
    const divBackground = showForward ? 'hover:bg-sidebar-hover' : 'bg-sidebar-hover';

    useEffect(() => {
        // Check if the current location matches any subcategory
        const subcategoryPath = category.subcategories.some(
            subcategory => location.pathname === `/categories/${subcategory.category_id}/subcategories/${subcategory.id}`
        );
        if (subcategoryPath) {
            setShowForward(false); // Show subcategories if the current path matches
        }
    }, [location.pathname, category.subcategories]);

    return (
        <div className={`text-lg hover:cursor-pointer ${divBackground}`}>
            <div className="flex px-14 py-4 justify-between w-full">
                <a href={`/categories/${category.id}`}>
                    <div className="font-semibold">{category.title}</div>
                </a>
                {showForward ? (
                    <KeyboardArrowRightIcon onClick={toggleComponents} />
                ) : (
                    <KeyboardArrowDownIcon onClick={toggleComponents} />
                )}
            </div>
            <div className={`w-full ${subCategoriesHidden}`}>
                {category.subcategories &&
                    category.subcategories.map((subcategory, index) => (
                        <div
                            key={index}
                            className={`w-full py-2 text-sm font-semibold text-gray-800 pl-20 hover:bg-sidebarComp-hover ${
                                location.pathname === `/categories/${subcategory.category_id}/subcategories/${subcategory.id}`
                                    ? 'bg-sidebarComp-hover'
                                    : ''
                            }`}
                        >
                            <a href={`/categories/${subcategory.category_id}/subcategories/${subcategory.id}`}>{subcategory.title}</a>
                        </div>
                    ))}
            </div>
        </div>
    );
}