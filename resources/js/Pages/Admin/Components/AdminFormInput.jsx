import React, { useState } from "react";

export default function AdminFormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;
  
    const handleFocus = (e) => {
      setFocused(true);
    };

  return (
    <div className="flex flex-col my-3  lg:flex-row lg:items-center">
      <label htmlFor={props.id} className="w-48 px-6 py-2 text-sm border border-r font-semibold">
        {label}
      </label>
      <input
        className="bg-gray-50 px-4 py-2 mx-6 outline-none text-lg text-gray-900 font-semibold "
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={ () => 
            inputProps.name==='confpwd' && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="px-8 text-red-600 font-semibold hidden ">{errorMessage}</span>
    </div>
  );
}
