// Objecten van deze klasse stellen items voor in de winkelwagen van een bepaalde klant.
export default class CartItem {
    constructor(productId, amount) {
        this._productId = productId;
        this._amount = amount;        
    } 

    get productId() {
        return this._productId;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    // JSON.stringify zal standaard deze methode aanroepen, alvoerens om te zetten naar een JSON string.
    // Op deze manier zorgen we ervoor dat er geen _ in de propertynamen zitten.
    toJSON() {
        return {
            productId: this._productId,
            amount: this._amount
        };
    }
}