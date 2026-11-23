# Teoria powtórkowa: Pełny stos API REST w Express i MongoDB (Mongoose)

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.04; przed zajęciami weryfikuje ją nauczyciel.

**Zakres powtórki:** `PZAI · Sem.3 · T05 · ↻ API + Mongo`

---

## 1. Architektura aplikacji serwerowej REST z bazą MongoDB

Aplikacja backendowa w technologii Node.js/Express, współpracująca z bazą danych MongoDB, składa się z trzech logicznych warstw:
1. **Warstwa routingu i kontrolera (Express):** odbiera żądania HTTP od klienta, parsuje parametry URL (`req.params`), zapytania (`req.query`) oraz ciało żądania (`req.body`), a na końcu wysyła sformatowaną odpowiedź JSON wraz z odpowiednim kodem statusu HTTP (`res.status(...).json(...)`).
2. **Warstwa modelu i dostępu do danych (Mongoose ODM):** definiuje strukturę dokumentów za pomocą schematów (`mongoose.Schema`), egzekwuje reguły typowania i walidacji oraz pośredniczy w komunikacji z silnikiem bazy danych za pomocą zapytań asynchronicznych.
3. **Baza danych (MongoDB):** silnik NoSQL przechowujący dane w formacie binarnym BSON zorganizowany w bazy danych i kolekcje.

```
[Klient HTTP / Frontend]
           │  ▲
żądanie    │  │ odpowiedź JSON + kod HTTP (200, 201, 204, 400, 404, 500)
           ▼  │
  [Express app.js] ────► routing (GET, POST, PUT, DELETE) + middleware express.json()
           │  ▲
 zapytanie │  │ dane / błąd (async/await, try/catch)
           ▼  │
 [Mongoose Model] ─────► Schema walidacja (find, findById, create, findByIdAndUpdate, findByIdAndDelete)
           │  ▲
 protokół  │  │ BSON
           ▼  │
   [Baza MongoDB]
```

### Po co to jest?
Rozdzielenie definicji schematu danych (Mongoose) od obsługi protokołu HTTP (Express) zapobiega bałaganowi architektonicznemu. Express odpowiada wyłącznie za komunikację sieciową i kody HTTP, natomiast Mongoose dba o integralność danych, typy pól i bezpośrednie zapytania do bazy danych.

---

## 2. Inicjalizacja połączenia z bazą MongoDB

Do nawiązania trwałego połączenia z bazą danych używamy metody `mongoose.connect()`. Metoda ta zwraca obietnicę (Promise), dlatego w nowoczesnym kodzie ESM wykonujemy ją asynchronicznie lub obsługujemy w procedurze startowej serwera.

```javascript
import mongoose from 'mongoose';
import express from 'express';

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/baza_sklepu';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Połączono pomyślnie z bazą MongoDB.');
    
    app.listen(3000, () => {
      console.log('Serwer Express nasłuchuje na porcie 3000');
    });
  } catch (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
    process.exit(1);
  }
}

startServer();
```

### Typowa pomyłka:
Uruchamianie nasłuchiwania `app.listen()` zanim baza danych nawiąże połączenie lub brak obsługi błędu połączenia w bloku `catch`. Jeśli serwer zacznie obsługiwać żądania klientów przed zainicjowaniem Mongoose, zapytania do bazy zawieszą się lub zwrócą błąd przekroczenia limitu czasu (timeout).

---

## 3. Schemat i Model w Mongoose

Schemat (`mongoose.Schema`) określa mapowanie właściwości dokumentu na typy danych oraz reguły walidacji. Model (`mongoose.model`) to klasa konstruktora, która dostarcza interfejs programistyczny do wykonywania operacji na konkretnej kolekcji.

```javascript
import mongoose from 'mongoose';

const produktSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: [true, 'Nazwa produktu jest wymagana'],
    trim: true
  },
  cena: {
    type: Number,
    required: true,
    min: [0, 'Cena nie może być ujemna']
  },
  kategoria: {
    type: String,
    default: 'ogólna'
  },
  dostepny: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // automatycznie dodaje pola createdAt i updatedAt
});

export const Produkt = mongoose.model('Produkt', produktSchema);
```

### Po co to jest?
MongoDB z natury jest bezschematową bazą danych (schemaless), co oznacza, że bez dodatkowego nadzoru do tej samej kolekcji można by zapisać dokument z polem `cena` jako liczbą, a w innym jako tekstem lub pominąć pole kluczowe. Mongoose Schema wymusza jednolitość i walidację po stronie aplikacji przed zapisem w bazie.

### Typowa pomyłka:
Zapomnienie o eksporcie modelu lub przekazanie nieprawidłowej liczby argumentów do `mongoose.model()`. Pierwszy argument to nazwa modelu w liczbie pojedynczej (np. `'Produkt'`), na podstawie której Mongoose automatycznie tworzy kolekcję w liczbie mnogiej z małych liter (np. `'produkts'` lub reguły języka angielskiego).

---

## 4. Pełny CRUD w Express z obsługą asynchroniczną i kodami HTTP

Operacje CRUD (Create, Read, Update, Delete) realizujemy za pomocą odpowiednich metod HTTP, mapując je na metody modelu Mongoose.

