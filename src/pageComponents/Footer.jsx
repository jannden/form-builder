import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Footer = function Footer(props) {
  const { pagination, dispatchPagination, pageValidation } = props;

  const handlePreviousPage = React.useCallback(() => {
    dispatchPagination({ type: "previous" });
  }, [dispatchPagination]);

  const handleNextPage = React.useCallback(() => {
    if (pageValidation(pagination.currentPage))
      dispatchPagination({ type: "next" });
  }, [dispatchPagination, pageValidation, pagination.currentPage]);

  return (
    <Card.Footer>
      {pagination.currentPage !== 0 && (
        <Button variant="outline-secondary" onClick={handlePreviousPage}>
          Previous
        </Button>
      )}
      {pagination.currentPage !== pagination.lastPage && (
        <Button
          variant="outline-dark"
          className="float-end"
          onClick={handleNextPage}
        >
          Next
        </Button>
      )}
      {pagination.currentPage === pagination.lastPage && (
        <Button type="submit" className="float-end">
          Finish
        </Button>
      )}
    </Card.Footer>
  );
};

export default Footer;
