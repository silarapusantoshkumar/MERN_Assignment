import React from 'react';
import { GoSearch } from "react-icons/go";
import './search.css';

export default function search({ searchTerm, handleSearchChange }) {
  return (
    <div class="search_parentdiv">
      <div class="search_icondiv">
        <GoSearch />
      </div>
    <input 
    placeholder='Search' 
    class="search_input"
    value={searchTerm} 
    onChange={handleSearchChange}
    />
    </div>
  )
}
