import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Searchbar from "@/Components/Searchbar";

export default function NavigationLayout({
    user,
    children,
    admin,
    regular,
    landing,
}) {
    return (
        <>
            {user != null ? (
                <>
                    <AuthenticatedLayout
                        landing={landing}
                        user={user}
                        admin={admin}
                        regular={regular}
                    >
                        {children}
                    </AuthenticatedLayout>
                </>
            ) : (
                <>
                    <div className="min-h-screen  bg-gray-100 dark:bg-gray-900">
                        <nav className="bg-header dark:bg-gray-800 border-b border-header dark:border-gray-700">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16 w-full ">
                                    <div className="flex  w-full">
                                        <div className="shrink-0 flex  items-center">
                                            <Link href="/">
                                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                            </Link>
                                        </div>
                                        {!landing && (
                                            <div className="flex ml-28 justify-center items-center">
                                                <Searchbar small={true} />
                                            </div>
                                        )}
                                        <div className="hidden w-full space-x-2   sm:-my-px sm:ms-10 sm:flex sm:flex-row sm:justify-end ">
                                            <NavLink
                                                href={route("home")}
                                                active={route().current("home")}
                                            >
                                                Accueil
                                            </NavLink>
                                            <NavLink
                                                href={route("categories.index")}
                                                active={route().current(
                                                    "categories.index"
                                                )}
                                            >
                                                Catégories
                                            </NavLink>
                                        </div>
                                        <nav className="ml-4 flex flex-1 justify-end ">
                                            {/* // {auth ? (
                                    //     <Link
                                    //         href={route("dashboard")}
                                    //         className="inline-flex my-2 bg-header-hover items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-800 dark:text-gray-400  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                    //         // className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    //     >
                                    //         Dashboard
                                    //     </Link>
                                    // ) : (
                                    //     <> */}
                                            <Link
                                                href={route("login")}
                                                className=" flex items-center bg-gray-800 my-3 mx-2 text-nowrap  rounded-md px-4 text-white text-xs font-semibold ring-1 ring-transparent transition hover:bg-gray-700 focus:outline-none  dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="flex items-center bg-gray-800 my-3 mx-2 text-nowrap  rounded-md px-4 text-white text-xs font-semibold ring-1 ring-transparent transition hover:bg-gray-700 focus:outline-none  dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                            {/* //     </>
                                    // )} */}
                                        </nav>
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

                        <main className="h-full">{children}</main>
                    </div>
                </>
            )}
        </>
    );
}
