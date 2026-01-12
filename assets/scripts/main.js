import "../styles/style.css";
import { getPokemonData, getAllPokemonData } from "./modules/HttpRequest";
import { extractData, showData, showPokemonList } from "./modules/PokemonData";

const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  return pokeName;
};

const loadPokemonDetails = async (pokemonName) => {
  try {
    const pokemonData = await getPokemonData(pokemonName);
    if (pokemonData) {
      const extractedData = extractData(pokemonData);
      showData(extractedData);
    }
  } catch (error) {
    console.error("ポケモンの読み込みに失敗しました", error);
  }
};

const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);
  if (inputName) {
    await loadPokemonDetails(inputName);
  }
};

// ページ読み込み時にポケモン一覧を表示
const init = async () => {
  const allPokemon = await getAllPokemonData();
  if (allPokemon) {
    showPokemonList(allPokemon, loadPokemonDetails);
  }
};

document
  .querySelector("#js-form")
  .addEventListener("submit", (e) => submitHandler(e));

init();
