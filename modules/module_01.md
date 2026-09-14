---
title: Module 01: Introduction to Python and Git
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
    pre {
        position: relative;
        margin: 0 0 8px 0;
    }
    .copy-btn {
        position: absolute;
        top: 6px;
        right: 6px;
        font-size: 12px;
        padding: 2px 10px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: #fff;
        border-radius: 4px;
    }
    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre, marp-pre, [is="marp-pre"]').forEach((pre) => {
        const btn = document.createElement('button');
        btn.textContent = 'Copy';
        btn.className = 'copy-btn';
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.innerText.replace(/Copy$/, '')).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
        });
        pre.appendChild(btn);
    });
});
</script>

<!--
  NOTE: the JupyterLite consoles below point at the deployed GitHub
  Pages site (https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/),
  built and published automatically by .github/workflows/deploy-jupyterlite.yml
  on every push to main. To test against a local build instead, run
  `jupyter lite build --output-dir _build/jupyterlite --contents jupyterlite`,
  serve it, and swap the `src` host accordingly.
-->

# <!-- fit -->Welcome to
# <!-- fit -->Introduction to Scientific Python! :tada:

---

# Module 01: Introduction to Python and Git

September 14, 2026

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
- Use the interactive Python shell (`ipython`)
- Identify and use core Python data types (`str`, `int`, `float`, `list`, `dict`)
- Call built-in functions and import libraries

---

## <!-- fit -->1. Class Overview

---

## <!-- fit --> Instructor Introductions

---
<style scoped>section { font-size: 22px; }</style>

<div style="display:flex; gap:24px; align-items:flex-start;">
<div>

## Teon Brooks, Ph.D

**Academic Background**
- Ph.D in Cognition and Perception @ New York University
- Postdoc in Neuroinformatics @ Stanford University

**Professional Background**
- Data Scientist @ Mozilla (2017-2024)
- Co-Founder @ Gotham Data Clinic (2019-Present)
- Neural Data Scientist @ Meta FAIR (2025-Present)

