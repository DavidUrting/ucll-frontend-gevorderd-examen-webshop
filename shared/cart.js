// Objecten van deze klasse stellen een winkelkar voor.
export default class Cart {
    constructor(cartItems) {
        if (cartItems) {
            this._cartItems = cartItems;
        } else {
            this._cartItems = [];
        }        
    } 

    get items() {
        return this._cartItems;
    }

    updateCart(cartItem) {
        this._cartItems.push(cartItem);
        // Indien het reeds bestaat: overschrijven.
        // Indien = 0 -> verwijderen.
    }
}