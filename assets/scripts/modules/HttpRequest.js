import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
});

export const getPokemonData = async (pokeName) => {
  try {
    const response = await instance.get(pokeName);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("ポケモンが見つかりません");
  }
}

export const getAllPokemonData = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("ポケモンが見つかりません");
  }
};