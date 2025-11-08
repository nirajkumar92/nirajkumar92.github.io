# Niraj Kumar — Academic Site (GitHub Pages)

A clean academic homepage with photo and separate pages for **Publications**, **CV**, and **Miscellaneous**.

## Deploy

1. Create a public repo named **`USERNAME.github.io`** (replace with your GitHub username).
2. Upload the **contents** of this folder to the repo root.
3. Visit `https://USERNAME.github.io` after a short moment.

## Update photo

- Your portrait is already included at `assets/profile.jpg` (from the image you provided). Replace this file any time to update.

## Publications

This page reads `assets/publications.json`. Each entry supports:
```
{ "title": "", "authors": "", "venue": "", "year": 2025,
  "links": [ { "label": "arXiv", "url": "https://arxiv.org/abs/..." },
             { "label": "PDF", "url": "https://..." } ] }
```
### Quick import from Google Scholar
- Export **BibTeX** from your profile and convert to JSON (e.g., local script). Paste into `publications.json`.

## CV
Replace `assets/Niraj_Kumar_CV.pdf` with your actual document.