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
     const response = await fetch('https://dummyjson.com/quotes/random');

     const data = await response.json();
     console.log(data)

     // get the author and quotes of the author 

     let quoteAuthor = data.author
     let quote = data.quote;

     return `<strong>Author:</strong> ${quoteAuthor} <br> <br> <strong>Quote:</strong> ${quote}`

   } catch (error) {
     console.log('Could not retrieve data', error);
     return `<em>Sorry, could not fetch a quote. Please try again.</em>`
   }
 }



 // element creation block

 async function createQuote() {
   if (isLoading) {
     quoteDisplay.textContent = "Loading...";
     return
   };
   isLoading = true;
   let quoteText = await getRandomQuote()

   // create a p tag
   const quoteItem = document.createElement('p');

   quoteItem.innerHTML = quoteText;
   quoteDisplay.textContent = "";
   quoteDisplay.appendChild(quoteItem);

   isLoading = false

 }


 // event listeners
 newQuoteBtn.addEventListener('click', createQuote);

 document.addEventListener('keyup', (e) => {
   if (e.key === 'Enter' && document.activeElement !== newQuoteBtn) {
     e.preventDefault();
     createQuote()
   }
 });