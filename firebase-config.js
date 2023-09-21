// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Z5lSW6fsbZ05gtT50Bys82DtzkbGcFY",
  authDomain: "quiz-9cb1b.firebaseapp.com",
  databaseURL:
    "https://quiz-9cb1b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-9cb1b",
  storageBucket: "quiz-9cb1b.appspot.com",
  messagingSenderId: "191075542859",
  appId: "1:191075542859:web:c53269feeb0792ac332ace",
  measurementId: "G-VVRCLQCYXM",
};


firebase.initializeApp(firebaseConfig);

// Reference to your Firebase database
const database = firebase.database();

// Function to retrieve Pokémon names from Firebase
function getPokemonNames() {
  const pokemonNames = [];
  database.ref('pokemon').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const pokemgonName = childSnapshot.val().name;
      pokemonNames.push(pokemonName);
    });
    // Call a function to set up autocomplete
    setupAutocomplete(pokemonNames);
  });
}