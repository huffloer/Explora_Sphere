import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";

export default function Request({ auth, className }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            document_title: "",
            request_type: "",
            document_author: "",
            description: "",
            url: "",
            status: "En attente",
        });

    const submit = (e) => {
        e.preventDefault();
        router.post(route("requests.store"));
        // Handle form submission
        // patch(route('your.route.name'));
    };

    return (
        <section className="h-full overflow-auto">
            <header>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Veuillez remplir ces champs pour effectuer votre demande à
                    nos administrateurs.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* <div>
                    <InputLabel htmlFor="username" value="Nom Complet" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div> */}

                <div>
                    <InputLabel htmlFor="option" value="Type de Demande" />

                    <select
                        id="option"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "
                        value={data.request_type}
                        onChange={(e) => setData("request_type", e.target.value)}
                        required
                    >
                        <option
                            className=" cursor-pointer hover:bg-gray-100 py-2 px-4  flex items-center justify-between"
                            value=""
                        >
                            Saisissez un type
                        </option>
                        <option value="Ajout">Ajout de Document</option>
                        <option value="Modification">
                            Modification/Rectification de document
                        </option>
                    </select>

                    <InputError className="mt-2" message={errors.option} />
                </div>

                {data.request_type === "Ajout" && (
                    <div>
                        <InputLabel
                            htmlFor="title"
                            value="Titre de l'Article"
                        />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.document_title}
                            onChange={(e) => setData("document_title", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.title} />
                        <br />
                        <InputLabel
                            htmlFor="author"
                            value="Auteur de l'Article"
                        />
                        <TextInput
                            id="author"
                            className="mt-1 block w-full"
                            value={data.document_author}
                            onChange={(e) => setData("document_author", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.title} />
                        <br />
                        <InputLabel htmlFor="url" value="Lien de l'Article" />
                        <TextInput
                            id="url"
                            className="mt-1 block w-full"
                            value={data.url}
                            type="url"
                            onChange={(e) => setData("url", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.url} />
                        <br />
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            textarea={true}
                            id="description"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                        />
                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>
                )}

                {data.request_type === "Modification" && (
                    <div>
                        <InputLabel
                            htmlFor="title"
                            value="Titre de l'Article"
                        />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.document_title}
                            onChange={(e) => setData("document_title", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.title} />
                        <br />
                        <InputLabel
                            htmlFor="author"
                            value="Auteur de l'Article"
                        />
                        <TextInput
                            id="author"
                            className="mt-1 block w-full"
                            value={data.document_author}
                            onChange={(e) => setData("document_author", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.title} />
                        <br />
                        <InputLabel htmlFor="url" value="Lien de l'Article" />
                        <TextInput
                            id="url"
                            className="mt-1 block w-full"
                            value={data.url}
                            type="url"
                            onChange={(e) => setData("url", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.url} />
                        <br />
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            textarea={true}
                            id="description"
                            className="mt-1 block w-full"
                            value={data.descriptionn}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                        />
                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Soumettre la Demande
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
        </section>
    );
}
