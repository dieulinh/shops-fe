import { useState } from 'react';

function Pagination({ totalPages, page, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(page);

  const handlePageClick = (page) => {

    onPageChange(page);
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() =>handlePageClick(i)}
          style={{
            margin: '0 4px',
            fontWeight: currentPage === i ? 'bold' : 'normal',
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {renderPages()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
