import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Searchbar from "@/Components/Searchbar";

export default function Header(props) {
  return (
    <header className="flex justify-between items-center w-full h-[80px] ">
      <div className=" w-[80px] h-[60px] mx-10 flex justify-center items-center">
        <a href="/home">
          <img src="logo3.png" alt="" />
        </a>
      </div>
      {props.state === "scrolled" ? <Searchbar /> : null}
      <nav className="flex flex-row justify-end w-3/5 h-full gap-2 text-xl font-semibold">
        <div className="navtext  py-7 px-6 hover:cursor-pointer hover:bg-[#e3d1b5]">
          <a href="/#">Home</a>
        </div>
        <div className="navtext py-7 px-6 hover:cursor-pointer hover:bg-[#e3d1b5]">
          <a href="/#">Categories</a>
        </div>
        <div className="navtext py-7 px-6 hover:cursor-pointer hover:bg-[#e3d1b5]">
          <a href="/#">Last Adds</a>
        </div>
        <div className="navtext py-7 px-6 hover:cursor-pointer hover:bg-[#e3d1b5]">
          <a href="/#">About Us</a>
        </div>
      </nav>
      <div className="  mx-16 flex items-center">
        {!props.logged ? (
          <a
            href="/login"
            className="w-fit text-lg text-white  font-semibold rounded-2xl bg-royal-blue text-nowrap px-6 py-3 hover:bg-[#1a2c44]"
          >
            Log in
          </a>
        ) : (
          <div className=" rounded-3xl p-2 mr-6 hover:cursor-pointer bg-[#e3d1b5]">
            <PersonIcon fontSize="large"/>
          </div>
        )}
      </div>
    </header>
  );
}
