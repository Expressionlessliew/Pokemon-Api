const searchBtn = document.getElementById("searchbtn");
const PokeContainer = document.getElementById("pokemoncontainer");

searchBtn.addEventListener("click", getPoke);

function getPoke() {
  console.log("heello");
  // Clear the old data
  PokeContainer.innerHTML = "";

  const userSearch = document.getElementById("search").value.toLowerCase().trim();

  // API call
  fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const { name, order, sprites, types, height,weight } = data;

        const pokeNameContainer = document.createElement("h1");
        pokeNameContainer.classList.add("pokeName");
        pokeNameContainer.textContent = name;
        PokeContainer.appendChild(pokeNameContainer);

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

        const pokePicContainer = document.createElement("img");
        pokePicContainer.classList.add("pokePic");
        pokePicContainer.src = sprites.front_default;
        pokePicContainer.alt = name;
        PokeContainer.appendChild(pokePicContainer);

        const typesContainer = document.createElement("p");
        typesContainer.classList.add("pokePo");
        const typeNames = types.map((type) => type.type.name).join(", ");
        typesContainer.textContent = `Types: ${typeNames}`;
        PokeContainer.appendChild(typesContainer);
        
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
