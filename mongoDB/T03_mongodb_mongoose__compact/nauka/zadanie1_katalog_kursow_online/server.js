import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3001;
const MONGO_URI = 'mongodb://127.0.0.1:27017/edustrefa';

app.use(express.json());

// TODO: KROK 1 - Zdefiniuj schemat kursSchema (tytul: String required, cena: Number required)
// const kursSchema = ...

// TODO: KROK 2 - Utworz model Kurs na podstawie kursSchema
// const Kurs = ...

// TODO: KROK 3 - Zaimplementuj asynchroniczna trase GET /api/kursy z uzyciem Kurs.find()
app.get('/api/kursy', async (req, res) => {
  // Twoje rozwiazanie: pobierz kursy i zwroc res.status(200).json(...)
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Polaczono z baza EduStrefa w MongoDB');
    app.listen(PORT, () => {
      console.log(`Serwer EduStrefa nasluchuje na porcie ${PORT}`);
    });
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
