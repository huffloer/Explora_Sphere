import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import ClearIcon from "@mui/icons-material/Clear";
import Searchbar from "@/Components/Searchbar";

export default function Authenticated({
    user,
    admin,
    header,
    children,
    regular,
    landing,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="h-fit min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <nav className="bg-header border dark:bg-gray-800 border-b border-header dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 w-full ">
                        <div className="flex  w-full">
                            <div className="shrink-0 flex  items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>
                            {!landing && (
                                <div className="flex ml-10 justify-center items-center">
                                    <Searchbar small={true} />
                                </div>
                            )}

                            <div className="hidden w-full space-x-2   sm:-my-px sm:ms-10 sm:flex sm:flex-row sm:justify-end ">
                                {!regular && (
                                    <NavLink
                                        href={
                                            admin
                                                ? route("admin.dashboard")
                                                : route("dashboard")
                                        }
                                        active={
                                            admin
                                                ? route().current(
                                                      "admin.dashboard"
                                                  )
                                                : route().current(
                                                      "admin.dashboard"
                                                  )
                                        }
                                    >
                                        Tableau de Bord
                                    </NavLink>
                                )}
                                <NavLink
                                    href={route("home")}
                                    active={route().current("home")}
                                >
                                    Page d'Accueil
                                </NavLink>
                                <NavLink
                                    href={route("categories.index")}
                                    active={route().current("categories.index")}
                                >
                                    Catégories
                                </NavLink>
                                {/* <NavLink
                                // href={route("")}
                                // active={route().current("")}
                                >
                                    Last Adds
                                </NavLink> */}
                            </div>
                        </div>

                        <div className="hidden  w-48 sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex bg-header-hover items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-800 dark:text-gray-400  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex hover:bg-[#e3d1b5] items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-400 dark:hover:bg-gray-900 focus:outline-none focus:bg-[#DDC8A6] dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )} */}

            <main className="flex-1 ">
                {isOpen && regular && route().current("home") && (
                    <div className="absolute w-full h-8 text-xs text-gray-800 flex justify-center items-center bg-gray-200">
                        <div>
                            Profitez d'un maximum de contenu et de
                            fonctionnalités en{" "}
                            <a className="underline font-semibold hover:cursor-pointer">
                                vous abonnant
                            </a>{" "}
                            à ExploraSphere !
                        </div>
                        <button
                            className="absolute right-4"
                            onClick={handleClose}
                        >
                            <ClearIcon fontSize="small" />
                        </button>
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
