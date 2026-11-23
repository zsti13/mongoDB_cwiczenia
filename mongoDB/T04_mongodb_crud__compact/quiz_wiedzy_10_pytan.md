# Quiz wiedzy: MongoDB + Mongoose — Pełny CRUD w Express

Czas trwania: **15 minut**  
Liczba pytań: **10** (pytania 1–7: bieżący temat; pytania 8–10: retencja wstecz z tematów T01–T03)  
Typ pytań: jednokrotnego wyboru (A, B, C, D)

---

**1. Która metoda modelu Mongoose służy do odnalezienia pojedynczego dokumentu na podstawie jego unikalnego identyfikatora klucza głównego?**
* A) `Model.getById(id)`
* B) `Model.findById(id)`
* C) `Model.selectOne(id)`
* D) `Model.findPrimaryKey(id)`

---

**2. Co domyślnie zwraca asynchroniczne wywołanie `Model.findByIdAndUpdate(id, req.body)`, jeżeli nie przekazano dodatkowego obiektu opcji konfiguracyjnych?**
* A) Zaktualizowany dokument w stanie po wykonaniu modyfikacji
* B) Pierwotny dokument w stanie sprzed wykonania modyfikacji
* C) Liczbę zmodyfikowanych wierszy w formacie `{ modifiedCount: 1 }`
* D) Wartość logiczną `true` informującą o sukcesie operacji

---

**3. Jaka flaga w obiekcie opcji metody `findByIdAndUpdate` wymusza zwrócenie dokumentu po naniesieniu zmian z żądania klienta?**
* A) `{ updated: true }`
* B) `{ returnModified: true }`
* C) `{ new: true }`
* D) `{ fresh: true }`

---

**4. Dlaczego przy operacji aktualizacji dokumentu zaleca się przekazanie opcji `{ runValidators: true }`?**
* A) Ponieważ domyślnie Mongoose wyłącza weryfikację reguł schematu podczas metody `findByIdAndUpdate`
* B) Ponieważ przyspiesza to czas odpowiedzi serwera dzięki kompilacji walidatorów w silniku V8
* C) Ponieważ automatycznie konwertuje wszystkie napisy na wielkie litery
* D) Ponieważ zapobiega rzuceniu błędu `CastError` w przypadku podania błędnego typu

---

**5. Jaki kod odpowiedzi HTTP jest rekomendowany przez standard REST w sytuacji, gdy metoda `findByIdAndDelete()` pomyślnie usunęła dokument i serwer nie przesyła treści w ciele odpowiedzi?**
* A) 200 OK
* B) 201 Created
* C) 204 No Content
* D) 410 Gone

---

**6. Co zwróci wywołanie `await Model.findById(id)`, jeżeli w kolekcji MongoDB nie istnieje żaden dokument o podanym identyfikatorze?**
* A) Rzuci błąd `DocumentNotFoundError`
* B) Zwróci pustą tablicę `[]`
* C) Zwróci wartość `null`
* D) Zwróci pusty obiekt `{}`

---

**7. Użytkownik wysłał zapytanie `GET /api/zamowienia/abc-123`, gdzie identyfikator nie jest poprawnym 24-znakowym ciągiem szesnastkowym `ObjectId`. Jaki błąd zgłosi Mongoose w bloku `catch`?**
* A) `ValidationError`
* B) `SyntaxError`
* C) `CastError`
* D) `ReferenceError`

---

**8. Do czego służy funkcja `mongoose.model('Produkt', produktSchema)`?**
* A) Do utworzenia nowej bazy danych na dysku serwera
* B) Do skompilowania schematu w konstruktor modelu powiązany z kolekcją w MongoDB
* C) Do wyczyszczenia istniejącej kolekcji przed dodaniem nowych danych
* D) Do uruchomienia migracji struktury tabel w relacyjnej bazie danych

---

**9. Który middleware w frameworku Express jest bezwzględnie wymagany, aby odczytać dane przesłane w formacie JSON w ciele żądania `POST` lub `PUT` (`req.body`)?**
* A) `express.static('public')`
* B) `express.urlencoded({ extended: true })`
* C) `express.json()`
* D) `express.raw()`

---

**10. Jaki kod odpowiedzi HTTP powinien zwrócić serwer REST, gdy klient odpytuje o listę zasobów `GET /api/produkty` i operacja zakończyła się pełnym sukcesem?**
* A) 200 OK
* B) 201 Created
* C) 202 Accepted
* D) 204 No Content

---

## Klucz odpowiedzi i analiza dystraktorów

| Nr pytania | Prawidłowa odpowiedź | Wyjaśnienie dydaktyczne i analiza dystraktorów |
|:---:|:---:|:---|
| 1 | **B** | `Model.findById(id)` jest standardową metodą Mongoose. Metody `getById` (A), `selectOne` (C) czy `findPrimaryKey` (D) nie istnieją w API biblioteki. |
| 2 | **B** | Zgodnie z domyślnym zachowaniem sterownika MongoDB/Mongoose, metoda `findByIdAndUpdate` zwraca pierwotny stan dokumentu sprzed operacji. Błędne założenie o zwracaniu nowego dokumentu (A) jest najczęstszą pomyłką programistów. |
| 3 | **C** | Opcja `{ new: true }` instruuje Mongoose, aby zwrócić zmodyfikowany dokument. Flagi takie jak `updated` (A) czy `returnModified` (B) są zmyślone. |
| 4 | **A** | Domyślnie walidatory schematu (np. `min`, `max`, `required`) uruchamiane są wyłącznie przy tworzeniu dokumentu (`save()`, `create()`). Przy aktualizacji trzeba jawnie włączyć `{ runValidators: true }`. |
| 5 | **C** | Kod `204 No Content` oznacza udaną operację bez zwracania ciała odpowiedzi, co jest kanonicznym standardem dla żądań `DELETE`. Kod 200 (A) wymaga odesłania danych, a 201 (B) dotyczy tworzenia zasobu. |
| 6 | **C** | Gdy dokument nie istnieje, `findById` nie rzuca wyjątku, lecz zwraca wartość `null`. Pusta tablica (B) zwracana jest przez `find()` przy braku wyników, a pusty obiekt (D) nie jest reprezentacją braku rekordu. |
| 7 | **C** | Przekazanie do metody oczekującej `ObjectId` ciągu o niepoprawnej długości lub znakach powoduje błąd rzutowania typu (`CastError`). `ValidationError` (A) dotyczy niespełnienia reguł schematu. |
| 8 | **B** | `mongoose.model()` tworzy klasę modelu (konstruktor dokumentów) na bazie schematu i łączy ją z odpowiednią kolekcją (automatycznie tworząc liczbę mnogą nazwy). |
| 9 | **C** | Middleware `express.json()` parsuje przychodzące nagłówki `Content-Type: application/json` i umieszcza sparsowane dane w `req.body`. Bez niego `req.body` ma wartość `undefined`. |
| 10 | **A** | Kod `200 OK` jest standardowym kodem pomyślnego odczytu danych w protokole HTTP. Kod 201 (B) oznacza utworzenie nowego zasobu, a 204 (D) brak zawartości. |

---

## Skala ocen

| Liczba punktów | Ocena szkolna |
|:---:|:---|
| 0 – 4 pkt | niedostateczny (1) |
| 5 – 6 pkt | dopuszczający (2) |
| 7 – 8 pkt | dostateczny (3) |
| 9 pkt | dobry (4) |
| 10 pkt | bardzo dobry (5) |
