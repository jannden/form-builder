import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Footer = function Footer(props) {
  const { pagination, dispatchPagination, handleFinish } = props;
  const handlePreviousPage = React.useCallback(() => {
    dispatchPagination({ type: "previous" });
    console.log(pagination);
  }, [dispatchPagination, pagination]);
  const handleNextPage = React.useCallback(() => {
    dispatchPagination({ type: "next" });
    console.log(pagination);
  }, [dispatchPagination, pagination]);
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
        <Button className="float-end" onClick={handleFinish}>
          Finish
        </Button>
      )}
    </Card.Footer>
  );
};

export default Footer;
