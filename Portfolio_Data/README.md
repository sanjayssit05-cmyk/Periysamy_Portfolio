# A. Periyasamy — Data Analyst Portfolio

A responsive React + Vite portfolio with animated sections, project search and filters, interactive Recharts dashboards, blue and dark-violet themes, a generated resume placeholder, EmailJS contact form, and direct WhatsApp and Instagram links.

## Run locally

```powershell
cd Portfolio_Data
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open the local URL printed by Vite. Build and lint with:

```powershell
npm run build
npm run lint
```

## Personalize the portfolio

- Replace the editable education, certification-goal, and project entries in `src/data/portfolio.js` with verified details. The profile is intentionally positioned for a fresher and does not invent work experience. The contact section lists Dindigul, Tamil Nadu.
- Add published project and live-demo URLs to the project data and cards before sharing.
- Replace the initials profile tile in `src/App.jsx` with a professional portrait if desired.
- Set `VITE_LINKEDIN_URL` in `.env.local`; Instagram is linked to the supplied profile.
- WhatsApp opens `+91 90258 72798` with a prefilled greeting; update `whatsappUrl` in `src/data/portfolio.js` if the number changes.
- The home-page Gemini assistant uses a secure serverless endpoint, with a transparent local answer fallback during Vite-only development.
- Project photos are loaded from Unsplash URLs in `src/data/portfolio.js`; replace them with your own licensed image URLs when ready. Tool badges and skill tiles use product icons.
- The default theme is blue; use the header control to switch to dark violet.
- The resume button generates a downloadable starter PDF. Update the resume content in `src/utils/helpers.js` with verified details.
- Dashboard values start from the illustrative `monthlyPerformance` data in `src/data/portfolio.js`. The dashboard includes an in-browser simulated live stream (pause/resume/reset); it does not connect to a real sales API or business data source.

## EmailJS contact form

1. Create an EmailJS service and template. Use the template variables `from_name`, `from_email`, `subject`, and `message`.
2. Copy your service ID, template ID, and public key to `.env.local`:

   ```dotenv
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

3. Restart the Vite server after changing environment values. The form validates required fields and reports missing configuration or send failures.

These are frontend-visible Vite variables; only use the EmailJS public key here. Never place private credentials in `VITE_*` variables.

## Gemini AI assistant

The floating assistant uses a Vercel serverless endpoint at `api/chat.js` to call Gemini without exposing the API key in browser code.

1. Create a Gemini API key in Google AI Studio.
2. Set `GEMINI_API_KEY` in `.env.local` for Vercel development and as a server environment variable in Vercel. Do not prefix it with `VITE_`.
3. Use `npx vercel dev` to run the site with the serverless AI endpoint locally. `npm run dev` starts Vite only; if the API endpoint is unavailable, the assistant explicitly shows a local portfolio answer and reports the AI error.
4. Vercel deployments should automatically detect `api/chat.js`. Redeploy after setting or changing the server environment variable.

Questions sent while Gemini is configured are processed by Google's Gemini service. The endpoint limits prompt size and applies a basic per-IP request cap per serverless instance.

## Deploy to Vercel

1. Import the project into Vercel from your preferred source control provider.
2. Set the project root to `Portfolio_Data` if the repository root is its parent folder.
3. Use the Vite defaults (`npm run build`, output directory `dist`).
4. Add the EmailJS values, `GEMINI_API_KEY`, and optional LinkedIn URL as Vercel environment variables for the Production (and Preview, if needed) environments.
5. Deploy. Redeploy after editing environment variables.
