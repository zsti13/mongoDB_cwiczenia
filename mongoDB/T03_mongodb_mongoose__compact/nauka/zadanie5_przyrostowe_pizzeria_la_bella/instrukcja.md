# Zadanie 5 (Przyrostowe Capstone): Model dań i połączenie z bazą MongoDB w Pizzeria La Bella

## Wprowadzenie do zadania
W lokalu gastronomicznym **Pizzeria La Bella** dotychczasowe menu oraz zamówienia były obsługiwane w pamięci RAM serwera (etapy EX1–EX5). W bieżącym etapie **MG1** wprowadzamy trwałą bazę danych **MongoDB** za pośrednictwem biblioteki **Mongoose**. Twoim zadaniem jest rozbudowa serwera o połączenie z bazą danych, zdefiniowanie schematu pozycji menu (`MenuItemSchema`) oraz modelu Mongoose (`MenuItem`), a także wdrożenie obsługi zapisu nowego dania do bazy z zachowaniem pełnej zgodności dotychczasowych tras i niezmiennej marki portalu.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Systemy restauracyjne (Pyszne.pl, Uber Eats)**: karta dań lokalu przechowywana jest w trwałej bazie NoSQL, co umożliwia jej dynamiczną aktualizację przez menedżera restauracji bez przestoju serwera.
- **Nowoczesne portale gastronomiczne**: zamówienia i pozycje menu utrwalane są w bazach dokumentowych, gwarantując integralność danych po awarii lub restarcie maszyny wirtualnej.
- **Kasy fiskalne i systemy POS (Point of Sale)**: synchronizacja lokalnego menu z centralną bazą produktów w chmurze.

## Wymagania funkcjonalne i techniczne
1. W pliku `server.js` zaimportuj bibliotekę `mongoose`.
2. Zdefiniuj łańcuch połączeniowy do bazy: `mongodb://127.0.0.1:27017/pizzeria_la_bella`.
3. Zdefiniuj schemat `MenuItemSchema` z polami:
   - `nazwa` (typ `String`, wymagany: `required: true`, `trim: true`),
   - `cena` (typ `Number`, wymagany: `required: true`, ograniczenie: `min: [0, 'Cena dania nie moze byc ujemna']`),
   - `kategoria` (typ `String`, wymagany: `required: true`, `trim: true`).
4. Utwórz model: `const MenuItem = mongoose.model('MenuItem', MenuItemSchema);`.
5. Zaktualizuj trasę `GET /api/menu`:
   - Pobierz dokumenty dań z bazy danych za pomocą `await MenuItem.find()`.
   - Jeśli baza zawiera dokumenty, zwróć je w formacie JSON ze statusem `200 OK`. Jeśli kolekcja w bazie jest jeszcze pusta, zwróć dotychczasową kolekcję startową `menuRestauracji` (fallback dla zachowania ciągłości testów).
6. Zaktualizuj trasę `POST /api/menu`:
   - Odbierz z ciała żądania pola: `nazwa`, `cena`, `kategoria`.
   - Zapisz nowe danie w bazie danych metodą `await MenuItem.create({ nazwa, cena, kategoria })`.
   - Zwróć utworzony dokument ze statusem `201 Created`.
   - W przypadku błędu walidacji Mongoose lub braku wymaganych pól zwróć status `400 Bad Request` z komunikatem błędu.
7. **Zasada Zero Regresji:**
   - Wszystkie dotychczasowe trasy (`/`, `/menu`, `/kontakt`, `GET /api/menu/:id`, `GET /api/zamowienia`, `POST /api/zamowienia`, `DELETE /api/menu/:id`) oraz pliki statyczne `public/` MUSZĄ pozostać sprawne.
   - Zachowaj bezwzględnie tożsamość marki **Pizzeria La Bella** oraz sztandarowe danie **Margherita**.
8. Serwer nasłuchuje na porcie `3007`.

## Treść do wpisania
Przetestuj dodawanie nowej pizzy do menu lokalu Pizzeria La Bella: "Margherita tradycyjna z sosem pomidorowym i mozzarellą" o cenie "32.50" oraz "Pizza Parma".
- Nazwa: "Margherita tradycyjna z sosem pomidorowym i mozzarellą", cena: 32.50, kategoria: "pizza"
- Nazwa: "Pizza Parma z szynką parmeńską i rukolą", cena: 44.00, kategoria: "pizza"
- Nazwa: "Panna Cotta z sosem malinowym", cena: 18.00, kategoria: "deser"

## Przykładowe wywołanie w terminalu
```bash
node server.js
```
