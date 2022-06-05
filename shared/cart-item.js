// Objecten van deze klasse stellen items voor in de winkelwagen van een bepaalde klant.
export default class CartItem {
    constructor(customerId, productId, amount) {
        this._customerId = customerId;
        this._productId = productId;
        this._amount = amount;        
    } 

    get customerId() {
        return this._customerId;
    }

    get productId() {
        return this._pruductId;
    }

    get amount() {
        return this._amount;
    }

    // JSON.stringify zal standaard deze methode aanroepen, alvoerens om te zetten naar een JSON string.
    // Op deze manier zorgen we ervoor dat er geen _ in de propertynamen zitten.
    toJSON() {
        return {
            customerId: this._customerId,
            productId: this._productId,
            amount: this._amount
        };
    }
}