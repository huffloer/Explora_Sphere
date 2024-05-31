// import React from "react";
// import Fullcalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// export default function AdminCalendar() {
//   return (
//     <div>
//       <Fullcalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView={"dayGridMonth"}
//         headerToolbar={{
//           start: "today prev,next", // will normally be on the left. if RTL, will be on the right
//           center: "title",
//           end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
//         }}
//         height={"90vh"}
//       />
//     </div>
//   );
// }

// src/components/Calendar.js
import React, { useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import DetailedMonth from "./DetailedMonth";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

const Calendar = ({ requests, onAccept, onReject }) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);

    const months = Array.from(
        { length: 12 },
        (v, i) => new Date(currentYear, i, 1)
    );

    const daysInMonthWithPadding = (date) => {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        const startWeek = startOfWeek(start, { locale: fr });
        const endWeek = endOfWeek(end, { locale: fr });
        return eachDayOfInterval({ start: startWeek, end: endWeek });
    };

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const handleBackToYearView = () => {
        setSelectedMonth(null);
    };

    const handleNextYear = () => {
        setCurrentYear(currentYear + 1);
    };

    const handlePreviousYear = () => {
        setCurrentYear(currentYear - 1);
    };

    return (
        <div className="p-4">
            {selectedMonth ? (
                <DetailedMonth
                    month={selectedMonth}
                    requests={requests}
                    onBack={handleBackToYearView}
                    onAccept={onAccept}
                    onReject={onReject}
                />
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className="px-4 py-2 bg-royal-blue hover:bg-royal-hover text-white rounded"
                            onClick={handlePreviousYear}
                        >
                            <WestIcon style={{ color: "white" }} />
                        </button>
                        <h1 className="text-2xl font-bold">{currentYear}</h1>
                        <button
                            className="px-4 py-2 bg-royal-blue hover:bg-royal-hover text-white rounded"
                            onClick={handleNextYear}
                        >
                            <EastIcon style={{ color: "white" }} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {months.map((month, index) => (
                            <div
                                key={index}
                                className="p-4 cursor-pointer hover:shadow-md hover:bg-header bg-gray-50 rounded-lg"
                                onClick={() => handleMonthClick(month)}
                            >
                                <h2 className="text-xl font-semibold  text-gray-900 mb-4 text-center">
                                    {format(month, "MMMM", { locale: fr })
                                        .charAt(0)
                                        .toUpperCase() +
                                        format(month, "MMMM", {
                                            locale: fr,
                                        }).slice(1)}
                                </h2>
                                <div className="grid grid-cols-7 gap-1">
                                    {[
                                        "dim",
                                        "lun",
                                        "mar",
                                        "mer",
                                        "jeu",
                                        "ven",
                                        "sam",
                                    ].map((day) => (
                                        <div
                                            key={day}
                                            className="text-gray-500 text-center"
                                        >
                                            {day}
                                        </div>
                                    ))}
                                    {daysInMonthWithPadding(month).map(
                                        (day, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-center text-xs text-gray-600 bg-white rounded-lg h-10 ${
                                                    format(day, "MM") !==
                                                    format(month, "MM")
                                                        ? "bg-gray-200"
                                                        : ""
                                                } ` }
                                            >
                                                {format(day, "MM") !==
                                                format(month, "MM") ? (
                                                    ""
                                                ) : (
                                                    <div className={`${requests[
                                                      format(day, "yyyy-MM-dd")
                                                  ]? "rounded-full p-1 font-semibold text-gray-800 bg-[#E0C08F]": "bg-white"} flex justify-center items-center`}>
                                                        {format(day, "d")}
                                                    </div>
                                                )}

                                                {/* {requests[
                                                    format(day, "yyyy-MM-dd")
                                                ] && (
                                                  <div className="w-1 h-1 rounded-full mr-2 mt-2 bg-royal-blue"></div>
                                                    // <div className="text-xs text-red-500 mt-1">
                                                    //     {
                                                    //         requests[
                                                    //             format(
                                                    //                 day,
                                                    //                 "yyyy-MM-dd"
                                                    //             )
                                                    //         ].length
                                                    //     }{" "}
                                                    //     request(s)
                                                    // </div>
                                                )} */}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
