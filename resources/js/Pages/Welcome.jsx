import ArticleGrid from "@/Components/ArticleGrid";
import CategoryGrid from "@/Components/CategoryGrid";
import Searchbar from "@/Components/Searchbar";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Link, Head, usePage } from "@inertiajs/react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Welcome({ laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    // const categories = usePage().props.categories;
    // const user = usePage().props.user;
    const { user, categories, admin, regular, documents} = usePage().props;

    return (
        <>
            <NavigationLayout user={user} admin={admin} regular={regular} landing={true}>
                <Head title="Welcome" />
                <main>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="bg-white mb-12 h-[500px] dark:bg-gray-800 shadow sm:rounded-lg">
                                <div className="text-black w-full h-full rounded-lg bg-[url('background.jpg')] bg-cover bg-no-repeat bg-top bg-fixed ">
                                    <div className=" flex flex-col h-full justify-between">
                                        <div className=" overflow-hidden h-full flex flex-col justify-center pb-[8em] items-center pt-20 gap-y-4 mx-auto">
                                            <div className="max-w-[60vw] w-auto h-auto text-[#fefbf1]">
                                                <div className="text-6xl text-center font-bold ">
                                                    ExploraSphère
                                                </div>
                                                <p className="text-center pt-3 text-xl font-medium tracking-wide">
                                                    Libérez votre curiosité et
                                                    trouvez vos repères
                                                </p>
                                            </div>
                                            <Searchbar />
                                            {/* <div>
                                                <a href="#"></a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="categories"
                                className=" bg-white overflow-x-hidden border flex  justify-center items-center flex-col dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div className="flex mt-10 justify-center w-full flex-col">
                                    <div className="w-auto p-5 mx-16 text-5xl tracking-wider font-semibold ">
                                        Catégories
                                    </div>
                                    <div className="w-full px-20 flex justify-center items-center">
                                        <CategoryGrid categories={categories} />
                                    </div>
                                </div>
                                {/* <hr className="border-black border-3" /> */}
                            </div>
                            <div className="py-10 px-16 w-full  bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div className="p-5  text-5xl tracking-wider font-semibold ">
                                    Récemment Ajoutés
                                </div>
                                <div className="w-full p-5">
                                    <ArticleGrid documents={documents}/>
                                </div>
                            </div>
                            <div className="py-10 px-16 w-full  bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div className="p-5  text-5xl tracking-wider font-semibold ">
                                    Articles Populaires
                                </div>
                                <div className="w-full p-5">
                                    <ArticleGrid documents={documents}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className=" h-64 text-center text-sm bg-[#E0C08F] text-black flex flex-col items-between dark:text-white/70">
                    {/* Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                    <div className=" flex w-full  h-full ">
                        <div className="flex flex-col p-8 items-start  w-1/2">
                            <div className="text-xl px-3 font-semibold text-gray-900 underline underline-offset-8 ">
                                Contact
                            </div>
                            <div className=" p-3 flex flex-col items-start">
                                <div>
                                    <PhoneIcon fontSize="small" className="mr-2"/>
                                    0555119460 - Kaci Imene
                                </div>
                                <div>
                                    <PhoneIcon fontSize="small" className="mr-2"/>
                                    0540309310 - Manel Rahmouni
                                </div>
                                <div className="flex items-start">
                                    <div>
                                        <EmailIcon fontSize="small" className="mr-2"/>
                                        Mail :
                                    </div>
                                    <div className="flex flex-col px-2 items-start">
                                        <div className="">
                                            kaciimene08@gmail.com
                                        </div>
                                        <div className="">
                                            manelrhmouni@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 p-8 items-start">
                            <div className=" text-xl px-3 font-semibold text-gray-900 underline underline-offset-8">
                                A propos de nous
                            </div>
                            <div className="p-3 text-start">
                                Le projet "ExploraSphère" est une plateforme web
                                qui s'attache à créer une bibliothèque numérique
                                dynamique et polyvalente. Cette ressource en
                                ligne aura pour objectif de regrouper des
                                articles et images, couvrant une diversité de
                                sujets, facilitant ainsi l'accès à une vaste
                                collection d'informations.
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-900 mx-10 mb-2" />
                    <div className="h-fit py-3">
                        &copy; 2024 ExploraSphère - Bibliothèque Numérique.
                    </div>
                </footer>
            </NavigationLayout>
        </>
    );
}
