import React, { useEffect, useState } from 'react';

const DEFAULT_ROWS = 20;

function usePagination({ totalCount = 0, rowsPerPage = [DEFAULT_ROWS] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(rowsPerPage[1]);
  const [maxPage, setMaxPage] = useState(0);
  const [total, setTotalCount] = useState(totalCount);

  const next = React.useCallback(
    function () {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    },
    [maxPage],
  );

  function prev() {
    setCurrentPage((currentPage) => Math.min(currentPage - 1, 1));
  }

  const handleMaxPage = React.useCallback(
    function (page) {
      if (page && page !== maxPage) {
        setTotalCount(page);
        setMaxPage(Math.ceil(page / itemsPerPage));
      }
    },
    [itemsPerPage, maxPage],
  );

  const handleItemPerPage = React.useCallback(
    function (count) {
      setItemPerPage(count);
      setCurrentPage(0);
      setMaxPage(Math.ceil(total / count));
    },
    [total],
  );

  return React.useMemo(
    () => ({
      next,
      prev,
      currentPage,
      setMaxPage: handleMaxPage,
      maxPage,
      limit: itemsPerPage,
      offset: itemsPerPage * currentPage,
      rowsPerPage,
      setItemPerPage: handleItemPerPage,
      total,
    }),
    [
      currentPage,
      handleItemPerPage,
      handleMaxPage,
      itemsPerPage,
      maxPage,
      next,
      rowsPerPage,
      total,
    ],
  );
}

export default usePagination;
