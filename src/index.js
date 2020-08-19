import './styles.css';
import store from './store';
import api from './api';
import renderImp from './render' ;
import listeners from './events';

// call api, update store, rerender page
// name of the game baby let's go

// on page first load, get all items from api, update store, render from store


function main() {
  renderImp.render(1);
  listeners.bindListeners();
}

main();