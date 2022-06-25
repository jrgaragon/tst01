import React from "react";
import { Link } from "react-router-dom";

const Paginator = ({ setState, state }) => {
  const onBack = (e) => {
    //console.log({ ...state });
    if (state.page > 0) {
      setState({ ...state, page: state.page - 1 });
    }
  };

  const onNext = (e) => {
    //console.log({ ...state });

    if (state.page + 1 < state.pages) {
      setState({ ...state, page: state.page + 1 });
    }
  };

  const goToPage = (page) => {
    setState({ ...state, page: page });
  };

  let pageItems = [];
  for (let i = 0; i < state.pages; i++) {
    pageItems.push(
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => {
          goToPage(i);
        }}
        key={i}
      >
        Page {i + 1}
      </a>
    );
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            | Pages {state.pages} | Current: {state.page} |
          </li>
          <li className="page-item">
            {/* <Link
              onClick={onBack}
              to={{ pathname: `/${state.path}/${state.model.modelName}` }}
              state={{ page: state.page, username: state.model.modelName }}
              className="btn btn-primary"
            >
              Previous
            </Link>          */}
            <a href="#" onClick={onBack} className="btn btn-primary">
              Previous
            </a>
          </li>
          <li className="page-item">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Page {state.page + 1}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {pageItems}
              </div>
            </div>
          </li>
          <li className="page-item">
            <a href="#" onClick={onNext} className="btn btn-primary">
              Next
            </a>
            {/* <Link
              onClick={onNext}
              to={{ pathname: `/${state.path}/${state.model.modelName}` }}
              state={{ page: state.page, username: state.model.modelName }}
              className="btn btn-primary"
            >
              Next
            </Link>            */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginator;
