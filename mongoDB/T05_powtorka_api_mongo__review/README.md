# T05: Powtórka ↻ — API REST i MongoDB w Express

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.04; przed zajęciami weryfikuje ją nauczyciel.

**Ścieżka modułu:** `INF04_PZAI/mongoDB/T05_powtorka_api_mongo__review/`  
**Przedmiot:** Programowanie zaawansowanych aplikacji internetowych (PZAI)  
**Kwalifikacja:** INF.04  
**Semestr:** 3 (API, Mongo, fetch, testy, powtórka)  
**Profil wielkości:** `review` (blok 2 h powtórzeniowy przed sprawdzianem / kolejnym etapem)  
**Odwołanie do programu:** `PZAI · Sem.3 · T05 · ↻ API + Mongo`

---

## 1. Zakres powtórki i cele edukacyjne

Moduł stanowi syntetyczne powtórzenie i domknięcie bloku backendowego łączącego serwer aplikacji Express z bazą danych MongoDB za pośrednictwem biblioteki ODM Mongoose (tematy T01–T04 semestru 3).

### Cele edukacyjne:
1. **Projektowanie i obsługa tras REST:**
   - Wykorzystanie metod HTTP: `GET`, `POST`, `PUT`, `DELETE` w architekturze Express.
   - Odczyt danych z `req.params` (identyfikatory w URL) oraz `req.body` (dane przesyłane w formacie JSON).
   - Zwracanie poprawnych semantycznie kodów odpowiedzi HTTP: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.
2. **Modelowanie danych z Mongoose:**
   - Definiowanie schematów (`mongoose.Schema`) z określeniem typów pól (`String`, `Number`, `Boolean`, `Date`) i reguł walidacji (`required`, `min`, `max`, `default`).
   - Tworzenie i eksport modeli (`mongoose.model`).
3. **Operacje CRUD na kolekcji MongoDB:**
   - Odczyt wszystkich dokumentów (`Model.find()`) oraz dokumentu po identyfikatorze (`Model.findById()`).
   - Tworzenie nowych dokumentów (`Model.create()` lub `new Model()` + `.save()`).
   - Aktualizacja istniejącego rekordu (`Model.findByIdAndUpdate(id, data, { new: true, runValidators: true })`).
   - Usuwanie dokumentu (`Model.findByIdAndDelete(id)` lub `Model.deleteOne()`).
4. **Asynchroniczność i odporność na błędy:**
   - Poprawne stosowanie konstrukcji `async/await` we wszystkich handlerach tras Express.
   - Ochrona serwera przed awarią za pomocą bloków `try/catch` oraz obsługa błędów formatu identyfikatora `CastError`.

---

## 2. Czego ten temat NIE uczy (granice semestralne)

W ramach tego tematu powtórkowego obowiązują ścisłe guardrails semestru 3:
- **NIE uczymy agregacji MongoDB:** zakaz stosowania potoków agregacji (`$aggregate`, `$lookup`, `$group`).
- **NIE uczymy relacji między kolekcjami:** brak referencji `ref` oraz metody `.populate()`.
- **NIE łączymy z frontendem:** brak zapytań `fetch` z biblioteki React (tematyka kolejnych bloków T06–T08).
- **NIE wprowadzamy testów automatycznych:** brak Vitest / React Testing Library (tematyka T09–T10).
- **NIE wprowadzamy uwierzytelniania:** brak tokenów JWT, sesji, biblioteki bcrypt czy ciasteczek autoryzacyjnych.

---

## 3. Kolejność na lekcji (blok 2 h)

1. **Wprowadzenie i powtórzenie syntetyczne (15 min):**
   - Wspólna analiza architektury REST + Mongoose na podstawie pliku `teoria.md`.
   - Zestawienie kodów HTTP i odpowiadających im metod Mongoose.
2. **Krótki quiz sprawdzający zrozumienie pojęć (15 min):**
   - Rozwiązanie arkusza `quiz_wiedzy_10_pytan.md`.
   - Omówienie typowych pułapek (np. brak `express.json()`, brak `await`, status `404` vs `500`).
3. **Praca indywidualna — sprawdzian powtórkowy (60 min):**
   - Rozwiązywanie zestawu zadań z grupy A lub B (8 zadań o rosnącym stopniu trudności: od pojedynczych tras po pełny CRUD).
   - Samodzielne testowanie poprawności endpointów za pomocą narzędzi CLI lub skryptów pomocniczych.
4. **Podsumowanie i omówienie wyników (10 min):**
   - Weryfikacja najczęstszych błędów syntaktycznych i logicznych.
