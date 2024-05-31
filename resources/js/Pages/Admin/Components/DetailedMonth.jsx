import React from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import WestIcon from "@mui/icons-material/West";
import { useState } from "react";
import Model from "react-modal";
import AddedPopup from "@/Components/AddedPopup";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm, usePage, router } from "@inertiajs/react"; 

const DetailedMonth = ({ month, requests, onBack, onAccept, onReject }) => {
    const daysInMonthWithPadding = (date) => {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        const startWeek = startOfWeek(start, { locale: fr });
        const endWeek = endOfWeek(end, { locale: fr });
        return eachDayOfInterval({ start: startWeek, end: endWeek });
    };

    const days = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
    ];

    const columnnames = [
        "ID Abonné",
        "Auteur",
        "Type",
        "Titre",
        "Description",
        "Lien URL",
        "Status",
        "Date de Traitement",
        "Actions",
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const openModal = (request) => {
        setSelectedRequest(request);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedRequest(null);
    };

    const handleAccept = (e, id) => {
        e.preventDefault();
        setModalIsOpen(false);
        console.log("accepted");
        router.put(route("requests.accept", { id: id }));
        // Reload data after accepting
        // You may need to fetch the data again after accepting
    };

    const handleReject = (e, id) => {
        e.preventDefault();
        setModalIsOpen(false);
        console.log("refused");
        router.patch(route("requests.refuse", { id: id }));
        // Reload data after rejecting
        // You may need to fetch the data again after rejecting
    };

    return (
        <div className="p-4 h-fit">
            <div className=" flex items-start ">
                <button
                    className="mb-4 absolute px-4 py-2 bg-royal-blue hover:bg-royal-hover flex items-center text-white rounded"
                    onClick={onBack}
                >
                    <WestIcon style={{ color: "white" }} />{" "}
                    <div className="pl-3 font-semibold">Retour</div>
                </button>
                <div className="text-2xl m-auto font-semibold text-gray-900 tracking-wider">
                    ExploraSphère s'organise !
                </div>
            </div>
            <h2 className="text-xl font-semibold my-4 text-center">
                {format(month, "MMMM", { locale: fr }).charAt(0).toUpperCase() +
                    format(month, "MMMM yyyy", { locale: fr }).slice(1)}
            </h2>
            <div className="grid grid-cols-7 border border-collapse">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="p-2  bg-header text-gray-700 font-semibold"
                    >
                        {day}
                    </div>
                ))}
                {daysInMonthWithPadding(month).map((day, index) => (
                    <div
                        key={index}
                        className={`border p-2 h-32 w-full flex flex-col ${
                            format(day, "MM") !== format(month, "MM")
                                ? "bg-gray-50"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <div
                            className={`font-semibold  ${
                                format(day, "MM") !== format(month, "MM")
                                    ? "text-gray-400"
                                    : " text-gray-900"
                            }`}
                        >
                            {format(day, "d")}
                        </div>
                        {requests[format(day, "yyyy-MM-dd")] &&
                            requests[format(day, "yyyy-MM-dd")].map(
                                (request, reqIndex) => (
                                    <div
                                        key={reqIndex}
                                        className="flex justify-center items-center overflow:auto w-full"
                                    >
                                        <button
                                            onClick={() => {
                                                openModal(request);
                                            }}
                                            key={reqIndex}
                                            className=" mt-2 flex justify-center"
                                        >
                                            <span
                                                className={`w-3 h-3 rounded-full mr-2 mt-2 ${
                                                    request.status ===
                                                    "En attente"
                                                        ? "bg-yellow-500"
                                                        : request.status ===
                                                              "Aprouvée" ||
                                                          request.status ===
                                                              "Refusée"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            ></span>
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {request.title}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {request.status}
                                                </p>
                                            </div>
                                        </button>
                                        {/* <button
                                            className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                                            onClick={() =>
                                                onAccept(day, reqIndex)
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                            onClick={() =>
                                                onReject(day, reqIndex)
                                            }
                                        >
                                            Reject
                                        </button> */}
                                    </div>
                                )
                            )}
                    </div>
                ))}
            </div>
            {selectedRequest && (
                <Model isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {/* <div className="w-full h-full asbolute "> */}
                    <div className="max-w-7xl my-6 w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                        {/* <div className="p-4 sm:p-8 h-full bg-white dark:bg-gray-800 shadow sm:rounded-lg"> */}
                        <div className="w-full flex justify-between ">
                            <div className="text-2xl font-semibold text-gray-900 tracking-wider">
                                Traiter Demande
                            </div>
                            <button onClick={closeModal}>
                                <ClearIcon />
                            </button>
                        </div>
                        <hr className="" />

                        <div className="w-full mr-10 ">
                            <div>
                                <p>
                                    <strong>ID:</strong> {selectedRequest.id}
                                </p>
                                <p>
                                    <strong>Auteur:</strong>{" "}
                                    {selectedRequest.author}
                                </p>
                                <p>
                                    <strong>Type:</strong>{" "}
                                    {selectedRequest.type}
                                </p>
                                <p>
                                    <strong>Titre:</strong>{" "}
                                    {selectedRequest.title}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {selectedRequest.description}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selectedRequest.status}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-start items-end ">
                            <PrimaryButton
                                onClick={(e) =>
                                    handleAccept(e, selectedRequest.id)
                                }
                                type="submit"
                                className=" my-4"
                            >
                                Approuver
                            </PrimaryButton>
                            <button
                                onClick={(e) =>
                                    handleReject(e, selectedRequest.id)
                                }
                                className=" mx-4 my-4 inline-flex items-center px-4 py-2 bg-red-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-red-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                Refuser
                            </button>

                            {/* <Transition
                                show={true}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Saved.
                                </p>
                            </Transition> */}
                        </div>

                        {/* </div> */}
                    </div>
                    {/* </div> */}
                </Model>
            )}
        </div>
    );
};

export default DetailedMonth;
