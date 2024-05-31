import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import FormInput from "@/Components/FormInput";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "example@gmail.com",
            label: "Email",
            required: true,
            errorMessage:"",
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "mot de passe",
            label: "Mot de Passe",
            required: true,
            errorMessage:"",
        },
    ];

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);
    
    console.log(data);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            {/* <div className="w-32 h-32 self-center center flex justify-center items-center"><img src="image.png" alt="" /></div> */}
            <div className="loginTitle text-white text-4xl font-bold tracking-wider text-center ">
                Connectez Vous
            </div>
            <form onSubmit={submit} className="flex flex-col gap-4">
                {inputs.map((input) => (
                    <>
                        <FormInput
                            key={input.id}
                            {...input}
                            value={data[input.name]}
                            onChange={(e) =>
                                setData(input.name, e.target.value)
                            }
                            error={errors[input.name]}
                        />
                    </>
                ))}

                <div className="block  px-8">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-400 dark:text-gray-400">
                            Se Rappeler 
                        </span>
                    </label>
                </div>

                <div className="flex flex-col items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-400 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            J'ai oublié mon mot de passe
                        </Link>
                    )}

                    <button
                        type="submit"
                        className={` w-64 m-auto text-lg font-semibold p-3 mt-2 bg-light-beige rounded-2xl hover:bg-sidebar ${
                            processing && "opacity-25"
                        }`}
                    >
                        Se Connecter
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
