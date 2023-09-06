// Function to change background color based on Pokémon type
function changeBackgroundColor(pokemonTypes) {
  const body = document.body;

  // Define CSS styles for each type
  const typeStyles = {
    water: "blue",
    fire: "red",
    dragon: "antiquewhite",
    ground: "brown",
    psychic: "purple",
    electric: "yellow",
    steel: "grey",
    dark:"black",
    poison:"BlueViolet ",
    drangon:"Tan",
    normal:"snow",
    ghost:"silver",
    bug:"seagreen",
    flying:"skyblue",
    fairy:"pink",
    rock:"sienna",
    ice:"royalblue",
    grass:"green",
    fighting:"white"
  };

  if (pokemonTypes.length === 2) {
    const [type1, type2] = pokemonTypes;
  
    // Check if both types have defined styles
    if (typeStyles[type1] && typeStyles[type2]) {
      // Calculate the split point for the background
      const splitPoint = "50%";
  
      // Apply background gradient
      body.style.background = `linear-gradient(to right, ${typeStyles[type1]} ${splitPoint}, ${typeStyles[type2]} ${splitPoint})`;
    }
  } else if (typeStyles[pokemonTypes[0]]) {
    // If there's only one type, set the background color
    body.style.backgroundColor = typeStyles[pokemonTypes[0]];
  }
}

const searchBtn = document.getElementById("searchbtn");
const PokeContainer = document.getElementById("pokemoncontainer");

searchBtn.addEventListener("click", getPoke);

function getPoke() {
  console.log("hello");
  // Clear the old data
  PokeContainer.innerHTML = "";

  const userSearch = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();

  // API call
  fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const { name, order, sprites, types, height, weight } = data;

        const pokeNameContainer = document.createElement("h1");
        pokeNameContainer.classList.add("pokeName");
        pokeNameContainer.textContent = name;
        PokeContainer.appendChild(pokeNameContainer);

        const pokePicContainer = document.createElement("img");
        pokePicContainer.classList.add("pokePic");
        pokePicContainer.src = sprites.front_default;
        pokePicContainer.alt = name;
        PokeContainer.appendChild(pokePicContainer);

        const pokeOrdContainer = document.createElement("p");
        pokeOrdContainer.classList.add("pokeOrd");
        pokeOrdContainer.textContent = `Order: ${order}`;
        PokeContainer.appendChild(pokeOrdContainer);

        const pokeheiContainer = document.createElement("p");
        pokeheiContainer.classList.add("pokehei");
        pokeheiContainer.textContent = `height: ${height}`;
        PokeContainer.appendChild(pokeheiContainer);

        const pokehweiContainer = document.createElement("p");
        pokehweiContainer.classList.add("pokewei");
        pokehweiContainer.textContent = `weight: ${weight}`;
        PokeContainer.appendChild(pokehweiContainer);

        const typesContainer = document.createElement("p");
        typesContainer.classList.add("pokePo");
        const typeNames = types.map((type) => type.type.name).join(", ");
        typesContainer.textContent = `Types: ${typeNames}`;
        PokeContainer.appendChild(typesContainer);

        // Change background color based on Pokémon type
        changeBackgroundColor(types.map((type) => type.type.name));
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Error fetching data");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("backgroundAudio");
  const volumeButton = document.getElementById("volumeButton");

  let isMuted = false;

  volumeButton.addEventListener("click", function () {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
    isMuted = !isMuted;
    volumeButton.innerText = isMuted ? "Unmute" : "Mute";
  });
});

const randomPokemonButton = document.getElementById("randomPokemonButton");

randomPokemonButton.addEventListener("click", getRandomPokemon);

function getRandomPokemon() {
  // Clear the old data
  PokeContainer.innerHTML = "";

  // Generate a random Pokémon ID between 1 and 898 (total number of Pokémon in the API)
  const randomPokemonId = Math.floor(Math.random() * 898) + 1;

  // API call to fetch a random Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const { name, order, sprites, types, height, weight } = data;

        const pokeNameContainer = document.createElement("h1");
        pokeNameContainer.classList.add("pokeName");
        pokeNameContainer.textContent = name;
        PokeContainer.appendChild(pokeNameContainer);

        const pokePicContainer = document.createElement("img");
        pokePicContainer.classList.add("pokePic");
        pokePicContainer.src = sprites.front_default;
        pokePicContainer.alt = name;
        PokeContainer.appendChild(pokePicContainer);

        const pokeOrdContainer = document.createElement("p");
        pokeOrdContainer.classList.add("pokeOrd");
        pokeOrdContainer.textContent = `Order: ${order}`;
        PokeContainer.appendChild(pokeOrdContainer);

        const pokeheiContainer = document.createElement("p");
        pokeheiContainer.classList.add("pokehei");
        pokeheiContainer.textContent = `height: ${height}`;
        PokeContainer.appendChild(pokeheiContainer);

        const pokehweiContainer = document.createElement("p");
        pokehweiContainer.classList.add("pokewei");
        pokehweiContainer.textContent = `weight: ${weight}`;
        PokeContainer.appendChild(pokehweiContainer);

        const typesContainer = document.createElement("p");
        typesContainer.classList.add("pokePo");
        const typeNames = types.map((type) => type.type.name).join(", ");
        typesContainer.textContent = `Types: ${typeNames}`;
        PokeContainer.appendChild(typesContainer);

        // Change background color based on Pokémon type
        changeBackgroundColor(types.map((type) => type.type.name));
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Error fetching data");
    });
}
