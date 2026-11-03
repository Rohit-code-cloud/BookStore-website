// Contact page: feedback form and saved reviews
function renderFeedback() {
  const box = $("#feedbackList");
  box.replaceChildren();
  const all = load("bookFeedback", []);
  if (!all.length) return box.append(h("p", "muted", "No reviews yet. Be the first to share yours."));
  all.slice().reverse().forEach(f => {
    const item = h("div", "review");
    item.append(h("strong", "", f.name), h("span", "stars", "★".repeat(f.rating) + "☆".repeat(5 - f.rating)), h("p", "", f.message), h("small", "muted", f.date));
    box.append(item);
  });
}

$("#feedbackForm").addEventListener("submit", e => {
  e.preventDefault();
  const all = load("bookFeedback", []);
  all.push({
    name: $("#fbName").value.trim(),
    rating: +document.querySelector("input[name=rating]:checked").value,
    message: $("#fbMessage").value.trim(),
    date: new Date().toLocaleDateString("en-IN")
  });
  localStorage.setItem("bookFeedback", JSON.stringify(all));
  e.target.reset();
  renderFeedback();
  toast("Thanks for your feedback");
});

renderFeedback();
