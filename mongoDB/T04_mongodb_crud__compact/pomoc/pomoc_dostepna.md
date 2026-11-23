# Pomoc dostępna — Przewodnik krok po kroku

> Wersja materiału dydaktycznego przygotowana z myślą o uczniach preferujących jednoznaczny, dosłowny przekaz instruktażowy.

Ten dokument zawiera dokładne, jednoznaczne instrukcje wykonywania zadań w module MongoDB CRUD. Każde polecenie opisuje dokładnie jedną czynność techniczną.

---

## 1. Słowniczek najważniejszych pojęć

- **CRUD**: skrót od czterech podstawowych operacji na danych: Create (tworzenie), Read (odczyt), Update (aktualizacja), Delete (usuwanie).
- **`findById(id)`**: metoda biblioteki Mongoose, która wyszukuje w bazie dokładnie jeden dokument o podanym identyfikatorze `_id`.
- **`findByIdAndUpdate(id, dane, opcje)`**: metoda, która odnajduje dokument i zamienia jego wartości na nowe dane przesłane przez użytkownika.
- **`findByIdAndDelete(id)`**: metoda, która trwale usuwa z bazy danych dokument o wskazanym identyfikatorze.
- **`{ new: true }`**: parametr przekazywany do metody aktualizacji, nakazujący zwrócenie obiektu już po zapisaniu wprowadzonych zmian.
- **Status 204 No Content**: kod protokołu HTTP oznaczający, że operacja usunięcia powiodła się i serwer nie przesyła żadnej treści w odpowiedzi.

---

## 2. Standardowa procedura pracy nad zadaniem

1. Otwórz katalog wskazanego zadania (np. `zadanie1_...`).
2. Otwórz plik `instrukcja.md` i przeczytaj dokładnie wymagania techniczne.
3. Otwórz plik `server.js` w edytorze kodu.
4. Odszukaj w kodzie komentarz `// Twoje rozwiazanie`. To jest jedyne miejsce, w którym należy dopisać kod.
5. Uruchom terminal i przejdź do folderu bieżącego zadania.
6. Wpisz polecenie `npm start` lub `node server.js`, aby uruchomić aplikację.
7. Przetestuj działanie trasy za pomocą polecenia `curl` lub przeglądarki zgodnie z przykładem w instrukcji.
8. Jeśli program zgłasza błędy, popraw kod w pliku `server.js` i uruchom go ponownie.
9. Po samodzielnym rozwiązaniu zadania zweryfikuj wszystkie kody statusu HTTP (`200`, `201`, `204`, `400`, `404`) względem wymagań z `instrukcja.md`.
