# Pomoc krótka ogólna — Moduł T04: MongoDB CRUD w Express

## 1. Struktura katalogu zadania

Każde zadanie w module posiada szablon startowy dla ucznia oraz katalog wzorcowy:

| Lokalizacja | Rola pliku | Zawartość |
|:---|:---|:---|
| `zadanieX_.../server.js` | Szablon startowy | Przygotowana baza aplikacji z komentarzami `// Twoje rozwiazanie`, w których należy dopisać wymaganą trasę CRUD. |
| `zadanieX_.../package.json` | Konfiguracja projektu | Definicja zależności (`express`, `mongoose`), typu modułu (`"type": "module"`) oraz skryptu uruchomieniowego. |

---

## 2. Ściąga składniowa operacji CRUD w Mongoose

### Odczyt pojedynczego rekordu po ID
```javascript
app.get('/api/zasoby/:id', async (req, res) => {
  try {
    const element = await Model.findById(req.params.id);
    if (!element) {
      return res.status(404).json({ blad: 'Nie znaleziono' });
    }
    res.status(200).json(element);
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ blad: 'Zły format ID' });
    res.status(500).json({ blad: 'Błąd serwera' });
  }
});
```

### Aktualizacja rekordu (Update)
```javascript
app.put('/api/zasoby/:id', async (req, res) => {
  try {
    const zaktualizowany = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!zaktualizowany) {
      return res.status(404).json({ blad: 'Nie znaleziono do aktualizacji' });
    }
    res.status(200).json(zaktualizowany);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ blad: error.message });
    if (error.name === 'CastError') return res.status(400).json({ blad: 'Zły format ID' });
    res.status(500).json({ blad: 'Błąd serwera' });
  }
});
```

### Usunięcie rekordu (Delete)
```javascript
app.delete('/api/zasoby/:id', async (req, res) => {
  try {
    const usuniety = await Model.findByIdAndDelete(req.params.id);
    if (!usuniety) {
      return res.status(404).json({ blad: 'Nie znaleziono do usunięcia' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ blad: 'Zły format ID' });
    res.status(500).json({ blad: 'Błąd serwera' });
  }
});
```

---

## 3. Szybkie przypomnienie (Checklist przed uruchomieniem)

1. **Uruchomienie serwera**: przejdź do folderu zadania w terminalu i wpisz `npm start` lub `node server.js`.
2. **Kolejność w parametrach trasy**: pamiętaj, aby trasy statyczne (np. `/api/zasoby/raport`) deklarować **przed** trasami dynamicznymi `/api/zasoby/:id`. W przeciwnym razie wyraz `raport` zostanie potraktowany jako identyfikator `:id`.
3. **Flaga `new: true`**: bez niej Mongoose zwróci w odpowiedzi obiekt sprzed edycji. Zawsze pamiętaj o 3. argumencie metody `findByIdAndUpdate`.
4. **Identyfikatory w MongoDB**: baza generuje 24-znakowe identyfikatory szesnastkowe. Testując trasy, pobierz najpierw listę rekordów metodą `GET`, skopiuj prawdziwe pole `_id` i wklej je do adresu URL żądania `GET /:id`, `PUT /:id` lub `DELETE /:id`.
5. **Formatowanie JSON**: wysyłając dane w żądaniach `POST` lub `PUT`, upewnij się, że nagłówek żądania to `Content-Type: application/json`, a w kodzie Express aktywny jest middleware `app.use(express.json())`.
