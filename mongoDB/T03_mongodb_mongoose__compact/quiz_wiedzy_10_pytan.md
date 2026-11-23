# Quiz wiedzy: MongoDB i Mongoose — połączenie, model, pierwsza kolekcja

Czas trwania: **15 minut**  
Liczba pytań: **10** (pytania 1–7: bieżący temat; pytania 8–10: retencja wiedzy z modułów T01–T02)

---

**1. Czym w terminologii bazy danych MongoDB jest kolekcja (collection)?**
* A) Odpowiednikiem pojedynczego rekordu lub wiersza zapisanego w formacie binarnym BSON.
* B) Zbiorem dokumentów, pełniącym rolę analogiczną do tabeli w relacyjnych bazach danych SQL.
* C) Plikiem konfiguracyjnym definiującym port i adres IP serwera bazodanowego.
* D) Instancją procesu serwera odpowiedzialną za nasłuchiwanie zapytań sieciowych.

---

**2. Jaka jest główna rola biblioteki Mongoose w aplikacji opartej na Node.js i Express?**
* A) Zastępuje całkowicie silnik MongoDB, eliminując konieczność instalacji bazy danych.
* B) Pełni rolę serwera proxy zabezpieczającego port bazy przed atakami sieciowymi.
* C) Jest systemem ODM (Object Data Modeling) zapewniającym schematy, walidację danych i mapowanie dokumentów na obiekty JavaScript.
* D) Służy do automatycznego kompilowania kodu JavaScript do postaci binarnej.

---

**3. Które z poniższych poleceń poprawnie nawiązuje asynchroniczne połączenie z lokalną bazą MongoDB w Mongoose?**
* A) `await mongoose.connect('mongodb://127.0.0.1:27017/moja_baza');`
* B) `mongoose.createConnectionSync('localhost:27017');`
* C) `const db = new Mongoose.Database('mongodb://localhost');`
* D) `mongoose.openSocket(27017, 'moja_baza');`

---

**4. W jaki sposób w schemacie Mongoose poprawnie definiuje się pole będące ciągiem znaków z wymogiem jego obecności?**
* A) `nazwa: { type: 'string', notNull: true }`
* B) `nazwa: { type: typeof '', mandatory: true }`
* C) `nazwa: { type: String, required: true }`
* D) `nazwa: String.required()`

---

**5. Jeśli model został skompilowany poleceniem `mongoose.model('Product', productSchema)`, to jak domyślnie Mongoose nazwie kolekcję w bazie MongoDB?**
* A) `Product_table`
* B) `products`
* C) `product_collection`
* D) `Product`

---

**6. Która metoda modelu Mongoose służy do asynchronicznego pobrania wszystkich dokumentów z powiązanej kolekcji?**
* A) `Model.selectAll()`
* B) `Model.fetchAllDocuments()`
* C) `Model.find()`
* D) `Model.getCollection()`

---

**7. Jaki kod statusu HTTP powinien zwrócić serwer Express w trasie POST, gdy dane przesłane przez klienta nie spełniają reguł walidacji schematu Mongoose (np. ValidationError)?**
* A) `200 OK`
* B) `404 Not Found`
* C) `400 Bad Request`
* D) `502 Bad Gateway`

---

**8. [Retencja T02] Które wbudowane oprogramowanie pośredniczące (middleware) w Express jest niezbędne, aby serwer mógł odczytać dane przesłane w formacie JSON w ciele żądania POST (`req.body`)?**
* A) `express.urlencoded()`
* B) `express.static('public')`
* C) `express.json()`
* D) `express.cookieParser()`

---

**9. [Retencja T02] Jaki kod statusu HTTP jest zalecany w architekturze REST po pomyślnym utworzeniu nowego zasobu w bazie danych?**
* A) `200 OK`
* B) `201 Created`
* C) `204 No Content`
* D) `302 Found`

---

**10. [Retencja T01] W jaki sposób w Express definiuje się trasę z parametrem dynamicznym identyfikującym element (np. id produktu)?**
* A) `app.get('/api/produkty/?id', ...)`
* B) `app.get('/api/produkty/{id}', ...)`
* C) `app.get('/api/produkty/:id', ...)`
* D) `app.get('/api/produkty/[id]', ...)`

---

## Klucz odpowiedzi

| Nr pytania | Prawidłowa odpowiedź | Wyjaśnienie merytoryczne |
|:----------:|:--------------------:|:-------------------------|
| 1 | B | Kolekcja w MongoDB grupuje dokumenty i stanowi odpowiednik tabeli z relacyjnych baz SQL. |
| 2 | C | Mongoose to biblioteka ODM modelująca dokumenty na obiekty JS i wymuszająca strukturę oraz walidację. |
| 3 | A | Metoda `mongoose.connect()` przyjmuje adres connection string i zwraca obietnicę (Promise), stąd użycie `await`. |
| 4 | C | Typy w schematach Mongoose definiujemy wielką literą (`String`), a wymóg obecności określa właściwość `required: true`. |
| 5 | B | Mongoose automatycznie zamienia nazwę modelu na małe litery i dodaje angielską liczbę mnogą (`Product` -> `products`). |
| 6 | C | Metoda `Model.find()` wywołana bez kryteriów filtrujących zwraca wszystkie dokumenty z kolekcji. |
| 7 | C | Błędy walidacji danych wejściowych pochodzących od klienta reprezentowane są przez kod `400 Bad Request`. |
| 8 | C | Middleware `express.json()` parsuje nagłówek `Content-Type: application/json` i umieszcza dane w obiekcie `req.body`. |
| 9 | B | Status `201 Created` jednoznacznie informuje o pomyślnym utworzeniu i utrwaleniu nowego zasobu. |
| 10 | C | Parametry dynamiczne w ścieżkach routingu Express oznacza się dwukropkiem, np. `:id`, a odczytuje w `req.params.id`. |
