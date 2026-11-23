# Pomoc dostępna — instrukcja krok po kroku

Wersja materiału dydaktycznego przygotowana z myślą o uczniach preferujących jednoznaczny, dosłowny przekaz instruktażowy.

---

## Jak pracować z zadaniem krok po kroku

1. **Krok 1: Przeczytaj plik `instrukcja.md` w katalogu zadania.**
   - Znajdziesz w nim cel ćwiczenia, przykłady z rzeczywistych aplikacji, dokładne nazwy pól w schemacie oraz adresy tras API.

2. **Krok 2: Otwórz plik roboczy `server.js`.**
   - Zwróć uwagę na zaimportowane moduły (`express`, `mongoose`).
   - Odszukaj sekcje oznaczone komentarzem `// KROK 1:`, `// KROK 2:` lub `// TODO:`.

3. **Krok 3: Zdefiniuj schemat i model Mongoose.**
   - Wpisz nazwy pól, ich typy (`String`, `Number`, `Boolean`) oraz wymagane ograniczenia (np. `required: true`).
   - Skompiluj schemat do modelu za pomocą `mongoose.model('Nazwa', schemat)`.

4. **Krok 4: Zaimplementuj obsługę trasy.**
   - W trasie `app.get(...)` wywołaj `await Model.find()` i zwróć wynik metodą `res.status(200).json(...)`.
   - W trasie `app.post(...)` przekaż `req.body` do `await Model.create(...)` i zwróć obiekt ze statusem `201 Created`.
   - Pamiętaj o otoczeniu operacji asynchronicznych blokiem `try { ... } catch (error) { ... }`.

5. **Krok 5: Sprawdź składnię i uruchom kod w terminalu.**
   - Otwórz terminal w katalogu danego zadania.
   - Wykonaj polecenie sprawdzające poprawność składniową:
     ```bash
     node --check server.js
     ```
   - Jeśli polecenie nie wyświetliło żadnych błędów, uruchom serwer:
     ```bash
     node server.js
     ```

6. **Krok 6: Przetestuj działanie endpointu.**
   - Wyślij zapytanie testowe za pomocą `curl` w drugim terminalu lub pliku `test_api.http` (rozszerzenie REST Client).
   - Sprawdź, czy serwer zwraca poprawny kod statusu HTTP oraz oczekiwaną strukturę JSON.

7. **Krok 7: Weryfikacja końcowa.**
   - Sprawdź, czy obsłużyłeś wszystkie przypadki błędów (`400 Bad Request`, `500 Internal Server Error`) i porównaj kod z wymaganiami w `instrukcja.md`.
