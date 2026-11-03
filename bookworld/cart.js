// Cart: add, change quantity, drawer. Loaded on every page that has the cart button.
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  item ? item.quantity++ : cart.push({ id, quantity: 1 });
  saveCart(); renderCart();
  toast(findBook(id).name + " added to cart");
}

function changeQty(id, d) {
  const item = cart.find(i => i.id === id);
  item.quantity += d;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
}

function renderCart() {
  const box = $("#cartItems");
  box.replaceChildren();
  cart.forEach(i => {
    const b = findBook(i.id);
    const row = h("div", "cart-item");
    const thumb = document.createElement("img");
    thumb.className = "thumb"; thumb.src = b.img; thumb.alt = "";
    const info = h("div", "grow");
    info.append(h("strong", "", b.name), h("p", "muted", rupee(b.price)));
    const qty = h("div", "qty");
    const minus = h("button", "icon", "−"); minus.setAttribute("aria-label", "Remove one " + b.name);
    const plus = h("button", "icon", "+"); plus.setAttribute("aria-label", "Add one " + b.name);
    minus.onclick = () => changeQty(i.id, -1);
    plus.onclick = () => changeQty(i.id, 1);
    qty.append(minus, h("span", "", i.quantity), plus);
    row.append(thumb, info, qty);
    box.append(row);
  });
  if (!cart.length) box.append(h("p", "empty", "Your cart is empty. Add a book to get started."));
  $("#cartTotal").textContent = rupee(cartTotal());
  $("#cartCount").textContent = cartCount();
  $("#checkoutLink").classList.toggle("disabled", !cart.length);
  $("#checkoutLink").setAttribute("aria-disabled", !cart.length);
}

function setDrawer(open) {
  $("#drawer").classList.toggle("open", open);
  $("#scrim").classList.toggle("open", open);
  $("#drawer").setAttribute("aria-hidden", !open);
  if (open) $("#closeCart").focus(); else $("#openCart").focus();
}

$("#openCart").addEventListener("click", () => setDrawer(true));
$("#closeCart").addEventListener("click", () => setDrawer(false));
$("#scrim").addEventListener("click", () => setDrawer(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") setDrawer(false); });
$("#checkoutLink").addEventListener("click", e => { if (!cart.length) e.preventDefault(); });
renderCart();
