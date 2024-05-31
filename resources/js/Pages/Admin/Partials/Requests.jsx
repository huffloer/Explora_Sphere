import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AddIcon from "@mui/icons-material/Add";
import AdminLayout from "../AdminLayout";
import React, { useState } from "react";
import Model from "react-modal";
import AddedPopup from "@/Components/AddedPopup";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import ClearIcon from "@mui/icons-material/Clear";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import MultiSelectComboBox from "@/Components/MultiSelectComboBox";
import { useForm, usePage, router } from "@inertiajs/react";

export default function Requests({ auth }) {
    const formatDate = (date) => {
        // Format the date and time
        const formattedDate = format(date, "do MMMM yyyy, EEEE h:mm a", {
            locale: frLocale,
        });
        return formattedDate;
    };

    const currentDate = new Date();

    const { requests } = usePage().props;
    const columnnames = [
        "ID",
        "Type",
        "Auteur",
        "Titre",
        "Description",
        "Lien URL",
        "Status",
        "Date de Traitement",
        "Action",
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

    const [visible, setVisible] = useState(false);

    const [showPopUp, setShowPopUp] = useState(false);

    const options = ["En Attente", "Acceptée", "Refusée"];

    const handleAccept = (e, id) => {
        e.preventDefault();
        setModalIsOpen(false);
        router.put(route("requests.accept", { id: id }));
        // Reload data after accepting
        // You may need to fetch the data again after accepting
    };

    const handleReject = (e, id) => {
        e.preventDefault();
        setModalIsOpen(false);
        router.patch(route("requests.refuse", { id: id }));
        // Reload data after rejecting
        // You may need to fetch the data again after rejecting
    };

    return (
        <AdminLayout auth={auth}>
            <div className="w-full h-full overflow-auto">
                <div className="w-full p-4 ">
                    <div className="text-xs text-gray-500 flex mb-2 ">
                        {formatDate(currentDate)}
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 tracking-wider">
                        Les Demandes Effectuées par les Abonnés
                    </div>
                </div>
                {/* <div>
                    <div className="flex justify-end items-center px-14 ">
                        <button
                            // href="/Admin/NouvelUtilisateur"
                            onClick={() => {
                                setVisible(true);
                            }}
                            className="text-base text-white flex gap-2 items-center  px-4 py-3 rounded-lg w-fit  font-semibold  hover:bg-[#1a2c44] bg-royal-blue"
                        >
                            <AddIcon size="small" />
                            <div>Ajouter un Utilisateur</div>
                        </button>
                    </div>
                </div> */}
                <div className="flex justify-end mt-4">
                    <div className=" mb-2 px-10 ">
                        <MultiSelectComboBox
                            options={options}
                            placeholder="Séléctionnez vos options.."
                        />
                    </div>
                </div>
                <div className="w-full px-auto py-8">
                    <table className="w-full">
                        <tr>
                            {Array.from(columnnames).map(
                                (columnName, index) => (
                                    <th
                                        key={index}
                                        className=" text-xs text-nowrap px-2 py-4 text-gray-900  bg-gray-50 hover:bg-gray-100"
                                    >
                                        {columnName}
                                    </th>
                                )
                            )}
                        </tr>
                        {requests.map((request) => (
                            <tr
                                key={request.id}
                                className="hover:bg-gray-50 hover:cursor-pointer border-t border-gray-50"
                            >
                                <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.id}
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.request_type}
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.document_author}
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.document_title}
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.description}
                                </td>
                                {/* <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.description}
                                </td> */}
                                <a href={request.url} className="underline">
                                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                        Lien du Document
                                    </td>
                                </a>
                                <td className="px-4 py-4 font-semibold text-gray-800 text-xs">
                                    <div className="flex  items-center">
                                        <span
                                            className={`w-3 h-3 rounded-full mr-2 ${
                                                request.status === "En attente"
                                                    ? "bg-yellow-500"
                                                    : request.status ===
                                                      "Aprouvée"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        ></span>
                                        <span>{request.status}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                    {request.status === "En attente"
                                        ? "//"
                                        : ""}
                                </td>
                                <td className="px-2 py-2 text-center font-semibold text-gray-700 text-lg">
                                    <div className="w-full flex justify-around items-center px-2">
                                        <button
                                            onClick={() => {
                                                openModal(request);
                                            }}
                                            className="border border-r bg-royal-blue rounded-md px-2 py-2 text-center font-semibold text-white text-xs"
                                            disabled={
                                                request.status == "En attente"
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Traiter
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
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
                                    <strong>ID Abonné:</strong>{" "}
                                    {selectedRequest.id}
                                </p>
                                <p>
                                    <strong>Type:</strong>{" "}
                                    {selectedRequest.request_type}
                                </p>
                                <p>
                                    <strong>Auteur:</strong>{" "}
                                    {selectedRequest.document_author}
                                </p>
                                <p>
                                    <strong>Titre:</strong>{" "}
                                    {selectedRequest.document_title}
                                </p>
                                <p>
                                    <strong>Descriptions:</strong>{" "}
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
                        </div>
                    </div>
                </Model>
            )}
            <AddedPopup show={showPopUp} />
        </AdminLayout>
    );
}
