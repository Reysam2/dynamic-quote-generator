// Create a “Dynamic Quote Generator” that displays different quotes based on user-selected categories. Include functionality to add new quotes and categories dynamically through the user interface.


// displays different quotes
// functionality to add new quotes


const quoteDisplay = document.querySelector('#quoteDisplay')
const newQuoteBtn = document.querySelector('#newQuote')
let isLoading = false;

// Write a JavaScript file (script.js) that handles the creation and manipulation of DOM elements based on user interactions.

// fetch quotes from api
async function getRandomQuote() {
  try {
    const response = await fetch('https://dummyjson.com/quotes');

    // returns an object
    const data = await response.json();
    console.log(data)

    // get the author and quotes of the author 

    //contains an array of objects
    let quoteArray = data.quotes;
    console.log(quoteArray);

    // create new array with just specified item
    let quotes = [];


    // loop to get the desired items
    for (let obj of quoteArray) {

      // push items to quotes = []
      quotes.push(`<strong>${obj.author}</strong>: ${obj.quote}`)

    }
    return quotes

  }
  // catch an error if unsuccessful
  catch (error) {
    console.log('Could not retrieve data', error);

    return `<em>Sorry, could not fetch a quote. Please try again.</em>`
  }
}


//random quote block

async function showRandomQuote() {
    // when loading
    if (isLoading) {
      quoteDisplay.textContent = "Loading...";
      return
    };
    isLoading = true;

    // random quote selector
    let random = await getRandomQuote()

    let randomQuote = random[Math.floor(Math.random() * random.length)];


    // create a p tag and append to dom
    const quoteItem = document.createElement('p');

    quoteItem.innerHTML = randomQuote;
    quoteDisplay.textContent = "";
    quoteDisplay.appendChild(quoteItem);


    // Store generated quotes
    function toStorage() {
      let storedQuote = JSON.parse(localStorage.getItem('Quotes') || '[]')
   
      storedQuote.push(randomQuote)

      localStorage.setItem('Quotes', JSON.stringify(storedQuote))

    }
      toStorage()



      isLoading = false

    }


    // event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && document.activeElement !== newQuoteBtn) {
        e.preventDefault();
        showRandomQuote()
      }
    });