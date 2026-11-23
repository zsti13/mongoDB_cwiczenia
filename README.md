# INF.04 (PZAI) — MongoDB + Express + Mongoose w GitHub Codespaces

Gotowe środowisko chmurowe do realizacji modułów **T03**, **T04** i **T05** bez instalowania Node.js ani MongoDB na komputerze lokalnym.

---

## 1. Jak uruchomić środowisko (pierwszy raz)

1. Na stronie repozytorium na GitHubie kliknij zielony przycisk **`<> Code`** (lub **`Use this template`** → **`Open in a codespace`**).
2. Wybierz zakładkę **`Codespaces`** → **`Create codespace on main`**.
3. Poczekaj ok. 1–2 minuty, aż VS Code w przeglądarce uruchomi kontenery **Node.js 20** i **MongoDB 7** oraz zainstaluje zależności (`express`, `mongoose`).

---

## 2. Sprawdzenie, czy wszystko działa

Otwórz terminal w Codespaces (`Ctrl + \`` lub menu *Terminal → New Terminal*) i wpisz:

```bash
npm run check
```

Powinien pojawić się komunikat:
`OK: Polaczono pomyslnie z baza MongoDB!`

### Dane startowe (seed)

Przy starcie Codespace automatycznie ładowane są przykładowe dokumenty do baz `edustrefa`, `pracait_db`, `autoserwis_db`, `ergobiuro_db` i `pizzeria_la_bella` (w tym dokumenty z testowym ID `6620f18c8a1b2c3d4e5f6789` używanym w instrukcjach T04). Jeśli usuniesz rekord podczas testów `DELETE` lub chcesz odświeżyć dane startowe, uruchom w katalogu głównym:

```bash
npm run seed
```

> Baza MongoDB działa automatycznie w tle pod adresem `mongodb://127.0.0.1:27017` — dokładnie takim, jaki znajduje się w plikach `server.js` w zadaniach.

---

## 3. Struktura katalogów

- `teoria/` — materiały teoretyczne (`T03`, `T04`, `T05`).
- `mongoDB/T03_mongodb_mongoose__compact/` — połączenie, schematy, modele, `find()`, `create()`.
- `mongoDB/T04_mongodb_crud__compact/` — pełny CRUD (`GET`, `POST`, `PUT`, `DELETE`, obsługa `404` i `CastError`).
- `mongoDB/T05_powtorka_api_mongo__review/` — powtórka przekrojowa REST API + MongoDB.
- `test_api.http` — przykładowy plik do testowania endpointów jednym kliknięciem (rozszerzenie **REST Client** jest już zainstalowane).

---

## 4. Jak uruchomić wybrane zadanie

1. Przejdź w terminalu do katalogu zadania, np.:
   ```bash
   cd mongoDB/T03_mongodb_mongoose__compact/nauka/zadanie1_katalog_kursow_online
   ```
2. Uruchom serwer (pakiety `express` i `mongoose` są już zainstalowane w katalogu głównym, więc `node server.js` działa od razu):
   ```bash
   node server.js
   ```
3. **Otwórz drugi terminal** (ikona `+` w panelu terminala) i przetestuj endpoint za pomocą `curl`, np.:
   ```bash
   curl -i http://localhost:3001/api/kursy
   ```
   lub użyj pliku `test_api.http` (przycisk **Send Request** nad zapytaniem).
4. Zatrzymanie serwera przed przejściem do kolejnego zadania: **`Ctrl + C`**.

---

## 5. Podgląd bazy danych (opcjonalnie)

W pasku bocznym po lewej stronie znajduje się ikona **MongoDB** (liść). Kliknij **Add Connection** i wpisz:

```text
mongodb://127.0.0.1:27017
```

Możesz tam na bieżąco przeglądać utworzone bazy, kolekcje i zapisane dokumenty.

---

## 6. Po zakończeniu lekcji

Zamknij lub zatrzymaj Codespace (*Menu w lewym dolnym rogu `Codespaces` → `Stop Current Codespace`*), aby nie zużywać darmowego limitu godzin na koncie GitHub.
