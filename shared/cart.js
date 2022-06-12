import CartItem from "./cart-item.js";

// Objecten van deze klasse stellen een winkelkar voor.
export default class Cart {
    constructor(customerId, cartItems) {
        this._customerId = customerId;
        if (cartItems) {
            this._items = cartItems;
        } else {
            this._items = [];
        }        
    } 

    get customerId() {
        return this._customerId;
    }

    get items() {
        return this._items;
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
            productId: this._productId,
            items: this._items
        };
    }
}