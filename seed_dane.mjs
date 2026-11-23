import mongoose from 'mongoose';

const TEST_ID = new mongoose.Types.ObjectId('6620f18c8a1b2c3d4e5f6789');

async function seedDatabase(dbName, modelName, schemaDef, docs) {
  const uri = `mongodb://127.0.0.1:27017/${dbName}`;
  const conn = await mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 10000
  }).asPromise();

  try {
    const schema = new mongoose.Schema(schemaDef);
    const Model = conn.model(modelName, schema);

    for (const doc of docs) {
      if (doc._id) {
        const { _id, ...rest } = doc;
        await Model.updateOne({ _id }, { $set: rest }, { upsert: true });
      } else {
        const filterKey = Object.keys(doc)[0];
        await Model.updateOne({ [filterKey]: doc[filterKey] }, { $setOnInsert: doc }, { upsert: true });
      }
    }
    console.log(`OK: Zasiano baze "${dbName}" (${docs.length} dok.)`);
  } finally {
    await conn.close();
  }
}

async function run() {
  try {
    // T03 Zadanie 1: EduStrefa (GET /api/kursy na porcie 3001)
    await seedDatabase(
      'edustrefa',
      'Kurs',
      {
        tytul: { type: String, required: true },
        cena: { type: Number, required: true }
      },
      [
        { tytul: 'Kurs Node.js od podstaw', cena: 129.99 },
        { tytul: 'Podstawy MongoDB i Mongoose', cena: 149.0 },
        { tytul: 'Programowanie asynchroniczne w JavaScript', cena: 99.5 }
      ]
    );

    // T04 Zadanie 1: PracaIT (GET /api/oferty/:id na porcie 3000)
    await seedDatabase(
      'pracait_db',
      'Oferta',
      {
        tytul: { type: String, required: true },
        firma: { type: String, required: true },
        wynagrodzenie: { type: Number, required: true },
        aktywna: { type: Boolean, default: true }
      },
      [
        {
          _id: TEST_ID,
          tytul: 'Starszy Programista JavaScript',
          firma: 'CloudSys',
          wynagrodzenie: 18000,
          aktywna: true
        }
      ]
    );

    // T04 Zadanie 2: AutoSerwis Pro (PUT /api/zlecenia/:id na porcie 3000)
    await seedDatabase(
      'autoserwis_db',
      'Zlecenie',
      {
        marka: { type: String, required: true },
        opisUsterki: { type: String, required: true },
        koszt: { type: Number, required: true, min: 0 },
        status: { type: String, default: 'przyjete' }
      },
      [
        {
          _id: TEST_ID,
          marka: 'Ford Focus',
          opisUsterki: 'Wymiana rozrzadu',
          koszt: 900,
          status: 'w trakcie'
        }
      ]
    );

    // T04 Zadanie 3: ErgoBiuro (DELETE /api/produkty/:id na porcie 3000)
    await seedDatabase(
      'ergobiuro_db',
      'Produkt',
      {
        nazwa: { type: String, required: true },
        kategoria: { type: String, required: true },
        cena: { type: Number, required: true },
        wMagazynie: { type: Boolean, default: true }
      },
      [
        {
          _id: TEST_ID,
          nazwa: 'Fotel ergonomiczny Matrix',
          kategoria: 'Fotele',
          cena: 1299,
          wMagazynie: true
        }
      ]
    );

    // T04 Zadanie 5: Pizzeria La Bella (PUT/DELETE /api/menu/:id na porcie 3007)
    await seedDatabase(
      'pizzeria_la_bella',
      'MenuItem',
      {
        nazwa: { type: String, required: true, trim: true },
        cena: { type: Number, required: true, min: 0 },
        kategoria: { type: String, required: true, trim: true }
      },
      [
        {
          _id: TEST_ID,
          nazwa: 'Pizza Capricciosa z karczochami i szynka parmenska',
          cena: 42,
          kategoria: 'pizza'
        }
      ]
    );

    console.log('Wszystkie dane testowe zostaly zaladowane.');
    process.exit(0);
  } catch (err) {
    console.error('Blad podczas seedowania danych:', err.message);
    process.exit(1);
  }
}

run();
