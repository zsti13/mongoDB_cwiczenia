# Zadanie 4: Kompletny interfejs CRUD dla księgarni technicznej

## Wprowadzenie do zadania
W księgarni specjalistycznej „Księgi Kodera” wdrażana jest kompletna usługa REST API do zarządzania katalogiem książek informatycznych. Użytkownicy oraz personel sklepu muszą mieć możliwość pobrania pełnego katalogu, wyświetlenia pojedynczej pozycji, dodania nowego podręcznika, modyfikacji jego ceny oraz usunięcia nieaktualnego wydania. Twoim celem jest połączenie wszystkich dotychczas poznanych operacji CRUD w jednym serwerze Express.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Kompletne systemy e-commerce**: moduł zaplecza sklepowego do zarządzania produktami, zamówieniami i stanami magazynowymi.
- **Systemy biblioteczne**: ewidencja księgozbioru, rejestracja nowych nabytków i ubytków.
- **Platformy streamingowe (Spotify, Netflix)**: zarządzanie biblioteką multimediów przez administratorów treści.

## Wymagania funkcjonalne i techniczne
Zaimplementuj w pliku `server.js` kompletny zestaw tras dla modelu `Ksiazka` (`tytul`, `autor`, `cena`, `isbn`):
1. `GET /api/ksiazki`: zwraca listę wszystkich książek (`Model.find()`, status `200 OK`).
2. `GET /api/ksiazki/:id`: pobiera pojedynczą książkę (`Model.findById()`, status `200 OK` lub `404 Not Found`).
3. `POST /api/ksiazki`: zapisuje nową książkę na podstawie `req.body` (`Model.create()`, status `201 Created` lub `400 Bad Request`).
4. `PUT /api/ksiazki/:id`: aktualizuje dokument (`Model.findByIdAndUpdate(..., { new: true, runValidators: true })`, status `200 OK` lub `404 Not Found`).
5. `DELETE /api/ksiazki/:id`: usuwa książkę z bazy (`Model.findByIdAndDelete()`, status `204 No Content` lub `404 Not Found`).
6. Wszystkie trasy muszą być hermetyzowane w blokach `try/catch` z obsługą błędów `CastError` oraz `ValidationError` (`400 Bad Request`).

## Treść do wpisania
Przetestuj działanie modułu integrującego wprowadzając do bazy poniższe dane wzorcowej książki: "Księgarnia Księgi Kodera: Podręcznik 'Wydajny Node.js i MongoDB' autorstwa Tomasza Lisa w cenie 89 PLN."

## Przykład uruchomienia i testowania
Uruchom serwer:
```bash
node server.js
```
Test pobrania listy:
```bash
curl -X GET http://localhost:3000/api/ksiazki
```
Test dodania nowej książki:
```bash
curl -X POST http://localhost:3000/api/ksiazki -H "Content-Type: application/json" -d '{"tytul":"Wydajny Node.js i MongoDB","autor":"Tomasz Lis","cena":89,"isbn":"978-83-1234"}'
```
