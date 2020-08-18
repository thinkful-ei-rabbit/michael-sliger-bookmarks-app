/* eslint-disable indent */
import store from './store';

const base_url = 'https://thinkful-list-api.herokuapp.com/michaelsliger/bookmarks';

const bookmarkConstructor = function(title, url, rating, desc){
    return {
        title,
        url,
        rating,
        desc
    };
};

const apiCall = function(...args) {
    let error;
    return fetch(...args)
        .then(res => {
            return res.json();
        }).then(items => {
            return items;
        })
};

const getApiBookmarks = function() {
    return apiCall(base_url);
};

const createBookmark = function(title, url, rating, desc){
    // new object to go into the fetch api call, with JSON.stringify(obj)
    // post method to create
  const postObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bookmarkConstructor(title, url, rating, desc))
  };
  return apiCall(base_url, postObj);
};

const deleteBookmarkByID = function(id) {
    return apiCall(`${base_url}/${id}`, {method: 'DELETE'});
}


// call api, update store, rerender page
export default {
    base_url,
    apiCall,
    getApiBookmarks,
    bookmarkConstructor,
    createBookmark,
    deleteBookmarkByID,

}