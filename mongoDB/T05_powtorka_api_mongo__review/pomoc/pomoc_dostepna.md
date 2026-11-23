# Instrukcja krok po kroku: Praca z modułem powtórkowym

Wersja materiału dydaktycznego przygotowana z myślą o uczniach preferujących jednoznaczny, dosłowny przekaz instruktażowy.

---

## Procedura rozwiązywania zadań powtórkowych

Wykonaj poniższe kroki dokładnie w podanej kolejności dla każdego zadania:

### Krok 1: Przeczytaj treść instrukcji
1. Otwórz plik `instrukcja.md` znajdujący się w katalogu konkretnego zadania.
2. Zwróć uwagę na sekcję **Treść merytoryczna**, która podaje dokładne nazwy pól, metody HTTP, ścieżki tras oraz oczekiwane kody statusu odpowiedzi.
3. Zapoznaj się z sekcją **Wymagania formalne**, aby upewnić się, jakich metod Mongoose powinieneś użyć.

### Krok 2: Przygotuj pliki robocze
1. Otwórz główny plik zadania (np. `server.js` lub `app.js`) w swoim edytorze kodu.
2. Zlokalizuj komentarze o treści `// Twoje rozwiazanie`.
3. Sprawdź, czy w pliku `package.json` zadeklarowane są niezbędne moduły (`express`, `mongoose`).

### Krok 3: Wprowadź kod rozwiązania
1. Dopisz brakujące definicje schematów, modeli lub tras HTTP zgodnie z wytycznymi z instrukcji.
2. Pamiętaj o używaniu `async/await` przy operacjach bazodanowych oraz o otoczeniu ich blokiem `try/catch`.
3. Zapisz wszystkie zmodyfikowane pliki na dysku (`Ctrl + S`).

### Krok 4: Sprawdź składnię i uruchom kod w terminalu
1. Otwórz terminal w katalogu bieżącego zadania.
2. Wpisz polecenie:
   ```bash
   node --check server.js
   ```
   Jeśli terminal nie wyświetli żadnego błędu, składnia pliku jest poprawna.
3. Uruchom serwer testowy poleceniem:
   ```bash
   node server.js
   ```
4. Za pomocą klienta HTTP (np. cURL, Postman lub wbudowany skrypt testujący) wyślij żądanie do zaimplementowanego endpointu i sprawdź kod odpowiedzi oraz format danych JSON.

### Krok 5: Porównaj z referencyjnym rozwiązaniem
1. Dopiero po samodzielnym przetestowaniu i próbie naprawy ewentualnych błędów otwórz katalog `rozwiazanie/`.
2. Porównaj swój kod z plikiem z katalogu `rozwiazanie/`.
3. Zwróć szczególną uwagę na obsługę sytuacji brzegowych (np. status `404` przy `null` oraz status `400` przy `CastError`).
