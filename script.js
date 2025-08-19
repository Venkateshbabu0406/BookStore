// Sample 50 books
const books = [
  { id: 1, title: "The Great Gatsby", category: "Fiction", price: 299, image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
  { id: 2, title: "A Brief History of Time", category: "Science", price: 450, image: "https://covers.openlibrary.org/b/id/240726-L.jpg" },
  { id: 3, title: "Sapiens", category: "History", price: 799, image: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
  { id: 4, title: "Clean Code", category: "Technology", price: 999, image: "https://covers.openlibrary.org/b/id/9641987-L.jpg" },
  { id: 5, title: "To Kill a Mockingbird", category: "Fiction", price: 350, image: "https://covers.openlibrary.org/b/id/9871981-L.jpg" },
  { id: 6, title: "1984", category: "Fiction", price: 399, image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
  { id: 7, title: "The Pragmatic Programmer", category: "Technology", price: 850, image: "https://covers.openlibrary.org/b/id/9641987-L.jpg" },
  { id: 8, title: "Thinking, Fast and Slow", category: "Business", price: 650, image: "https://covers.openlibrary.org/b/id/8755581-L.jpg" },
  { id: 9, title: "Steve Jobs", category: "Business", price: 500, image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
  { id: 10, title: "The Lean Startup", category: "Business", price: 550, image: "https://covers.openlibrary.org/b/id/9641987-L.jpg" },
  // 👉 repeat similar for 40 more books
];

// Render books
function displayBooks(bookList) {
  const container = document.getElementById("booksContainer");
  if (!container) return;
  container.innerHTML = "";
  if (bookList.length === 0) {
    container.innerHTML = "<p>No books found</p>";
    return;
  }
  bookList.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.category}</p>
      <p>₹${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Search & Filters
function filterBooks() {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const category = document.getElementById("categoryFilter")?.value || "all";
  const price = document.getElementById("priceFilter")?.value || "all";

  let filtered = books.filter(b => b.title.toLowerCase().includes(search));
  if (category !== "all") filtered = filtered.filter(b => b.category === category);

  if (price !== "all") {
    if (price.includes("-")) {
      const [min, max] = price.split("-").map(Number);
      filtered = filtered.filter(b => b.price >= min && b.price <= max);
    } else {
      filtered = filtered.filter(b => b.price >= Number(price));
    }
  }
  displayBooks(filtered);
}

document.getElementById("searchInput")?.addEventListener("input", filterBooks);
document.getElementById("categoryFilter")?.addEventListener("change", filterBooks);
document.getElementById("priceFilter")?.addEventListener("change", filterBooks);

if (document.getElementById("booksContainer")) displayBooks(books);

// Cart System
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const book = books.find(b => b.id === id);
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} added to cart!`);
}

function loadCart() {
  const container = document.getElementById("cartContainer");
  const total = document.getElementById("cartTotal");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    total.textContent = "";
    return;
  }

  container.innerHTML = "";
  let sum = 0;
  cart.forEach((item, index) => {
    sum += item.price;
    container.innerHTML += `
      <div class="book-card">
        <h3>${item.title}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  total.textContent = `Total: ₹${sum}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

if (document.getElementById("cartContainer")) loadCart();
