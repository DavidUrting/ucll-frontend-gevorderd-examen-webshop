import products from "./products.js";
import Cart from "./cart.js";
import CartItem from "./cart-item.js";

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
app.get("/api/products", (req, res) => {
    res.json(products);
    console.log(`Er werden ${products.length} producten naar de browser teruggestuurd.`);
});

// In deze array wordt een lijst bijgehouden met alle winkelwagens.
// Aangezien dit een server toepassing is kunnen er dus winkelwagens in zitten van meerdere gebruikers.
// Bij wijze van voorbeeld wordt er voor één bekende user al een winkelwagen toegevoegd.
let usersAndTheirCarts = [new Cart('timbernerslee', [
    new CartItem(0, 2),
    new CartItem(2, 5)
])];

// HTTP GET /api/cart/username
// ***************************
// Geeft de winkelwagen van een bepaalde gebruiker terug. 
// Geeft een object terug met daarin een 'items' property: dat is een array met objecten die 'productId' en 'amount' properties hebben.
// Het object heeft ook een 'costAfterReduction' property: daarin staat de totale kostprijs met toepassing van het (geheime :) kortingsalgoritme.
// En verder heeft het ook een 'username' property, waarin de 'username' staat.
// Indien de gebruiker nog geen winkelwagen heeft wordt een lege winkelwagen teruggestuurd (de 'items' property is een lege array).
app.get("/api/cart/:username", (req, res) => {
    let cartOfUser = usersAndTheirCarts.find(c => c.username == req.params.username);
    if (!cartOfUser) {
        res.json(new Cart(req.params.username));
        console.log(`Gebruiker ${req.params.username} heeft nog geen winkelwagen.`);
    } else {
        res.json(cartOfUser);
        console.log(`Gebruiker ${req.params.username} heeft een winkelwagen.`);
    }    
}); 

// HTTP POST /api/cart/username
// ****************************
// Voegt één artikel van het product toe aan de winkelwagen. In de body moet je een object meegeven met een 'productId' property.
// Als response wordt hetzelfde teruggegeven als bij een GET naar /api/cart/username.
app.post("/api/cart/:username", (req, res) => { 
    let cartOfUser = usersAndTheirCarts.find(c => c.username == req.params.username);
    if (!cartOfUser) {
        cartOfUser = new Cart(req.params.username);
        usersAndTheirCarts.push(cartOfUser); 
    }
    cartOfUser.addToCart(req.body.productId);
    res.json(cartOfUser);
});

// HTTP DELETE /api/cart/username
// ******************************
// Verwijdert één artikel van het product uit de winkelwagen. In de body moet je een object meegeven met een 'productId' property.
// Als het product niet in te winkelwagen voorkomt is dat geen probleem (er zal geen fout worden gegeven).
// Als response wordt hetzelfde teruggegeven als bij een GET naar /api/cart/username.
app.delete("/api/cart/:username", (req, res) => {
    let cartOfUser = usersAndTheirCarts.find(c => c.username == req.params.username);
    if (!cartOfUser) {
        res.json(new Cart());
    }
    else {
        cartOfUser.removeFromCart(req.body.productId);
        res.json(cartOfUser);
    }
});


// Starten van de server
app.listen(3000, () => {
    console.log("Server is listening...");
});