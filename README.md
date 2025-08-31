# 📖 Quote Generator App

A lightweight yet powerful **Quote Generator** built with **Vanilla JavaScript (ES6+)**.
This application enables users to add, categorize, filter, import/export and automatically sync quotes with a **mock API server**.

---

## ✨ Features

* **Add Quotes** → Create new quotes with categories and store them in local storage.
* **Random Quote** → Display an inspiring random quote with a single click.
* **Category Filter** → Filter and view quotes by category.
* **Persistent Storage** → All quotes are stored locally and remain available after page refresh.
* **Import & Export** →

  * Export quotes as a `.json` file.
  * Import quotes from a `.json` file into the app.
* **Mock Server Sync** →

  * Post newly added quotes to a mock server (`jsonplaceholder.typicode.com`).
  * Fetch and merge server quotes into local storage every **10 seconds**.
  * Notify users when new quotes are synced.

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **Local Storage API**
* **Fetch API**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/reysam2/quote-generator.git
cd quote-generator
```

### 2. Launch the App

Simply open `index.html` in your preferred browser.

---

## 📂 Project Structure

```
📦 quote-generator
 ┣ 📜 index.html        # Main entry file
 ┣ 📜 style.css         # Stylesheet
 ┣ 📜 script.js         # JavaScript logic
 ┣ 📜 quotes.json       # Example quotes for import/export
 ┗ 📜 README.md         # Project documentation
```

---

## 📋 Usage Guide

1. **Add a Quote** → Enter text & category → Click **Add Quote**.
2. **Random Quote** → Click **New Quote** for inspiration.
3. **Filter by Category** → Select a category from the dropdown.
4. **Import Quotes** → Upload a `.json` file in the format:

   ```json
   [
     { "text": "Life is short.", "category": "inspiration" }
   ]
   ```
5. **Export Quotes** → Download all quotes as `quotes.json`.
6. **Server Sync** → Every **10 seconds**, the app fetches and merges quotes from the mock API.

   * A notification *"Quotes updated from server!"* appears when syncing completes.

---

## 📸 Screenshots

**Create Quotes**
![Create Quotes](dom-manipulation/quotes-media/DQG-CreateQuotes.png?raw=true)

**View Quotes**
![Quotes View](dom-manipulation/quotes-media/DQG-Quotes.png?raw=true)

---

## ⚠️ Notes

* The app uses **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** as a mock API.
* Quotes fetched from the server default to category **"api"** when none is provided.
* Current `alert()` notifications can be replaced with styled UI messages for a smoother experience.

---

## 🧩 Roadmap / Future Improvements

* ✅ Replace `alert()` with inline UI notifications.
* ✅ Enhance conflict resolution between local & server quotes.
* ⏳ Add search functionality.
* ⏳ Add delete functionality.
* ⏳ Deploy as a **Progressive Web App (PWA)** for offline access.

---

## 📜 License

MIT License © 2025 [Samuel Akongbota](https://github.com/reysam2)
