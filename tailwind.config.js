import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                // sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "light-beige": "#eddbc7",
                "custom-white": "#fefbf1",
                sidebar: "#f9f7f0",
                "sidebar-hover": "#F3F0E2",
                "sidebarComp-hover": "#EDE8D4",
                "royal-blue": "#121f30",
                "royal-hover": "#1a2c44",
                header: "#e6d8bd",
                "header-hover":"#e3d1b5",
            },
            fontSize: {
                'xxs': '.5rem', // Adjust the value as needed
              }
        },
    },

    plugins: [forms],
};
