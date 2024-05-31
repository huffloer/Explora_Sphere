import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex h-screen w-screen justify-center items-center bg-[url('login3.jpg')] bg-center bg-cover bg-no-repeat  shadow-sm">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div className="w-[500px] bg-black bg-opacity-70 px-14 py-10 rounded-3xl flex flex-col justify-between  gap-6 ">
                {children}
            </div>
        </div>
    );
}
// bg-light-beige