import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

const MultiSelectComboBox = ({ options, placeholder }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const comboBoxRef = useRef(null);

  const handleSelectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    }
    setSearchTerm("");
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event) => {
    if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-64" ref={comboBoxRef}>
      <div className="flex items-center gap-1 border border-gray-300 rounded-md p-2 overflow-hidden">
        <div className="flex h-6 items-center flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="bg-royal-blue text-white text-xs rounded-md px-2 py-1 flex items-center gap-1 mr-1"
            >
              {option}
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => handleRemoveOption(option)}
              >
                &times;
              </button>
            </div>
          ))}
          {selectedOptions.length === 0 && (
            <input
              type="text"
              value={searchTerm}
              placeholder={placeholder}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelectOption(searchTerm);
                }
              }}
              className="flex-grow border-none outline-none"
              onFocus={() => setShowOptions(true)}
            />
          )}
        </div>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggleOptions}
          className="focus:outline-none ml-2"
        >
          {showOptions ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </button>
      </div>
      {showOptions && (
        <div className="absolute top-full max-h-48 overflow-y-auto scrollbar-none left-0 bg-white shadow-md w-full mt-1 rounded-md border border-gray-300 z-10">
          {options
            .filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((option) => (
              <div
                key={option}
                className={`cursor-pointer hover:bg-gray-100 py-2 px-4  flex items-center justify-between ${selectedOptions.includes(option) && "bg-gray-50"}`}
                onClick={() => handleSelectOption(option)}
              >
                {option}
                {selectedOptions.includes(option) && <CheckIcon className="text-gray-500" />}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectComboBox;
