# Zadanie 2: Aktualizacja zlecenia serwisowego z opcją new i walidacją

## Wprowadzenie do zadania
W warsztacie samochodowym „AutoSerwis Pro” mechanicy wprowadzają aktualizacje do otwartych zleceń naprawy (np. zmieniają status z `w trakcie` na `gotowe` lub dopisują ostateczny koszt usługi). Twoim celem jest stworzenie trasy `PUT /api/zlecenia/:id`, która zaktualizuje wskazany dokument w bazie danych za pomocą metody `findByIdAndUpdate()`, uwzględniając opcje `{ new: true, runValidators: true }` oraz obsługę błędów walidacji.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Serwisy kurierskie (InPost, DHL)**: zmiana statusu przesyłki z „w drodze” na „doręczono” wraz z rejestracją daty i podpisu odbiorcy.
- **Panele administracyjne CMS**: edycja treści artykułu lub zmiana ceny produktu w sklepie internetowym.
- **Aplikacje bankowe**: aktualizacja limitu transakcji kartowych lub danych korespondencyjnych klienta.

## Wymagania funkcjonalne i techniczne
1. W pliku `server.js` zaimplementuj trasę `PUT /api/zlecenia/:id`.
2. Odbierz dane do modyfikacji z `req.body` oraz identyfikator z `req.params.id`.
3. Wywołaj metodę `Zlecenie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })`.
4. Jeśli dokument nie istnieje, odeślij kod `404 Not Found` z komunikatem błędu.
5. Po udanej aktualizacji zwróć zmodyfikowany dokument ze statusem `200 OK`.
6. W bloku `catch` obsłuż błędy walidacji (`error.name === 'ValidationError'`) oraz formatu ID (`error.name === 'CastError'`), odsyłając kod `400 Bad Request`.

## Treść do wpisania
Przetestuj działanie edycji wprowadzając do zlecenia następujące dosłowne dane: "Zlecenie AutoSerwis: Wymiana rozrządu w pojeździe marki Ford Focus została zakończona z kosztem 1250 PLN."

## Przykład uruchomienia i testowania
Uruchom serwer:
```bash
node server.js
```
Wysyłanie żądania edycji zlecenia:
```bash
curl -X PUT http://localhost:3000/api/zlecenia/6620f18c8a1b2c3d4e5f6789 -H "Content-Type: application/json" -d '{"koszt": 1250, "status": "zakonczone"}'
```
