# Teoria: MongoDB + Mongoose — Pełny CRUD w Express

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.04; przed zajęciami weryfikuje ją nauczyciel.

W poprzednim module (T03) poznałeś fundamenty biblioteki Mongoose: nawiązywanie połączenia z serwerem bazy danych MongoDB za pomocą `mongoose.connect()`, definiowanie schematu (`mongoose.Schema`), kompilowanie modelu (`mongoose.model()`) oraz podstawowy odczyt wszystkich dokumentów (`Model.find()`) i zapis nowego rekordu (`Model.create()`). 

W codziennej pracy programisty backendu dwie operacje to jednak za mało. Prawdziwe aplikacje internetowe wymagają możliwości pobrania szczegółowych informacji o jednym wybranym elemencie, poprawienia błędnych danych (edycji) oraz usunięcia nieaktualnego rekordu. Ten zestaw operacji tworzy uniwersalny standard określany akronimem **CRUD**:
- **C** — *Create* (Tworzenie: `POST`, `Model.create()`)
- **R** — *Read* (Odczyt: `GET`, `Model.find()`, `Model.findById()`)
- **U** — *Update* (Aktualizacja: `PUT` / `PATCH`, `Model.findByIdAndUpdate()`)
- **D** — *Delete* (Usuwanie: `DELETE`, `Model.findByIdAndDelete()`)

W tym materiale nauczysz się, jak zaimplementować kompletny interfejs REST API operujący na bazie MongoDB, zachowując najwyższe standardy obsługi kodów statusu HTTP oraz stabilności procesu aplikacji.

---

## 1. Architektura REST a metody Mongoose

W architekturze REST punkt końcowy (ang. *endpoint*) składa się z metody HTTP (czasownika) oraz ścieżki URI (rzeczownika wskazującego kolekcję lub pojedynczy zasób). Każdej akcji odpowiada dedykowana asynchroniczna metoda modelu Mongoose:

| Akcja biznesowa | Metoda HTTP | Ścieżka REST | Metoda Mongoose | Oczekiwany kod sukcesu |
|:----------------|:-----------:|:-------------|:----------------|:----------------------:|
| Pobranie wszystkich | `GET` | `/api/zasoby` | `Model.find()` | `200 OK` |
| Pobranie pojedynczego | `GET` | `/api/zasoby/:id` | `Model.findById(id)` | `200 OK` (lub `404`) |
| Utworzenie nowego | `POST` | `/api/zasoby` | `Model.create(dane)` | `201 Created` |
| Zastąpienie/edycja | `PUT` | `/api/zasoby/:id` | `Model.findByIdAndUpdate(id, dane, opcje)` | `200 OK` (lub `404`) |
| Częściowa edycja | `PATCH` | `/api/zasoby/:id` | `Model.findByIdAndUpdate(id, dane, opcje)` | `200 OK` (lub `404`) |
| Usunięcie zasobu | `DELETE` | `/api/zasoby/:id` | `Model.findByIdAndDelete(id)` | `204 No Content` / `200 OK` |

---

## 2. Odczyt pojedynczego rekordu: `Model.findById()`

Gdy użytkownik klika w aplikacji kafelek z produktem lub wchodzi w widok szczegółów zgłoszenia, frontend wysyła żądanie `GET` ze شناidentyfikatorem rekordu w adresie URL, np. `/api/produkty/654321abcdef1234567890ab`.

W Express parametr ten odbieramy za pośrednictwem obiektu `req.params`, a następnie przekazujemy do metody `Model.findById(id)`.

```javascript
app.get('/api/produkty/:id', async (req, res) => {
  try {
    const produkt = await Produkt.findById(req.params.id);
    
    if (!produkt) {
      return res.status(404).json({ blad: 'Nie znaleziono produktu o podanym ID.' });
    }
    
    res.status(200).json(produkt);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ blad: 'Nieprawidłowy format identyfikatora ID.' });
    }
    res.status(500).json({ blad: 'Błąd serwera podczas pobierania danych.' });
  }
});
```

### Po co to jest
Metoda `findById(id)` jest zoptymalizowanym skrótem dla zapytania `findOne({ _id: id })`. Pozwala błyskawicznie odpytać silnik bazy danych po unikalnym indeksie głównym `_id`. Sprawdzenie warunku `if (!produkt)` chroni aplikację przed odesłaniem wartości `null` z mylącym kodem 200 — jeśli rekord nie istnieje w bazie, serwer musi jednoznacznie zakomunikować to kodem `404 Not Found`.

### Typowa pomyłka
Najczęstszym błędem początkujących jest brak instrukcji `return` przed `res.status(404).json(...)`. Jeżeli nie przerwiesz wykonywania funkcji po wykryciu braku rekordu, kod przejdzie do kolejnej linii i spróbuje wykonać `res.status(200).json(produkt)`. Spowoduje to natychmiastowe wyrzucenie wyjątku przez Node: `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`.

---

## 3. Aktualizacja dokumentu: `Model.findByIdAndUpdate()`

Edycja zasobu polega na odszukaniu dokumentu po identyfikatorze `_id` i nadpisaniu wskazanych pól wartościami przesłanymi w ciele żądania (`req.body`). 

Metoda `findByIdAndUpdate` przyjmuje trzy argumenty:
1. `id` — identyfikator dokumentu z `req.params.id`.
2. `update` — obiekt ze zmianami, najczęściej `req.body`.
3. `options` — obiekt konfiguracyjny (kluczowy dla poprawnego działania!).

