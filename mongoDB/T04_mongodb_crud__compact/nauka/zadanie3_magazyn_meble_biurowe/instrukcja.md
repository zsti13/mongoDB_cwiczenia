# Zadanie 3: Trwałe usuwanie produktu z asortymentu magazynu

## Wprowadzenie do zadania
W magazynie wyposażenia biurowego „ErgoBiuro” wycofywane z oferty artykuły muszą zostać usunięte z bazy danych MongoDB, aby zwolnić miejsce w katalogu. Twoim celem jest implementacja trasy `DELETE /api/produkty/:id`, która przy użyciu asynchronicznej metody `findByIdAndDelete()` usunie wskazany dokument, weryfikując jego obecność (`404 Not Found`) oraz potwierdzając sukces kodem `204 No Content`.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Aplikacje pocztowe (Gmail, Outlook)**: trwałe kasowanie wiadomości e-mail z folderu kosza po żądaniu użytkownika.
- **Sklepy internetowe**: usuwanie pozycji z koszyka zakupowego przed przejściem do płatności.
- **Media społecznościowe**: kasowanie dodanego wcześniej komentarza lub posta.

## Wymagania funkcjonalne i techniczne
1. W pliku `server.js` zaimplementuj trasę `DELETE /api/produkty/:id`.
2. Pobierz identyfikator produktu z `req.params.id`.
3. Wywołaj metodę `Produkt.findByIdAndDelete(req.params.id)`.
4. Jeśli produkt o podanym ID nie został odnaleziony, zwróć kod `404 Not Found` z komunikatem błędu.
5. Jeśli produkt został pomyślnie usunięty, odeślij odpowiedź ze statusem `204 No Content` za pomocą `res.status(204).send()`.
6. Zabezpiecz operację blokiem `try/catch` z obsługą błędu `CastError` (status `400 Bad Request`).

## Treść do wpisania
Przetestuj działanie endpointu usuwania na wskazanym artykule asortymentu: "Magazyn ErgoBiuro: Wycofany z asortymentu fotel ergonomiczny Matrix został trwale usunięty z bazy danych."

## Przykład uruchomienia i testowania
Uruchom serwer:
```bash
node server.js
```
Wysyłanie żądania usunięcia:
```bash
curl -X DELETE http://localhost:3000/api/produkty/6620f18c8a1b2c3d4e5f6789
```
