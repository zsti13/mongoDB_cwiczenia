# Teoria: MongoDB i Mongoose — trwałe przechowywanie danych w Node.js

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.04; przed zajęciami weryfikuje ją nauczyciel.

---

## 1. Wprowadzenie do baz dokumentowych NoSQL i MongoDB

W poprzednich modułach operowaliśmy na kolekcjach przechowywanych w pamięci operacyjnej RAM (np. zwykłych tablicach JavaScript zadeklarowanych wewnątrz pliku `server.js`). Takie rozwiązanie ma kluczową wadę dydaktyczną i produkcyjną: każdy restart procesu serwera (np. po modyfikacji kodu czy awarii zasilania) bezpowrotnie czyści wszystkie wprowadzone dane.

Aby aplikacja backendowa była użyteczna, wymaga warstwy trwałego składowania danych (ang. *persistence layer*). W świecie aplikacji webowych wyróżniamy dwa główne paradygmaty bazodanowe:
1. **Relacyjne bazy danych (SQL)** — dane zorganizowane są w sztywne tabele ze zdefiniowanymi kolumnami i relacjami kluczy obcych (np. PostgreSQL, MySQL).
2. **Dokumentowe bazy danych (NoSQL)** — dane przechowywane są jako elastyczne, samowystarczalne dokumenty przypominające obiekty JSON (BSON). Liderem tego podejścia jest **MongoDB**.

### Czym różni się MongoDB od bazy SQL?
W MongoDB nie tworzymy tabel ani wierszy. Zamiast tego posługujemy się pojęciami:
- **Baza danych (Database)** — logiczny kontener na kolekcje.
- **Kolekcja (Collection)** — odpowiednik tabeli w SQL; zbiór powiązanych dokumentów (np. kolekcja `produkty`, `uzytkownicy`).
- **Dokument (Document)** — pojedynczy rekord w formacie BSON (binarny odpowiednik JSON), posiadający unikalny identyfikator `_id` generowany automatycznie przez bazę danych.

---

## 2. Rola biblioteki Mongoose (ODM)

MongoDB samo w sobie nie wymusza struktury danych — do tej samej kolekcji można by zapisać dokument z polem `cena` jako liczba oraz dokument, w którym `cena` to tekst lub w ogóle jej brakuje. W architekturze produkcyjnej taki brak kontroli prowadzi do chaosu i błędów w logice biznesowej.

Rozwiązaniem tego problemu w środowisku Node.js jest biblioteka **Mongoose**. Jest to system klasy **ODM** (ang. *Object Data Modeling*), który pełni rolę pośrednika między Twoim kodem w JavaScript a serwerem bazy danych MongoDB.

Mongoose zapewnia:
1. Ścisłą definicję struktury dokumentu za pomocą tzw. **schematów** (`Schema`).
2. Wbudowaną walidację danych (np. sprawdzanie typów, obecności pól wymaganych, zakresów liczbowych).
3. Zamianę danych z bazy na pełnoprawne obiekty JavaScript z wygodnymi metodami (`Model.find()`, `Model.create()`).

### Po co to jest
Mongoose chroni aplikację przed zapisaniem niespójnych danych do bazy. Dzięki niemu programista definiuje reguły (np. „każdy produkt musi mieć nazwę będącą tekstem oraz cenę większą od zera”) bezpośrednio w kodzie backendu, a biblioteka automatycznie odrzuca niepoprawne zapytania przed fizycznym zapisem w bazie.

---

## 3. Nawiązywanie połączenia z bazą: `mongoose.connect()`

Połączenie z bazą danych jest operacją sieciową i asynchroniczną. Aby aplikacja mogła komunikować się z MongoDB, musi najpierw nawiązać sesję przy użyciu tzw. łańcucha połączeniowego (ang. *connection string*).

Standardowy adres bazy lokalnej to: `mongodb://localhost:27017/nazwa_bazy` (lub `mongodb://127.0.0.1:27017/nazwa_bazy`).

### Przykład połączenia w kodzie serwera:
```javascript
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/sklep_elektroniczny';

app.use(express.json());

// Asynchroniczne nawiązanie połączenia z bazą
async function uruchomSerwer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Polaczono z baza danych MongoDB.');

    app.listen(PORT, () => {
      console.log(`Serwer dziala na porcie ${PORT}`);
    });
  } catch (error) {
    console.error('Blad podczas laczenia z MongoDB:', error.message);
    process.exit(1);
  }
}

uruchomSerwer();
```

### Typowa pomyłka
Bardzo częstym błędem początkujących programistów jest uruchamianie nasłuchiwania serwera `app.listen()` lub wykonywanie zapytań do modeli Mongoose przed pomyślnym zakończeniem `mongoose.connect()`. Zapytania wysłane przed otwarciem połączenia mogą utknąć w buforze Mongoose lub zakończyć się błędem `MongooseServerSelectionError`. Dlatego najlepszą praktyką jest umieszczenie `app.listen()` wewnątrz funkcji asynchronicznej tuż po `await mongoose.connect()`.

---

## 4. Definiowanie schematu: `mongoose.Schema`

Schemat to deklaratywny opis struktury, jaką musi posiadać każdy dokument w danej kolekcji. W schemacie określamy nazwy pól, ich typy oraz dodatkowe reguły walidacyjne.

