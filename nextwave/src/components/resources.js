import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Pagination from './pagination';
import './pagination.css';
import './card.css';


export default function Resources({ searchTerm }) {
  const [resources, setResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:5010/get-all-data')
      .then(response => {
        setResources(response.data);
        // console.log(response.data, 122);
        setCurrentPage(1);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [searchTerm]);

  // Filter resources based on search term
  // const filteredResources = resources.filter(resource =>
  //   resource.title && resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredResources = useMemo(() => {
    return searchTerm
      ? resources.filter(resource =>
          resource.title && resource.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : resources;
  }, [searchTerm, resources]);

  
  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResources.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
     <div className="cards-grid">
        {currentItems.map((item, index) => (
          <div key={index} className="card">
            <div class="card-firstRow">
              <div class="card-image">
                <img src={item.icon_url} alt={item.title}/>  
              </div>
              <div class="card-heading">
                <h5>{item.title}</h5>
                <p>{item.category}</p>
              </div>
            </div>
            <div class="card-secondRow">
              <h5>{item.link}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredResources.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}


