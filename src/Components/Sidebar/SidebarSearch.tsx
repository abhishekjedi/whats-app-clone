import React from "react";
import "./SidebarSearch.scss";
import { useState } from "react";

const SidebarSearch: React.FC<{ onSearch: (value: string) => void }> = ({
  onSearch,
}) => {
  const [searchedItem, setSearchedItem] = useState("");
  const searchHandler = (event: React.FormEvent<HTMLInputElement>) => {
    onSearch(event.currentTarget.value);
    setSearchedItem(event.currentTarget.value);
  };
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchedItem);
  };
  return (
    <div className="search" onSubmit={submitHandler}>
      <form>
        <input
          type="text"
          className="search__input"
          onChange={searchHandler}
          placeholder="Search or start new chat"
        ></input>
        <button className="search__btn">search</button>
      </form>
    </div>
  );
};

export default SidebarSearch;
