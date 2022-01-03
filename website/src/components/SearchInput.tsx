import React, { useState } from "react";

function SearchInput(props: any) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.getSearchValue({
          search: inputValue,
        });
      }}
    >
      <input
        type="text"
        name="input"
        className="searchInput"
        placeholder="Enter Github Username"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchInput;
