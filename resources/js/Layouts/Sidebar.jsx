import React from "react";
import SideBarComponent from "./SideBarComponent";

export default function Sidebar() {
  return (
    // <div className="h-screen">
      <nav className={`w-fit min-w-fit bg-sidebar h-full flex flex-col justify-start gap-0 p-0 shadow-sm`}>
        <div className="text-3xl tracking-wider font-bold p-10 pb-14">
          All Categories
        </div>
        <div className=" ">
          {/* <SideBarComponent name='Sport'/>
          <SideBarComponent name='Art'/>
          <SideBarComponent name='Cuisine'/>
          <SideBarComponent name='Histoire'/>
          <SideBarComponent name='Littérature'/> */}
        </div>
      </nav>
    // </div>
  );
}
