# SANSguide — Student Access to NeuroSurgery

A free, publicly accessible directory of neurosurgery resources for medical
students: mentorship, research, clinical exposure, education, and application
guidance, with a focus on students who do not have a home neurosurgery
residency program.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Lucide icons.
All data is stored locally as JSON, with no backend, database, or
authentication. Every page and resource is public.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Deploying to Vercel

This is a standard Next.js app with no environment variables or external
services, so it deploys with zero configuration.

1. Push this repository to GitHub.
2. Go to https://vercel.com/new and import the GitHub repository.
3. Keep the defaults (Framework: Next.js, Build: `next build`) and deploy.

The `assets/` folder holds the original full-resolution hero image used to
regenerate `public/hero-surgeon.jpg`; it is not served to visitors.

## Pages

- `/` — Homepage: hero search, nine category cards, featured resources.
- `/resources` — Full searchable, filterable, sortable resource directory.
- `/research-fellowships` — Neurosurgery research fellowships, from the
  workbook's `Program` sheet. Distinguishes programs with an identified
  research opportunity from those where none was documented.
- `/no-home-program` — Resources for students without a home program, grouped
  by need, separating purpose-built resources from generally accessible ones.
- `/about` — About the academic project and how resources were collected.

## Data

Resource data lives in `data/`:

- `data/resources.json` — The directory (Google, Reddit, Instagram, X sheets),
  deduplicated across sources.
- `data/programs.json` — Residency programs and research fellowships
  (`Program` sheet).

Types and helpers are in `lib/`. The canonical website categories and the
homepage category metadata are in `lib/categories.ts`.

### Regenerating the data

The JSON is generated from the source workbook `NS Resources Project.xlsx`:

```bash
python3 -m venv venv && source venv/bin/activate
pip install openpyxl
python scripts/generate_data.py ./data
```

The script maps each sheet's free-text categories to the website's nine
categories, deduplicates resources that appear on multiple platforms, extracts
direct resource links separately from social-post links, and records whether
each resource is built for students without a home program. It does not invent
missing information—fields left blank in the workbook stay blank on the site.
