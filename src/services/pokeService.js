import { PokedexEndPoints } from "../utils/pokedexEndPoints";

export const pokeService = {
  getGameData,
  getPokeData,
  getGender,
  getGameDataByGender,
};

function getGameData(data) {
  let param = "?limit=1000&offset=0";
  const version = data.version;
  return fetch(version + PokedexEndPoints.GetGameData + param)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}
function getGameDataByGender(data, gender) {
  let param = "?limit=1000&offset=0";
  const version = data.version;
  debugger;
  return fetch(version + PokedexEndPoints.GetGender + gender + param)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}
function getGender(data) {
  const version = data.version;
  return fetch(version + PokedexEndPoints.GetGender)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}
function getPokeData(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}
