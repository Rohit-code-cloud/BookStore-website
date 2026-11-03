# BookWorld

A small multi-page online bookstore built with plain HTML, CSS and JavaScript. No framework, no build step and no backend. Browse books, add them to a cart, and place an order by scanning a UPI QR code.

## Features

- Five pages: Home, Books, About, Contact and Payment
- Book catalog with real cover images, live search and category filters
- Cart drawer on every page, with quantity controls and a running total
- Cart saved in the browser, so it survives page reloads and page changes
- Payment page with three methods: UPI QR code, card (demo form) and cash on delivery
- Free shipping on orders of ₹500 or more, otherwise a flat ₹49
- Reader feedback form with star ratings
- Responsive layout for phones and desktops
- Automatic light and dark appearance
- Keyboard friendly, with visible focus styles, labelled controls and image alt text

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, popular picks and shipping note |
| `books.html` | Full collection with search and category filter |
| `about.html` | About the store |
| `contact.html` | Support email and feedback form |
| `payment.html` | Delivery details, payment method and order summary |

`books.html` accepts a category in the link, for example `books.html#Biography`, and opens with that filter applied.

## Project structure

```
.
├── index.html
├── books.html
├── about.html
├── contact.html
├── payment.html
├── style.css        Shared styles
├── common.js        Book data, cart helpers, shared utilities
├── cart.js          Cart drawer (every page except payment)
├── books.js         Book cards, home picks, catalog search and filters
├── contact.js       Feedback form and saved reviews
├── payment.js       Checkout, validation and order placement
└── images/          Book covers and the payment QR code
```

## Run locally

No install is needed.

1. Download or clone the repository.
2. Open `index.html` in a browser.

To serve it from a local web server instead:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## How it works

- **Books** are defined in the `books` array in `common.js`.
- **Cart** is stored in `localStorage` under `bookCart`.
- **Orders** are stored in `localStorage` under `bookOrders`.
- **Feedback** is stored in `localStorage` under `bookFeedback`.

Because everything lives in the visitor's browser, nothing is sent to a server. Orders and reviews are visible only on the device that created them.

## Customize

### Add or change a book

1. Add a cover image to `images/`.
2. Add an entry to the `books` array in `common.js`:

```js
{ id: 7, name: "Book Title", author: "Author Name", price: 299, category: "Self Help", hue: 200, img: "images/book-title.jpg" }
```

- `id` must be unique.
- `hue` (0 to 360) sets the fallback color shown if the image fails to load.
- New categories appear in the filter chips automatically.

### Change the payment QR code

1. Replace `images/payment-qr.png` with your own QR image. A square image with a white border works best.
2. Update the `PAYEE` object at the top of `payment.js` with your UPI ID and name. These are shown beside the QR code and used for the "Open UPI app" button on phones.

### Change shipping rules

Edit the `shipping` line in `payment.js`. The default is free shipping at ₹500 or more, otherwise ₹49.

## Payment notes

This is a demo storefront, not a payment processor.

- **UPI QR:** the customer scans the code, pays the amount shown, then enters the 12-digit UPI transaction ID before placing the order. The site cannot confirm that money arrived. Check each transaction ID against your bank or UPI app.
- **Card:** the card form is a demo. It does not charge anything and card details are never saved.
- **Cash on delivery:** the order is recorded and payment happens on arrival.

For real card payments you would need a payment provider and a backend.

## Privacy note

If you publish this repository, the UPI ID and payee name in `payment.js` and the QR image in `images/` become public. Use a payment address you are comfortable sharing.

## Built with

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript

## License

Add a license of your choice, for example MIT, in a `LICENSE` file.
