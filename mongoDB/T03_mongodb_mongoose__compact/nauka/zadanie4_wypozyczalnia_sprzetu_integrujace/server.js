import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3004;
const MONGO_URI = 'mongodb://127.0.0.1:27017/majsterrent';

app.use(express.json());

// TODO: KROK 1 - Zdefiniuj sprzetSchema z polami nazwa, kategoria, stawkaDoba (min 1), dostepny (default true)

// TODO: KROK 2 - Utworz model Sprzet

// TODO: KROK 3 - Trasa GET /api/sprzet (odczyt find, status 200)
app.get('/api/sprzet', async (req, res) => {
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

// TODO: KROK 4 - Trasa POST /api/sprzet (zapis create, status 201 lub 400 przy ValidationError)
app.post('/api/sprzet', async (req, res) => {
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Polaczono z baza MajsterRent w MongoDB');
    app.listen(PORT, () => {
      console.log(`Serwer MajsterRent nasluchuje na porcie ${PORT}`);
    });
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
