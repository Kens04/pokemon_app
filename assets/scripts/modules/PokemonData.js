export const extractData = (pokemonData) => {
  const id = pokemonData.id;
  const name = pokemonData.name;
  const img = pokemonData.sprites.front_default;
  const types = [];
  pokemonData.types.forEach((typeItem) => {
    types.push(typeItem.type.name);
  });
  return { id, name, img, types };
};

export const showData = (data) => {
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt=""></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dd>
  </dl>`;
  const resultElement = document.querySelector("#js-result");
  resultElement.innerHTML = htmlData;
  resultElement.style.display = "block";

  // 検索結果にスムーズにスクロール
  resultElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
};

export const getPokemonImageUrl = (
  dexNumber,
  isShiny = false,
  imageType = "正面"
) => {
  // 指定した情報を変換
  const imageTypeList = [{ type: "正面", url: "" }];
  const imageTypeUrl = imageTypeList.find(
    (item) => item.type === imageType
  )?.url;
  const shiny = isShiny ? "/shiny" : "";

  // ポケモンの画像URL
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${imageTypeUrl}${shiny}/${dexNumber}.png`;
};

export const showPokemonList = (pokemonList, onPokemonClick) => {
  const listContainer = document.querySelector("#js-pokemon-list");
  const htmlList = pokemonList.results
    .map((pokemon, index) => {
      const dexNumber = index + 1;
      const imageUrl = getPokemonImageUrl(dexNumber);
      return `<div class="pokemon-item" data-pokemon-name="${pokemon.name}">
      <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-sprite">
      <div class="pokemon-info">
        <span class="pokemon-number">#${dexNumber}</span>
        <span class="pokemon-name">${pokemon.name}</span>
      </div>
    </div>`;
    })
    .join("");
  listContainer.innerHTML = htmlList;

  // クリックイベントを追加
  listContainer.querySelectorAll(".pokemon-item").forEach((item) => {
    item.addEventListener("click", () => {
      const pokemonName = item.getAttribute("data-pokemon-name");
      onPokemonClick(pokemonName);
    });
  });
};
