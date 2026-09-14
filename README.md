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

To build the presentation for a module, please do the following:

```bash
$ npx marp --html modules/module_01.md -o modules/html/module_01.html
```

The `--html` flag is required — some slides embed live JupyterLite consoles via `<iframe>`, and Marp strips inline HTML like this by default even with `html: true` in the frontmatter.

You can also use VSCode for live preview of your slides. Please install the VSCode extension, [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode). Enable the `markdown.marp.enableHtml` setting so iframes render there too.
