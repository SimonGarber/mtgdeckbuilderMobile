const initialState = {
  apiData: [],
  isDataLoading: false,
  error: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARDS_START":
      return [...state, { isDataLoading: true }];

    case "GET_CARDS_SUCCESS":
      return [...state, { isDataLoading: false, apiData: action.payload }];

    case "GET_CARDS_FAILURE":
      return [...state, { error: action.payload, isDataLoading: false }];

    default:
      return state;
  }
};
export default dataReducer;