**Interests**
- Running, biking, hiking, and tennis
- Building software ([passports.social](https://passports.social))
- [Traveling](https://passports.social/profile/teonbrooks.com/travel)

Contact: [brookst3@mskcc.org](mailto:brookst3@mskcc.org)

</div>
<img src="../../syllabus/2026/instructor-teon-photo.png" style="width:32%; aspect-ratio:3/4; object-fit:cover; border-radius:8px; flex-shrink:0;">
</div>

---
<style scoped>section { font-size: 22px; }</style>

<div style="display:flex; gap:24px; align-items:flex-start;">
<img src="../../syllabus/2026/instructor-tejiri-photo.png" style="width:32%; aspect-ratio:3/4; object-fit:cover; border-radius:8px; flex-shrink:0;">
<div>

## Your TA: Tejiri (Tay-JEE-Ree) Agbamu

- 5th-year GSK student
- PI: Jian Carrot-Zhang and Nikolaus Schultz (Department of Epidemiology & Biostatistics)
- Research interests: Cancer genomics, computational pathology, and cancer disparities
- Thesis work: Interplay of smoking exposure, clinical attributes, and genomics; Ancestral clinico-determinants of clinical response in breast cancer
- Hobbies: reading, weightlifting, watching football/basketball, manic walking/biking
- Favorite programming language: Python or R (depends on the day)
- Contact me: [agbamut@mskcc.org](mailto:agbamut@mskcc.org) or Slack for the fastest response

</div>
</div>

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

- The first hour is lecture and active learning, woven together
- The last 30 minutes is an in-class problem set, worked on in groups

Programming is a team sport. Even at companies, if someone is writing, then someone is reviewing.

---

## <!-- fit -->Syllabus Review

---
<style scoped>section { font-size: 28px; }</style>

## Course Structure

- 10 sessions, 1:30pm - 3:00pm, including a final project session
- Graded pass/fail: participation, weekly homework, final project
- Teaching Fellows are in every session to help out

## Generative AI Policy

The first three weeks (Modules 1-6) are foundational: git and core Python, **without** an agentic programming tool (Claude Code, Copilot, Cursor, etc). We'll dedicate a whole class to using one later, but working effectively with one requires
that you first understand the fundamentals of programming.

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

Git is a distributed version control software that lets you download, share, and collaborate on a project.

`git` is the command line tool that lets you save your work, manage different versions of it, and contribute it.

We'll go into git in more depth across the first four modules. Today, we will use it to get the course materials onto your machine.

---

## Cloning the Lecture Notes

First, check whether you have git installed:

```bash
which git
```

If that comes back empty, install git from [git-scm.com](https://git-scm.com/).

A common task you will do with git is clone a repository. Cloning a repository creates a copy of the repository on your local device.

---

## Cloning the Lecture Notes, cont.

First, let's create and move into our workspace folder for this class:

```bash
mkdir ~/workspace
cd ~/workspace
```

Now, let's clone our first repo:

```bash
git clone https://github.com/datalus-dev/gsk-intro-scientific-python-course.git
```

---

## Navigating the Cloned Repo

```bash
cd gsk-intro-scientific-python-course
ls
```

This is now your local copy of the course materials: lecture notes, data, and in the future, the homework assignments.

We'll pull updates to this repo throughout the course.

---

## `git status`

```bash
git status
```

Tells you what's changed in your local copy since the last commit.

---

## Remotes

Remotes refer to the remote repository that we are working with. For the repo we just cloned, we'll be working with the default remote, known as `origin`.

```bash
git remote -v
```

This command with the argument `-v` gives us a verbose message of the remotes we have. It will show the name of the remote and where it is stored.

---

## <!-- fit -->3. Setting up Your Python Environment

---

## Setup

- Setting up your Python environment on your local machine
- Setting up project and file organization

---

## The Tech Stack

This class is built on the following Tech Stack:

`conda` - We will be primarily using conda to set up the environment on our computers

`pip` - pip is the Python installation manager.

`conda` and `pip` are both package management systems. `pip` is specific to Python package management whereas `conda` is a more general manager that can also create environments (isolated installation environments).

---

## The Tech Stack, cont.

`marp` - Presentation package to create slides using Markdown.

`JupyterLite` - A full Python console, running right in your browser. We'll use it throughout the semester for live demos.

---

## Terminal (`ipython`)

A more comfortable place to run Python interactively than the plain `python` shell — syntax highlighting, tab completion, and better history.

---

## Jupyter Notebooks

A notebook interface for writing and running Python in cells, mixing code, output, and notes. JupyterLite gives us this experience right in the browser, no install needed.

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
print("Hello, JupyterLite!")
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## Checking Your Installation

If you followed the pre-class setup, you should have `miniforge` (conda) installed. Check with:

```bash
conda --version
python --version
conda env list
```

---

## Setting up This Course's Environment

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
/Users/teonbrooks/workspace
├── _websites
├── mne-python
├── gsk-intro-scientific-python-course
├── OcularLDT-project
├── passports.social
└── phd-thesis
```

<style scoped>p { font-size: 12px; text-align: right; }</style>
*condensed for brevity
*made with `tree`

---

## Workspace

You should have a folder to store all of your projects.
I call mine `workspace`.

Each project should have a descriptive yet succinct title.

---

## My Tech Stack

<style scoped>section { font-size: 32px; }</style>

- Text Editor: [VSCode](https://code.visualstudio.com/)
  - New kid on the block: [Zed](https://zed.dev/)
- Terminal: [zsh](https://ohmyz.sh/)
  - Themes: https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
- Notes: [Obsidian](https://obsidian.md/)
- Academic Reading: [Zotero](https://www.zotero.org/)
- Science Community: [Bluesky](https://bsky.app)
- Password Manager: [Bitwarden](https://bitwarden.com/)

---

## <!-- fit --> Quick Break

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

Software engineers who want to write really performant code will write in a system programming language like C or Rust, but they will write bindings to a higher-level language like Python because it's easier to use.

Here's a link to a documentary about the origins of Python:
[youtu.be/GfH4QL4VqJ0](https://youtu.be/GfH4QL4VqJ0?si=K7TZ8MjEwT4oTQBp)

---

## Scientific Python

- Most of the scientific computing libraries are written in Python.

<https://scientific-python.org/about/>

---

## <!-- fit --> Let's checkout
## <!-- fit --> the terminal and ipython

---

## Launching an Interactive Shell

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

Mapping types - dict

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
type(1)
```

```python
type(1.0)
```

```python
type(True)
```

```python
type("hello")
```

```python
type([1, 2, 3])
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:320px; border:1px solid #ccc;"
></iframe>

---

## Try it live, cont.

<style scoped>section { font-size: 24px; }</style>

```python
type((1, 2, 3))
```

```python
type({1, 2, 3})
```

```python
type({"a": 1})
```

```python
type(range(5))
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:340px; border:1px solid #ccc;"
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

To check the type of an object, here are a couple of built-in convenience functions:

- `type(obj)`: returns the type of a given object
- `isinstance(obj, list)`: checks whether `obj` is an instance of a given type

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
type([1, 2, 3])
```

```python
isinstance([1, 2, 3], list)
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:420px; border:1px solid #ccc;"
></iframe>

---

## Discussion

Q: What's the difference between `1` and `1.0`?

Q: What happens when you add them together?

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
1 + 1.0
```

```python
type(1 + 1.0)
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:420px; border:1px solid #ccc;"
></iframe>

---

## Assignment

You can assign a value to a variable using the assignment operator `=`.

<style scoped>section { font-size: 24px; }</style>

```python
x = 5
```

```python
x
```

```python
x + 10
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:320px; border:1px solid #ccc;"
></iframe>

---

## Built-in Functions

Python ships with functions ready to use, no import needed:

- `len(obj)`: length of a sequence
- `max(...)` / `min(...)`: largest / smallest value
- `sum(obj)`: total of a sequence of numbers
- `abs(x)`: absolute value
- `any(...)` / `all(...)`: `True` if any / all elements are truthy
- `bool(x)`: convert to `True`/`False`

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
len([1, 2, 3])
```

```python
max(4, 7, 2)
```

```python
min(4, 7, 2)
```

```python
sum([1, 2, 3, 4])
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:340px; border:1px solid #ccc;"
></iframe>

---

## Try it live, cont.

<style scoped>section { font-size: 24px; }</style>

```python
abs(-5)
```

```python
any([False, False, True])
```

```python
all([True, True, False])
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:380px; border:1px solid #ccc;"
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

```python
import math
```

```python
math.sqrt(16)
```

```python
math.pi
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:380px; border:1px solid #ccc;"
></iframe>

---

## <!-- fit --> Exercise (10-15 min)

---

## In Groups...

<style scoped>section { font-size: 24px; }</style>

1. Assign your name, age, and favorite number to three variables of different types (`str`, `int`, `float`)
2. Use `type()` to confirm each one
3. Put your group's ages into a list. Use `len()`, `max()`, `min()`, and `sum()` to answer: how many people are in your group? What's the average age?
4. `import math` and use it to compute something — e.g. `math.sqrt()` of your group's total age

---

## Your Workspace

<style scoped>section { font-size: 24px; }</style>

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/repl/index.html?kernel=python&toolbar=1"
  style="width:100%; height:440px; border:1px solid #ccc;"
></iframe>

---

## <!-- fit --> That's it for today!

Next class: Module 02 — Jupyter Notebooks, Control Flow, and Functions.
