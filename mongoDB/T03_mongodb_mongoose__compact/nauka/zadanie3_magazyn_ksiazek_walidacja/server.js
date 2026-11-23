import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3003;
const MONGO_URI = 'mongodb://127.0.0.1:27017/ksiegozbior';

app.use(express.json());

// TODO: KROK 1 - Zdefiniuj schemat ksiazkaSchema z polami:
// - tytul (String, required, trim)
// - strony (Number, required, min: 1)
// - dostepna (Boolean, default: true)
// - kategoria (String, default: 'Ogólna')

// TODO: KROK 2 - Model Ksiazka

// TODO: KROK 3 - Trasa GET /api/ksiazki
app.get('/api/ksiazki', async (req, res) => {
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

// TODO: KROK 4 - Trasa POST /api/ksiazki
app.post('/api/ksiazki', async (req, res) => {
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Polaczono z baza KsiegoZbior w MongoDB');
    app.listen(PORT, () => {
      console.log(`Serwer KsiegoZbior nasluchuje na porcie ${PORT}`);
    });
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
