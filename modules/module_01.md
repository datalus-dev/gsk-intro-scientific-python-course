---
# title: Module 01: Introduction to Scientific Python
marp: true
html: true
theme: gaia
footer: Intro to Scientific Python
---
<style>
    footer {
    text-align: right;
    }
    h2 {
        text-align: center;
        }
</style>

<!--
  NOTE: the JupyterLite consoles below point at the site's anticipated
  GitHub Pages URL. Until that's deployed, build/serve `jupyterlite/`
  locally and swap the `src` host for `http://localhost:8123` (or
  wherever it's being served) when presenting.
-->

# Module 01: Introduction to Python

September 14, 2026

---

# <!-- fit -->Welcome to
# <!-- fit -->Introduction to Scientific Python! :tada:

---
<style scoped>section { font-size: 28px; }</style>
Content covered:

1. Class Overview
2. Getting the Course Materials with Git
3. Setting up Your Python Environment
4. What is Python

By the end of this class, you will be able to:

- Launch and navigate a command-line interface
- Clone a git repository and navigate the resulting directory
- Use the interactive Python shell
- Identify and use core Python data types (`str`, `int`, `float`, `list`, `dict`)
- Call built-in functions and import libraries

---

## <!-- fit -->1. Class Overview

---

## <!-- fit --> Instructor Introductions

<b>Instructor</b>: [Teon Brooks, PhD](https://docs.google.com/presentation/d/1Tscpd6hqWgSDEuMd1yfW-2d29qHVwQj2boeY4P0XAaI/edit?slide=id.g37fbeac244c_0_0#slide=id.g37fbeac244c_0_0)

<b>TA</b>: Tejiri Agbamu

---

## Ice Breaker

- Who are you?
- What are you studying?
- What is current programming/coding skill level?
- What would you like to get out of the class?

---

## The Goals of this Course

- Build a foundation in Python
- Understand control flow and scripting
- Introduction to the Scientific Python stack
- Create scripts and reports for data analysis

---

## Anatomy of the Class

- The class will largely be structured into two 45 minute halves
- Each of the halves will be on a key programming area

For each half, we will roughly have 30 minutes of lecture and some problems weaved throughout

There will then be a 10 minute exercise following each section that we will focus on pair programming.

Programming is a team sport. Even at companies, if someone is writing, then someone is reviewing.

---

## <!-- fit -->Syllabus Review

---
<style scoped>section { font-size: 28px; }</style>

## Course Structure

- 10 sessions, 1:30pm - 3:00pm, plus a final project session
- Graded pass/fail: participation, weekly homework, final project
- Teaching Fellows are in every session to help out

## Generative AI Policy

The first four weeks (Modules 1-4) are foundational: git and core Python, **without** an agentic programming tool (Claude Code, Copilot, Cursor, etc). We'll dedicate a whole class to using one later, but you need the fundamentals first.

---

## Course Schedule, at a Glance

<style scoped>section { font-size: 24px; }</style>

| Week | Modules | Topics |
|---|---|---|
| 1 | 1-2 | Intro to Python; Notebooks, Control Flow, Functions |
| 2 | 3-4 | NumPy & SciPy; Matplotlib & Seaborn |
| 3 | 5-6 | Pandas |
| 4 | 7-8 | statsmodels & scikit-learn; Agentic Programming |
| 5 | 9-10 | Advanced Topic; Final Project Presentation |

A weekly assignment is given each Wednesday, due the following Monday.

---

## <!-- fit -->2. Getting the Course Materials with Git

---

## Why Git?

`git` is a program that lets you save your work and manage different versions of it. It was made for collaboration, letting you contribute changes to a shared project.

We'll go into git in more depth across the first four modules. Today: just enough to get the course materials onto your machine.

---

## Cloning the Lecture Notes Repository

First, check whether you have git installed:

```bash
which git
```

If that comes back empty, install git from [git-scm.com](https://git-scm.com/).

Then, clone the course repository:

```bash
git clone https://github.com/teonbrooks/gsk-intro-scientific-python-course.git
```

---

## Navigating the Cloned Directory

```bash
cd gsk-intro-scientific-python-course
ls
```

This is now your local copy of the course materials: lecture notes, homework assignments, and data. We'll pull updates to this repo throughout the course.

I'd like you to also create a folder in your home directory called `workspace` to keep this and your other course work organized.

---

## `git status` and Remotes

```bash
git status
```

Tells you what's changed in your local copy since the last commit.

```bash
git remote -v
```

Shows `origin` — the remote (GitHub) repository your local clone came from, and where we'll pull future updates from.

---

## <!-- fit -->3. Setting up Your Python Environment

---

## Setup

- Setting up your Python environment on your local machine
- Setting up project and file organization

---

This class is built on the following Tech Stack:

`conda` - We will be primarily using conda to set up the environment on our computers

`pip` - pip is the Python installation manager.

`conda` and `pip` are both package management systems. `pip` is specific to Python package management whereas `conda` is a more general manager that can also create environments (isolated installation environments).

`marp` - Presentation package to create slides using Markdown.

---

We will be using the following tools:

- terminal
- `conda`
- `ipython`
- VS Code
- Jupyterlab

---

## Checking Your Installation

If you followed the pre-class setup, you should have `miniforge` (conda) installed. Check with:

```bash
conda --version
python --version
conda env list
```

This course's environment is described in `environment.yml`, in the root of the course repo:

```bash
conda env create -f environment.yml
conda activate gsk
```

---

## What is the Command Line?

A text interface for talking directly to your computer — instead of clicking, you type commands.

```bash
pwd    # print working directory: where am I?
ls     # list: what's in this directory?
cd ..  # change directory: move up one level
```

What is `(base)` at the beginning of your terminal line, and why is it there?

What is an environment?

---

## Workspace Organization

Organizing your projects and packages will save you from so many headaches in the future.

This is crucial for reproducible workflows and for writing clean code.

---

## My Workspace*

```bash
/Users/teonbrooks/codespace
├── _websites
├── mne-python
├── mskcc-python
├── OcularLDT-project
├── phd-thesis
└── projet-vie
```

<style scoped>p { font-size: 12px; text-align: right; }</style>
*condensed for brevity
*made with `tree`

---

## Workspace

You should have a folder to store all of your projects.
I call mine `codespace`.

Each project should have a descriptive yet succinct title.

---

## My Tech Stack

<style scoped>section { font-size: 32px; }</style>

- Text Editor: [VSCode](https://code.visualstudio.com/)
- Terminal: [zsh](https://ohmyz.sh/)
  - Themes: https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
- Notes: [Obsidian](https://obsidian.md/)
- Academic Reading: [Zotero](https://www.zotero.org/)
- Science Community: [Bluesky](https://bsky.app)
- Password Manager: [Bitwarden](https://bitwarden.com/)

---

## Let's take the next few minutes to download and install VSCode

---

## <!-- fit -->4. What is Python

---

## Discussion

Q: What is Python?

Q: What are some of its use cases?

Q: What are you interested in doing with Python?

---

## Python

>A high-level scripting language that makes it easier to interact and control lower-level processes.

---

Python is great because it introduces a new level of interactivity with programming.

Instead of the "write your program and hope it executes properly" (compiled language), Python lets you interact with your data in the shell (scripting language).

> Well thought out language, allowing to write very readable and well structured code: we "code what we think". (Scientific Python lectures 1.1.1)

---

## A little Motivation

So why use Python?

Python works well with lower-level languages like C because Python is written in C.

Software engineers who want to write really performant code will write in a system programming language like C or Rust, but they will write bindings to a higher level language like Python because it's easier to use.

Here's a link to a documentary about the origins of Python:
<https://youtu.be/GfH4QL4VqJ0?si=K7TZ8MjEwT4oTQBp>

---

## Scientific Python

- Most of the scientific computing libraries are written in Python.

<https://scientific-python.org/about/>

---

## <!-- fit --> Quick Break

---

## <!-- fit --> Let's checkout
## <!-- fit --> the terminal and ipython

Launch an interactive Python shell:

```bash
python
```

or, for a nicer experience:

```bash
ipython
```

---

## Some Common Data Types

Numeric types - integers, floats

Boolean types - bool

Text sequence - strings

Sequence types - lists, tuple, range

Set types - sets

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://teonbrooks.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1&code=type%281%29%0Atype%281.0%29%0Atype%28True%29%0Atype%28%22hello%22%29%0Atype%28%5B1%2C%202%2C%203%5D%29"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## All the Built-in Data Types in Python

https://docs.python.org/3/library/stdtypes.html

---

## Data type, cont.

Some data types are mutable, meaning their values can be changed after they've been instantiated

e.g. lists, dictionaries

Some data types are immutable, cannot be changed or modified after instantiated
e.g. sets, tuples

---

## Checking an Object's Type

To check the type of an object, here are a couple built-in convenience functions:

- `type(obj)`: returns the type of a given object
- `isinstance(obj, list)`: checks whether `obj` is an instance of a given type

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://teonbrooks.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1&code=type%28%5B1%2C%202%2C%203%5D%29%0Aisinstance%28%5B1%2C%202%2C%203%5D%2C%20list%29"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## Discussion

Q: What's the difference between `1` and `1.0`?

Q: What happens when you add them together?

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://teonbrooks.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1&code=1%20%2B%201.0%0Atype%281%20%2B%201.0%29"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## Assignment

You can assign a value to a variable using the assignment operator `=`.

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://teonbrooks.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1&code=x%20%3D%205%0Ax%0Ax%20%2B%2010"
  style="width:100%; height:400px; border:1px solid #ccc;"
></iframe>

---

## Built-in Functions

Python ships with functions ready to use, no import needed:

- `len(obj)`: length of a sequence
- `max(...)` / `min(...)`: largest / smallest value
- `sum(obj)`: total of a sequence of numbers

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://teonbrooks.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1&code=len%28%5B1%2C%202%2C%203%5D%29%0Amax%284%2C%207%2C%202%29%0Asum%28%5B1%2C%202%2C%203%2C%204%5D%29"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## Importing Libraries

Not everything is built in — the standard library and third-party packages add more with `import`:

```python
import math
```

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://teonbrooks.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1&code=import%20math%0Amath.sqrt%2816%29%0Amath.pi"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## <!-- fit --> That's it for today!

This week's assignment is posted in `assignments/assignment_01`.

Next class: Module 02 — Jupyter Notebooks, Control Flow, and Functions.
