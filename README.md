# Intro to Scientific Python

Hello and welcome to Intro to Scientific Python!

To get started, we need to install the necessary packages.
There's an `environment.yml` in this folder that describes all the libraries we will be using for this class.

To install, go to your base directory of this folder and run the following command:

```bash
conda env create -f environment.yml
conda activate gsk
```

This creates a conda environment named `gsk` with the packages listed in `environment.yml`.

## Slide Presentation

The slides for this class are written in Markdown and presented using [Marp](https://marp.app/).

You will first need to install `marp-cli`, which is the cli tool for building html/pdf, etc. from markdown.

```bash
$ npm install --save-dev @marp-team/marp-cli
```

To build the presentation for a single module, please do the following:

```bash
$ npm run slides -- modules/module_01.md -o modules/html/module_01.html
```

`npm run slides` already passes `--html` for you — it's required — some slides embed live JupyterLite consoles via `<iframe>`, and Marp strips inline HTML like this by default even with `html: true` in the frontmatter.

You can also use VSCode for live preview of your slides. Please install the VSCode extension, [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode). Enable the `markdown.marp.enableHtml` setting so iframes render there too.

## Build Scripts

All build steps are available as `npm run` scripts (see `package.json`), and are the same steps CI runs in [`.github/workflows/deploy-jupyterlite.yml`](.github/workflows/deploy-jupyterlite.yml) on every push to `main`.

| Script | What it does | Requires |
|---|---|---|
| `npm run slides -- <args>` | Runs `marp-cli` directly, for building or previewing one module's slides | `@marp-team/marp-cli` (npm) |
| `npm run build:slides` | Builds HTML for every module that's ready for this year (has an active, uncommented `title:` in its frontmatter — see below) | `@marp-team/marp-cli` (npm) |
| `npm run build:notebooks` | Builds the JupyterLite site from `notebooks/`, including the live lecture-along notebooks embedded in the slides | `jupyterlite-core`, `jupyterlite-pyodide-kernel`, `jupyter-server` (pip) |
| `npm run build:assignments` | Renders every `assignments/*/*.md` to a PDF alongside it | `pandoc` + a LaTeX engine (e.g. `xelatex`) |
| `npm run build:site` | Generates `_site/index.html`, the course landing page grid, from whichever modules are ready | none beyond Node |
| `npm run build` | Runs slides, notebooks, and site generation together (the same pipeline CI runs, minus `build:assignments` since that's a local/instructor-only step) | all of the above except pandoc |

A module counts as "ready" once its frontmatter's `title:` line is uncommented — that's the same signal `build:slides` and `build:site` use to decide what to build and what to show as "Coming soon" on the landing page. Rewriting a module for this year is as simple as uncommenting that line.

Assignment PDFs are gitignored (they fall under the repo's blanket `*.pdf` rule) — `build:assignments` is a local convenience for generating a PDF to hand out, not something CI produces or the site links to.
