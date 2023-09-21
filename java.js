// Function to change background color based on Pokémon type
function changeBackgroundColor(pokemonTypes) {
  const container = document.getElementById("pokemoncontainer");
  console.log(container);

  // Define CSS styles for each type
  const typeStyles = {
    water: "#3EB39F",
    fire: "#FF7276",
    dragon: "antiquewhite",
    ground: "brown",
    psychic: "purple",
    electric: "#FFF67D",
    steel: "grey",
    dark: "indig",
    poison: "BlueViolet ",
    normal: "snow",
    ghost: "silver",
    bug: "seagreen",
    flying: "skyblue",
    fairy: "pink",
    rock: "sienna",
    ice: "#3EB39F",
    grass: "#AFFF80",
    fighting: "white",
  };

  if (pokemonTypes.length === 2) {
    const [type1, type2] = pokemonTypes;

    // Check if both types have defined styles
    if (typeStyles[type1]) {
      container.style.backgroundColor = typeStyles[type1];
    }
  } else if (typeStyles[pokemonTypes[0]]) {
    // If there's only one type, set the background color
    container.style.backgroundColor = typeStyles[pokemonTypes[0]];
  }
}

const searchBtn = document.getElementById("searchbtn");
const PokeContainer = document.getElementById("pokemoncontainer");
const errorContainer = document.getElementById("errorContainer");

searchBtn.addEventListener("click", getPoke);

function getPoke() {
  console.log("hello");
  // Clear the old data
  PokeContainer.innerHTML = "";
  errorContainer.textContent = "";

  const userSearch = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();

  // API call
  fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
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
        pokeheiContainer.textContent = `height: ${height} m`;
        PokeContainer.appendChild(pokeheiContainer);

        const pokehweiContainer = document.createElement("p");
        pokehweiContainer.classList.add("pokewei");
        pokehweiContainer.textContent = `weight: ${weight} kg`;
        PokeContainer.appendChild(pokehweiContainer);

        const typesContainer = document.createElement("div");
        typesContainer.classList.add("pokeTypesContainer");

        types.forEach((type) => {
          const typeCell = document.createElement("div");
          const typeName = type.type.name;

          typeCell.classList.add("type-cell");
          typeCell.classList.add(`type-${typeName}`);
          typeCell.textContent = typeName;

          typesContainer.appendChild(typeCell);
        });

        PokeContainer.appendChild(typesContainer);

        // Change background color based on Pokémon type
        changeBackgroundColor(types.map((type) => type.type.name));
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.log(error);
      // Display the error message on the website
      errorContainer.textContent =
        "Error fetching data. Please try again later.";
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
  // setupAutocomplete([])
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
      errorContainer.textContent = "";

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
        pokeheiContainer.textContent = `height: ${height} m`;
        PokeContainer.appendChild(pokeheiContainer);

        const pokehweiContainer = document.createElement("p");
        pokehweiContainer.classList.add("pokewei");
        pokehweiContainer.textContent = `weight: ${weight} kg`;
        PokeContainer.appendChild(pokehweiContainer);

        const typesContainer = document.createElement("div");
        typesContainer.classList.add("pokeTypesContainer");
        
        types.forEach((type) => {
          const typeCell = document.createElement("div");
          const typeName = type.type.name;
        
          typeCell.classList.add("type-cell");
          typeCell.classList.add(`type-${typeName}`);
          typeCell.textContent = typeName;
        
          typesContainer.appendChild(typeCell);
        });
        
        PokeContainer.appendChild(typesContainer);
        
        // Change background color based on Pokémon type
        changeBackgroundColor(types.map((type) => type.type.name));
        
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


// function setupAutocomplete(pokemonNames) {
//   new autoComplete({
//     data: {
//       src: pokemonNames,
//       cache: false,
//     },
//     selector: "#pokemonInput",
//     threshold: 1,
//     debounce: 300,
//     maxResults: 5,
//     renderItem: function (item, search) {
//       return (
//         '<div class="autocomplete-suggestion" data-val="' +
//         item +
//         '">' +
//         item +
//         "</div>"
//       );
//     },
//     onSelect: function (event, term, item) {
//       // Handle item selection (e.g., show details of the selected Pokémon)
//       alert("You selected: " + term);
//     },
//   });

