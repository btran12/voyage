# Voyage Mobile (React Native)

This folder is a starter React Native version of your web app, keeping the same product idea:

- Origin & destination country selection
- Currency conversion
- Dual time zones
- Travel essentials (capital, language, visa, emergency, plug/voltage, driving side)
- Weather card (starter static values, ready for API integration)
- Essential phrases
- Packing tips
- Must-see places

## 1) Create and run

```bash
cd mobile
npm install
npm run start
```

Then scan the QR code with **Expo Go** (physical phone) or press:

- `i` for iOS simulator
- `a` for Android emulator
- `w` for web preview

## 2) How to test this app (recommended flow)

### A. Quick smoke test (5 minutes)

1. Launch app in Expo Go/simulator.
2. Verify home screen shows:
   - VOYAGE title
   - From/To selectors
   - Currency card
   - Time Zones card
   - Weather card
   - Travel Essentials card
   - Phrases / Packing / Must-See sections
3. Change **From** and **To** countries and confirm values update.
4. Enter a new amount in currency input and confirm converted value changes.
5. Leave app open for 10+ seconds and confirm clocks update.

### B. Functional checklist

- **Country picker modal**
  - Opens on tap
  - Selecting country closes modal
  - Selected country appears in selector
- **Currency conversion**
  - Accepts decimal input
  - Handles empty input gracefully
  - Uses destination symbol/code in output
- **Time zones**
  - Shows both origin + destination times
  - No crashes when switching countries repeatedly
- **Travel essentials & content sections**
  - Visa/emergency/plug/driving values match selected destination
  - Weather, phrases, packing tips, and must-see places switch with destination

### C. Device testing matrix

Run the same checks on:

- iOS simulator (or real iPhone via Expo Go)
- Android emulator (or real Android via Expo Go)
- Optional web preview (`npm run web`) for quick UI sanity

## 3) Useful commands

```bash
# Start metro bundler
npm run start

# Open platform targets
npm run ios
npm run android
npm run web

# Validate Expo project health
npx expo-doctor
```


## 4) Testing in GitHub Codespaces

Codespaces works best with Expo tunnel mode.

```bash
cd mobile
npm install
npm run start:tunnel
```

Then:

1. In the terminal output, scan the Expo QR code with **Expo Go** on your phone.
2. Keep the Codespace running while you test.
3. Run through the smoke checklist in section **2A**.

### If QR / connection fails in Codespaces

- Retry with a clean cache:

```bash
npm run start:tunnel -- --clear
```

- Confirm Expo Go is up to date on your phone.
- If your network blocks tunnels, use web preview fallback:

```bash
npm run web
```

This won't fully emulate native behavior, but it's useful for UI sanity checks.

## 5) Suggested architecture to match the web app fully

- `src/data/` static country metadata (can be moved to backend/CMS later)
- `src/services/` API clients:
  - `fxService.ts` for exchange rates
  - `weatherService.ts` for destination weather
  - `translateService.ts` for phrase translation
- `src/features/` screens/components grouped by domain:
  - `currency/`, `weather/`, `visa/`, `phrases/`, `emergency/`
- `src/store/` state (React Context, Zustand, or Redux Toolkit)

## 6) API migration checklist

1. Replace hardcoded FX rates in `App.tsx` with a live API call.
2. Add weather endpoint and map weather condition to icon pack.
3. Move visa text to a maintained source (your own JSON/API), since visa rules change often.
4. Add offline cache for the country dataset and last known FX/weather values.

## 7) UI parity tips

- Reuse your existing color palette (`#9a6f2e`, `#2e7fa0`, neutrals)
- Keep card-based sections from web for fast familiarity
- Use bottom sheet pickers for country selection (already scaffolded with `Modal`)
- Add dark mode via `Appearance` + themed style objects

## 8) Next features to add

- Weather card
- Phrasebook with quick-copy
- Plug adapter and voltage card
- Emergency quick-call actions
- Deep link/share itinerary snapshot

## 9) Troubleshooting

If you see `expo-asset is missing` when starting:

```bash
cd mobile
rm -rf node_modules package-lock.json
npm install
npm run start
```

If it still fails, force-install the package and restart Metro:

```bash
npm install expo-asset@~11.0.1
npm run start -- --clear
```
