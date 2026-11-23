# Quiz wiedzy: API REST i MongoDB w Express (Powtórka ↻)

**Czas trwania:** 15 minut  
**Liczba pytań:** 10  
**Zasady:** Wybierz dokładnie jedną poprawną odpowiedź dla każdego pytania. Wpisz swoje odpowiedzi do arkusza odpowiedzi. Na końcu arkusza znajduje się klucz z wyjaśnieniami.

---

**1. Który kod statusu HTTP jest najbardziej poprawny semantycznie po pomyślnym utworzeniu nowego dokumentu w bazie danych przez endpoint `POST /api/zasob`?**
* A) 200 OK
* B) 201 Created
* C) 204 No Content
* D) 202 Accepted

---

**2. Jaki middleware w Express jest niezbędny, aby serwer mógł poprawnie odczytać ciało żądania przesłane w formacie JSON i umieścić je pod właściwością `req.body`?**
* A) `app.use(express.static('public'))`
* B) `app.use(express.urlencoded({ extended: true }))`
* C) `app.use(express.json())`
* D) `app.use(express.router())`

---

**3. W jaki sposób należy skonfigurować wywołanie metody `Model.findByIdAndUpdate()`, aby zwrócony obiekt reprezentował stan dokumentu PO dokonaniu aktualizacji?**
* A) Należy przekazać opcję `{ new: true }` jako trzeci argument metody.
* B) Należy przekazać opcję `{ updated: true }` w drugim argumencie.
* C) Mongoose zawsze domyślnie zwraca zaktualizowany dokument.
* D) Należy wywołać po tej metodzie funkcję `document.refresh()`.

---

**4. Która metoda Mongoose służy do usunięcia pojedynczego dokumentu z bazy danych bezpośrednio na podstawie jego unikalnego identyfikatora `_id`?**
* A) `Model.removeById(id)`
* B) `Model.deleteById(id)`
* C) `Model.findByIdAndDelete(id)`
* D) `Model.dropOne(id)`

---

**5. Klient wysyła żądanie `GET /api/produkty/65a123b4c56d78e901234567`. W bazie danych nie istnieje dokument o takim identyfikatorze, a metoda `Produkt.findById()` zwraca `null`. Jaka odpowiedź serwera Express jest zgodna ze standardem REST?**
* A) `res.status(500).json({ error: 'Błąd bazy danych' })`
* B) `res.status(404).json({ message: 'Nie znaleziono produktu' })`
* C) `res.status(200).json(null)`
* D) `res.status(204).send()`

---

**6. Co oznacza błąd o nazwie `CastError` zgłoszony przez bibliotekę Mongoose w bloku `catch` podczas obsługi trasy `GET /api/zamowienia/:id`?**
* A) Baza danych MongoDB odmówiła połączenia z powodu błędnego hasła.
* B) Przekazany w parametrze URL ciąg znaków nie jest poprawnym formatem ObjectId MongoDB.
* C) Schemat Mongoose został zdefiniowany bez podania nazwy kolekcji.
* D) Kolekcja w bazie danych jest pusta.

---

**7. Który kod odpowiedzi HTTP jest rekomendowany w architekturze REST po pomyślnym wykonaniu operacji usunięcia zasobu metodą `DELETE`, gdy serwer nie przesyła żadnego ciała odpowiedzi?**
* A) 200 OK
* B) 201 Created
* C) 204 No Content
* D) 400 Bad Request

---

**8. (Retencja wstecz: Semestr 1 — Moduły ESM) Jakie pole należy umieścić w pliku `package.json` w środowisku Node.js, aby móc stosować natywną składnię modułów ES (`import` / `export`) zamiast `require()`?**
* A) `"modules": true`
* B) `"type": "module"`
* C) `"esm": "enabled"`
* D) `"syntax": "es2022"`

---

**9. (Retencja wstecz: Semestr 1 — Express routing) W trasie Express zdefiniowanej jako `app.get('/api/kategorie/:katId/produkty/:prodId', ...)` w jaki sposób programista uzyskuje dostęp do wartości parametru `prodId`?**
* A) `req.query.prodId`
* B) `req.params.prodId`
* C) `req.body.prodId`
* D) `req.headers['prodId']`

---

**10. (Retencja wstecz: Semestr 1 — Asynchroniczność Node) Dlaczego funkcja obsługująca trasę Express komunikującą się z Mongoose powinna być oznaczona słowem kluczowym `async`?**
* A) Ponieważ Express wymaga, aby wszystkie funkcje były asynchroniczne.
* B) Aby umożliwić użycie słowa kluczowego `await` przed metodami Mongoose zwracającymi obietnice (Promises).
* C) Ponieważ słowo `async` automatycznie zabezpiecza kod przed jakimikolwiek błędami wykonania.
* D) Aby wymusić wielowątkowe wykonywanie operacji na procesorze serwera.

---

## Klucz odpowiedzi i wyjaśnienia

| Nr pytania | Prawidłowa odpowiedź | Wyjaśnienie dydaktyczne |
|:---:|:---:|---|
| **1** | **B** | Kod `201 Created` jednoznacznie informuje klienta, że nowe żądanie utworzyło nowy zasób na serwerze. Kod 200 oznacza sukces ogólny, ale 201 jest ściśle semantyczny dla POST. |
| **2** | **C** | `express.json()` to wbudowane middleware w Express, które parsuje przychodzące nagłówki `Content-Type: application/json` i przetwarza surowy strumień danych do obiektu JavaScript w `req.body`. |
| **3** | **A** | Domyślnie `findByIdAndUpdate()` zwraca pierwotną wersję dokumentu sprzed modyfikacji. Przekazanie `{ new: true }` instruuje Mongoose, aby zwrócił zaktualizowany dokument. |
| **4** | **C** | W Mongoose oficjalną i powszechną metodą jednoczesnego wyszukania i usunięcia dokumentu po jego kluczu głównym jest `findByIdAndDelete(id)`. |
| **5** | **B** | Brak odnalezienia konkretnego rekordu wskazanego identyfikatorem URL nie jest błędem serwera (500), lecz błędem braku zasobu — semantycznym kodem w REST jest `404 Not Found`. |
| **6** | **B** | Mongoose rzuca wyjątek `CastError`, gdy wartość przekazana jako identyfikator nie daje się rzutować na poprawny 24-znakowy szesnastkowy `ObjectId` (np. uczeń przekazał `/api/zamowienia/abc`). |
| **7** | **C** | Status `204 No Content` oznacza sukces operacji przy jednoczesnym braku zawartości w ciele odpowiedzi (`res.sendStatus(204)`). |
| **8** | **B** | Deklaracja `"type": "module"` w pliku konfiguracyjnym `package.json` aktywuje obsługę modułów ES (ESM) w całym projekcie Node.js. |
| **9** | **B** | Zmienne ścieżki zdefiniowane z dwukropkiem (`:nazwaParametru`) w routingu Express są umieszczane w obiekcie słownikowym `req.params`. |
| **10** | **B** | Zapytania do bazy danych w Mongoose (`find`, `create`, `save`) są operacjami wejścia/wyjścia (I/O) zwracającymi obietnice. Oznaczenie handlera jako `async` pozwala czytelnie czekać na ich wynik za pomocą `await`. |
