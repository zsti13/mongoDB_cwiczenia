# Pomoc krótka: MongoDB i Mongoose w Node.js

## 1. Struktura katalogów zadań

Każde zadanie w module posiada przejrzystą architekturę ułatwiającą samodzielną naukę i weryfikację:
- **Katalog główny zadania (np. `zadanie1_.../`):**
  - `instrukcja.md` — kompletny opis problemu, przykłady ze świata aplikacji, wymagania techniczne oraz dane testowe.
  - `server.js` (lub szablon startowy) — plik z przygotowaną konfiguracją początkową oraz komentarzami `// TODO:`, w których implementujesz wymagane trasy i modele.
  - `package.json` — deklaracja modułu ESM (`"type": "module"`) oraz zależności (`express`, `mongoose`).
- **Podkatalog `rozwiazanie/`:**
  - Zawiera w 100% działający kod wzorcowy przygotowany przez nauczyciela. Otwieraj go dopiero po podjęciu własnej próby rozwiązania zadania.

---

## 2. Pigułka składniowa Mongoose (Cheat Sheet)

### 2.1. Import i połączenie z bazą
```javascript
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Połączenie z instancją MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017/nazwa_bazy');
console.log('Baza polaczona');
```

### 2.2. Tworzenie schematu i modelu
```javascript
const elementSchema = new mongoose.Schema({
  nazwa: { type: String, required: true, trim: true },
  cena: { type: Number, required: true, min: 0 },
  dostepny: { type: Boolean, default: true }
});

const Element = mongoose.model('Element', elementSchema);
```

### 2.3. Odczyt danych (GET)
```javascript
app.get('/api/elementy', async (req, res) => {
  try {
    const elementy = await Element.find();
    res.status(200).json(elementy);
  } catch (error) {
    res.status(500).json({ blad: 'Blad odczytu z bazy.' });
  }
});
```

### 2.4. Zapis danych (POST)
```javascript
app.post('/api/elementy', async (req, res) => {
  try {
    const nowy = await Element.create(req.body);
    res.status(201).json(nowy);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ blad: error.message });
    }
    res.status(500).json({ blad: 'Blad zapisu w bazie.' });
  }
});
```

---

## 3. Przydatne komendy terminala

- **Instalacja zależności w folderze zadania:**
  ```bash
  npm install
  ```
- **Uruchomienie serwera:**
  ```bash
  node server.js
  ```
- **Szybkie sprawdzenie składni JS (bez uruchamiania bazy):**
  ```bash
  node --check server.js
  ```
