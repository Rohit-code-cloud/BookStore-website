// Payment page: summary, QR / card / cash methods, validation, place order
const items = cart.map(i => ({ ...findBook(i.id), quantity: i.quantity }));
const shipping = cartTotal() >= 500 ? 0 : 49;
const grandTotal = cartTotal() + shipping;

// Payee details come from the QR code image (images/payment-qr.png)
const PAYEE = { upiId: "6283825607@ptyes", name: "ROHIT KOUNDAL" };

function renderSummary() {
  const box = $("#summaryItems");
  items.forEach(i => {
    const r = h("div", "sum-row");
    r.append(h("span", "", i.name + " × " + i.quantity), h("span", "", rupee(i.price * i.quantity)));
    box.append(r);
  });
  $("#subtotal").textContent = rupee(cartTotal());
  $("#shipping").textContent = shipping ? rupee(shipping) : "Free";
  $("#grandTotal").textContent = rupee(grandTotal);
  $("#qrAmount").textContent = rupee(grandTotal);
  $("#payeeName").textContent = PAYEE.name;
  $("#payeeUpi").textContent = PAYEE.upiId;
  // Deep link with the amount filled in; useful on phones, where a UPI app can open it
  $("#upiLink").href = "upi://pay?pa=" + PAYEE.upiId + "&pn=" + encodeURIComponent(PAYEE.name) +
    "&am=" + grandTotal + "&cu=INR&tn=" + encodeURIComponent("BookWorld order");
  $("#upiLink").hidden = !matchMedia("(pointer: coarse)").matches;
}

function showMethod(m) {
  document.querySelectorAll(".method-panel").forEach(p => {
    const on = p.id === "pay-" + m;
    p.hidden = !on;
    p.querySelectorAll("input").forEach(x => x.required = on);
  });
}

document.querySelectorAll("input[name=method]").forEach(r =>
  r.addEventListener("change", () => showMethod(r.value)));

// Digits only helpers
document.querySelectorAll("[data-digits]").forEach(el =>
  el.addEventListener("input", () => el.value = el.value.replace(/\D/g, "")));
$("#cardNumber").addEventListener("input", e =>
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim());

const DONE_NOTE = {
  qr: "We will confirm your order once your UPI payment is verified.",
  card: "Your order is being prepared.",
  cod: "Keep the exact amount ready when your order arrives."
};

$("#payForm").addEventListener("submit", e => {
  e.preventDefault();
  const method = document.querySelector("input[name=method]:checked").value;
  const id = "BW" + Date.now().toString().slice(-8);
  // Card details are never stored: only the method name (and the UPI transaction ID for QR) is kept.
  const order = {
    id, method,
    paymentRef: method === "qr" ? $("#txnId").value : undefined,
    customerName: $("#name").value.trim(),
    customerEmail: $("#email").value.trim(),
    customerPhone: $("#phone").value,
    customerAddress: $("#address").value.trim() + ", " + $("#city").value.trim() + " - " + $("#pin").value,
    items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
    totalAmount: grandTotal,
    orderDate: new Date().toLocaleString("en-IN")
  };
  const orders = load("bookOrders", []);
  orders.push(order);
  localStorage.setItem("bookOrders", JSON.stringify(orders));
  cart = []; saveCart();
  $("#checkoutView").hidden = true;
  $("#doneView").hidden = false;
  $("#orderId").textContent = id;
  $("#doneName").textContent = order.customerName;
  $("#doneTotal").textContent = rupee(order.totalAmount);
  $("#doneNote").textContent = DONE_NOTE[method];
  window.scrollTo({ top: 0 });
});

if (!items.length) {
  $("#checkoutView").hidden = true;
  $("#emptyView").hidden = false;
} else {
  renderSummary(); showMethod("qr");
}
