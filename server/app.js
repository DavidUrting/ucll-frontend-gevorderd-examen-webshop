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
    console.log(`Er werden ${products.length} artikelen werden naar de browser teruggestuurd.`);
});

let usersAndTheirCarts = [];

// HTTP GET /api/cart
// *******************
app.get("/api/cart/:customerId", (req, res) => {
    let cartOfUser = usersAndTheirCarts.find(c => c.customerId == req.params.customerId);
    if (!cartOfUser) {
        res.json(new Cart());
        console.log(`Gebruiker ${req.params.customerId} heeft nog geen winkelwagen.`);
    } else {
        res.json(cartOfUser);
        console.log(`Gebruiker ${req.params.customerId} heeft een winkelwagen met ${cartOfUser.items.length} artikelen in.`);
    }    
});


// HTTP POST /api/cart
// *******************
app.post("/api/cart", (req, res) => {
    let cartItem = new CartItem(req.body.customerId, req.body.productId, req.body.amount);
    let cartOfUser = usersAndTheirCarts.find(c => c.customerId == cartItem.customerId);
    if (!cartOfUser) {
        cartOfUser = new Cart();
        usersAndTheirCarts.push(cartOfUser);        
    }
    cartOfUser.addToCart(cartItem);
    res.json(cartOfUser);
});

// Starten van de server
app.listen(3000, () => {
    console.log("Server is listening...");
});