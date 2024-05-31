import { usePage } from "@inertiajs/react";
import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SideBar from "./Components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationLayout from "@/Layouts/NavigationLayout";

export default function CategoryLayout({ user, children, categories, admin, regular}) {
    // user={name : 'manel'};
    return (
        <>
            {user!=null ? (
                <AuthenticatedLayout admin={admin} user={user} regular={regular}>
                    <div className="flex h-full">
                        <BrowserRouter>
                            <div className="flex ">
                                <SideBar categories={categories} />
                                {/* <Routes>
                                    <Route
                                        path="/categories/1"
                                        // element={<Dashboard />}
                                    ></Route>
                                    <Route
                                        path="/categories/2"
                                        // element={<Utilisateurs />}
                                    ></Route>
                                    <Route
                                        path="/categories/3"
                                        // element={<NewUser />}
                                    ></Route>
                                </Routes> */}
                            </div>
                        </BrowserRouter>
                        <div className="max-w-7xl my-6 w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="p-4 sm:p-8 h-fit bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                {children}
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            ) : (
                <NavigationLayout>
                    <div className="flex ">
                        <BrowserRouter>
                            <div className="flex ">
                                <SideBar categories={categories}/>
                                {/* <Routes>
                                    <Route
                                        path="/categories/1"
                                        // element={<Dashboard />}
                                    ></Route>
                                    <Route
                                        path="/categories/2"
                                        // element={<Utilisateurs />}
                                    ></Route>
                                    <Route
                                        path="/categories/3"
                                        // element={<NewUser />}
                                    ></Route>
                                </Routes> */}
                            </div>
                        </BrowserRouter>
                        <div className="max-w-7xl my-6 w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="p-4 sm:p-8 h-fit bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                {children}
                            </div>
                        </div>
                    </div>
                </NavigationLayout>
            )} 
        </>
    );
}
