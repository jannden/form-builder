import React from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

// Form components
import Header from "./pageComponents/Header";
import FormBuilder from "./FormBuilder";
import Footer from "./pageComponents/Footer";

// Logic
import paginationReducer from "./logic/paginationReducer";

const PagesBuilder = function PagesBuilder(props) {
  const { wizardJSON } = props;
  const [pagination, dispatchPagination] = React.useReducer(paginationReducer, {
    currentPage: 0,
    lastPage: wizardJSON[0].pages.length - 1,
  });

  const handleFinish = () => {
    console.log("Finished.");
  };

  const renderPage = () => {
    const renderedPage = wizardJSON[0].pages.map((page, index) => {
      if (index === pagination.currentPage) {
        return (
          <Card key={page.title}>
            <Header title={page.title} />
            <FormBuilder pageFields={page.fields} />
            <Footer
              pagination={pagination}
              dispatchPagination={dispatchPagination}
              handleFinish={handleFinish}
            />
          </Card>
        );
      }
      return null;
    });
    if (renderedPage.length) return renderedPage;
    return <Alert variant="danger">No pages available.</Alert>;
  };

  return <div>{renderPage()}</div>;
};

export default PagesBuilder;
