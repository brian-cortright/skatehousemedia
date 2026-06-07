# skatehousemedia.com

Monolithic repo containing the **Astro** front-end and the vendored **Sanity Studio** that powers it. Deployed to **GitHub Pages** as a fully static site; rebuilds are triggered by GitHub Actions on `push` to `main` or on a `repository_dispatch` event fired by a Sanity webhook whenever content is published.

## Layout

```
.
├── astro.config.mjs          Astro site config (static output)
├── src/
│   ├── pages/                Astro routes (build target)
│   ├── components/islands/   Page-level React islands (client:only)
│   ├── components/           Shared React components (Navigation, Footer, …)
│   ├── layouts/Base.astro    HTML shell, meta, gtag, AdSense
│   ├── lib/sanity.ts         Sanity client + GROQ queries
│   ├── hooks/, utils/, types/
│   └── styles/global.css
├── sanity/                   Sanity Studio (its own package.json)
├── public/                   Static assets (CNAME, robots.txt, favicon…)
└── .github/workflows/deploy.yml
```

All dynamic content (posts, video pages, category/tag indexes) is pre-rendered at build time from Sanity via `getStaticPaths`.

## Local development

### Front-end

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # outputs to ./dist
npm run preview      # serves ./dist
```

`.env` (already created) holds:

```
PUBLIC_SANITY_PROJECT_ID=vuufko4m
PUBLIC_SANITY_DATASET=production
```

### Sanity Studio

```bash
cd sanity
npm install
npm run dev          # http://localhost:3333
npm run deploy       # publishes the hosted studio (optional)
```

Or from the repo root: `npm run studio` / `npm run studio:deploy`.

## Deploy

The `Deploy to GitHub Pages` workflow runs on:

- `push` to `main`
- manual `workflow_dispatch`
- `repository_dispatch` of type `sanity-publish`

### Required repository setup

1. **Settings → Pages → Build and deployment → Source = GitHub Actions.**
2. **Settings → Secrets and variables → Actions → New repository secret:**
   - `SANITY_PROJECT_ID` = `vuufko4m`
   - `SANITY_DATASET` = `production`
3. Leave the **Custom domain** field empty until DNS is cut over (see below). `public/CNAME` is checked in and will be honored automatically.

### Sanity → GitHub webhook (rebuild on publish)

1. Generate a **fine-grained personal access token** with `Contents: read & write` on this repo.
2. In Sanity Manage → API → Webhooks, create a webhook:
   - **URL:** `https://api.github.com/repos/<owner>/skatehousemedia/dispatches`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["post", "event"]`
   - **HTTP method:** POST
   - **Headers:** `Authorization: Bearer <PAT>`, `Accept: application/vnd.github+json`
   - **Body:** `{ "event_type": "sanity-publish" }`

### DNS cutover (zero-downtime)

1. Push the `Astro-Refactor` branch, then merge to `main`. Verify the workflow turns green and `https://<owner>.github.io/skatehousemedia/` (or the project URL) renders correctly.
2. In the repo **Settings → Pages**, set the custom domain to `skatehousemedia.com`. GitHub will provision a TLS cert; this can take a few minutes.
3. In your DNS provider, **add** these GitHub Pages A/AAAA records _alongside_ the existing Vercel records (do not remove Vercel yet):
   - A `@` → `185.199.108.153`
   - A `@` → `185.199.109.153`
   - A `@` → `185.199.110.153`
   - A `@` → `185.199.111.153`
   - AAAA `@` → `2606:50c0:8000::153`
   - AAAA `@` → `2606:50c0:8001::153`
   - AAAA `@` → `2606:50c0:8002::153`
   - AAAA `@` → `2606:50c0:8003::153`
   - CNAME `www` → `<owner>.github.io`
4. _Lower the TTL on the apex record to 300s a day in advance so propagation is fast._
5. **Remove the Vercel A record** (`76.76.21.21`) once the GitHub Pages records are live and `dig skatehousemedia.com` shows the new IPs. GitHub Pages will start serving once DNS resolves; the cert provision will complete automatically.
6. In **Vercel → Project → Settings → Git**, disconnect the GitHub repository. Then delete the Vercel project (or pause deployments) so future pushes don't trigger duplicate builds.

## What was migrated

- Removed: `next`, `next.config.ts`, `next-env.d.ts`, `src/app/`, `src/components/ClientLayout.tsx`.
- Added: `astro`, `@astrojs/react`, `@astrojs/sitemap`, `@sanity/image-url`.
- The `next/link` shim lives at `src/components/Link.tsx`. The `usePathname` hook was replaced by a `pathname` prop forwarded from each Astro page into `AppShell` → `Navigation`.
