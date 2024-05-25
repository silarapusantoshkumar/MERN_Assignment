import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Pagination from './pagination';
import './pagination.css';
import './card.css';

export default function Request({searchTerm}) {
  const [request, setRequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:5010/get-all-data')
      .then(response => {
        setRequest(response.data);
        setCurrentPage(1);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [searchTerm]);

  // Filter Request by tag value
  const filteredRequest = request.filter(resource => resource.tag === 'request');

  // Filter resources based on search term
  // const filteredResources = filteredRequest.filter(resource =>
  //   resource.title && resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredResources = useMemo(() => {
    return searchTerm
      ? filteredRequest.filter(resource =>
          resource.title && resource.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredRequest;
  }, [searchTerm, filteredRequest]);

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResources.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="cards-grid">
        {currentItems.map((item, index) => (
          <div key={index} className="card">
            <div className="card-firstRow">
              <div className="card-image">
                <img src={item.icon_url} alt={item.title}/>  
              </div>
              <div className="card-heading">
                <h5>{item.title}</h5>
                <p>{item.category}</p>
              </div>
            </div>
            <div className="card-secondRow">
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
