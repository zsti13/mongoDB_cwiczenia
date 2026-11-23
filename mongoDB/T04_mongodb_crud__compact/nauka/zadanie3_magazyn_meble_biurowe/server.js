import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/ergobiuro_db';

app.use(express.json());

const produktSchema = new mongoose.Schema({
  nazwa: { type: String, required: true },
  kategoria: { type: String, required: true },
  cena: { type: Number, required: true },
  wMagazynie: { type: Boolean, default: true }
});

const Produkt = mongoose.model('Produkt', produktSchema);

app.get('/api/produkty/:id', async (req, res) => {
  try {
    const p = await Produkt.findById(req.params.id);
    if (!p) return res.status(404).json({ blad: 'Nie znaleziono produktu.' });
    res.status(200).json(p);
  } catch (err) {
    res.status(500).json({ blad: 'Blad serwera.' });
  }
});

// Twoje rozwiazanie: Zaimplementuj ponizej trase DELETE /api/produkty/:id
// Wykorzystaj Produkt.findByIdAndDelete(req.params.id)
// Obsluz kod 204 No Content przy sukcesie, 404 gdy brak oraz 400 (CastError).


async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`ErgoBiuro nasluchuje na porcie ${PORT}`));
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
