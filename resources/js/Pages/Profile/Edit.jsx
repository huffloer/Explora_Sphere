import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Model from "react-modal";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function Edit({ auth, mustVerifyEmail, status, regular }) {
    const [selectedDiv, setSelectedDiv] = useState(1);

    const handleClick = (id) => {
        setSelectedDiv(id);
    };

    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        pwd: "",
        confpwd: "",
    });

    const [showPopUp, setShowPopUp] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            payment_method: "",
            payment_amount: "",
            subscription_plan: "",
            // Add other subscription fields here
        });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const inputs = [
        {
            id: 1,
            name: "payment_method",
            type: "text",
            placeholder: "Payment Method",
            label: "Payment Method",
            required: true,
            errorMessage: "Please enter your payment method",
        },
        {
            id: 2,
            name: "payment_amount",
            type: "number",
            placeholder: "Payment Amount",
            label: "Payment Amount",
            required: true,
            errorMessage: "Please enter a valid payment amount",
        },
        {
            id: 3,
            name: "subscription_plan",
            type: "text",
            placeholder: "Subscription Plan",
            label: "Subscription Plan",
            required: true,
            errorMessage: "Please select a subscription plan",
        },
        // Add other input objects here as needed
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopUp(true);
        setVisible(false);
        post(route("subscribe"));
    };

    return (
        <AuthenticatedLayout
            className="h-screen"
            user={auth.user}
            regular={regular}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto h-[500px] sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 h-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col h-full  items-center">
                            <div className="w-full flex flex-col ">
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
                            {regular ? (
                                <div className=" w-full p-6">
                                    <div className="flex flex-col mt-4  justify-center items-center w-full h-full float-end">
                                        <div className="text-xs text-gray-600 text-center p-4">
                                            Profitez d'un maximum de contenu et
                                            de fonctionnalités en vous abonnant
                                            à ExploraSphere !
                                        </div>
                                        <button
                                            onClick={() => {
                                                setVisible(true);
                                            }}
                                            className="text-lg bg-[#E0C08F] hover:bg-[#e3d1b5]  px-4  py-2 rounded-md font-semibold "
                                        >
                                            S'abonner
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-start-2 col-end-5">
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
                                    Informations Profile
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
                                    Changer Mot de Passe
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
                                    Supprimer Compte
                                </div>
                            </div>
                            {/* <hr className="mx-10" /> */}
                            <div className="px-16 pt-10 ">
                                {selectedDiv === 1 && (
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                )}
                                {selectedDiv === 2 && (
                                    <UpdatePasswordForm className="max-w-xl" />
                                )}
                                {selectedDiv === 3 && (
                                    <DeleteUserForm className="max-w-xl" />
                                )}
                            </div>
                        </div>
                    </div>
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
                            Complétez votre abonnement
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
                                Confirmer
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
                    </form>
                </div>
            </Model>
        </AuthenticatedLayout>
    );
}
