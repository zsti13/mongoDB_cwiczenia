import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/ksiegarnia_db';

app.use(express.json());

const ksiazkaSchema = new mongoose.Schema({
  tytul: { type: String, required: true },
  autor: { type: String, required: true },
  cena: { type: Number, required: true, min: [0, 'Cena nie moze byc ujemna'] },
  isbn: { type: String, required: true }
});

const Ksiazka = mongoose.model('Ksiazka', ksiazkaSchema);

// Twoje rozwiazanie: Zaimplementuj ponizej kompletny interfejs CRUD dla zasobu Ksiazka:
// 1. GET /api/ksiazki (find, 200)
// 2. GET /api/ksiazki/:id (findById, 200, 404)
// 3. POST /api/ksiazki (create, 201, 400)
// 4. PUT /api/ksiazki/:id (findByIdAndUpdate, new: true, 200, 404, 400)
// 5. DELETE /api/ksiazki/:id (findByIdAndDelete, 204, 404)


async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`Ksiegarnia Księgi Kodera nasluchuje na porcie ${PORT}`));
  } catch (err) {
    console.error('Blad polaczenia z baza:', err.message);
  }
}

start();
