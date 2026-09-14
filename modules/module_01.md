---
# title: Module 01: Introduction to Scientific Python
marp: true
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

# Module 01: Introduction to Python

September 29, 2025

---

# <!-- fit -->Welcome to 
# <!-- fit -->Introduction to Scientific Python! :tada:

---
<style scoped>section { font-size: 28px; }</style>
Content covered:

## H1

- Class Overview and Intros
- Environment Setup
- What is Python?

## H2

- Interactive Shell
- Python data types
- Exercise

---

## H1

- Class Overview and Intros
- Environment Setup
- What is Python?

---

## The Goals of this Course

- Build a foundation in Python
- Understand control flow and scripting
- Introduction to the Scientific Python stack
- Create scripts and reports for data analysis

---

## Anatomy of the Class

- The class will largely be structured into two 45 minutes halves
- Each of the halves will be on a key programming area

For each half, we will roughly have 30 minutes of lecture and some problems weaved throughout

There will then be a 10 minute exercise following each section that we will focus on pair programming.

Programming is a team sport. Even at companies, if someone is writing, then someone is reviewing.

---

## <!-- fit -->Syllabus

---

## <!-- fit --> Instructor Introductions

---

![bg](../../syllabus/2025/instructor-teon.png)

---

![bg](../../syllabus/2025/instructor-angel.png)

---

## Ice Breaker

- Who are you?
- What are you studying?
- What is current programming/coding skill level?
- What would you like to get out of the class?

---

## Discussion

Q: What is Python?

Q: What are some of its use cases?

Q: What are you interested in doing with Python?

---

## Python

>A high-level scripting language that makes it easier to interact and control lower-level processes.

---

## Setup

- Setting up your Python environment to your local machine
- Seting up Project and file organization

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

## Environment

What is (base) and why is it at the beginning of the line?

What is an environment?

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

## Workspace Organization

Organizing your projects and packages will save you from some so many headaches in the future.

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
I call my `codespace`.

Each project should have a descriptive yet succinct title.

---

Python is great because it introduces a new level of interactivity with programming.

Instead of the "write your program and hope it executes properly" (compiled language), Python lets you interact with your data in the shell (scripting language).

> Well thought out language, allowing to write very readable and well structured code: we “code what we think”. (Scientific Python lectures 1.1.1)

---

## A little Motivation

So why use Python?

Python works well with lower-level language like C because Python is written in C.

Software engineers who want to write really performant code will write in a system programming language like C or Rust, but they will write binding to a higher level language like Python because it's easier to use.

Here's a link to the new documentary about the origins of Python:
<https://youtu.be/GfH4QL4VqJ0?si=K7TZ8MjEwT4oTQBp>

---

## Scientific Python

- Most of the scientific computing libraries are written in Python.

<https://scientific-python.org/about/>

---

## <!-- fit --> Quick Break

---

## H2

- Interactive Shell
- Python data types
- Exercise

---

## <!-- fit --> Let's checkout

## <!-- fit --> the terminal and ipython

---

## Some Common Data types

Numeric types - integers, floats

Boolean types - bool

Text sequence - strings

Sequence types - lists, tuple, range

Set types - sets

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

To check the type of an object, here are a few built-in convenience functions:

- `type(obj)`: this will return the type of a given object.

e.g.

```python
> type([1,2,3])
list
```

`isinstance(obj, list)`

---

## Discussion

Q: What's the difference between 1 and 1.0?

Q: What happens when you add them together?

---

## Assignment

You can assign a value to a variable using the assignment operator `=`.
