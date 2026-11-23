# Zadanie 2: Zapis nowego zgłoszenia serwisowego z walidacją schematu

## Wprowadzenie do zadania
W serwisie komputerowym „FixIT Serwis” wdrożony zostaje system helpdesk do rejestracji awarii sprzętu. Twoim celem jest utworzenie schematu Mongoose z walidacją pól wymaganych oraz obsługa trasy POST dodającej nowe zgłoszenie do bazy danych ze statusem 201 Created lub 400 Bad Request w razie błędu walidacji.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Systemy obsługi zgłoszeń (Jira, Zendesk)**: klient wypełnia formularz awarii; backend sprawdza obecność pól obowiązkowych i odrzuca zapytanie, jeśli brakuje opisu problemu.
- **Portale rezerwacji wizyt (ZnanyLekarz)**: rejestracja terminu z walidacją danych kontaktowych pacjenta przed fizycznym zapisem w bazie.
- **Sklepy internetowe**: dodawanie opinii o produkcie z wymaganą oceną i treścią komentarza.

## Wymagania funkcjonalne i techniczne
1. Adres bazy danych: `mongodb://127.0.0.1:27017/fixit_serwis`.
2. Zdefiniuj schemat `zgloszenieSchema` z polami:
   - `klient` (typ `String`, wymagany: `required: true`, `trim: true`),
   - `opis` (typ `String`, wymagany: `required: true`),
   - `priorytet` (typ `String`, wartość domyślna: `default: 'standard'`).
3. Utwórz model: `const Zgloszenie = mongoose.model('Zgloszenie', zgloszenieSchema);`.
4. Zaimplementuj trasę `POST /api/zgloszenia`:
   - Zapisz nowe zgłoszenie do bazy metodą `await Zgloszenie.create(req.body)`.
   - Zwróć utworzony obiekt ze statusem `201 Created`.
   - W przypadku błędu walidacji (`err.name === 'ValidationError'`) zwróć status `400 Bad Request` z obiektem:
     ```json
     { "blad": "Niepoprawne dane zgloszenia", "szczegoly": "..." }
     ```
   - W przypadku innego błędu zwróć status `500 Internal Server Error`.
5. Serwer nasłuchuje na porcie `3002`.

## Treść do wpisania
Przetestuj rejestrację zgłoszeń wprowadzając dane: "Marek Nowicki", opis: "Wymiana dysku SSD na NVMe i instalacja systemu", priorytet: "wysoki".
- Klient: "Marek Nowicki", opis: "Wymiana dysku SSD na NVMe i instalacja systemu", priorytet: "wysoki"
- Klient: "Anna Kowalska", opis: "Czyszczenie ukladu chlodzenia w laptopie Dell", priorytet: "standard"
- Próba błędna: obiekt bez pola "opis" (oczekiwany kod odpowiedzi HTTP 400).

## Przykładowe wywołanie w terminalu
```bash
node server.js
```
