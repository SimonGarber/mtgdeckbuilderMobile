const searchedArray = (someId, someArray) => {
  for (let i = 0; i < someArray.length; i++) {
    if (someArray[i].id === someId) {
      return true;
    }
  }
};

module.exports = searchedArray;
