import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/autoserwis_db';

app.use(express.json());

const zlecenieSchema = new mongoose.Schema({
  marka: { type: String, required: true },
  opisUsterki: { type: String, required: true },
  koszt: { type: Number, required: true, min: [0, 'Koszt nie moze byc ujemny'] },
  status: { type: String, default: 'przyjete' }
});

const Zlecenie = mongoose.model('Zlecenie', zlecenieSchema);

app.get('/api/zlecenia/:id', async (req, res) => {
  try {
    const zlecenie = await Zlecenie.findById(req.params.id);
    if (!zlecenie) return res.status(404).json({ blad: 'Nie znaleziono zlecenia.' });
    res.status(200).json(zlecenie);
  } catch (err) {
    res.status(500).json({ blad: 'Blad pobierania zlecenia.' });
  }
});

// Twoje rozwiazanie: Zaimplementuj trase PUT /api/zlecenia/:id
// Wykorzystaj Zlecenie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
// Obsluz statusy 200, 404, 400 (ValidationError, CastError) i 500.


async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`AutoSerwis Pro nasluchuje na porcie ${PORT}`));
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
