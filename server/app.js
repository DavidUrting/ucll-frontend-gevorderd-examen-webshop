import products from "./products.js";
import Cart from "./cart.js";
import CartItem from "./cart-item.js";

import { v4 as uuidv4 } from "uuid";

import express from "express";
import cors from "cors";
const app = express();

app.use(cors()); // Dit zorgt ervoor dat je de API ook kan gebruiken vanop andere locaties.
app.use(express.static('../client/public'));
app.use(express.json());

// HTTP GET /api/products
// **********************
// Geeft een array van alle producten terug. 
// Deze array bestaat uit objecten met id, title en cost properties.
// Dus een array van deze vorm: [{productId: 0, title: "USB stick", cost: 10}, ...]
app.get("/api/products", (req, res) => {
    res.json(products);
    console.log(`Er werden ${products.length} producten naar de browser teruggestuurd.`);
});

// HTTP POST /api/cart
// *******************
// Berekent de totaalprijs van een winkelwagen met korting.
// (De totaalprijs zonder korting moet je zelf berekenen in de client.)
// Deze functie verwacht een JSON body met de inhoud van je winkelwagen.
// Een winkelwagen kan je doorgeven als volgt:
// (1) een array van product ID's [0,2, ...]
// (2) ofwel een array van objecten met een productId property: [{productId: 0}, {productId: 2}]
// (3) ofwel een array van objecten met productId en amount properties: 
//     [{productId:0, amount: 10}, {productId:2, amount: 3}]
// Een product ID mag meermaals voorkomen. Dit mag dus: [0,0,0,0,0,2,2, ...]
app.post("/api/cart", (req, res) => { 
    let cart = createCartFromRequest(req.body);

    let objectTotalPriceWithReduction = {
        totalPriceWithReduction: cart.totalPriceWithReduction
    }

    res.json(objectTotalPriceWithReduction);
});

// HTTP POST /api/order
// ********************
// Deze functie plaatst zogezegd de bestelling.
// In de body wordt een object verwacht met 'username' en 'cartItems' properties:
// - username: is een string en bevat de naam van de gebruiker.
// - cartItems: stelt de winkelwagen voor (is een array zoals deze ook verwacht wordt in /api/cart).
app.post("/api/order", (req, res) => {
    let username = req.body.username;
    let cart = createCartFromRequest(req.body.cartItems);
    let orderId = placeOrder(username, cart);

    let objectWithOrderId = {
        orderId: orderId
    }

    res.json(objectWithOrderId);
});


// Starten van de server
app.listen(3000, () => {
    console.log("Server is listening...");
});

// Deze interne functie transformeert een array van winkelwagen items
// (die door de browser werd verstuurd) naar een intern Cart object.
// Het Cart object wordt voornamelijk gebruikt om de totaalprijs met korting
// te berekenen.
function createCartFromRequest(cartItems) {
    let cart = new Cart([]);
    for (let i = 0; i < cartItems.length; i++) {
        let productIdOrObject = cartItems[i];
        if (typeof productIdOrObject === 'number' || productIdOrObject instanceof Number) {
            cart.addToCart(productIdOrObject, 1);
        } else {
            if (productIdOrObject.amount) {
                cart.addToCart(
                    productIdOrObject.productId,
                    productIdOrObject.amount);
            } else {
                cart.addToCart(
                    productIdOrObject.productId, 
                    1);            
            }
        }
    }
    return cart;
}

// Plaatst het order in de backend systemen ...
// ... maar dat is out of scope :)
function placeOrder(username, cart) {
    let orderId = uuidv4();

    // TODO: order verwerken en in database bewaren...

    return orderId;
}