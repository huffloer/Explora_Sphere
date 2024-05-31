import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "@inertiajs/react";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";

export default function SideBar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    const location = useLocation();

    const open = () => {
        setOpenNavbar(!openNavbar);
    };
    return (
        <div className=" m-0 shadow-sm h-full pb-4 flex flex-col items-between bg-sidebar ">
            <div
                className={`group sticky  top-0 left-0  pt-5 flex flex-col justify-start gap-0 p-0 `}
            >
                <div
                    className={`text-xs ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover`}
                    onClick={open}
                >
                    <div
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <MenuIcon />
                    </div>
                </div>
                <div
                    className={`text-base ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover ${
                        location.pathname === "/admin/statistiques"
                            ? "bg-sidebar-hover"
                            : null
                    }`}
                >
                    <a
                        href="/admin/statistiques"
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <QueryStatsIcon color="action" />
                        <div className={`ml-3 ${openNavbar ? "" : "hidden"}`}>
                            Statistiques
                        </div>
                    </a>
                </div>
                <div
                    className={`text-base ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover ${
                        location.pathname === "/admin/users"
                            ? "bg-sidebar-hover"
                            : null
                    }`}
                >
                    <a
                        href="/admin/users"
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <PeopleIcon color="action" />
                        <div className={`ml-3 ${openNavbar ? "" : "hidden"}`}>
                            Utilisateurs
                        </div>
                    </a>
                </div>
                <div
                    className={`text-base ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover ${
                        location.pathname === "/admin/articles"
                            ? "bg-sidebar-hover"
                            : null
                    }`}
                >
                    <a
                        href="/admin/articles"
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <ArticleIcon color="action" />
                        <div className={`ml-3 ${openNavbar ? "" : "hidden"}`}>
                            Articles
                        </div>
                    </a>
                </div>
                <div
                    className={`text-base ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover ${
                        location.pathname === "/admin/subscribers"
                            ? "bg-sidebar-hover"
                            : null
                    }`}
                >
                    <a
                        href="/admin/subscribers"
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <SubscriptionsIcon color="action" />
                        <div className={`ml-3 ${openNavbar ? "" : "hidden"}`}>
                            Abonnés
                        </div>
                    </a>
                </div>

                <div
                    className={`text-base ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover ${
                        location.pathname === "/admin/demandes"
                            ? "bg-sidebar-hover"
                            : null
                    }`}
                >
                    <a
                        href="/admin/demandes"
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <PlaylistAddCircleIcon color="action" />
                        <div className={`ml-3 ${openNavbar ? "" : "hidden"}`}>
                            Demandes
                        </div>
                    </a>
                </div>
                <div
                    className={`text-base ${
                        openNavbar ? "" : "rounded-3xl mx-8"
                    } font-semibold text-gray-700 hover:cursor-pointer hover:bg-sidebar-hover ${
                        location.pathname === "/admin/calendrier"
                            ? "bg-sidebar-hover"
                            : null
                    }`}
                >
                    <a
                        href="/admin/calendrier"
                        className={`flex ${
                            openNavbar ? "px-12" : "px-4 "
                        } py-4 justify-start w-full items-center`}
                    >
                        <CalendarMonthIcon color="action" />
                        <div className={`ml-3 ${openNavbar ? "" : "hidden"}`}>
                            Calendrier
                        </div>
                    </a>
                </div>
            </div>

            {/* <div
                className={` text-base  bottom-0 w-fit ${
                    openNavbar ? "" : "rounded-3xl mx-8 hover:bg-sidebar-hover"
                } float-end font-semibold text-gray-700 hover:cursor-pointer`}
            >
                <a
                    href="#"
                    className={`flex ${
                        openNavbar ? "px-12" : "px-4 "
                    } py-4 justify-start w-full items-center`}
                >
                    <LogoutIcon color="action" />
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className={`ml-3 text-nowrap hover:underline hover:underline-offset-8 hover:decoration-gray-700 ${
                            openNavbar ? "" : "hidden"
                        }`}
                    >
                        Se déconnecter
                    </Link>
                </a>
            </div> */}
        </div>
    );
}
