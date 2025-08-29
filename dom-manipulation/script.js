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
    const categoryInputText = categoryInput.value.trim();

    if (!newQuoteInputText || !categoryInputText) {
      alert('Please enter both fields')
      return
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

  function createFunction(obj, targetContainer) {
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

  function renderQuotes() {
    quoteDisplay.textContent = '';

    // function() 
    userDataArray.forEach((obj) => {
      createFunction(obj, quoteDisplay)
    })

  }

  function populateCategories() {
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

  function showRandomQuote() {
    let random = Math.floor(Math.random() * userDataArray.length)
    let randomQuote = [userDataArray[random]];
    quoteDisplay.innerHTML = '';

    console.log(randomQuote);

    function displayRandomQuote() {
      randomQuote.forEach(obj => createFunction(obj, quoteDisplay))
    }
    displayRandomQuote()
  }


  if (addQuoteBtn) {
    addQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let newQuote = createAddQuoteForm()
      if (newQuote) {
        renderQuotes()
        populateCategories()
      }
    })
  }

  renderQuotes()
  populateCategories()

  categoryDropDown.addEventListener('change', () => {

    let selectedCategory = categoryDropDown.value

    if (selectedCategory !== 'All category') {

      function filterQuotes() {
        if (selectedCategory) {

          quoteDisplay.textContent = '';

          let categoryFilter = userDataArray.filter((item) => item.category === selectedCategory)

          categoryFilter.forEach((obj) =>
            createFunction(obj, quoteDisplay)
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

  newQuoteBtn.addEventListener('click', () => {
    showRandomQuote()
  })







})