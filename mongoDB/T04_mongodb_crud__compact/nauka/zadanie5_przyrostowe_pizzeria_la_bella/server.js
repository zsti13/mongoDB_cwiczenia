import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3007;
const MONGO_URI = 'mongodb://127.0.0.1:27017/pizzeria_la_bella';

app.use(express.static('public'));
app.use(express.json());

const MenuItemSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: true,
    trim: true
  },
  cena: {
    type: Number,
    required: true,
    min: [0, 'Cena dania nie moze byc ujemna']
  },
  kategoria: {
    type: String,
    required: true,
    trim: true
  }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

const menuRestauracji = [
  { id: 1, nazwa: 'Margherita tradycyjna z sosem pomidorowym i mozzarellą', cena: 32.50, kategoria: 'pizza' },
  { id: 2, nazwa: 'Quattro Formaggi z gorgonzolą i parmezanem', cena: 41.00, kategoria: 'pizza' },
  { id: 3, nazwa: 'Tiramisu domowe na biszkoptach savoiardi', cena: 19.00, kategoria: 'deser' },
  { id: 4, nazwa: 'Calzone Classico z szynką cotto i pieczarkami', cena: 38.00, kategoria: 'pizza' }
];

const zamowienia = [];

app.get('/', (req, res) => {
  res.send('Witamy na oficjalnej stronie lokalu Pizzeria La Bella — najlepsza tradycyjna pizza neapolitańska w mieście!');
});

app.get('/menu', (req, res) => {
  res.json(menuRestauracji);
});

app.get('/kontakt', (req, res) => {
  res.send('Pizzeria La Bella, ul. Wloska 15, tel. 22 555 03 44, czynne 12:00-22:00.');
});

app.get('/api/menu', async (req, res) => {
  try {
    const pozycjeZBazy = await MenuItem.find();
    if (pozycjeZBazy && pozycjeZBazy.length > 0) {
      return res.status(200).json(pozycjeZBazy);
    }
  } catch (err) {
    // Fallback pamieciowy
  }

  const { kategoria, maxCena } = req.query;
  let wynik = [...menuRestauracji];

  if (kategoria) {
    wynik = wynik.filter(d => d.kategoria.toLowerCase() === kategoria.toLowerCase());
  }

  if (maxCena) {
    const limit = parseFloat(maxCena);
    if (!isNaN(limit)) {
      wynik = wynik.filter(d => d.cena <= limit);
    }
  }

  return res.status(200).json(wynik);
});

// Twoje rozwiazanie: Rozbuduj GET /api/menu/:id o zapytanie do bazy MenuItem.findById
// oraz dodaj PUT /api/menu/:id (MenuItem.findByIdAndUpdate z opcjami new: true, runValidators: true)
// oraz rozbuduj DELETE /api/menu/:id o usuwanie z bazy MenuItem.findByIdAndDelete (status 204 No Content).

app.get('/api/zamowienia', (req, res) => {
  res.status(200).json(zamowienia);
});

app.post('/api/zamowienia', (req, res) => {
  const { klient, pizzaId, adres } = req.body;
  if (!klient || !pizzaId || !adres) {
    return res.status(400).json({ blad: 'Niepoprawne dane zamowienia w lokalu Pizzeria La Bella' });
  }

  const idLiczba = parseInt(pizzaId, 10);
  const danie = menuRestauracji.find(d => d.id === idLiczba);
  if (!danie) {
    return res.status(400).json({ blad: 'Niepoprawne dane zamowienia w lokalu Pizzeria La Bella' });
  }

  const noweZamowienie = {
    id: zamowienia.length + 1,
    klient: klient.trim(),
    pizza: danie.nazwa,
    cena: danie.cena,
    adres: adres.trim()
  };

  zamowienia.push(noweZamowienie);
  return res.status(201).json(noweZamowienie);
});

app.post('/api/menu', async (req, res) => {
  const { nazwa, cena, kategoria } = req.body;

  if (
    !nazwa || typeof nazwa !== 'string' || nazwa.trim() === '' ||
    !kategoria || typeof kategoria !== 'string' || kategoria.trim() === '' ||
    typeof cena !== 'number' || cena <= 0
  ) {
    return res.status(400).json({
      blad: 'Niepoprawne dane dania w lokalu Pizzeria La Bella. Wymagane pola: nazwa, cena, kategoria.'
    });
  }

  try {
    const noweDanieZBazy = await MenuItem.create({
      nazwa: nazwa.trim(),
      cena: Number(cena),
      kategoria: kategoria.trim().toLowerCase()
    });
    return res.status(201).json(noweDanieZBazy);
  } catch (err) {
    const noweId = menuRestauracji.length > 0 ? Math.max(...menuRestauracji.map(d => d.id)) + 1 : 1;
    const noweDanie = {
      id: noweId,
      nazwa: nazwa.trim(),
      cena: Number(cena),
      kategoria: kategoria.trim().toLowerCase()
    };
    menuRestauracji.push(noweDanie);
    return res.status(201).json(noweDanie);
  }
});

app.use((req, res) => {
  res.status(404).json({
    sukces: false,
    blad: 'Błąd 404: Nieznana trasa w portalu lokalu Pizzeria La Bella.'
  });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Polaczono z baza Pizzeria La Bella w MongoDB');
    app.listen(PORT, () => {
      console.log(`Serwer lokalu Pizzeria La Bella nasłuchuje na porcie ${PORT}`);
    });
  } catch (err) {
    console.error('Blad polaczenia z baza Pizzeria La Bella:', err.message);
    app.listen(PORT, () => {
      console.log(`Serwer lokalu Pizzeria La Bella nasłuchuje w trybie offline na porcie ${PORT}`);
    });
  }
}

start();
