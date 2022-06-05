Zorg ervoor dat [Node](https://nodejs.org/en/download/) geïnstalleerd is.  
Je kan snel starten door een terminal te openen in deze directory en vervolgens ```npm run start``` uit te voeren. 
De API van de webapplicatie is dan beschikbaar op [http://localhost:3000/api/products](http://localhost:3000/api/products) en [http://localhost:3000/api/cart](http://localhost:3000/api/cart).

In de map /postman kan je een 'Postman collection' terugvinden met GET en POST voorbeelden.
Deze collection kan je importeren in Postman om de API te testen.

In principe is de API vrij eenvoudig: 
* Een GET request naar http://localhost:3000/api/products geeft een JSON array terug met alle producten van de UCLL webshop. 
  Een product heeft een id, title en cost (in euro, inclusief BTW).
* Een GET request naar http://localhost:3000/api/cart geeft een JSON array terug met alle producten in de winkelkar van de gebruiker, inclusief het aantal van dat product.
* Een POST request naar http://localhost:3000/api/cart (met in de body een JSON object dat verwijst naar het product en het gewenste aantal) past de winkelkar aan.
  Als het gewenste aantal = 0 dan wordt het product uit de winkelkar verwijderd.

Meer informatie staat ook als commentaar in de code van /server/app.js, /server/products.js en de classes in /shared/*.js.