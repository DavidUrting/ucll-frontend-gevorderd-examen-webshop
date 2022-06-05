// Dit is de lijst met de vragen van de quiz.
import products from "./products.js";
import Cart from "../shared/cart.js";
import CartItem from "../shared/cart-item.js";

import express from "express";
const app = express();

app.use(express.static('../client/public'));
app.use(express.json());

// HTTP GET /api/products
app.get("/api/products", (req, res) => {
    res.json(products);
    console.log(`${products.length} producten werden naar de browser teruggestuurd.`);
});

let usersAndTheirCarts = [];

// HTTP GET /api/cart
// *******************
app.get("/api/cart/:customerId", (req, res) => {
    let cartOfUser = usersAndTheirCarts.find(c => c.customerId == cartItem.customerId);
    if (!cartOfUser) {
        res.json([]);
    } else {
        res.json(cartOfUser.items);
    }    
});


// HTTP POST /api/cart
// *******************
app.post("/api/cart", (req, res) => {
    let cartItem = new CartItem(res.body.customerId, res.body.productId, res.body.amount);
    let cartOfUser = usersAndTheirCarts.find(c => c.customerId == cartItem.customerId);
    if (!cartOfUser) {
        cartOfUser = new Cart();
        usersAndTheirCarts.push(cartOfUser);        
    }
    cartOfUser.addToCart(cartItem);
    res.json(cartOfUser.items);
});

// Starten van de server
app.listen(3000, () => {
    console.log("Server is listening...");
});