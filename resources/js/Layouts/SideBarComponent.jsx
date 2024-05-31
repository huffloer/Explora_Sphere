import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SideBarComponent(props) {
  const [showForward, setShowForward] = useState(true);

  const toggleComponents = () => {
    setShowForward(!showForward);
  };

  const subCategoriesHidden = showForward ? "hidden" : null;
  const divBackground = showForward
    ? "hover:bg-sidebar-hover"
    : "bg-sidebar-hover";

  return (
    <div
      className={`text-lg hover:cursor-pointer ${divBackground}`}
      onClick={toggleComponents}
    >
      <div className="flex px-14 py-4 justify-between w-full">
        <div>{props.name}</div>
        {showForward ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
      </div>
      <div className={` w-full ${subCategoriesHidden} `}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className=" w-full py-3 pl-20 hover:bg-sidebarComp-hover  ">
            <a href="#">Subsection {index + 1}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
