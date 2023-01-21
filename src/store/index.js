import { createStore } from "redux";

const charactersReducer = (state = { characters: [] }, action) => {
  switch (action.type) {
    case "addCharacters":
      console.log("adding character:", action.addedChar?.name);
      console.log('characters before adding:', state.characters)
      state.characters.push(action.addedChar);
      return state;
    default:
      return state;
  }
};

const store = createStore(charactersReducer);

export default store;
