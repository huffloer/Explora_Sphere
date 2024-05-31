import React, { useState } from "react";
import InputError from "./InputError";

export default function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, error, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="inputs  flex flex-col gap-1">
            <label
                className="mx-6  text-white text-sm font-semibold"
                htmlFor={id}
            >
                {label} <span className="text-red-600">*</span>
            </label>
            <input
                className="inputs border border-white outline-none border-none px-4 py-2 rounded-lg mx-6"
                id={id}
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confpwd" && setFocused(true)
                }
                focused={focused.toString()}
            />
            {/* <span className="px-8 text-red-600 font-semibold hidden ">
                {errorMessage}
            </span> */}
            <InputError message={error} className="mt-2 px-8" />
        </div>
    );
}
