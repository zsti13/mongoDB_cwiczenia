# Zadanie 3: Schemat z wartościami domyślnymi i ograniczeniami numerycznymi

## Wprowadzenie do zadania
W internetowej hurtowni książek „KsięgoZbiór” wdrażany jest katalog magazynowy. W tym zadaniu rozbudujesz schemat Mongoose o ograniczenie wartości minimalnej dla liczby stron (`min: 1`), flagę logiczną dostępności egzemplarza (`dostepna: Boolean`) z wartością domyślną oraz pole kategorii.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Hurtownie i księgarnie internetowe (Empik, PWN)**: automatyczne przypisywanie flagi dostępności towaru oraz kontrola poprawności parametrów fizycznych książki.
- **Katalogi nieruchomości**: flaga określająca status oferty (dostępne/zarezerwowane) z domyślną wartością `true`.
- **Systemy hotelowe**: liczba gości w pokoju z wymuszeniem wartości `min: 1`.

## Wymagania funkcjonalne i techniczne
1. Adres bazy danych: `mongodb://127.0.0.1:27017/ksiegozbior`.
2. Zdefiniuj schemat `ksiazkaSchema` z polami:
   - `tytul` (typ `String`, wymagany: `required: true`, `trim: true`),
   - `strony` (typ `Number`, wymagany: `required: true`, ograniczenie: `min: [1, 'Ksiazka musi miec przynajmniej 1 strone']`),
   - `dostepna` (typ `Boolean`, wartość domyślna: `default: true`),
   - `kategoria` (typ `String`, wartość domyślna: `default: 'Ogólna'`).
3. Utwórz model `Ksiazka`.
4. Zaimplementuj trasę `GET /api/ksiazki` pobierającą wszystkie pozycje metodą `await Ksiazka.find()`.
5. Zaimplementuj trasę `POST /api/ksiazki` zapisującą nową książkę metodą `await Ksiazka.create(req.body)`:
   - Zwróć kod `201 Created` z utworzonym obiektem.
   - W przypadku niespełnienia reguł walidacji zwróć kod `400 Bad Request`.
6. Serwer nasłuchuje na porcie `3003`.

## Treść do wpisania
Przetestuj działanie endpointu wprowadzając tytuły: "Władca Pierścieni: Drużyna Pierścienia" o liczbie stron "430" oraz kategorii "Fantastyka".
- Tytuł: "Władca Pierścieni: Drużyna Pierścienia", strony: 430, kategoria: "Fantastyka"
- Tytuł: "Czysty Kod: Podręcznik dobrego programisty", strony: 384, kategoria: "Informatyka"
- Tytuł: "Mały Książę", strony: 96 (sprawdź automatyczne nadanie wartości domyślnej dla kategorii i dostępności).

## Przykładowe wywołanie w terminalu
```bash
node server.js
```
