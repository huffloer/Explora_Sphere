import React from "react";
import AdminLayout from "../AdminLayout";
import PieChart from "@/Components/PieChart";
import StatCard from "@/Components/StatCard";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import LineGraph from "@/Components/LineGraph";
import ProgressBar from "@/Components/ProgressBar";
import { usePage } from "@inertiajs/react";

export default function Statistics({ auth }) {
    const formatDate = (date) => {
        // Format the date and time
        const formattedDate = format(date, "do MMMM yyyy, EEEE h:mm a", {
            locale: frLocale,
        });
        return formattedDate;
    };

    const currentDate = new Date();

    const {addRequests, modifyRequests, totalUsers, subscriberPercentage, totalVisits, categoryVisits } = usePage().props;

    const data2 = {
        Art: 100,
        Sport: 150,
        Littérature: 360,
        Histoire: 230,
        Cuisine: 250,
        Musique: 450,
        Science: 120,
        Nature: 50,
        Technologie: 310,
        // Add more categories as needed
    };
    const shapeData = data => {
        const shapedData = {};
        data.forEach(entry => {
            shapedData[entry.category] = entry.visits;
        });
        return shapedData;
    };

    // Shape the category visits data
    const data = shapeData(categoryVisits);

    console.log(data)
    console.log(data2)

    return (
        <AdminLayout auth={auth}>
            <div>
                <div className="w-full p-4 ">
                    <div className="text-xs text-gray-500 flex mb-2 ">
                        {formatDate(currentDate)}
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 tracking-wider">
                        Analyse de la Semaine !
                    </div>
                </div>
                {/* <div className='p-4 text-2xl font-semibold '>Analyse de la Semaine!</div> */}
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 ">
                    <StatCard
                        title="Nombre de visites"
                        className="bg-header h-40"
                    >
                        <div className="text-3xl font-semibold ">
                            {/* 780 */}
                            {totalVisits}
                            </div>
                    </StatCard>
                    <StatCard
                        title="Total d'Utilisateurs"
                        className="bg-header-hover h-40"
                    >
                        <div className="text-3xl font-semibold ">
                            {/* 643 */}
                            {totalUsers}
                            </div>
                    </StatCard>
                    <StatCard
                        title="Total d'Abonnés"
                        className="bg-[#E0C08F] h-40"
                        percentage={subscriberPercentage}
                    >
                        {/* <div className=" h-full flex mb-2 w-full justify-between items-center ">
                            <div className="text-3xl px-2 text-nowrap font-semibold">
                                80%
                            </div>
                        </div> */}
                        <div className="text-3xl font-semibold ">{subscriberPercentage}%</div>
                    </StatCard>
                </div>
                <div className="text-2xl p-4 font-semibold text-gray-900 tracking-wider">
                    Analyse du mois !
                </div>
                <div className="flex flex-col lg:flex-row w-full h-fit">
                    <StatCard
                        title="Visites par Catégorie"
                        className="h-full bg-sidebar w-full "
                    >
                        <LineGraph data={data} />
                    </StatCard>
                    <StatCard
                        // title="Interactions avec la Plateforme"
                        className="text-white w-5/12 h-full bg-gray-800"
                    >
                        <div className="flex flex-col w-full justify-center gap-4 items-center">
                            <div className=" py-2 text-xl font-semibold left-0 w-full ">
                                Interactions <br /> avec la Plateforme
                            </div>

                            <div className="py-2 w-full flex flex-col  gap-2  justify-center">
                                <div className="font-semibold">
                                    Demande de Modifications {modifyRequests}%
                                </div>
                                <ProgressBar percentage={modifyRequests} />
                            </div>
                            <div className="py-2 w-full flex flex-col gap-2 justify-center">
                                <div className="font-semibold">
                                    Demande d'Ajouts {addRequests}%
                                </div>
                                <ProgressBar percentage={addRequests} />
                            </div>
                        </div>
                    </StatCard>
                </div>
            </div>
        </AdminLayout>
    );
}
