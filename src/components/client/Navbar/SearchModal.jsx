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
        <form
          className="input flex items-center gap-2 focus-within:outline-none input-bordered"
          onSubmit={submitHandler}
        >
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
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={closeHandler}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default SearchModal;
