import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (query.length > 1) {
      navigate(`/client/search/${query}`, { state: { query } });
      document.getElementById("my_modal_2").close();
      setQuery("");
    } else {
      alert("Please enter more than 1 letter for the search");
    }
  };

  const closeHandler = () => {
    setQuery("");
    document.getElementById("my_modal_2").close();
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box absolute top-20 max-w-7xl rounded-md">
        <form onSubmit={submitHandler}>
          <label className="input flex items-center gap-2 focus-within:outline-none input-bordered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Search for..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <p
              className="cursor-pointer text-rose-400"
              onClick={() => setQuery("")}
            >
              Clear all
            </p>
          </label>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={closeHandler}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default SearchModal;
