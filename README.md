Zorg ervoor dat [Node](https://nodejs.org/en/download/) geïnstalleerd is.  
Je kan snel starten door een terminal te openen in deze directory en vervolgens ```npm run start``` uit te voeren. 
De API van de webapplicatie is dan beschikbaar op [http://localhost:3000/api/products](http://localhost:3000/api/products) en [http://localhost:3000/api/cart/username](http://localhost:3000/api/cart/username).
'username' moet je vervangen met een gebruikersnaam. Als test werd 'timbernerslee' al toegevoegd.

De API biedt volgende functionaliteiten: 
* Een GET request naar http://localhost:3000/api/products geeft een JSON array terug met alle producten van de UCLL webshop. 
* Een GET request naar http://localhost:3000/api/cart/{username} geeft een JSON object terug met een 'items' array waarin alle producten van de winkelkar van de gebruiker zitten, inclusief het aantal van dat product. In de URL moet je dus ook het klantnaam meegeven. Als de gebruiker nog geen winkelkar heeft is de 'items' array een lege array (length = 0).
* Een POST request naar http://localhost:3000/api/cart/{username} (met in de body een JSON object dat verwijst naar de id van het product) voegt één artikel van het product toe aan de winkelkar.
* Een DELETE request naar http://localhost:3000/api/cart/{username} (met in de body een JSON object dat verwijst naar de id van het product) verwijdert één artikel van het product uit de winkelkar.

Meer informatie staat ook als commentaar in de code van /server/app.js en gerelateerde .js bestanden.

In de map /postman kan je een 'Postman collection' terugvinden met de GET, POST en DELETE voorbeelden.
Deze collection kan je importeren in Postman om de API te testen.
