
---
## Aggiunta: SendGrid / Analytics / Live Chat setup

### SendGrid templates (automatic)
- Script: `npm run setup:sendgrid` (requires `SENDGRID_API_KEY` in env)
- Lo script crea i template `purchase-email` e `abandoned-cart` e stampa gli ID.
- Poi usa quegli ID nel tuo flusso o lasciali gestiti dal codice (le email usano direttamente il contenuto dalle templates locali se preferisci).

### Analytics
- Imposta `NEXT_PUBLIC_GA4_ID` e `NEXT_PUBLIC_META_PIXEL_ID` nelle env per attivare GA4 e Meta Pixel automaticamente.
- Lo snippet è in `lib/analytics.html`, incluso in `_app` o `_document`.

### Live Chat (Tawk.to)
- Imposta `NEXT_PUBLIC_TAWK_ID` nelle env con il tuo widget id TAWK_ID.
- Il codice è in `components/LiveChatIntegration.js` e viene inserito nella pagina quando presente.

