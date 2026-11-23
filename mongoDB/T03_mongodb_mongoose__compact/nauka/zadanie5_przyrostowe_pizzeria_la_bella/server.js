import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3007;
const MONGO_URI = 'mongodb://127.0.0.1:27017/pizzeria_la_bella';

app.use(express.static('public'));
app.use(express.json());

// TODO: KROK 1 - Zdefiniuj MenuItemSchema w Mongoose (nazwa: String required, cena: Number required min 0, kategoria: String required)
// const MenuItemSchema = ...

// TODO: KROK 2 - Utworz model MenuItem
// const MenuItem = ...

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

// Trasa GET /api/menu z odczytem z MongoDB (i fallbackiem)
app.get('/api/menu', async (req, res) => {
  // TODO: KROK 3 - Pobierz pozycje z bazy MenuItem.find(); jesli puste, zwroc menuRestauracji
  res.status(200).json(menuRestauracji);
});

app.get('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(404).json({
      sukces: false,
      blad: 'Nie znaleziono dania w karcie lokalu Pizzeria La Bella'
    });
  }

  const danie = menuRestauracji.find(d => d.id === id);
  if (!danie) {
    return res.status(404).json({
      sukces: false,
      blad: 'Nie znaleziono dania w karcie lokalu Pizzeria La Bella'
    });
  }

  res.status(200).json(danie);
});

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

// Trasa POST /api/menu z zapisem do MongoDB
app.post('/api/menu', async (req, res) => {
  // TODO: KROK 4 - Zapisz nowe danie w bazie MenuItem.create(...) i zwroc status 201 Created
  res.status(501).json({ wiadomosc: 'Trasa niezaimplementowana' });
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(404).json({
      blad: 'Nie znaleziono dania o podanym ID w karcie lokalu Pizzeria La Bella'
    });
  }

  const index = menuRestauracji.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      blad: 'Nie znaleziono dania o podanym ID w karcie lokalu Pizzeria La Bella'
    });
  }

  menuRestauracji.splice(index, 1);
  return res.status(204).send();
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
