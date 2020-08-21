/* MAIN FUNC PAGE*/


/* eslint-disable indent */
import store from './store';
import api from './api';
import $ from 'jquery';
const storeAccess = store.store.bookmarks;

/* HERE is the place we create templates and render them to the DOM */
const bookmarkTemplateCreator = function(obj) {
    return `<li class="individual-res" data-id='${obj.id}'>
    <div class='link-header-container'>
        <section><a href='${obj.url}' target="_blank">${obj.title}</a></section>
        <div class='link-container-sub'>
        <h2>${obj.rating}/5</h2>
        <button class='hide-btn'>V</button>
        </div>
    </div>
    <div id='to-hide-or-not-to-hide' class='hidden-div'>
     <div class='description-container editable'>
        <p>${(obj.desc) ? obj.desc : 'Missing Desc'}</p>
     </div>
     <div class='del-edit-button-container>
      <label for='delete-button' class='hidden-button'></label>
      <div class='del-edit-button-container-nest'>
        <button type='button' id='delete-button'>Delete</button>
        <button type='button' id='edit-button'>Edit Desc and Rating</button>
      </div>
     </div>
    </div>
    <span class="divider"></span>
    </li>`;
};

const editTemplate = `
<form class='edit-form'>
    <input type='number' class='form-edit-rating' min='1' max='5' value='5' placeholder='rating'>
    <input type='text' class='form-edit-desc'placeholder='desc'>
    <button type='submit'>Submit Changes</button>
    <div class="error-render-local"></div>
</form>
`;

const getTruthFromAPIandStore = function(filter) {
    storeAccess.length = 0;
    // api GET to reaffirm store truth
        return api.getApiBookmarks()
        .then(items => {
            items.forEach(el => storeAccess.push(el));
            return storeAccess.filter(tar => tar.rating >= filter).map(el => bookmarkTemplateCreator(el));
        }).catch(e => store.setError(e.message));
};

const render = function(filter) {
    getTruthFromAPIandStore(filter)
        .then(str => {
            $('main').empty();
            $('main').html(`<ul class="results"><${str.join('')}</ul>`);
        }).catch(e => {
            store.setError(e.message);
        });
};

export default {
    render,
    editTemplate
}