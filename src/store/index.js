// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

// const charactersReducer = (state = { characters: [] }, action) => {
//   switch (action.type) {
//     case "addCharacters":
//       console.log("adding character:", action.addedChar?.name);
//       console.log("characters before adding:", state.characters);
//       // Refactor - you're mutating state here instead of returning a new object
//       // state.characters.push(action.addedChar);
//       return {
//         // characters: state.characters.push(action.addedChar)
//         characters: state.characters
//           ? new Array(...state.characters).push(action.addedChar)
//           : new Array(...action.addedChar),
//       };
//     default:
//       return state;
//   }
// };

const charactersSlice = createSlice({
  name: "characters",
  initialState: { characters: [], likedChars: [] },
  reducers: {
    addCharacter(state, action) {
      state.characters.push(action.payload);
    },
    deleteCharacter(state, action) {
      state.characters = action.payload;
      // state.characters = state.characters.filter(char => char !== action.payload);
    },
    //** this is not working currently **/
    likeCharacter(state, action) {
      if (action.payload.add) {
        console.log('add is truthy',action.payload);
        state.likedChars.push(action.payload.character);
        console.log('likedChars', typeof state.likedChars, state.likedChars);
      } else {
        console.log('add is falsy',action.payload);
        state.likedChars.push(action.payload.character);
        console.log('likedChars', state.likedChars);
      }
    }
  },
});

// const store = createStore(charactersReducer);
const store = configureStore({
  // pass in the reducer
  reducer: charactersSlice.reducer,
});

export const characterActions = charactersSlice.actions;

export default store;