| Operacja | Metoda HTTP | Ścieżka URL | Metoda Mongoose | Sukces: kod HTTP |
|---|---|---|---|---|
| Odczyt wszystkich | `GET` | `/api/produkty` | `Produkt.find()` | `200 OK` |
| Odczyt jednego | `GET` | `/api/produkty/:id` | `Produkt.findById(id)` | `200 OK` (lub `404 Not Found`) |
| Dodanie nowego | `POST` | `/api/produkty` | `Produkt.create(req.body)` | `201 Created` |
| Aktualizacja | `PUT` | `/api/produkty/:id` | `Produkt.findByIdAndUpdate(id, req.body, { new: true })` | `200 OK` (lub `404 Not Found`) |
| Usunięcie | `DELETE` | `/api/produkty/:id` | `Produkt.findByIdAndDelete(id)` | `204 No Content` (lub `404 Not Found`) |

### 4.1. Odczyt danych (GET)

```javascript
// GET /api/produkty - pobranie listy (opcjonalnie z filtrowaniem)
app.get('/api/produkty', async (req, res) => {
  try {
    const { kategoria } = req.query;
    const filtr = {};
    if (kategoria) {
      filtr.kategoria = kategoria;
    }
    
    const produkty = await Produkt.find(filtr);
    return res.status(200).json(produkty);
  } catch (error) {
    return res.status(500).json({ error: 'Błąd serwera podczas pobierania danych' });
  }
});

// GET /api/produkty/:id - pobranie pojedynczego dokumentu
app.get('/api/produkty/:id', async (req, res) => {
  try {
    const produkt = await Produkt.findById(req.params.id);
    if (!produkt) {
      return res.status(404).json({ error: 'Nie znaleziono produktu o podanym ID' });
    }
    return res.status(200).json(produkt);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Nieprawidłowy format identyfikatora ID' });
    }
    return res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
  }
});
```

### 4.2. Tworzenie dokumentu (POST)

```javascript
// POST /api/produkty - utworzenie nowego rekordu
app.post('/api/produkty', async (req, res) => {
  try {
    const { nazwa, cena, kategoria, dostepny } = req.body;
    
    // Walidacja wstępna obecności wymaganych danych
    if (!nazwa || cena === undefined) {
      return res.status(400).json({ error: 'Pola nazwa i cena są wymagane' });
    }

    const nowyProdukt = await Produkt.create({ nazwa, cena, kategoria, dostepny });
    return res.status(201).json(nowyProdukt);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Nie udało się utworzyć produktu' });
  }
});
```

### 4.3. Aktualizacja dokumentu (PUT)

```javascript
// PUT /api/produkty/:id - aktualizacja istniejącego rekordu
app.put('/api/produkty/:id', async (req, res) => {
  try {
    const zaktualizowany = await Produkt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true zwraca obiekt PO zmianie
    );

    if (!zaktualizowany) {
      return res.status(404).json({ error: 'Nie znaleziono produktu do aktualizacji' });
    }

    return res.status(200).json(zaktualizowany);
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Błąd podczas aktualizacji produktu' });
  }
});
```

### 4.4. Usuwanie dokumentu (DELETE)

```javascript
// DELETE /api/produkty/:id - usunięcie rekordu
app.delete('/api/produkty/:id', async (req, res) => {
  try {
    const usuniety = await Produkt.findByIdAndDelete(req.params.id);
    if (!usuniety) {
      return res.status(404).json({ error: 'Nie znaleziono produktu o podanym ID' });
    }
    // Przy kodzie 204 No Content nie przesyłamy ciała odpowiedzi
    return res.sendStatus(204);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Nieprawidłowy identyfikator ID' });
    }
    return res.status(500).json({ error: 'Błąd podczas usuwania produktu' });
  }
});
```

### Po co to jest?
Stosowanie precyzyjnych kodów statusu HTTP (`200`, `201`, `204`, `400`, `404`, `500`) stanowi fundament architektury REST. Pozwala to klientowi (np. aplikacji frontendowej lub skryptom testowym) natychmiast rozpoznać, czy operacja powiodła się, czy zasób nie istnieje, czy też żądanie zawierało błędy walidacji bez konieczności parsowania treści błędu.

### Typowa pomyłka:
Zwracanie kodu `200 OK` przy każdym zapytaniu (nawet gdy rekord nie został odnaleziony w bazie i `findById` zwrócił `null`). W REST brak zasobu MUSI skutkować statusem `404 Not Found`. Inną nagminną pomyłką jest brak opcji `{ new: true }` w `findByIdAndUpdate()` — domyślnie Mongoose zwraca stan dokumentu **przed** modyfikacją, co dezorientuje klienta API.

---

## 5. Uruchamianie aplikacji w środowisku Node.js

W pliku `package.json` należy zadeklarować moduły ESM oraz zależności:

```json
{
  "name": "api-mongo-powtorka",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.3.1"
  }
}
```

Komendy w terminalu (uniwersalne dla systemów Windows, macOS i Linux):
```bash
# 1. Instalacja zależności zadeklarowanych w package.json
npm install

# 2. Uruchomienie serwera
npm start
# lub bezpośrednio:
node server.js
```
