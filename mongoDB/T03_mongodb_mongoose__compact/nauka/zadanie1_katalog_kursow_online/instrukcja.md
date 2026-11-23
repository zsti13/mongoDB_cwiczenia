# Zadanie 1: Połączenie z bazą MongoDB i odczyt kursów online

## Wprowadzenie do zadania
W platformie edukacyjnej „EduStrefa” tworzony jest nowy moduł backendowy odpowiedzialny za prezentację oferty szkoleniowej. Twoim zadaniem jest podłączenie aplikacji opartej na frameworku Express do bazy danych MongoDB z wykorzystaniem biblioteki Mongoose oraz udostępnienie punktu końcowego GET zwracającego wszystkie dostępne kursy.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Platformy szkoleniowe (Coursera, Udemy)**: lista dostępnych szkoleń jest trwale zapisana w kolekcji bazodanowej i pobierana asynchronicznie przez backend w odpowiedzi na zapytanie widoku katalogu.
- **Serwisy rekrutacyjne (Just Join IT, Pracuj.pl)**: baza ogłoszeń o pracę odczytywana jest metodą `find()` i przesyłana w formacie JSON do interfejsu przeglądarki.
- **Katalogi biblioteczne**: odczyt zasobów księgozbioru z bazy danych bez konieczności restartowania serwera.

## Wymagania funkcjonalne i techniczne
1. W pliku `server.js` zaimportuj moduły `express` oraz `mongoose`.
2. Zdefiniuj adres bazy: `mongodb://127.0.0.1:27017/edustrefa`.
3. Utwórz schemat `kursSchema` za pomocą `new mongoose.Schema({ ... })` z polami:
   - `tytul` (typ `String`, wymagany: `required: true`),
   - `cena` (typ `Number`, wymagany: `required: true`).
4. Skompiluj schemat do modelu: `const Kurs = mongoose.model('Kurs', kursSchema);`.
5. Zaimplementuj asynchroniczną trasę `GET /api/kursy`:
   - Pobierz wszystkie dokumenty z bazy za pomocą `await Kurs.find()`.
   - Zwróć pobraną listę w formacie JSON ze statusem `200 OK`.
   - W przypadku błędu bazy zwróć status `500 Internal Server Error` z komunikatem o błędzie.
6. Aplikacja powinna nasłuchiwać na porcie `3001`.

## Treść do wpisania
W celach demonstracyjnych i testowych wprowadź do bazy dokumenty o nazwach: "Kurs Node.js od podstaw" w cenie "129.99" oraz "Podstawy MongoDB i Mongoose" o cenie "149.00".
- Tytuł: "Kurs Node.js od podstaw", cena: 129.99
- Tytuł: "Podstawy MongoDB i Mongoose", cena: 149.00
- Tytuł: "Programowanie asynchroniczne w JavaScript", cena: 99.50

## Przykładowe wywołanie w terminalu
```bash
node server.js
```