```javascript
app.put('/api/produkty/:id', async (req, res) => {
  try {
    const zaktualizowany = await Produkt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!zaktualizowany) {
      return res.status(404).json({ blad: 'Nie znaleziono produktu do aktualizacji.' });
    }

    res.status(200).json(zaktualizowany);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ blad: 'Błąd walidacji danych', szczegoly: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ blad: 'Nieprawidłowy format identyfikatora ID.' });
    }
    res.status(500).json({ blad: 'Błąd serwera podczas aktualizacji.' });
  }
});
```

### Po co to jest
Zwróć uwagę na obiekt `{ new: true, runValidators: true }`:
- **`new: true`**: Domyślnie Mongoose zwraca stan dokumentu **sprzed** modyfikacji! Włączenie opcji `new: true` instruuje bibliotekę, by zwróciła dokument już po naniesieniu zmian. Jest to konieczne, aby frontend otrzymał w odpowiedzi zaktualizowane dane.
- **`runValidators: true`**: Domyślnie reguły walidacji zdefiniowane w schemacie (np. `required: true`, `min: 0`) są sprawdzane tylko podczas tworzenia (`create()`). Podczas aktualizacji Mongoose domyślnie ich nie weryfikuje! Włączenie `runValidators: true` gwarantuje, że nikt nie zapisze pustego tytułu ani ujemnej ceny przy edycji.

### Typowa pomyłka
Pominięcie opcji `{ new: true }`. W efekcie po wysłaniu poprawionego rekordu serwer odsyła w formacie JSON stare dane, co sprawia wrażenie, że aktualizacja w bazie się nie powiodła.

---

## 4. Usuwanie dokumentu: `Model.findByIdAndDelete()`

Usuwanie rekordu to operacja nieodwracalna. W architekturze REST po udanym usunięciu zasobu zalecaną praktyką jest zwrócenie kodu `204 No Content` (bez ciała odpowiedzi) lub kodu `200 OK` z obiektem JSON potwierdzającym usunięcie.

```javascript
app.delete('/api/produkty/:id', async (req, res) => {
  try {
    const usuniety = await Produkt.findByIdAndDelete(req.params.id);

    if (!usuniety) {
      return res.status(404).json({ blad: 'Nie znaleziono produktu do usunięcia.' });
    }

    // Standard A: Kod 204 No Content (brak treści w odpowiedzi)
    return res.status(204).send();

    // Standard B (równie popularny w dydaktyce): Kod 200 z potwierdzeniem
    // return res.status(200).json({ komunikat: 'Produkt został pomyślnie usunięty.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ blad: 'Nieprawidłowy format identyfikatora ID.' });
    }
    res.status(500).json({ blad: 'Błąd serwera podczas usuwania produktu.' });
  }
});
```

### Po co to jest
Metoda `findByIdAndDelete()` atomowo lokalizuje dokument w bazie i natychmiast go usuwa, zwracając w zmiennej `usuniety` skasowany obiekt. Jeśli dokument nie istniał, zmienna przyjmuje wartość `null`, co pozwala odesłać kod `404 Not Found`.

### Typowa pomyłka
Wysyłanie ciała odpowiedzi w formacie JSON wraz z kodem `res.status(204).json({ ... })`. Specyfikacja protokołu HTTP wprost zabrania przesyłania treści odpowiedzi (ang. *message body*) przy kodzie 204. Prawidłowy zapis to `res.status(204).send()`.

---

## 5. Kompleksowa obsługa błędów i specyfika `CastError`

MongoDB stosuje 12-bajtowe identyfikatory szesnastkowe typu `ObjectId` (np. `507f1f77bcf86cd799439011`). Jeżeli klient wyśle żądanie z nieprawidłowym ciągiem znaków (np. `/api/produkty/niepoprawne-id-123`), Mongoose nie odpyta nawet bazy danych, lecz natychmiast rzuci błąd `CastError`.

Jeśli w bloku `catch` nie obsłużysz tego wyjątku, serwer zakwalifikuje to jako błąd wewnętrzny i odeśle status `500 Internal Server Error`. Jest to błąd merytoryczny w projektowaniu API — wina leży po stronie klienta, który przesłał niepoprawny parametr, dlatego należy odesłać status `400 Bad Request`.

```javascript
catch (error) {
  if (error.name === 'CastError') {
    return res.status(400).json({ blad: 'Niepoprawny format identyfikatora ObjectId' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ blad: error.message });
  }
  res.status(500).json({ blad: 'Wystąpił błąd serwera' });
}
```

---

## 6. Uruchamianie i weryfikacja aplikacji w środowisku Node

Aby uruchomić aplikację backendową integrującą Express z bazą MongoDB:
1. Upewnij się, że usługa MongoDB działa lokalnie na domyślnym porcie `27017`.
2. W katalogu projektu zainstaluj wymagane pakiety (`express`, `mongoose`):
   ```bash
   npm install
   ```
3. Uruchom serwer w terminalu:
   ```bash
   node server.js
   ```
4. Testowanie tras CRUD możesz przeprowadzić za pomocą polecenia `curl` w PowerShellu lub bashu:
   - **Odczyt listy**: `curl -X GET http://localhost:3000/api/produkty`
   - **Pobranie po ID**: `curl -X GET http://localhost:3000/api/produkty/6620f18c8...`
   - **Utworzenie**: `curl -X POST http://localhost:3000/api/produkty -H "Content-Type: application/json" -d "{\"tytul\":\"Klawiatura\",\"cena\":120}"`
   - **Edycja**: `curl -X PUT http://localhost:3000/api/produkty/6620f18c8... -H "Content-Type: application/json" -d "{\"cena\":140}"`
   - **Usunięcie**: `curl -X DELETE http://localhost:3000/api/produkty/6620f18c8...`
