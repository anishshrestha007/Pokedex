import {
  START_GAME,
  GET_GAME_DATA,
  GET_GENDER,
  GET_POKE_DATA,
  GET_POKE_DETAIL_DATA,
} from "../types";
import { showToast } from "../../components/generics/Toast";
import { pokeService } from "../../services/pokeService";
import _ from "lodash";

export const startGame = (gameInfo, callBack) => {
  return (dispatch) => {
    dispatch({
      type: START_GAME,
      game: {
        userName: gameInfo.userName,
      },
    });
    showToast(
      "success",
      "Welcome " + gameInfo.userName + ", Start playing poke game!"
    );
    callBack && callBack();
  };
};
export const getGameData = (gameInfo, callBack) => {
  return (dispatch) => {
    pokeService.getGameData(gameInfo).then(
      (response) => {
        if (response.results.length > 0) {
          dispatch({
            type: GET_GAME_DATA,
            game: {
              gameData: response.results,
            },
          });
          callBack && callBack(response.results);
        } else {
          showToast("error", "Server Error !");
        }
      },
      (error) => {
        showToast("error", "Server Error !");
      }
    );
  };
};
export const getGameDataByGender = (data, gender, callBack) => {
  return (dispatch) => {
    pokeService.getGameDataByGender(data, gender).then(
      (response) => {
        if (response.pokemon_species_details.length > 0) {
          let _detail = response.pokemon_species_details.map((a) => {
            return {
              name: a.pokemon_species.name,
              url: a.pokemon_species.url,
            };
          });
          dispatch({
            type: GET_GAME_DATA,
            game: {
              gameData: _detail,
            },
          });
          callBack && callBack(_detail);
        } else {
          showToast("error", "Server Error !");
        }
      },
      (error) => {
        showToast("error", "Server Error !");
      }
    );
  };
};
export const getGender = (gameInfo, callBack) => {
  return (dispatch) => {
    pokeService.getGender(gameInfo).then(
      (response) => {
        if (response.results.length > 0) {
          dispatch({
            type: GET_GENDER,
            gender: response.results,
          });
          callBack && callBack(response.results);
        } else {
          showToast("error", "Server Error !");
        }
      },
      (error) => {
        showToast("error", "Server Error !");
      }
    );
  };
};
export const getPokeData = (url, callBack) => {
  return (dispatch) => {
    pokeService.getPokeData(url).then(
      (response) => {
        if (response.id > 0) {
          dispatch({
            type: GET_POKE_DATA,
            game: {
              pokeData: response,
            },
          });
          callBack && callBack(response);
        } else {
          showToast("error", "Server Error !");
        }
      },
      (error) => {
        showToast("error", "Server Error !");
      }
    );
  };
};

export const getPokeDetailData = (url, callBack) => {
  return (dispatch) => {
    pokeService.getPokeData(url).then(
      (response) => {
        if (response.id > 0) {
          dispatch({
            type: GET_POKE_DETAIL_DATA,
            game: {
              pokeData: response,
            },
          });
          callBack && callBack(response);
        } else {
          showToast("error", "Server Error !");
        }
      },
      (error) => {
        showToast("error", "Server Error !");
      }
    );
  };
};
