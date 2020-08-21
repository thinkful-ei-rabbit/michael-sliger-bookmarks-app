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
        $('.main-form-error-container').html('');
        const nameVal = $(e.currentTarget).find('.form-input-name').val();
        const linkVal = $(e.currentTarget).find('.form-input-link').val();
        const ratingVal = $(e.currentTarget).find('.form-input-rating').val();
        const descVal = $(e.currentTarget).find('.form-input-desc').val();
        api.createBookmark(nameVal, linkVal, ratingVal, descVal)
            .then((items) => {
                render.render(0);
            }).then(
                $('form :input').val('')
            ).catch(e => {
                console.log(e.message);
                $('.main-form-error-container').html(`<p>Error: ${e.message}</p>`)
            });
    });
};

const getElementAndReturnID = function(element) {
    return $(element).closest('li').data('id');
};

const findStoreObjByID = function(id) {
    return storeAccess.find(el => el.id === id);
};

const handleDeleteClick = function() {
    $('main').on('click', '#delete-button', function(e) {
        const id = getElementAndReturnID(e.currentTarget);
        // const arrayIndexToRemove = storeAccess.indexOf(findStoreObjByID(id));
        
        // delete from api and rerender store
        api.deleteBookmarkByID(id)
            .then(() => {
                render.render(0);
            }).catch(error => {
                alert(error.message);
            });
    });
};

const handleToHideClick = function() {
    $('main').on('click', '.hide-btn', function(e) {
       $(e.currentTarget).closest('li').find('#to-hide-or-not-to-hide').toggleClass('hidden-div');
    });
    $('.main-form').on('click', '.main-form-hide-btn', function(e) {
        $('#form-pop-up').toggleClass('hidden-div');
    });
};

const handleFilter = function() {
    $('.main-form').on('change', '#filter-by-rating', function(e) {
        const filterVal = $('#filter-by-rating').val();
        // filter store and re-render
        render.render(filterVal);
    });
};

const handleEditClick = function() {
    $('main').on('click', '#edit-button', function(e){
        const elID = getElementAndReturnID(e.currentTarget);
        $(e.currentTarget).closest('li').find('.editable').replaceWith(render.editTemplate);
        // event listener on new button
        $('.results').on('submit', '.edit-form', function(e) {
            e.preventDefault();
            $(e.currentTarget).closest('li').find('.error-render-local')
                        .html('');
            const editRatingVal = $('.form-edit-rating').val();
            const editDescVal = $('.form-edit-desc').val();
            api.editBookmarkByID(elID, editRatingVal, editDescVal)
                .then(() => {
                    render.render(1);
                }).then(() => {
                    alert('Bookmark edited!');
                }).catch(error => {
                    $(e.currentTarget).closest('li').find('.error-render-local')
                        .html(`<p>Error: ${error.message}</p>`);
                });
        });
        // replace with form inputs, submit form with patch, re render if successful
    });
};

const bindListeners = function() {
    handleSubmitClick();
    handleDeleteClick();
    handleToHideClick();
    handleFilter();
    handleEditClick();
};

export default {
    bindListeners
}