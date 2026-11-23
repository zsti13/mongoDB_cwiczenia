import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3002;
const MONGO_URI = 'mongodb://127.0.0.1:27017/fixit_serwis';

app.use(express.json());

// TODO: KROK 1 - Zdefiniuj schemat zgloszenieSchema z polami:
// - klient (String, required, trim)
// - opis (String, required)
// - priorytet (String, default: 'standard')

// TODO: KROK 2 - Skompiluj model Zgloszenie

// TODO: KROK 3 - Zaimplementuj trase POST /api/zgloszenia z uzyciem Zgloszenie.create(req.body)
// Obsluz kod 201 Created oraz kod 400 Bad Request w przypadku ValidationError
app.post('/api/zgloszenia', async (req, res) => {
  // Twoje rozwiazanie
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Polaczono z baza FixIT Serwis w MongoDB');
    app.listen(PORT, () => {
      console.log(`Serwer FixIT Serwis nasluchuje na porcie ${PORT}`);
    });
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
