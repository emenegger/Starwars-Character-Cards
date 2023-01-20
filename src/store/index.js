import { createStore } from 'redux';

const charactersReducer = (state = {characters: null}, action) => {
  switch (action.type) {
    case 'addCharacters':
      console.log('adding characters')
      return state;
    default:
      return state;
  } 
}

const store = createStore(charactersReducer);

export default store;