import {
  START_GAME,
  GET_GAME_DATA,
  GET_GENDER,
  GET_POKE_DATA,
  GET_POKE_DETAIL_DATA,
} from "../types";

export const initialState = {
  gameInfo: {
    userName: "",
    size: 3,
    version: "https://pokeapi.co/api/v2/",
    data: null,
    pokeData: [],
    pokeDetailData: [],
    gender: null,
  },
};

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          userName: action.game.userName,
        },
      };
    case GET_GAME_DATA:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          data: action.game.gameData,
        },
      };
    case GET_GENDER:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gender: action.gender,
        },
      };
    case GET_POKE_DATA:
      state.gameInfo.pokeData.push({
        character: action.game.pokeData,
      });
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          pokeData: state.gameInfo.pokeData,
        },
      };
    case GET_POKE_DETAIL_DATA:
      state.gameInfo.pokeData.push({
        detail: action.game.pokeDetailData,
      });
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          pokeDetailData: state.gameInfo.pokeData,
        },
      };

    default:
      return state;
  }
}
