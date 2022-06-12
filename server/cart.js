import products from "./products.js"; 
import CartItem from "./cart-item.js";

// Objecten van deze klasse stellen een winkelkar voor.
export default class Cart {
    constructor(username, cartItems) {
        this._username = username;
        if (cartItems) {
            this._items = cartItems;
        } else {
            this._items = [];
        }        
    } 

    get username() {
        return this._username;
    }

    get items() {
        return this._items;
    }

    get costAfterReduction() {
        let ourBestPrice = 0;
        this._items.forEach((item) => {
            ourBestPrice += (item.amount * products.find(p => p.id === item.productId).cost);
        });
        if (ourBestPrice >= 30) {
            ourBestPrice = ourBestPrice - ourBestPrice * 0.10;
        }
        return ourBestPrice;
    }

    addToCart(productId) {
        let itemInCart = this._items.find(ci => ci.productId === productId);
        if (!itemInCart) {
            itemInCart = new CartItem(productId, 1);
            this._items.push(itemInCart);
        } else {
            itemInCart.amount++;
        }
    }

    removeFromCart(productId) {
        let itemInCart = this._items.find(ci => ci.productId === productId);
        if (!itemInCart) { 
            return;
        }
        else {
            itemInCart.amount--;
            if (itemInCart.amount <= 0) {
                this._items = this._items.filter(ci => ci.productId !== productId);
            }
        }
    }

    // JSON.stringify zal standaard deze methode aanroepen, alvoerens om te zetten naar een JSON string.
    // Op deze manier zorgen we ervoor dat er geen _ in de propertynamen zitten.
    toJSON() {
        return {
            username: this._username,
            items: this._items,
            costAfterReduction: this.costAfterReduction
        };
    }
}