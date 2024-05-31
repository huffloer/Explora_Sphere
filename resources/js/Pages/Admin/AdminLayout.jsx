import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AdminSidebar from "./Components/AdminSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AdminLayout({ auth, children, heading }) {
    return (
        <AuthenticatedLayout className="" admin={true} user={auth.user}>
            {/* <Head title="Dashboard" /> */}

            <div className="flex flex-1 h-full  ">
                <BrowserRouter>
                    <div className="flex ">
                        <AdminSidebar />
                        {/* <Routes>
                            <Route
                                path="/Admin"
                                // element={<Dashboard />}
                            ></Route>
                            <Route
                                path="/admin/users"
                                // element={<Utilisateurs />}
                            ></Route>
                            <Route
                                path="/admin/subscribers"
                                // element={<NewUser />}
                            ></Route>
                        </Routes> */}
                    </div>
                </BrowserRouter>
                <div className="max-w-7xl my-6 flex-1 w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 h-full bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
