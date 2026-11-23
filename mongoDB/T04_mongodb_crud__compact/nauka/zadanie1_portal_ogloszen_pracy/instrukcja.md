# Zadanie 1: Pobieranie szczegółów oferty pracy po identyfikatorze ID

## Wprowadzenie do zadania
W serwisie rekrutacyjnym „PracaIT” użytkownicy przeglądają listę dostępnych ofert zatrudnienia. Kiedy kandydat kliknie wybrane ogłoszenie, aplikacja powinna pobrać z bazy danych MongoDB pełne szczegóły wyłącznie tej jednej oferty za pomocą asynchronicznej metody `findById()`. Twoim celem jest implementacja trasy `GET /api/oferty/:id` z obsługą kodów `200 OK`, `404 Not Found` oraz błędu formatu identyfikatora (`400 Bad Request`).

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Serwisy ogłoszeniowe (Pracuj.pl, No Fluff Jobs)**: kliknięcie w kafel ogłoszenia powoduje wysłanie żądania GET z identyfikatorem oferty w adresie URL w celu załadowania pełnego opisu stanowiska i wymagań.
- **Sklepy internetowe (Allegro, Amazon)**: strona pojedynczego produktu (karta towaru) pobiera parametry towaru na podstawie unikalnego identyfikatora z bazy danych.
- **Systemy obsługi klienta (Zendesk, Jira)**: wyświetlenie pojedynczego zgłoszenia ticketowego po jego kluczu głównym.

## Wymagania funkcjonalne i techniczne
1. W pliku `server.js` zaimplementuj trasę `GET /api/oferty/:id`.
2. Pobierz identyfikator z parametru trasy za pomocą `req.params.id`.
3. Wykorzystaj asynchroniczną metodę modelu `await Oferta.findById(req.params.id)`.
4. Jeśli dokument nie został odnaleziony (metoda zwróciła `null`), odeślij kod `404 Not Found` oraz obiekt JSON z komunikatem błędu.
5. Jeśli dokument istnieje, zwróć go w formacie JSON ze statusem `200 OK`.
6. Zabezpiecz operację blokiem `try/catch`. Jeśli wystąpi błąd typu `CastError`, odeślij status `400 Bad Request`. W przypadku innych błędów zwróć kod `500 Internal Server Error`.

## Treść do wpisania
W celach testowych weryfikacji danych dodaj do bazy lub wykorzystaj następujące dosłowne dane ogłoszenia: "Oferta PracaIT: Starszy Programista JavaScript w firmie CloudSys z widełkami 18000 PLN została pomyślnie odnaleziona."

## Przykład uruchomienia i testowania
Uruchom serwer w terminalu:
```bash
node server.js
```
W drugim oknie terminala wyślij żądanie testowe:
```bash
curl -X GET http://localhost:3000/api/oferty/6620f18c8a1b2c3d4e5f6789
```
