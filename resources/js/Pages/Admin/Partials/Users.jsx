import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AddIcon from "@mui/icons-material/Add";
import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import React, { useState } from "react";
import Model from "react-modal";
import AddedPopup from "@/Components/AddedPopup";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import ClearIcon from "@mui/icons-material/Clear";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import SmallModal from "@/Components/SmallModal";

export default function Users({ auth }) {
    const formatDate = (date) => {
        // Format the date and time
        const formattedDate = format(date, "do MMMM yyyy, EEEE h:mm a", {
            locale: frLocale,
        });
        return formattedDate;
    };

    const currentDate = new Date();

    const { users } = usePage().props;
    const columnnames = [
        "User ID",
        // "Photo de Profile",
        // "Nom d'Utilisateur",
        "Nom",
        // "Prénom",
        "Email",
        "Date d'Inscription",
        "Statut",
        // "Catégories les plus visitées",
        "Actions",
    ];
    

    //for the small modal
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');

    //for the main modal
    const [visible, setVisible] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "name",
            label: "Nom d'Utilisateur",
            required: true,
            errorMessage: "Nom d'utilisateur déjà utilisé",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "example@gmail.com",
            label: "Email",
            required: true,
            errorMessage: "Adresse mail non valide",
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "password",
            label: "Mot de Passe",
            required: true,
            errorMessage: "",
        },
        {
            id: 4,
            name: "password_confirmation",
            type: "password",
            placeholder: "confirm password",
            label: "Confirmer Mot de Passe",
            required: true,
            errorMessage: "Passwords don't match",
            // pattern: values.pwd,
        },
    ];

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setVisible(false);
        setShowPopUp(true);
        post(route("users.store"), {
            onSuccess: () => {
                setShowPopUp(true);
                setVisible(false);
                // window.location.reload(); // Refresh the page on success
            },
            onError: (errors) => {
                console.error("Validation errors:", errors);
            },
        });
    };

    //for the buttons in general
    const handleAction = (type) => {
        setActionType(type);
        setShowModal(true);
      };

    //for confirming either disabling or removing
    const handleConfirm = () => {
        setShowModal(false);
        if (actionType === "disable") {
            // Inertia.post(route("disableUser", { userId: user.id }));
        } else if (actionType === "delete") {
            // Inertia.post(route("deleteUser", { userId: user.id }));
        }
    };

    //for cancelling eventually
    const handleCancel = () => {
        setShowModal(false);
      };

    return (
        <AdminLayout auth={auth}>
            <div className="w-full h-full overflow-auto">
                <div className="w-full p-4 ">
                    <div className="text-xs text-gray-500 flex mb-2 ">
                        {formatDate(currentDate)}
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 tracking-wider">
                        Les Utilisateurs de la Plateforme
                    </div>
                </div>
                <div>
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
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className={`${
                                    user.id % 2 == 1 ? "bg-gray-50" : ""
                                } hover:bg-gray-100 hover:cursor-pointer border-t border-gray-50 `}
                            >
                                <>
                                    <td className=" px-4 py-4 text-center font-semibold text-gray-700 text-xs">
                                        {user.id}
                                    </td>
                                    <td className=" px-4 py-4 text-center font-semibold text-gray-700 text-xs">
                                        {user.name}
                                    </td>
                                    <td className=" px-4 py-4 text-center font-semibold text-gray-700 text-xs">
                                        {user.email}
                                    </td>
                                    <td className=" px-4 py-4 text-center font-semibold text-gray-700 text-xs">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className=" px-4 py-4 text-center font-semibold text-green-700 text-xs">
                                        Validé
                                    </td>
                                    {/* <td className=" px-4 py-4 text-center font-semibold text-gray-700 text-xs"></td> */}
                                </>

                                <td className="px-2 py-4  text-center font-semibold text-gray-700 text-lg">
                                    <div className="w-full flex justify-around items-center px-2">
                                        <button
                                            className=""
                                        >
                                            <UpgradeIcon color="action" />
                                        </button>
                                        <button
                                            onClick={() => handleAction("disable")}
                                            className=" "
                                        >
                                            <RemoveCircleIcon color="action" />
                                        </button>
                                        <button
                                            onClick={() => handleAction("delete")}
                                            className=" "
                                        >
                                            <DeleteForeverIcon color="action" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <Model
                isOpen={visible}
                onRequestClose={() => {
                    setVisible(false);
                }}
            >
                {/* <div className="w-full h-full asbolute "> */}
                <div className="max-w-7xl my-6 w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* <div className="p-4 sm:p-8 h-full bg-white dark:bg-gray-800 shadow sm:rounded-lg"> */}
                    <div className="w-full flex justify-between ">
                        <div className="text-2xl font-semibold text-gray-900 tracking-wider">
                            Nouvel Utilisateur
                        </div>
                        <button
                            onClick={() => {
                                setVisible(false);
                            }}
                        >
                            <ClearIcon />
                        </button>
                    </div>
                    <hr className="" />
                    <form
                        onSubmit={handleSubmit}
                        className="py-4 px-6 flex flex-row justify-between gap-6 "
                    >
                        <div className="w-full mr-10 ">
                            {inputs.map((input) => (
                                <div
                                    key={input.id}
                                    className=" my-3 w-full items-baseline justify-around"
                                >
                                    <InputLabel
                                        className="w-52"
                                        htmlFor={input.name}
                                        value={input.label}
                                    />

                                    <TextInput
                                        key={input.id}
                                        value={data[input.name]}
                                        {...input}
                                        onChange={(e) =>
                                            setData(input.name, e.target.value)
                                        }
                                        type={input.type}
                                        className="mt-1 w-96 block"
                                        // autoComplete="current-password"
                                    />

                                    <InputError
                                        message={errors[input.name]}
                                        className="mt-2"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-start items-end ">
                            <PrimaryButton
                                type="submit"
                                className=" my-4"
                                disabled={processing}
                            >
                                Ajouter
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Saved.
                                </p>
                            </Transition>
                        </div>
                        {/* <div className="flex justify-start items-end">
                            <button
                                className=" w-fit text-lg text-white  font-semibold rounded-2xl bg-royal-blue text-nowrap px-6 py-3  my-8 mx-10 hover:bg-[#1a2c44]"
                                type="submit"
                            >
                                Ajouter
                            </button>
                        </div> */}
                    </form>
                    {/* </div> */}
                </div>
                {/* </div> */}
            </Model>
            <AddedPopup show={showPopUp} />
            {showModal && (
                <SmallModal
                    message="Are you sure you want to do this?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </AdminLayout>
    );
}
