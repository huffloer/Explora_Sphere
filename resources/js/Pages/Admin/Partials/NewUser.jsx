import React, { useState } from "react";
import AdminFormInput from "../Components/AdminFormInput";
import AddedPopup from "@/Components/AddedPopup";

export default function NewUser() {
    const [values, setValues] = useState({
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        pwd: "",
        confpwd: "",
    });

    const [showPopUp, setShowPopUp] = useState(false);

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "username",
            label: "Nom d'Utilisateur",
            required: true,
            errorMessage: "Nom d'utilisateur déjà utilisé",
        },
        {
            id: 2,
            name: "lastname",
            type: "text",
            placeholder: "lastname",
            label: "Nom",
            required: true,
            errorMessage: "",
        },
        {
            id: 3,
            name: "firstname",
            type: "text",
            placeholder: "firstname",
            label: "Prénom",
            required: true,
            errorMessage: "",
        },
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "example@gmail.com",
            label: "Email",
            required: true,
            errorMessage: "Adresse mail non valide",
        },
        {
            id: 5,
            name: "pwd",
            type: "password",
            placeholder: "password",
            label: "Mot de Passe",
            required: true,
            errorMessage: "",
        },
        {
            id: 6,
            name: "confpwd",
            type: "password",
            placeholder: "confirm password",
            label: "Confirmer Mot de Passe",
            required: true,
            errorMessage: "Passwords don't match",
            pattern: values.pwd,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopUp(true);
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    console.log(values);
    return (
        <div className="w-full h-full asbolute ">
            <div className="max-w-7xl my-6 w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 h-full bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="w-full px-14 pb-4 pt-14 ">
                        <div className="text-xl text-gray-500 flex mb-2 ">
                            5th April 2024, Mercredi 8:00 am
                        </div>
                        <div className="text-4xl font-semibold text-gray-900 tracking-wider">
                            Nouvel Utilisateur
                        </div>
                    </div>
                    <hr className="mx-14 my-7" />
                    <form
                        onSubmit={handleSubmit}
                        className="py-4 px-20 flex flex-row justify-between  "
                    >
                        <div className="w-fit ">
                            {inputs.map((input) => (
                                <AdminFormInput
                                    key={input.id}
                                    {...input}
                                    value={values[input.name]}
                                    onChange={onChange}
                                />
                            ))}
                        </div>
                        <div className="flex justify-start items-end">
                            <button
                                className=" w-fit text-lg text-white  font-semibold rounded-2xl bg-royal-blue text-nowrap px-6 py-3  my-8 mx-10 hover:bg-[#1a2c44]"
                                type="submit"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                    <AddedPopup show={showPopUp} />
                    <button
                        // href="/Admin/NouvelUtilisateur"
                        onClick={togglePopup}
                        className="text-base text-white flex gap-2 items-center  px-4 py-3 rounded-lg w-fit  font-semibold  hover:bg-[#1a2c44] bg-royal-blue"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
