// Function to change background color based on Pokémon type
function changeBackgroundColor(pokemonTypes) {
  const container = document.getElementById("pokemoncontainer");

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
    poison: "BlueViolet",
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

// Function to display Pokémon details in the same container
function displayPokemonDetails(data) {
  if (data) {
    const { name, order, sprites, types, height, weight, moves } = data;

    const pokeNameContainer = document.createElement("h1");
    pokeNameContainer.classList.add("pokeName");
    pokeNameContainer.textContent = name;
    const PokeContainer = document.getElementById("pokemoncontainer");
    PokeContainer.appendChild(pokeNameContainer);

    // Add a click event listener to the pokeNameContainer (optional)
    pokeNameContainer.addEventListener("click", () => {
      // Handle clicking the Pokémon's name (if needed)
    });

    const pokePicContainer = document.createElement("img");
    pokePicContainer.classList.add("pokePic");
    pokePicContainer.src = sprites.front_default;
    pokePicContainer.alt = name;
    PokeContainer.appendChild(pokePicContainer);

    const pokeOrdContainer = document.createElement("p");
    pokeOrdContainer.classList.add("pokeOrd");
    pokeOrdContainer.textContent = `NO.${order}`;
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
    const movesContainer = document.createElement("div");
    movesContainer.classList.add("pokeMovesContainer");

    // Sort the moves by their power (base_power)
    moves.sort((a, b) => {
      const basePowerA = getMoveBasePower(a);
      const basePowerB = getMoveBasePower(b);
      return basePowerB - basePowerA;
    });

    // Display the three most powerful moves
    const bestMovesLabel = document.createElement("div");
    bestMovesLabel.classList.add("best-moves-label");
    bestMovesLabel.textContent = "Best Moves";
    movesContainer.appendChild(bestMovesLabel);

    moves.slice(0, 3).forEach((move) => {
      const moveCell = document.createElement("div");
      moveCell.classList.add("move-cell");
      moveCell.textContent = move.move.name;

      movesContainer.appendChild(moveCell);
    });

    PokeContainer.appendChild(movesContainer);

    // Change background color based on Pokémon type
    changeBackgroundColor(types.map((type) => type.type.name));
  } else {
    console.log("No data found");
  }
}

// Modify the getPokemonDetails function to call displayPokemonDetails
function getPokemonDetails(pokemonName) {
  // API call to fetch Pokémon details
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Clear the old data
      const PokeContainer = document.getElementById("pokemoncontainer");
      const errorContainer = document.getElementById("errorContainer");
      PokeContainer.innerHTML = "";
      errorContainer.textContent = "";

      // Call the function to display Pokémon details in the same container
      console.log(data);
      displayPokemonDetails(data);
    })
    .catch((error) => {
      console.error(error);
      const errorContainer = document.getElementById("errorContainer");
      errorContainer.textContent =
        "Error fetching data. Please try again later.";
    });
}

const typeIds = {
  fire: 10,
  water: 11,
  dragon: 16,
  ground: 5,
  psychic: 14,
  electric: 13,
  steel: 9,
  dark: 17,
  poison: 4,
  normal: 1,
  ghost: 8,
  bug: 7,
  flying: 3,
  fairy: 18,
  rock: 6,
  ice: 15,
  grass: 12,
  fighting: 2,
};

const fireTypeButton = document.getElementById("fireTypeButton");

fireTypeButton.addEventListener("click", function () {
  filterPokemonByType("fire");
});

const waterTypeButton = document.getElementById("waterTypeButton");
waterTypeButton.addEventListener("click", function () {
  filterPokemonByType("water");
});

const groundTypeButton = document.getElementById("groundTypeButton");
groundTypeButton.addEventListener("click", function () {
  filterPokemonByType("ground");
});

const electricTypeButton = document.getElementById("electricTypeButton");
electricTypeButton.addEventListener("click", function () {
  filterPokemonByType("electric");
});

const normalTypeButton = document.getElementById("normalTypeButton");
normalTypeButton.addEventListener("click", function () {
  filterPokemonByType("normal");
});

