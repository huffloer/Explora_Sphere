import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import UpdateProfileInformation from "./Profile/Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Profile/Partials/UpdatePasswordForm";
import DeleteUserForm from "./Profile/Partials/DeleteUserForm";
import Enregistrements from "./Partials/Enregistrements";
import LogoutIcon from "@mui/icons-material/Logout";
import Request from "./Profile/Request";

export default function Dashboard({ auth }) {
    const [selectedDiv, setSelectedDiv] = useState(1);
    const { favs } = usePage().props;

    const handleClick = (id) => {
        setSelectedDiv(id);
    };

    console.log(favs);
    return (
        <AuthenticatedLayout
            className="h-screen"
            user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 h-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="flex flex-col h-full  items-center">
                            <div className="w-full border border-r flex flex-col ">
                                <div className="border border-r h-40 w-40 self-center mt-8 mb-6 rounded-full ">
                                    <img
                                        src="mercury.jpg"
                                        alt="profilepic"
                                        className="h-40 w-40 rounded-full"
                                    />
                                </div>
                                <div className="self-center text-base text-gray-800 font-semibold ">
                                    {auth.user.name}
                                </div>
                            </div>
                             <div className="border border-r w-full p-10">
                                <div className="flex  border border-r justify-center items-end w-full h-full float-end">
                                    <a
                                        href="#"
                                        className="text-xl font-semibold underline"
                                    >
                                        S'abonner
                                    </a>
                                </div>
                            </div> 
                        </div> */}
                        <div className="col-start-1 col-end-5">
                            <div className="flex mt-8 mx-10 border-b ">
                                <div
                                    id="1"
                                    onClick={() => handleClick(1)}
                                    className={` ${
                                        selectedDiv === 1
                                            ? "border-b border-gray-900 "
                                            : null
                                    } w-fit h-auto py-6 px-6 text-base font-semibold hover:cursor-pointer hover:bg-gray-50 `}
                                >
                                    Enregistrements
                                </div>
                                <div
                                    id="2"
                                    onClick={() => handleClick(2)}
                                    className={` ${
                                        selectedDiv === 2
                                            ? "border-b border-gray-900"
                                            : null
                                    } w-fit h-auto py-6 px-6 text-base font-semibold hover:cursor-pointer hover:bg-gray-50 `}
                                >
                                    Marque-Page
                                </div>
                                <div
                                    id="3"
                                    onClick={() => handleClick(3)}
                                    className={` ${
                                        selectedDiv === 3
                                            ? "border-b border-gray-900"
                                            : null
                                    } w-fit h-auto py-6 px-6 text-base font-semibold hover:cursor-pointer hover:bg-gray-50 `}
                                >
                                    Faire une Demande
                                </div>
                            </div>
                            {/* <hr className="mx-10" /> */}
                            <div className="px-16 py-10 h-full ">
                                {selectedDiv === 1 && (
                                    <Enregistrements favs={favs}
                                />
                                )}
                                {selectedDiv === 2 && <Enregistrements />}
                                {selectedDiv === 3 && <Request auth={auth}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/*             
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
