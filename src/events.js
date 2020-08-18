/* eslint-disable indent */
import $ from 'jquery';
import api from './api';
import store from './store';
import render from './render';
const storeAccess = store.store.bookmarks;

// handle the submit
const handleSubmitClick = function() {
    $('.bookmark-form').on('submit', function(e) {
        e.preventDefault();
        const nameVal = $(e.currentTarget).find('.form-input-name').val();
        const linkVal = $(e.currentTarget).find('.form-input-link').val();
        const ratingVal = $(e.currentTarget).find('.form-input-rating').val();
        const descVal = $(e.currentTarget).find('.form-input-desc').val();
        api.createBookmark(nameVal, linkVal, ratingVal, descVal)
            .then((items) => {
                store.push(items);
                render.render();
            });
    });
};

const getElementByID = function(element) {
    return $(element).closest('li').data('id');
}

const findStoreObjByID = function(id) {
    return storeAccess.find(el => el.id === id);
}

const handleDeleteClick = function() {
    $('.results').on('click', '#delete-button', function(e) {
        const id = getElementByID(e.currentTarget);
        const arrayIndexToRemove = storeAccess.indexOf(findStoreObjByID(id));
        console.log(arrayIndexToRemove);
        console.log(id);
        // delete from api and store
        api.deleteBookmarkByID(id)
            .then(() => {
                render.render();
            });
    });
};

const handleToHideClick = function() {
    $('.results').on('click', '.hide-btn', function(e) {
        $('#to-hide-or-not-to-hide').toggleClass('hidden-div');
    });
}


export default {
    handleSubmitClick,
    handleDeleteClick,
    handleToHideClick,
}