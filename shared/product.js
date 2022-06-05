// Objecten van deze klasse stellen de producten van de UCLL webshop voor.
export default class Product {
    constructor(id, title, cost) {
        this._id = id;
        this._title = title;
        this._cost = cost;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get cost() {
        return this._cost;
    }


    // JSON.stringify zal standaard deze methode aanroepen, alvoerens om te zetten naar een JSON string.
    // Op deze manier zorgen we ervoor dat er geen _ in de propertynamen zitten.
    toJSON() {
        return {
            id: this._id,
            title: this._title,
            cost: this._cost
        };
    }
}