### Dozwolone typy danych w Mongoose:
- `String` — ciąg znaków (np. nazwisko, tytuł, kategoria).
- `Number` — liczba całkowita lub zmiennoprzecinkowa (np. cena, wiek, stan magazynowy).
- `Boolean` — wartość logiczna (`true` lub `false`, np. `dostepny`, `oplacone`).
- `Date` — znacznik czasu i data (np. data utworzenia zgłoszenia).

### Przykład definicji schematu:
```javascript
const produktSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: [true, 'Nazwa produktu jest wymagana'],
    trim: true
  },
  kategoria: {
    type: String,
    required: true,
    default: 'Inne'
  },
  cena: {
    type: Number,
    required: true,
    min: [0, 'Cena nie moze byc ujemna']
  },
  dostepny: {
    type: Boolean,
    default: true
  }
});
```

### Po co to jest
Opcja `trim: true` automatycznie usuwa zbędne białe znaki z początku i końca tekstu (np. `"  Laptop  "` staje się `"Laptop"`). Opcja `default` gwarantuje, że jeśli klient nie prześle wartości danego pola w zapytaniu `POST`, Mongoose samodzielnie uzupełni je bezpieczną wartością domyślną, zapobiegając powstawaniu pól o wartości `undefined`.

### Typowa pomyłka
Mylenie typów JavaScript z konstruktorami typów Mongoose. W schemacie Mongoose piszemy wielką literą: `type: String`, `type: Number`, `type: Boolean`. Wpisanie małą literą lub w cudzysłowie (np. `type: 'string'` albo `type: typeof ''`) spowoduje błąd inicjalizacji schematu lub niepoprawne rzutowanie typów.

---

## 5. Kompilacja do modelu: `mongoose.model()`

Schemat jest jedynie projektem (planem architektonicznym). Aby móc wykonywać operacje na danych (tworzyć, wyszukiwać), musimy skompilować schemat do tzw. **Modelu**.

```javascript
const Produkt = mongoose.model('Produkt', produktSchema);
```

### Konwencja nazewnictwa kolekcji w MongoDB:
Mongoose stosuje automatyczną regułę konwersji nazwy modelu na nazwę kolekcji fizycznej w bazie danych:
1. Zamienia pierwszą literę na małą.
2. Tworzy angielską liczbę mnogą.
Na przykład:
- Model `'Produkt'` -> kolekcja `produkts` (lub zgodnie z regułami języka angielskiego).
- Model `'User'` -> kolekcja `users`.
- Model `'MenuItem'` -> kolekcja `menuitems`.

Jeśli chcesz wymusić konkretną, polską nazwę kolekcji, możesz przekazać trzeci argument do metody `mongoose.model`:
```javascript
const Produkt = mongoose.model('Produkt', produktSchema, 'produkty');
```

---

## 6. Operacje bazodanowe w trasach Express

W architekturze REST API operacje na bazie danych są wywoływane wewnątrz funkcji obsługi tras HTTP (ang. *route handlers*). Zawsze pamiętamy o deklaracji funkcji jako `async` oraz użyciu słowa kluczowego `await`.

### 6.1. Odczyt wszystkich dokumentów: `Model.find()`
Metoda `find()` bez argumentów pobiera wszystkie dokumenty z kolekcji i zwraca je w postaci tablicy obiektów JavaScript:

```javascript
app.get('/api/produkty', async (req, res) => {
  try {
    const produkty = await Produkt.find();
    res.status(200).json(produkty);
  } catch (error) {
    res.status(500).json({ blad: 'Nie udalo sie pobrac danych z bazy.' });
  }
});
```

### 6.2. Zapis nowego dokumentu: `Model.create()`
Metoda `create()` odbiera obiekt danych (najczęściej przekazany przez klienta w ciele żądania `req.body`), waliduje go zgodnie ze schematem i natychmiast zapisuje w bazie:

```javascript
app.post('/api/produkty', async (req, res) => {
  try {
    const nowyProdukt = await Produkt.create(req.body);
    res.status(201).json(nowyProdukt);
  } catch (error) {
    // Sprawdzamy, czy blad wynika z niespelnienia walidacji schematu Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        blad: 'Niepoprawne dane wejsciowe',
        szczegoly: error.message
      });
    }
    res.status(500).json({ blad: 'Blad serwera podczas zapisu danych.' });
  }
});
```

Alternatywny sposób zapisu przy użyciu instancji obiektu:
```javascript
const produkt = new Produkt(req.body);
const zapisanyProdukt = await produkt.save();
```

---

## 7. Praca w terminalu i uruchamianie projektu

Aby przygotować środowisko robocze dla aplikacji korzystającej z Express i Mongoose:

1. **Inicjalizacja projektu i instalacja zależności:**
   ```bash
   npm init -y
   npm install express mongoose
   ```
2. **Uruchomienie lokalnego serwera MongoDB (jeśli wymagane):**
   Upewnij się, że usługa MongoDB działa w systemie (np. `mongod` lub usługa systemowa Windows `MongoDB`).
3. **Uruchomienie skryptu serwera:**
   ```bash
   node server.js
   ```
4. **Testowanie zapytań HTTP w konsoli PowerShell:**
   - Pobranie listy:
     ```powershell
     Invoke-RestMethod -Uri http://localhost:3000/api/produkty -Method GET
     ```
   - Dodanie nowego dokumentu:
     ```powershell
     Invoke-RestMethod -Uri http://localhost:3000/api/produkty -Method POST -ContentType "application/json" -Body '{"nazwa":"Mysz bezprzewodowa","cena":79.99}'
     ```