function filterPokemonByType(typeName) {
  // Clear previous data
  const PokeContainer = document.getElementById("pokemoncontainer");
  const errorContainer = document.getElementById("errorContainer");
  PokeContainer.innerHTML = "";
  errorContainer.textContent = "";

  // Get the type ID based on the type name
  const typeId = typeIds[typeName.toLowerCase()];

  // Fetch Pokémon by type ID
  fetch(`https://pokeapi.co/api/v2/type/${typeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.pokemon) {
        // Keep track of the number of Pokémon displayed
        let displayedPokemonCount = 0;

        data.pokemon.forEach((pokemon) => {
          if (displayedPokemonCount < 30) {
            // Limit to 10 Pokémon
            const pokemonName = pokemon.pokemon.name;
            // Create a button for each Pokémon
            const pokemonButton = document.createElement("button");
            pokemonButton.textContent = pokemonName;
            pokemonButton.classList.add("pokemon-type-button");

            // Add a click event listener to display the Pokémon when clicked
            pokemonButton.addEventListener("click", () => {
              getPokemonDetails(pokemonName);
            });

            // Append the button to the container
            PokeContainer.appendChild(pokemonButton);

            displayedPokemonCount++; // Increment the count
          }
        });
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error(error);
      errorContainer.textContent =
        "Error fetching data. Please try again later.";
    });
}

// Take data from input
const searchBtn = document.getElementById("searchbtn");
const errorContainer = document.getElementById("errorContainer");

searchBtn.addEventListener("click", getPoke);

function getPoke() {
  // Clear the old data
  const PokeContainer = document.getElementById("pokemoncontainer");
  const errorContainer = document.getElementById("errorContainer");
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
        const { name, order, sprites, types, height, weight, moves } = data;

        const pokeNameContainer = document.createElement("h1");
        pokeNameContainer.classList.add("pokeName");
        pokeNameContainer.textContent = name;
        PokeContainer.appendChild(pokeNameContainer);

        // Add a click event listener to the pokeNameContainer
        pokeNameContainer.addEventListener("click", () => {
          getPokemonDetails(name); // Call the function to navigate
        });

        const pokePicContainer = document.createElement("img");
        pokePicContainer.classList.add("pokePic");
        pokePicContainer.src = sprites.front_default;
        pokePicContainer.alt = name;
        PokeContainer.appendChild(pokePicContainer);

        const pokeOrdContainer = document.createElement("p");
        pokeOrdContainer.classList.add("pokeOrd");
        pokeOrdContainer.textContent = `NO.${order}`;
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
        const movesContainer = document.createElement("div");
        movesContainer.classList.add("pokeMovesContainer");

        // Sort the moves by their power (base_power)
        moves.sort((a, b) => {
          const basePowerA = getMoveBasePower(a);
          const basePowerB = getMoveBasePower(b);
          return basePowerB - basePowerA;
        });

        // Display the three most powerful moves
        const bestMovesLabel = document.createElement("div");
        bestMovesLabel.classList.add("best-moves-label");
        bestMovesLabel.textContent = "Best Moves";
        movesContainer.appendChild(bestMovesLabel);

        moves.slice(0, 3).forEach((move) => {
          const moveCell = document.createElement("div");
          moveCell.classList.add("move-cell");
          moveCell.textContent = move.move.name;

          movesContainer.appendChild(moveCell);
        });

        PokeContainer.appendChild(movesContainer);
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
});

let canClickRandomButton = true; // Variable to track if the button can be clicked

const randomPokemonButton = document.getElementById("randomPokemonButton");

randomPokemonButton.addEventListener("click", function () {
  if (canClickRandomButton) {
    // Disable the button temporarily
    canClickRandomButton = false;

    // Clear the old data
    const PokeContainer = document.getElementById("pokemoncontainer");
    PokeContainer.innerHTML = "";

    // Generate a random Pokémon ID between 1 and 898 (total number of Pokémon in the API)
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;

    // API call to fetch a random Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        errorContainer.textContent = "";

      if (data) {
        const { name, order, sprites, types, height, weight, moves } = data;

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
          pokeOrdContainer.textContent = `NO.${order}`;
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

          const movesContainer = document.createElement("div");
          movesContainer.classList.add("pokeMovesContainer");
  
          // Sort the moves by their power (base_power)
          moves.sort((a, b) => {
            const basePowerA = getMoveBasePower(a);
            const basePowerB = getMoveBasePower(b);
            return basePowerB - basePowerA;
          });
  
          // Display the three most powerful moves
          const bestMovesLabel = document.createElement("div");
          bestMovesLabel.classList.add("best-moves-label");
          bestMovesLabel.textContent = "Best Moves";
          movesContainer.appendChild(bestMovesLabel);
  
          moves.slice(0, 3).forEach((move) => {
            const moveCell = document.createElement("div");
            moveCell.classList.add("move-cell");
            moveCell.textContent = move.move.name;
  
            movesContainer.appendChild(moveCell);
          });
  
          PokeContainer.appendChild(movesContainer);  

          // Change background color based on Pokémon type
          changeBackgroundColor(types.map((type) => type.type.name));
        } else {
          console.log("No data found");
        }

        // Enable the button after 3 seconds
        setTimeout(function () {
          canClickRandomButton = true;
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.log(error);
        alert("Error fetching data");
        canClickRandomButton = true; // Enable the button in case of an error
      });
  }
});

const inputField = document.getElementById("search");
const suggestionsList = document.getElementById("pokemon-suggestions");

// Helper function to get the base power of a move
function getMoveBasePower(move) {
  const versionGroupDetails = move.version_group_details.find(
    (detail) => detail.move_learn_method.name === "level-up"
  );
  return versionGroupDetails
    ? versionGroupDetails.move_learn_method.level_learned_at
    : 0;
}

// Function to fetch Pokémon names from the API
function fetchPokemonNames(query) {
  // Make an API request to fetch Pokémon names that match the query
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
    .then((response) => response.json())
    .then((data) => {
      // Filter Pokémon names based on the user's input
      const filteredNames = data.results.filter((pokemon) =>
        pokemon.name.includes(query.toLowerCase())
      );

      // Clear previous suggestions
      suggestionsList.innerHTML = "";

      // Display suggestions in the dropdown
      filteredNames.forEach((pokemon) => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.name;

        // Add click event to select a suggestion
        listItem.addEventListener("click", () => {
          inputField.value = pokemon.name;
          suggestionsList.innerHTML = ""; // Clear the dropdown
        });

        suggestionsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching Pokémon names:", error);
    });
}

// Event listener for input field
inputField.addEventListener("input", (event) => {
  const query = event.target.value;
  if (query.length >= 2) {
    fetchPokemonNames(query);
  } else {
    suggestionsList.innerHTML = ""; // Clear the dropdown if input is less than 2 characters
  }
});
