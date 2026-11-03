// Shared data + cart helpers (used by index.html and payment.html)
const books = [
  { id: 1, name: "The Power of Habit", author: "Charles Duhigg", price: 299, category: "Self Help", hue: 215, img: "images/the-power-of-habit.jpg" },
  { id: 2, name: "Atomic Habits", author: "James Clear", price: 399, category: "Self Help", hue: 18, img: "images/atomic-habits.jpg" },
  { id: 3, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 349, category: "Finance", hue: 150, img: "images/rich-dad-poor-dad.jpg" },
  { id: 4, name: "Think Like a Monk", author: "Jay Shetty", price: 279, category: "Self Help", hue: 40, img: "images/think-like-a-monk.jpg" },
  { id: 5, name: "The Psychology of Money", author: "Morgan Housel", price: 320, category: "Finance", hue: 265, img: "images/the-psychology-of-money.jpg" },
  { id: 6, name: "Wings of Fire", author: "A. P. J. Abdul Kalam", price: 250, category: "Biography", hue: 350, img: "images/wings-of-fire.jpg" }
];

const rupee = n => "₹" + n.toLocaleString("en-IN");
const findBook = id => books.find(b => b.id === id);
const $ = s => document.querySelector(s);

function h(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch (e) { return fallback; }
}

let cart = load("bookCart", []).filter(i => findBook(i.id));
const saveCart = () => localStorage.setItem("bookCart", JSON.stringify(cart));
const cartCount = () => cart.reduce((s, i) => s + i.quantity, 0);
const cartTotal = () => cart.reduce((s, i) => s + findBook(i.id).price * i.quantity, 0);

function makeCover(b) {
  const c = h("div", "cover");
  c.style.setProperty("--h", b.hue);
  const img = document.createElement("img");
  img.src = b.img;
  img.alt = "Cover of " + b.name + " by " + b.author;
  img.loading = "lazy";
  img.decoding = "async";
  // If the image fails to load, fall back to the drawn CSS cover
  img.addEventListener("error", () => {
    img.remove();
    c.classList.remove("has-img");
    c.append(h("span", "cover-title", b.name), h("span", "cover-author", b.author));
  });
  c.classList.add("has-img");
  c.append(img);
  return c;
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2200);
}
