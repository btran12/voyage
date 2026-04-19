# Voyage Mobile (React Native)

This folder is a starter React Native version of your web app, keeping the same product idea:

- Origin & destination country selection
- Currency conversion
- Dual time zones
- Travel snapshot (visa, emergency, driving side)

## 1) Create and run

```bash
cd mobile
npm install
npm run start
```

Then run on iOS/Android simulator through Expo.

## 2) Suggested architecture to match the web app fully

- `src/data/` static country metadata (can be moved to backend/CMS later)
- `src/services/` API clients:
  - `fxService.ts` for exchange rates
  - `weatherService.ts` for destination weather
  - `translateService.ts` for phrase translation
- `src/features/` screens/components grouped by domain:
  - `currency/`, `weather/`, `visa/`, `phrases/`, `emergency/`
- `src/store/` state (React Context, Zustand, or Redux Toolkit)

## 3) API migration checklist

1. Replace hardcoded FX rates in `App.tsx` with a live API call.
2. Add weather endpoint and map weather condition to icon pack.
3. Move visa text to a maintained source (your own JSON/API), since visa rules change often.
4. Add offline cache for the country dataset and last known FX/weather values.

## 4) UI parity tips

- Reuse your existing color palette (`#9a6f2e`, `#2e7fa0`, neutrals)
- Keep card-based sections from web for fast familiarity
- Use bottom sheet pickers for country selection (already scaffolded with `Modal`)
- Add dark mode via `Appearance` + themed style objects

## 5) Next features to add

- Weather card
- Phrasebook with quick-copy
- Plug adapter and voltage card
- Emergency quick-call actions
- Deep link/share itinerary snapshot
