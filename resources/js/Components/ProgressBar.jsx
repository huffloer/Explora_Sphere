// import React from 'react'

// export default function ProgressBar({percentage}) {
//     // Calculate the width of the filled portion
//     const filledWidth = `${percentage}%`;

//     return (
//       <div className=' w-full rounded-full bg-white h-6 relative '>
//         <div className={` w-48 h-full rounded-l-full  relative z-1  bg-[#E0C08F] `}></div>
//       </div>
//     );
// }
// w-[${filledWidth}]
const ProgressBar = ({ percentage }) => {
    return (
        <div className="w-full bg-white rounded-full h-6">
            <div
                className="bg-[#E0C08F] h-6 rounded-full text-center text-white"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
