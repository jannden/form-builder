const paginationReducer = (state, action) => {
  switch (action.type) {
    case "next":
      if (state.currentPage < state.lastPage)
        return { ...state, currentPage: state.currentPage + 1 };
      return { ...state, currentPage: state.lastPage };
    case "previous":
      if (state.currentPage > 0)
        return { ...state, currentPage: state.currentPage - 1 };
      return { ...state, currentPage: 0 };
    default:
      throw new Error("Error while setting the currentPage.");
  }
};
export default paginationReducer;
