import React from "react";
import AdminLayout from "./AdminLayout";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpgradeIcon from "@mui/icons-material/Upgrade";

export default function Dashboard({ auth }) {
    const formatDate = (date) => {
        // Format the date and time
        const formattedDate = format(date, "do MMMM yyyy, EEEE h:mm a", {
            locale: frLocale,
        });
        return formattedDate;
    };

    const currentDate = new Date();

    const columnnames = [
        "ID Abonné:",
        "Nom Complet:",
        "Type:",
        "Titre:",
        "Description:",
        "Status:",
        "Actions:",
    ];

    const requests = [
        {
            id: 1,
            name: "Jean Dupont",
            type: "Ajout",
            title: "Introduction à la programmation",
            description: "Cours de base pour apprendre la programmation.",
            status: "En attente",
        },
        {
            id: 2,
            name: "Marie Curie",
            type: "Modification",
            title: "Physique avancée",
            description: "Cours avancé sur les principes de la physique.",
            status: "En attente",
        },
        {
            id: 3,
            name: "Charles Baudelaire",
            type: "Ajout",
            title: "Littérature française",
            description: "Exploration des œuvres de la littérature française.",
            status: "En attente",
        },
        {
            id: 4,
            name: "Claude Monet",
            type: "Modification",
            title: "Histoire de l'art",
            description: "Étude des mouvements artistiques à travers les âges.",
            status: "En attente",
        },
        {
            id: 5,
            name: "Simone de Beauvoir",
            type: "Ajout",
            title: "Philosophie moderne",
            description: "Analyse des concepts et des philosophes modernes.",
            status: "En attente",
        },
        {
            id: 6,
            name: "René Descartes",
            type: "modification",
            title: "Mathématiques avancées",
            description: "Cours approfondi sur les mathématiques avancées.",
            status: "En attente",
        },
    ];

    return (
        <AdminLayout auth={auth}>
            <div className="h-full w-full  overflow-auto">
                <div className="w-full p-4  ">
                    <div className="text-2xl font-semibold text-gray-900 tracking-wider">
                        Bonjour Mlle {auth.user.name} !
                    </div>
                    <div className="text-xs text-gray-500 flex mt-2 ">
                        {/* <div className="pr-4 ">5th April 2024</div>
                <div className="pl-4 border-l-2 border-gray-600">Mercredi 8:00 am</div> */}
                        {formatDate(currentDate)}
                        {/* 5th April 2024, Mercredi 8:00 am */}
                    </div>
                </div>
                <div className="px-auto py-5 grid grid-cols-6">
                    <a
                        href="/admin/statistiques"
                        className="w-48 h-48 rounded-3xl hover:cursor-pointer hover:bg-gray-50"
                    >
                        <div className="w-32 h-32 my-3 m-auto">
                            <img src="statistics.png" alt="Statistiques" />
                        </div>
                        <div className="text-xl text-center font-semibold text-gray-800">
                            Statistiques
                        </div>
                    </a>
                    <a
                        href="/admin/users"
                        className=" w-48 h-48 rounded-3xl hover:cursor-pointer hover:bg-gray-50"
                    >
                        <div className="w-32 h-32 my-3 m-auto">
                            <img src="users.png" alt="Utilisateurs" />
                        </div>
                        <div className="text-xl text-center font-semibold text-gray-800">
                            Utilisateurs
                        </div>
                    </a>
                    <a
                        href="/admin/articles"
                        className="w-48 h-48 rounded-3xl hover:cursor-pointer hover:bg-gray-50"
                    >
                        <div className="w-32 h-32 my-3 m-auto">
                            <img src="articles.png" alt="Articles" />
                        </div>
                        <div className="text-xl text-center font-semibold text-gray-800">
                            Articles
                        </div>
                    </a>
                    <a
                        href="/admin/subscribers"
                        className="w-48 h-48 rounded-3xl hover:cursor-pointer hover:bg-gray-50"
                    >
                        <div className="w-32 h-32 my-3 m-auto">
                            <img src="subscribers.png" alt="Abonnés" />
                        </div>
                        <div className="text-xl text-center font-semibold text-gray-800">
                            Abonnés
                        </div>
                    </a>
                    <a
                        href="/admin/demandes"
                        className="w-48 h-48 rounded-3xl hover:cursor-pointer hover:bg-gray-50"
                    >
                        <div className="w-32 h-32 my-3 m-auto">
                            <img src="demande.png" alt="Demandes" />
                        </div>
                        <div className="text-xl text-center font-semibold text-gray-800">
                            Demandes
                        </div>
                    </a>
                    <a
                        href="/admin/calendrier"
                        className="w-48 h-48 rounded-3xl hover:cursor-pointer hover:bg-gray-50"
                    >
                        <div className="w-32 h-32 my-3 m-auto">
                            <img src="calendar.png" alt="Calendrier" />
                        </div>
                        <div className="text-xl text-center font-semibold text-gray-800">
                            Calendrier
                        </div>
                    </a>
                
                </div>
                <div className="w-full px-auto py-8">
                    <div className="p-4 text-xl text-gray-900 font-semibold">
                        Demandes Récentes :
                    </div>
                    <table className="w-full">
                        {/* <tr>
                            {Array.from(columnnames).map(
                                (columnName, index) => (
                                    <th
                                        key={index}
                                        className=" text-xs text-nowrap px-2 py-4 text-gray-900 "
                                    >
                                        {columnName}
                                    </th>
                                )
                            )}
                        </tr> */}
                        {requests.map((request) => (
                            <tr
                                key={request.id}
                                className="bg-gray-50 hover:cursor-pointer border-t border-gray-100"
                            >
                                <>
                                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                        {request.id}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                        {request.name}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                        {request.type}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                        {request.title}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">
                                        {request.description}
                                    </td>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800 text-xs flex  justify-center items-center">
                                        <div className="flex items-center text-nowrap justify-center">
                                            <span
                                                className={`w-3 h-3 rounded-full mr-2  ${
                                                    request.status === "En attente"
                                                        ? "bg-yellow-500"
                                                        : request.status ===
                                                          "Acceptée"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            ></span>
                                            <span>{request.status}</span>
                                        </div>
                                    </td>
                                </>
                                <td className="px-2 py-2 text-center font-semibold text-gray-700 text-lg">
                                    <div className="w-full flex justify-around items-center px-2">
                                        <button className="border border-r bg-royal-blue rounded-md px-2 py-2 text-center font-semibold text-white text-xs">
                                            Traiter
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
