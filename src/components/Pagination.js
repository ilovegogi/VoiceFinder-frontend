import React from 'react';
import './Pagination.css';  

function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPage = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => goToPage(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div class="pagination-container">
      <ul class="pagination">
        <li>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        </li>
        {renderPageNumbers()}
        <li>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </li>
      </ul>
    </div>  
  );
}

export default Pagination;
