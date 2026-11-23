# Temat T04: MongoDB + Mongoose — Pełny CRUD w Express (Profil: compact)

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.04; przed zajęciami weryfikuje ją nauczyciel.

Katalog modułu: `INF04_PZAI/mongoDB/T04_mongodb_crud__compact/`  
Przedmiot: Programowanie zaawansowanych aplikacji internetowych (PZAI)  
Semestr: 3 (API, Mongo, fetch, testy, powtórka)  
Czas trwania jednostki: 2 godziny lekcyjne  
Profil wielkości: **compact** (5 zadań w części warsztatowej: 3 mikro-ćwiczenia, 1 zadanie integrujące, 1 zadanie przyrostowe Capstone; 2 zadania na sprawdzianie A/B)

---

## 1. Zakres tematu i cel dydaktyczny

Temat T04 stanowi naturalne rozszerzenie fundamentów poznanych w temacie T03 (inicjalizacja połączenia oraz bazowy zapis i odczyt). Celem modułu jest opanowanie pełnego cyklu życia zasobu bazodanowego w architekturze REST API w środowisku Node.js i frameworku Express:
- **C (Create)**: odbiór danych z `req.body`, tworzenie nowego dokumentu za pomocą `Model.create()`, zwrócenie kodu statusu HTTP `201 Created` z zapisanym obiektem.
- **R (Read)**: odczyt pełnej kolekcji (`Model.find()`) oraz wyszukiwanie pojedynczego rekordu po identyfikatorze z parametru trasy (`req.params.id`) za pomocą `Model.findById()`, ze zwróceniem kodu `200 OK` lub `404 Not Found`.
- **U (Update)**: aktualizacja istniejącego rekordu za pomocą `Model.findByIdAndUpdate(id, dane, { new: true, runValidators: true })`, weryfikacja istnienia zasobu (`404 Not Found`) oraz obsługa błędów walidacji (`400 Bad Request`).
- **D (Delete)**: trwałe usunięcie dokumentu z bazy danych za pomocą `Model.findByIdAndDelete(id)`, obsługa braku rekordu (`404 Not Found`) oraz potwierdzenie operacji kodem `204 No Content` lub komunikatem w formacie JSON (`200 OK`).
- **Stabilność i obsługa błędów**: hermetyzacja operacji asynchronicznych w blokach `try/catch` z rozróżnieniem błędu niepoprawnego formatu identyfikatora (`CastError` / `400 Bad Request`) od błędu serwera (`500 Internal Server Error`).

---

## 2. Cele edukacyjne — Uczeń potrafi:
1. Zdefiniować i zarejestrować kompletny zestaw tras REST w aplikacji Express (`GET /api/...`, `GET /api/.../:id`, `POST /api/...`, `PUT /api/.../:id`, `DELETE /api/.../:id`).
2. Wykorzystać asynchroniczne metody modelu Mongoose (`Model.find()`, `Model.findById()`, `Model.create()`, `Model.findByIdAndUpdate()`, `Model.findByIdAndDelete()`).
3. Zastosować opcję `{ new: true, runValidators: true }` przy aktualizacji, aby metoda zwracała zmodyfikowany dokument po ponownym sprawdzeniu reguł schematu.
4. Zwracać prawidłowe kody odpowiedzi HTTP odpowiadające wynikom operacji (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
5. Zabezpieczyć trasy przed awarią procesu Node za pomocą konstrukcji `try/catch`.

---

## 3. Czego ten temat NIE uczy (granice modułu):
- **Brak relacji między kolekcjami**: nie stosujemy metody `.populate()` ani referencji `ObjectId` do innych modeli.
- **Brak zaawansowanych agregacji**: nie używamy potoków agregacji (`$aggregate`, `$group`, `$lookup`).
- **Brak autoryzacji i tokenów**: nie wprowadzamy nagłówków `Authorization`, tokenów JWT ani sesji użytkownika.
- **Brak frontendu klienckiego**: aplikacje backendowe testujemy w terminalu (`curl`, skrypty pomocnicze) lub narzędziach HTTP; nie integrujemy tras z Reactem ani zapytaniami `fetch` z poziomu przeglądarki.

---

## 4. Drabina dydaktyczna i organizacja lekcji (profil compact)

1. **Wstęp teoretyczny (ok. 15–20 min)**:
   - Analiza `teoria.md` z naciskiem na cykl CRUD oraz różnice między metodami odczytu i modyfikacji.
   - Wyjaśnienie flagi `{ new: true }` oraz roli walidacji przy operacjach edycji.
2. **Warsztat — część ćwiczeniowa `nauka/` (ok. 45–55 min)**:
   - `zadanie1_...` (Mikro 1: fundament): Pobieranie pojedynczego zasobu po ID (`findById`) i obsługa statusu 404.
   - `zadanie2_...` (Mikro 2: edycja): Aktualizacja dokumentu (`findByIdAndUpdate`) z flagami `{ new: true, runValidators: true }`.
   - `zadanie3_...` (Mikro 3: usuwanie): Trwałe usuwanie zasobu (`findByIdAndDelete`) z kodem 204 No Content.
   - `zadanie4_...` (Zadanie integrujące): Połączenie operacji C-R-U-D w jednej spójnej usłudze REST.
   - `zadanie5_...` (Przyrostowe Capstone): Rozbudowa backendu pizzerii *Pizzeria La Bella* o pełną edycję i usuwanie dań menu (Zero Regresji względem poprzednich kamieni).
3. **Weryfikacja wiedzy i diagnoza (ok. 20 min)**:
   - `quiz_wiedzy_10_pytan.md` (15 min) — szybki sprawdzian wiedzy koncepcyjnej.
   - Sprawdzian diagnostyczno-utrwalający `sprawdzian/` (grupy A i B).
