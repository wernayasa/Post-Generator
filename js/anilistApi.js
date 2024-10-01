// Get the input and button elements
const inputId = document.getElementById('input-id');
const buttonFetch = document.getElementById('button-fetch');
const outputJson = document.getElementById('output-json');

// Default to Anime
let mediaType = 'ANIME'; // Can be 'ANIME' or 'MANGA'

// Set the active class on the buttons
const animeButton = document.querySelector('.anime');
const mangaButton = document.querySelector('.manga');

// Add event listeners to the buttons
animeButton.addEventListener('click', () => {
  mediaType = 'ANIME';
  animeButton.classList.add('active');
  mangaButton.classList.remove('active');
});

mangaButton.addEventListener('click', () => {
  mediaType = 'MANGA';
  mangaButton.classList.add('active');
  animeButton.classList.remove('active');
});

// Define the query and variables
let query = `
  query ($id: Int) {
    Media (id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
      }
      genres
      episodes
      status
      description
    }
  }
`;

const variables = {
  id: null
};

// Define the API URL and options
const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: null
};

// Add event listener to the button
buttonFetch.addEventListener('click', () => {
  // Get the input ID value
  const idValue = inputId.value.trim();

  // Check if the input ID is valid
  if (idValue === '') {
    alert('Please enter a valid ID');
    return;
  }

  // Update the query with the current media type
  query = `
    query ($id: Int) {
      Media (id: $id, type: ${mediaType}) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        genres
        episodes
        status
        description
      }
    }
  `;

  // Set the variables and options
  variables.id = parseInt(idValue);
  options.body = JSON.stringify({
    query: query,
    variables: variables
  });

  // Make the API request
  fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
});

// Handle the API response
function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

// Handle the API data
function handleData(data) {
  outputJson.value = JSON.stringify(data, null, 2);
}

// Handle any errors
function handleError(error) {
  alert('Error, check console');
  console.error(error);
}
