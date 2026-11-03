// Book cards (home picks + full catalog with search and category filter)
function bookCard(b) {
  const card = h("article", "card");
  const row = h("div", "row");
  const btn = h("button", "btn small", "Add to cart");
  btn.setAttribute("aria-label", "Add " + b.name + " to cart");
  btn.addEventListener("click", () => addToCart(b.id));
  row.append(h("strong", "", rupee(b.price)), btn);
  card.append(makeCover(b), h("h3", "", b.name), h("p", "muted", b.author + " · " + b.category), row);
  return card;
}

// Home page: three popular picks
if ($("#picks")) {
  $("#picks").append(...books.slice(0, 3).map(bookCard));
  $("#heroStack").append(...books.slice(0, 3).map(makeCover));
}

// Books page: catalog
if ($("#bookContainer")) {
  let activeCategory = "All";

  function renderBooks() {
    const q = $("#searchInput").value.toLowerCase().trim();
    const list = books.filter(b =>
      (activeCategory === "All" || b.category === activeCategory) &&
      (b.name + " " + b.author + " " + b.category).toLowerCase().includes(q));
    const box = $("#bookContainer");
    box.replaceChildren();
    if (!list.length) {
      box.append(h("p", "empty", "No books match your search. Try a different title or category."));
      return;
    }
    box.append(...list.map(bookCard));
  }

  function renderChips() {
    const wrap = $("#chips");
    ["All", ...new Set(books.map(b => b.category))].forEach(c => {
      const b = h("button", "chip", c);
      b.setAttribute("aria-pressed", c === activeCategory);
      b.addEventListener("click", () => {
        activeCategory = c;
        wrap.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
        renderBooks();
      });
      wrap.append(b);
    });
  }

  $("#searchInput").addEventListener("input", renderBooks);
  // Allow links like books.html#Biography to open a category
  const wanted = decodeURIComponent(location.hash.slice(1));
  if (books.some(b => b.category === wanted)) activeCategory = wanted;
  renderChips(); renderBooks();
}
