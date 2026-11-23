import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/pracait_db';

app.use(express.json());

const ofertaSchema = new mongoose.Schema({
  tytul: { type: String, required: true },
  firma: { type: String, required: true },
  wynagrodzenie: { type: Number, required: true },
  aktywna: { type: Boolean, default: true }
});

const Oferta = mongoose.model('Oferta', ofertaSchema);

// Trasa pobierania wszystkich ofert (fundament z T03)
app.get('/api/oferty', async (req, res) => {
  try {
    const oferty = await Oferta.find();
    res.status(200).json(oferty);
  } catch (err) {
    res.status(500).json({ blad: 'Blad pobierania listy ofert.' });
  }
});

// Twoje rozwiazanie: Zaimplementuj ponizej trase GET /api/oferty/:id
// Wykorzystaj Oferta.findById(req.params.id), obsluz statusy 200, 404, 400 (CastError) i 500.


async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`Serwer PracaIT nasluchuje na porcie ${PORT}`));
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
