# Temat T03: MongoDB i Mongoose — połączenie, model i pierwsza kolekcja

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.04; przed zajęciami weryfikuje ją nauczyciel.

## 1. Informacje o module

- **Kwalifikacja:** INF.04 (Projektowanie, programowanie i testowanie aplikacji)
- **Przedmiot:** Programowanie zaawansowanych aplikacji internetowych (PZAI)
- **Semestr:** 3 (API, Mongo, fetch, testy, powtórka)
- **Jednostka dydaktyczna:** Blok 2-godzinny (2 × 45 min)
- **Katalog modułu:** `INF04_PZAI/mongoDB/T03_mongodb_mongoose__compact`
- **Profil wielkości:** `compact` (3 mikro-ćwiczenia + 1 zadanie integrujące + 1 zadanie przyrostowe w `nauka/`; 2 zadania na grupę w `sprawdzian/`)

---

## 2. Zakres tematyczny modułu

Moduł wprowadza uczniów w świat trwałych baz danych NoSQL w środowisku Node.js z wykorzystaniem biblioteki ODM Mongoose. Po opanowaniu operacji na tablicach w pamięci RAM serwera (moduły T01 i T02), uczniowie poznają zasady trwałego przechowywania danych dokumentowych:

1. **Połączenie z bazą danych MongoDB:**
   - Wykorzystanie metody `mongoose.connect()` do nawiązania asynchronicznego połączenia z lokalną lub sieciową instancją bazy.
   - Prawidłowa obsługa asynchroniczności za pomocą `async/await` oraz bloków `try/catch`.
   - Obsługa błędów połączenia i bezpieczne logowanie statusu w konsoli serwera.
2. **Definiowanie schematów (Mongoose Schema):**
   - Rola schematu jako wzorca struktury dokumentu w elastycznej bazie NoSQL.
   - Podstawowe typy danych Mongoose: `String`, `Number`, `Boolean`, `Date`.
   - Podstawowa walidacja deklaratywna: `required: true`, wartości domyślne `default`, ograniczenia numeryczne (`min`, `max`) oraz tekstowe (`trim`).
3. **Tworzenie modeli Mongoose (Model):**
   - Kompilacja schematu do modelu za pomocą funkcji `mongoose.model('NazwaModelu', schemat)`.
   - Reguła automatycznego tworzenia nazwy kolekcji w bazie (angielska liczba mnoga, małe litery).
4. **Zapis i odczyt danych w kolekcji:**
   - Asynchroniczne pobieranie wszystkich dokumentów z kolekcji metodą `Model.find()`.
   - Zapis nowego dokumentu za pomocą metody `Model.create(req.body)` lub instancjonowania obiektu `new Model(...)` i wywołania `.save()`.
5. **Integracja z frameworkiem Express:**
   - Tworzenie punktów końcowych API: `GET /api/...` (lista dokumentów) oraz `POST /api/...` (dodanie dokumentu).
   - Przetwarzanie ciała żądania przez middleware `express.json()`.
   - Semantyka kodów odpowiedzi HTTP:
     - `200 OK` — pomyślne pobranie listy dokumentów z bazy.
     - `201 Created` — pomyślne utworzenie i zapisanie dokumentu w kolekcji.
     - `400 Bad Request` — błąd walidacji schematu Mongoose (brak wymaganych pól, zły format).
     - `500 Internal Server Error` — nieoczekiwany błąd serwera lub utrata łączności z bazą danych.

---

## 3. Czego ten temat NIE uczy (granice dydaktyczne)

W celu zapewnienia stopniowego przyrostu wiedzy i uniknięcia przeciążenia poznawczego, moduł świadomie **nie obejmuje**:
- Modyfikacji i usuwania dokumentów z bazy MongoDB (`PUT`, `PATCH`, `DELETE`, `findByIdAndUpdate`, `deleteOne`) — zagadnienia te stanowią treść kolejnego modułu T04.
- Agregacji danych (`$aggregate`, `$lookup`, `$group`, `$project`) oraz indeksowania zaawansowanego.
- Relacji między kolekcjami, referencji dokumentów i złączeń (`populate`).
- Połączenia z klientem frontendowym w React (`fetch`, `useEffect`) — integracja nastąpi w kolejnych etapach semestru.
- Uwierzytelniania i autoryzacji użytkowników (haszowanie haseł `bcrypt`, tokeny `JWT`).

---

## 4. Przebieg lekcji

1. **Wprowadzenie i motywacja (15 min):**
   - Przypomnienie ograniczeń pamięci ulotnej (RAM) z modułów T01–T02: co się dzieje z danymi po restarcie serwera?
   - Wprowadzenie pojęcia bazy NoSQL (dokumenty BSON/JSON, kolekcje) w opozycji do tabel relacyjnych SQL.
2. **Wykład i demonstracja (20 min):**
   - Omówienie roli biblioteki Mongoose jako warstwy ODM.
   - Demonstracja `mongoose.connect()` oraz konstrukcji `new mongoose.Schema(...)`.
   - Pokazanie tworzenia modelu `mongoose.model()` oraz zapisu i odczytu danych w trasach Express (`Model.find()`, `Model.create()`).
3. **Część warsztatowa (40 min):**
   - Samodzielna praca z zadaniami w folderze `nauka/`:
     - Zadanie 1: Połączenie z bazą i odczyt dokumentów (katalog produktów).
     - Zadanie 2: Zapis nowego dokumentu z walidacją schematu (rejestr zgłoszeń serwisowych).
     - Zadanie 3: Schemat z wartościami domyślnymi i ograniczeniami (magazyn książek).
     - Zadanie 4 (integrujące): Mini-API wypożyczalni sprzętu (pełny odczyt i zapis w kolekcji Mongoose).
     - Zadanie 5 (przyrostowe Capstone): Model dań i baza MongoDB w systemie Pizzeria La Bella.
4. **Podsumowanie i ewaluacja (15 min):**
   - Przeprowadzenie quizu wiedzy (10 pytań z omówieniem).
   - Przegląd najczęstszych problemów (asynchroniczność, brak `await`, błędy walidacji).

---

## 5. Sprawdzian wiedzy i umiejętności

Moduł zawiera materiały sprawdzające w folderze `sprawdzian/` dla dwóch równoważnych grup (Grupa A i Grupa B):
- **Zadanie 1 (25 pkt):** Połączenie z MongoDB, zdefiniowanie prostego schematu i odczyt listy dokumentów metodą `find()`.
- **Zadanie 2 (35 pkt):** Zdefiniowanie schematu z walidacją pól wymaganych i typu, implementacja trasy `POST` zapisującej dokument do bazy z obsługą kodów `201 Created` i `400 Bad Request`.
- **Łączna punktacja:** 60 pkt.
