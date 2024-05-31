import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import FormInput from "@/Components/FormInput";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "nom d'utilisateur",
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
            placeholder: "mot de passe",
            label: "Mot de Passe",
            required: true,
            errorMessage: "",
        },
        {
            id: 4,
            name: "password_confirmation",
            type: "password",
            placeholder: "confirmer mot de passe",
            label: "Confirmer Mot de Passe",
            required: true,
            errorMessage: "Passwords don't match",
            pattern: data.password,
        },
    ];

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="loginTitle text-white text-4xl font-bold tracking-wider text-center ">
                Inscrivez Vous
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
                <div className="flex flex-col items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-400 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Avez-vous déjà un compte?
                    </Link>

                    <button
                        type="submit"
                        className={` w-64 m-auto text-lg font-semibold p-3 mt-2 bg-light-beige rounded-2xl hover:bg-sidebar ${
                            processing && "opacity-25"
                        }`}
                    >
                        S'Inscrire
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}

{
    /* <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div> */
}
