document.addEventListener('DOMContentLoaded', () => {

  // elements block
  const newQuoteBtn = document.getElementById('newQuote')
  const newQuoteInput = document.querySelector('#newQuoteText')
  const categoryInput = document.querySelector('#newQuoteCategory')
  const addQuoteBtn = document.querySelector('#addQuoteBtn')
  const quoteDisplay = document.querySelector('#quoteDisplay')
  const categoryDropDown = document.querySelector('#categoryDropDown')

  // retrieve 'Quotes' from local storage if present and if not, start with an empty array
  let userDataArray = JSON.parse(localStorage.getItem('Quotes') || '[]');


  // a function that extracts userData thus text and category in an object
  // saves user data to local storage 
  function createAddQuoteForm() {
    const newQuoteInputText = newQuoteInput.value.trim()
    const categoryInputText = categoryInput.value.trim().toLowerCase();

    if (!newQuoteInputText || !categoryInputText) {
      alert('Please enter both fields')
      return null
    }

    // collection of user data in an object
    const userDataObj = {
      'text': newQuoteInputText,
      'category': categoryInputText
    };

    userDataArray.unshift(userDataObj)

    // store collected user data to local storage
    localStorage.setItem('Quotes', JSON.stringify(userDataArray))

    newQuoteInput.value = ''
    categoryInput.value = ''
    return userDataObj
  }

  // a reusable function for the creation of element of the displayQuote
  function createQuoteCard(obj, targetContainer) {
    let quoteCard = document.createElement('div');
    quoteCard.classList.add('quote__card')

    let quoteTextBlock = document.createElement('div')
    quoteTextBlock.classList.add('quote-blk')

    let categoryTextBlock = document.createElement('div')
    categoryTextBlock.classList.add('cat-blk')

    let quoteText = document.createElement('p')
    quoteText.classList.add('quote-txt')
    quoteText.textContent = obj.text

    let catText = document.createElement('p')
    catText.classList.add('cat-txt')
    catText.textContent = obj.category


    quoteTextBlock.appendChild(quoteText)
    categoryTextBlock.appendChild(catText);

    quoteCard.appendChild(quoteTextBlock)
    quoteCard.appendChild(categoryTextBlock);

    targetContainer.appendChild(quoteCard)
  }

  // a function that gets user data from local storage and render it in displayQuote block when called 
  function renderQuotes() {
    if (!quoteDisplay) return;
    quoteDisplay.innerHTML = '';
    userDataArray.forEach((obj) => {
      createQuoteCard(obj, quoteDisplay)
    })

  }

  // a function that gets unique categories from local storage and renders them in the dropDown menu of categories
  function populateCategories() {
    if (!categoryDropDown) return;
    categoryDropDown.textContent = '';
    let allCategory = document.createElement('option')
    allCategory.value = 'All category';
    allCategory.textContent = 'All category';
    categoryDropDown.appendChild(allCategory)


    let categories = userDataArray.map(quote => quote.category)


    let uniqueCategories = new Set(categories)
    // console.log(uniqueCategories)

    uniqueCategories.forEach(obj => {
      let dropDownOption = document.createElement('option');
      dropDownOption.innerText = obj;
      dropDownOption.value = obj;
      categoryDropDown.appendChild(dropDownOption)
    })


  }

  // a function that gets a random quote from local storage and render it in the displayQuote block when called
  function showRandomQuote() {
    if (userDataArray.length === 0) {
      alert('Please add a quote first!')
      return
    }
    let random = Math.floor(Math.random() * userDataArray.length)
    let randomQuote = [userDataArray[random]];
    quoteDisplay.innerHTML = '';

    function displayRandomQuote() {
      randomQuote.forEach(obj => createQuoteCard(obj, quoteDisplay))
    }
    displayRandomQuote()
  }



  // renders if 'addQuoteBtn' => (add button) exists on current page
  if (addQuoteBtn) {
    addQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let newQuote = createAddQuoteForm()
      if (newQuote) {
        renderQuotes()
        populateCategories()
        postQuotesToServer(newQuote)
      }
    })
  }

  // render functions upon page load
  if (quoteDisplay) {
    renderQuotes()
    populateCategories()
  }

  if (categoryDropDown) {

    // event listeners
    categoryDropDown.addEventListener('change', () => {

      let selectedCategory = categoryDropDown.value

      if (selectedCategory !== 'All category') {

        function filterQuotes() {
          if (selectedCategory) {

            quoteDisplay.textContent = '';

            let categoryFilter = userDataArray.filter((item) => item.category === selectedCategory)

            categoryFilter.forEach((obj) =>
              createQuoteCard(obj, quoteDisplay)
            )

            return
          }
        }

        filterQuotes()

      }

      else {
        renderQuotes();
      }

    })

  }

  if (newQuoteBtn) {

    newQuoteBtn.addEventListener('click', () => {
      showRandomQuote()
    })

  }


  // posting user Data to server using a mock api

  let postUrl = 'https://jsonplaceholder.typicode.com/posts';

  function postQuotesToServer(newQuote) {
    const serverData = {
      'title': newQuote.category,
      'body': newQuote.text
    };

    console.log('📡 Sending data to server:', serverData);

    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 98N8m4HVZHGgxM4QifrHhCoJrm09gk2GktFrHlAq003ae499'
      },
      body: JSON.stringify(serverData)

    })
      .then((response) => {
        console.log('✅ Server responded with status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => console.log('Quotes posted successfully', data))
      .catch((error) => console.error('Error posting quote:', error))




  }


  async function fetchQuotesFromServer() {
    console.log('📡 Fetching all data from server...');
    try {
      let response = await fetch(postUrl);
      if (!response.ok) {
        throw new Error('Response was not ok')
      }

      let data = await response.json();
      console.log('✅ Data retrieved from server:', data);
      return data
    } catch (error) {
      console.error('Could not retrieve data', error)
    }
  }

  fetchQuotesFromServer().then(data => console.log(data));

})