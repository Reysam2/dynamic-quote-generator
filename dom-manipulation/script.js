document.addEventListener('DOMContentLoaded', () => {

  // elements block
  const quoteDisplay = document.querySelector('#quoteDisplay')
  const newQuoteBtn = document.getElementById('newQuote')
  const newQuoteInput = document.querySelector('#newQuoteText')
  const categoryInput = document.querySelector('#newQuoteCategory')
  const addQuoteBtn = document.querySelector('#addQuoteBtn')
  // retrieve 'Quotes' from local storage if present and if not, start with an empty array
  let quotesArray = JSON.parse(localStorage.getItem('Quotes') || '[]');




  // gets userInput thus text and category
  // saves user text and category to local storage 
  function createAddQuoteForm() {
    let newQuoteInputText = newQuoteInput.value.trim()
    let categoryInputText = categoryInput.value.trim()


    if (!newQuoteInputText || !categoryInputText) {
      quoteDisplay.textContent = 'Please enter both fields'
      return
    }


    quoteDisplay.textContent = ''
    // creates an object based on user data
    let userQuote = {
      'text': newQuoteInputText,
      'category': categoryInputText
    }

    // push userQuote (an array of objects) to quotesArray
    quotesArray.push(userQuote);

    //  save to local storage
    localStorage.setItem('Quotes', JSON.stringify(quotesArray))
    quoteDisplay.textContent = "✅ Quote added!";


    console.log(quotesArray)

    return quotesArray

  }


  // pick a random object and append its specified items to quoteDisplay
  function showRandomQuote() {

    if (quotesArray.length === 0) {
      quoteDisplay.textContent = 'No quotes available. Please add one first!';
      return
    }

    quoteDisplay.textContent = '';
    let randomIndex = Math.floor(Math.random() * quotesArray.length)
    let randomQuote = quotesArray[randomIndex]
 
    let p = document.createElement('p');
    p.innerHTML = ` '${randomQuote.text}' - [${randomQuote.category}] `;
    quoteDisplay.appendChild(p);


  }
 

  // events
  newQuoteInput.addEventListener('input', () => {
    quoteDisplay.textContent = ''
  })
  categoryInput.addEventListener('input', () => {
    quoteDisplay.textContent = ''
  })

  addQuoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createAddQuoteForm()
    newQuoteInput.value = ''
    categoryInput.value = ''

  })


  newQuoteBtn.addEventListener('click', (e) => {
    e.preventDefault() 
    showRandomQuote()
  })




})