Zorg ervoor dat [Node](https://nodejs.org/en/download/) geïnstalleerd is.  
Je kan snel starten door een terminal te openen in deze directory en vervolgens ```npm run start``` uit te voeren. 
De API van de webapplicatie is dan beschikbaar op http://localhost:3000/api/...

De API biedt volgende functionaliteiten: 
* Een GET request naar http://localhost:3000/api/products geeft een JSON array terug met alle producten van de UCLL webshop. 
* Een POST request naar http://localhost:3000/api/cart berekent de totaalprijs MET korting. In de body moet je de inhoud van je winkelwagen meesturen.
* Een POST request naar http://localhost:3000/api/order geeft een order ID terug (een UUID string van de vorm "333e4568-e67e-12e4-a654-321114174321"). In de body moet je de inhoud van je winkelwagen meesturen EN ook de username die de bestelling doet.

> (!) Meer detailinformatie over de JSON data die je moet sturen of zal ontvangen staat als commentaar in /server/app.js

In de map /postman kan je een 'Postman collection' terugvinden met GET en POST requests.
Deze collection kan je importeren in Postman om de API te testen.