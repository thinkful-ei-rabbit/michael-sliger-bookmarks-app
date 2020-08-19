/* eslint-disable indent */

const store = {
    bookmarks: [
    ],
    adding: false,
    error: null,
    filter: 0
  };

const setError = function(message) {
  this.error = message;
}
  export default {
    store,
    setError
  }