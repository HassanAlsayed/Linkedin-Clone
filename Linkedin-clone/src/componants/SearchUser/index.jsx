/* eslint-disable react/prop-types */
import "./index.scss";
import { IoIosSearch } from "react-icons/io";

export default function SearchUsers({setTakeSearch}) {
    return (
    <div className="search-users">
       <IoIosSearch  className="search-icon"/>
    <input 
        placeholder="Search"
        onChange={(event) => setTakeSearch(event.target.value)}
      />
  </div>
  );
}
