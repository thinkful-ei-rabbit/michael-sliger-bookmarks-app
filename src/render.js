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
        <h2>${obj.rating}</h2>
        <div class='hide-btn'>V</div>
    </div>
    <div id='to-hide-or-not-to-hide'>
    <div class='description-container'>
        <p>${(obj.desc) ? obj.desc : 'Missing Desc'}</p>
    </div>
    <div class='del-edit-button-container>
    <label for='delete-button' class='hidden-button'></label>
    <div>
        <button type='button' id='delete-button'>Delete</button>
        <button type='button' id='edit-button'>Edit Desc or Rating</button>
    </div>
    </div>
    </div>
    <span class="divider"></span>
    </li>`;
};

const getTruthFromAPIandStore = function() {
    storeAccess.length = 0;
    // api GET to reaffirm store truth
    return api.getApiBookmarks()
        .then(items => {
        items.forEach(el => storeAccess.push(el));
        return storeAccess.map(el => bookmarkTemplateCreator(el)).join('');
        });
};

const render = function() {
    getTruthFromAPIandStore()
        .then(str => {
            $('.results').empty();
            $('.results').html(str);
        });
};

export default {
    render,
}