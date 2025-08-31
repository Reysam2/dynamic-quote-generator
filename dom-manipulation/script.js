document.addEventListener('DOMContentLoaded', () => {

  // elements block
  const newQuoteBtn = document.getElementById('newQuote')
  const newQuoteInput = document.querySelector('#newQuoteText')
  const categoryInput = document.querySelector('#newQuoteCategory')
  const addQuoteBtn = document.querySelector('#addQuoteBtn')
  const quoteDisplay = document.querySelector('#quoteDisplay')
  const categoryDropDown = document.querySelector('#categoryDropDown')
  const importFile = document.querySelector('#import-file')
  const exportQuoteBtn = document.querySelector('#export-quote')
  const displayUpdateMessage = document.querySelector('#server__message-blk')

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

  // a function that notifies the user on server updates
  function serverUpdateMessage() {
    if (!displayUpdateMessage) return;

    displayUpdateMessage.textContent = '';
    let updateMessage = document.createElement('p');
    updateMessage.classList.add('server__message-text');
    updateMessage.textContent = 'Quotes updated from server!';
    displayUpdateMessage.appendChild(updateMessage)

    setTimeout(() => {
      displayUpdateMessage.textContent = '';
    }, 3500)

    console.log('Quotes synced with server!')

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

  // a function that imports user uploaded data and add the data to local
  function importFromJsonFile(event) {
    const fileReader = new FileReader()
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result)
        // check if it is an array
        if (!Array.isArray(importedQuotes)) {
          alert('Invalid file format. Must be an array of quotes')
          return
        }
        // add imported quotes to existing ones
        userDataArray.push(...importedQuotes)

        // save back to localstorage
        localStorage.setItem('Quotes', JSON.stringify(userDataArray))

        // update the page
        renderQuotes()
        alert("Quotes imported successfully!");
      } catch (error) {
        alert('Error reading file', error.message)
      }
    }
    fileReader.readAsText(event.target.files[0])
  }

  // a function that exports user data or downloads user data in a json format when called
  function exportToJsonFile() {
    // turn quotes into text string 
    const dataStr = JSON.stringify(userDataArray, null, 2)

    // put the text inside a file package(Blob)
    const blob = new Blob([dataStr], { type: 'application/json' })

    // create a link for download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // click the link to download automatically
    link.href = url;
    link.download = 'quotes.json';
    link.click()
    URL.revokeObjectURL(url);
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

  // renders if categoryDropdown can be found on current page.
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

  // renders if newQuoteBtn can be found on current page
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
        throw new Error('Response was not OK')
      }

      let data = await response.json();
      console.log('✅ Data retrieved from server:', data);

      return data.map(item => ({
        text: item.body,
        category: item.category || 'api'
      }))

    } catch (error) {
      console.error('Could not retrieve data', error)
      return [];
    }
  }


  async function syncQuotes() {
    // fetch quotes from server
    let serverQuotes = await fetchQuotesFromServer();
    let updated = false;

    // loop through each server quote
    serverQuotes.forEach(serverQuote => {
      // check if the quote already exists locally with same text
      const localeQuote = userDataArray.find(quote => {
        return quote.text === serverQuote.text
      })


      if (localeQuote) {
        // conflict detected: same text but different category
        if (localeQuote.category !== serverQuote.category) {
          // update category
          localeQuote.category = serverQuote.category
          updated = true
        }


      }

      else {
        // quote doesn't exist locally
        userDataArray.push(serverQuote)
        updated = true
      }
    })

    // save changed and re-render
    if (updated) {
      localStorage.setItem('Quotes', JSON.stringify(userDataArray));
      renderQuotes();
      populateCategories()
      serverUpdateMessage()
    }

  }

  // run sync every 10 seconds
  setInterval(syncQuotes, 10000)

  fetchQuotesFromServer()

  // exportToJsonFile()
  exportQuoteBtn.addEventListener('click', exportToJsonFile)

})
