import React from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export default function ArticleGrid({ documents }) {
    function formatDate(
        dateString,
        formatString = "d MMMM, yyyy",
        locale = fr
    ) {
        return format(parseISO(dateString), formatString, { locale });
    }

    return (
        <div className="grid w-full h-auto grid-cols-2 gap-4  lg:m-auto lg:grid-cols-3">
            <a
                href={documents[0].url}
                className="bg-white rounded-lg col-span-2 row-span-2 w-full h-auto flex justify-end items-center border border-1 hover:shadow-xl min-w-72"
            >
                <div className="w-full rounded-l-lg h-full bg-[url('mercury.jpg')] bg-center bg-cover bg-no-repeat"></div>
                <div className="p-9 w-full h-full flex justify-between flex-col tracking-wider">
                    <div className="w-full  h-full flex justify- flex-col tracking-wider">
                        <div className="text-3xl text-gray-900 font-bold py-2 ">
                            {documents[0].title}
                        </div>
                        <div className="text-gray-900 font-semibold">
                            {documents[0]["description"]}
                        </div>
                        <div className="flex w-1/2 text-left text-sm flex-col items-center pt-4 text-gray-600  flex-wrap md:overflow-hidden font-semibold">
                            <div className="w-full">
                                {formatDate(documents[0].published_date)}
                            </div>
                            <div className="w-full">{documents[0].author}</div>
                        </div>
                    </div>
                    <a
                        href={documents[0].url}
                        className="flex text-gray-600 font-semibold float-bottom w-full justify-end items-baseline hover:text-gray-900"
                    >
                        <div className="">Read</div>
                        <span
                            className="float-right pl-3 text-2xl"
                            aria-hidden="true"
                        >
                            &rarr;
                        </span>
                    </a>
                </div>
            </a>
            <a
                href={documents[1].url}
                className="w-full bg-white rounded-lg h-auto flex flex-col justify-end items-center border border-1 hover:shadow-xl min-w-72"
            >
                {/* <div className="w-full h-32 bg-[url('mercury.jpg')] bg-center bg-cover bg-no-repeat"></div> */}
                <div className="p-6 w-full tracking-wider">
                    <div className="text-xl text-gray-900 font-bold py-2">
                        {documents[1].title}
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {/* {documents[1].description} */}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex w-1/2 text-left flex-col items-center pt-4 text-gray-600  flex-wrap md:overflow-hidden font-semibold">
                            <div className="w-full">
                                {formatDate(documents[1].published_date)}
                            </div>
                            <div className="w-full">{documents[1].author}</div>
                        </div>
                        <a
                            href={documents[1].url}
                            className="flex pt-8 text-gray-600 font-semibold w-1/2 justify-end items-baseline hover:text-gray-900"
                        >
                            <div className="">Read</div>
                            <span className="pl-3 text-2xl" aria-hidden="true">
                                &rarr;
                            </span>
                        </a>
                    </div>
                </div>
            </a>
            <a
                href={documents[2].url}
                className="w-full bg-white rounded-lg h-auto flex flex-col justify-end items-center border border-1 hover:shadow-xl min-w-72"
            >
                {/* <div className="w-full h-32 bg-[url('mercury.jpg')] bg-center bg-cover bg-no-repeat"></div> */}
                <div className="p-6 w-full tracking-wider">
                    <div className="text-xl text-gray-900 font-bold py-2">
                        {documents[2].title}
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {/* {documents[2].description} */}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex w-1/2 text-left flex-col items-center pt-4 text-gray-600  flex-wrap md:overflow-hidden font-semibold">
                            <div className="w-full">
                                {formatDate(documents[2].published_date)}
                            </div>
                            <div className="w-full">{documents[2].author}</div>
                        </div>
                        <a
                            href={documents[2].url}
                            className="flex pt-8 text-gray-600 font-semibold w-1/2 justify-end items-baseline hover:text-gray-900"
                        >
                            <div className="">Read</div>
                            <span className="pl-3 text-2xl" aria-hidden="true">
                                &rarr;
                            </span>
                        </a>
                    </div>
                </div>
            </a>
        </div>
    );
}
