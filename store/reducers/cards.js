const initialState = {
  userData: [],
  isUserLoading: false,
  error: null
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_CARDS":
      return action.payload;

    default:
      return state;
  }
};
export default cardsReducer;
