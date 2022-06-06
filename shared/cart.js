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
        let cartItemInCart = this._cartItems.find(ci => ci.productId == cartItem.productId);
        if (!cartItemInCart) {
            cartItemInCart = cartItem;
            this._cartItems.push(cartItemInCart);
        } else {
            if (cartItem.amount === 0) {
                this._cartItems = this._cartItems.find(ci => ci.productId !== cartItem.productId);
            } else {
                cartItemInCart.amount = cartItem.amount;
            }         
        }
    }
}