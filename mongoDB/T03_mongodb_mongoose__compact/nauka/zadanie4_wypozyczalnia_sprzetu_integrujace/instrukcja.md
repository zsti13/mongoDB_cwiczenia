# Zadanie 4: Integracja operacji odczytu i zapisu w wypożyczalni sprzętu

## Wprowadzenie do zadania
W ogólnopolskiej wypożyczalni sprzętu budowlanego i ogrodniczego „MajsterRent” tworzona jest centralna baza inwentaryzacyjna. Twoim zadaniem jest połączenie wszystkich poznanych dotąd technik: nawiązania połączenia z MongoDB, definicji kompletnego schematu Mongoose z walidacją oraz implementacji pełnej obsługi tras GET (odczyt katalogu maszyn) i POST (wprowadzenie nowego urządzenia do oferty) z odpowiednimi kodami HTTP.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Wypożyczalnie sprzętu i pojazdów (Ramirent, Traficar)**: centralna baza dostępnych maszyn pobierana przez klientów oraz panel pracownika wprowadzającego nowe egzemplarze do floty.
- **Platformy SaaS**: zarządzanie zasobami i urządzeniami podłączonymi do sieci organizacji w czasie rzeczywistym.
- **Magazyny techniczne**: rejestracja elektronarzędzi z kontrolą stanu technicznego i stawek dobowych.

## Wymagania funkcjonalne i techniczne
1. Adres bazy danych: `mongodb://127.0.0.1:27017/majsterrent`.
2. Zdefiniuj schemat `sprzetSchema` z polami:
   - `nazwa` (typ `String`, wymagany: `required: true`, `trim: true`),
   - `kategoria` (typ `String`, wymagany: `required: true`),
   - `stawkaDoba` (typ `Number`, wymagany: `required: true`, ograniczenie: `min: [1, 'Stawka dobowa musi wynosic minimum 1 zl']`),
   - `dostepny` (typ `Boolean`, wartość domyślna: `default: true`).
3. Skompiluj model: `const Sprzet = mongoose.model('Sprzet', sprzetSchema);`.
4. Trasa `GET /api/sprzet`:
   - Pobiera wszystkie urządzenia z bazy za pomocą `await Sprzet.find()`.
   - Zwraca listę ze statusem `200 OK`.
5. Trasa `POST /api/sprzet`:
   - Zapisuje nowy sprzęt metodą `await Sprzet.create(req.body)`.
   - Zwraca nowo utworzony dokument ze statusem `201 Created`.
   - W przypadku błędu walidacji zwraca status `400 Bad Request` z opisem błędu.
6. Zabezpiecz obie trasy blokami `try/catch` zwracającymi status `500 Internal Server Error` w razie problemów z bazą.
7. Serwer nasłuchuje na porcie `3004`.

## Treść do wpisania
Wprowadź do bazy maszyny: "Zagęszczarka gruntu 90kg" w kategorii "Zagęszczarki" ze stawką dobową "110.00" oraz "Młot udarowo-obrotowy SDS-Max".
- Nazwa: "Zagęszczarka gruntu 90kg", kategoria: "Zagęszczarki", stawkaDoba: 110.00
- Nazwa: "Młot udarowo-obrotowy SDS-Max", kategoria: "Elektronarzędzia", stawkaDoba: 85.50
- Nazwa: "Kosiarka spalinowa z napędem", kategoria: "Ogród", stawkaDoba: 70.00

## Przykładowe wywołanie w terminalu
```bash
node server.js
```
