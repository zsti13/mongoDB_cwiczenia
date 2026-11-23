# Pomoc ogólna: API REST i MongoDB w Express

**Moduł:** `INF04_PZAI/mongoDB/T05_powtorka_api_mongo__review/`  
**Zakres powtórki:** `PZAI · Sem.3 · T05 · ↻ API + Mongo`

---

## 1. Szablon startowy a katalog `rozwiazanie/`

Każde zadanie w module zawiera dwa warianty kodu:
- **Katalog główny zadania:** pliki startowe z przygotowaną strukturą, importami oraz komentarzami `// Twoje rozwiazanie` wskazującymi miejsca do samodzielnego uzupełnienia logiki.
- **Katalog `rozwiazanie/`:** w pełni działający, kompletny kod referencyjny. Zajrzyj do niego dopiero wtedy, gdy po wielokrotnych próbach i analizie błędów w terminalu nie potrafisz samodzielnie rozwiązać problemu.

---

## 2. Pigułka składniowa (Ściąga do powtórki)

### Podłączenie Mongoose i Express
```javascript
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json()); // Obowiązkowe do czytania req.body!

await mongoose.connect('mongodb://127.0.0.1:27017/nazwa_bazy');
```

### Schemat i Model
```javascript
const wpisSchema = new mongoose.Schema({
  tytul: { type: String, required: true },
  liczba: { type: Number, default: 0 },
  aktywny: { type: Boolean, default: true }
});

const Wpis = mongoose.model('Wpis', wpisSchema);
```

### Podstawowe operacje CRUD
```javascript
// 1. GET lista wszystkich
app.get('/api/wpisy', async (req, res) => {
  try {
    const dane = await Wpis.find();
    return res.status(200).json(dane);
  } catch (err) {
    return res.status(500).json({ error: 'Błąd serwera' });
  }
});

// 2. GET jeden rekord po ID
app.get('/api/wpisy/:id', async (req, res) => {
  try {
    const element = await Wpis.findById(req.params.id);
    if (!element) return res.status(404).json({ error: 'Nie znaleziono' });
    return res.status(200).json(element);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Błędne ID' });
    return res.status(500).json({ error: 'Błąd serwera' });
  }
});

// 3. POST dodanie nowego rekordu
app.post('/api/wpisy', async (req, res) => {
  try {
    const nowy = await Wpis.create(req.body);
    return res.status(201).json(nowy);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// 4. PUT aktualizacja
app.put('/api/wpisy/:id', async (req, res) => {
  try {
    const zaktualizowany = await Wpis.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!zaktualizowany) return res.status(404).json({ error: 'Nie znaleziono' });
    return res.status(200).json(zaktualizowany);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// 5. DELETE usunięcie
app.delete('/api/wpisy/:id', async (req, res) => {
  try {
    const usuniety = await Wpis.findByIdAndDelete(req.params.id);
    if (!usuniety) return res.status(404).json({ error: 'Nie znaleziono' });
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: 'Błąd serwera' });
  }
});
```

---

## 3. Komendy w terminalu

Uruchamianie i weryfikacja kodu w terminalu:
```bash
# Instalacja paczek zdefiniowanych w package.json
npm install

# Uruchomienie aplikacji
node server.js

# Szybkie sprawdzenie poprawności syntaktycznej bez uruchamiania serwera
node --check server.js
```
