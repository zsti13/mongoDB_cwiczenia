# Zadanie 5 (Przyrostowe Capstone): Pizzeria La Bella — Pełny CRUD w MongoDB

## Wprowadzenie do zadania
W portalu gastronomicznym lokalu **Pizzeria La Bella** (etap MG2 wątku wiodącego) rozbudowujemy dotychczasowy backend o pełną obsługę operacji CRUD w bazie danych MongoDB z zachowaniem zasady **Zero Regresji**. W etapie MG1 zaimplementowano połączenie z bazą, model `MenuItem` oraz podstawowy zapis i odczyt. Teraz należy wyposażyć portal w pobieranie pojedynczego dania z bazy (`GET /api/menu/:id`), aktualizację danych pozycji (`PUT /api/menu/:id`) oraz usuwanie dań z bazy (`DELETE /api/menu/:id`).

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Aplikacje gastronomiczne (Uber Eats, Wolt, Pyszne.pl)**: menedżer restauracji może w dowolnej chwili dodać nową pizzę, zmienić cenę składnika lub wycofać danie z menu.
- **Systemy rezerwacji i zamówień**: pełny cykl życia pozycji menu w chmurze bazodanowej MongoDB.

## Wymagania funkcjonalne i techniczne
1. Rozbuduj bazowy plik `server.js` z etapu MG1, zachowując nienaruszoną markę **Pizzeria La Bella** oraz wszystkie dotychczasowe trasy (`/`, `/menu`, `/kontakt`, `/api/zamowienia`, `POST /api/zamowienia`).
2. W trasie `GET /api/menu/:id`:
   - Dodaj asynchroniczną próbę odpytania bazy za pomocą `MenuItem.findById(req.params.id)`.
   - Jeśli znaleziono danie w bazie, zwróć je ze statusem `200 OK`.
   - Jeśli nie lub wystąpi błąd formatu ID, zachowaj wyszukiwanie w kolekcji pamięciowej `menuRestauracji` (fallback).
3. Dodaj trasę `PUT /api/menu/:id`:
   - Zaktualizuj danie w bazie za pomocą `MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })`.
   - W przypadku braku rekordu w bazie zwróć status `404 Not Found`.
   - Przy błędzie walidacji lub błędnym formacie ID zwróć kod `400 Bad Request`.
4. W trasie `DELETE /api/menu/:id`:
   - Zaimplementuj usuwanie dokumentu z bazy za pomocą `MenuItem.findByIdAndDelete(req.params.id)`.
   - W przypadku sukcesu odeślij kod `204 No Content` (`res.status(204).send()`).
   - Zachowaj fallback usuwania z tablicy pamięciowej, jeżeli ID ma format liczbowy.

## Treść do wpisania
Przetestuj dodanie i aktualizację dania w menu Pizzeria La Bella, weryfikując poniższe dosłowne dane: "Pizzeria La Bella: Wyśmienita tradycyjna pizza Capricciosa z karczochami i szynką parmeńską w cenie 44 PLN."

## Przykład uruchomienia i testowania
Uruchomienie serwera:
```bash
node server.js
```
Aktualizacja ceny pizzy w menu:
```bash
curl -X PUT http://localhost:3007/api/menu/6620f18c8a1b2c3d4e5f6789 -H "Content-Type: application/json" -d '{"cena": 44}'
```
