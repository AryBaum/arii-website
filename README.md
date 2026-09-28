# Arii — Wii Menu portfolio

My portfolio, built to feel like turning on a Nintendo Wii: projects are channels on the Wii Menu, each with a looping preview, a channel popup, and a case study behind the **Start** button.

Built with SvelteKit and deployed on Vercel.

## Running it

```sh
npm install
npm run dev      # dev server (also reachable from your phone on the same Wi-Fi)
npm run check    # type check
npm run build    # production build
```

## Where things live

| What | Where |
| --- | --- |
| Every channel (name, preview, description, case study) | `src/lib/data/projects.js` |
| Example case study showing every block type | `src/lib/data/caseStudyTemplate.js` (preview at `/projects/template`) |
| Wii Menu grid + paging | `src/lib/Components/Grid.svelte` |
| Channel popup (Arii Menu / Details / Start) | `src/lib/Components/Popup.svelte` |
| Footer clock + Arii / Mail buttons | `src/lib/Components/Footer.svelte` |
| Case study page | `src/routes/projects/[slug]/+page.svelte` |
| Sounds + boot music | `src/lib/sound.js`, `src/lib/assets/sfx/` |
| Wii colours | CSS variables at the top of `src/app.css` |

## Adding a channel

1. Record a short clip of the project and convert it to a small looping MP4 plus a poster frame
   (keep previews under ~1 MB — GIFs are 10–100× bigger for the same clip):

   ```sh
   ffmpeg -i clip.gif -movflags +faststart -an -c:v libx264 -crf 26 -pix_fmt yuv420p \
     -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=20" src/lib/assets/channels/MyProject.mp4
   ffmpeg -i clip.gif -frames:v 1 -q:v 4 src/lib/assets/channels/MyProject.jpg
   ```

2. Import both in `projects.js` and add an entry with `slug`, `name`, `preview` and `description`.
3. Add `sections` (copy from the template) when the case study is ready. Until then, Start shows "coming soon".
