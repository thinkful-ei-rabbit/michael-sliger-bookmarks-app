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
const editConstructor = function(rating, desc){
    return {
        rating,
        desc
    };
};

const apiCall = function(...args) {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                console.log(res);
                error = {code: res.status};
            }
            if (!res.headers.get('Content-Type').includes('json')) {
                error.message = res.statusText;
                return Promise.reject(error);
            }
            return res.json();
        }).then(items => {
            if (error) {
                error.message = items.message;
                return Promise.reject(error);
            }
            return items;
        });
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
};

const editBookmarkByID = function(id, rating, desc) {
    const patchObj = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editConstructor(rating, desc))
    };
    return apiCall(`${base_url}/${id}`, patchObj);
};


// call api, update store, rerender page
export default {
    base_url,
    apiCall,
    getApiBookmarks,
    bookmarkConstructor,
    createBookmark,
    deleteBookmarkByID,
    editBookmarkByID,
}