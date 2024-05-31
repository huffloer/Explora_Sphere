import React from "react";
import PieChart from "./PieChart";

export default function StatCard({ title, children, className,percentage }) {
    return (
        <div
            className={`p-5 m-2 text-gray-900  flex rounded-lg shadow-md ${className}`}
        >
            <div className="flex flex-col w-full ">

            <div className="text-base text-gray-700 h-full flex items-end  font-semibold">{title}</div>
            <div className="  h-full flex items-start">
                {children}
            </div>
            </div>
            <div className=" flex items-center">

            {percentage && <PieChart fillPercentage={percentage} /> }
            </div>
            
        </div>
    );
}
