---
title: Module 02: Jupyter Notebooks, Control Flow, and Functions
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
  NOTE: the JupyterLite consoles/notebooks below point at the deployed GitHub
  Pages site (https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/),
  built and published automatically by .github/workflows/deploy-jupyterlite.yml
  on every push to main. To test against a local build instead, run
  `jupyter lite build --output-dir _build/jupyterlite --contents notebooks`,
  serve it, and swap the `src` host accordingly.
-->

# Module 02: Jupyter Notebooks, Control Flow, and Functions

September 16, 2026

---

Content covered:

1. Saving Your Work with Git
2. Jupyter Notebooks
3. Control Flow
4. Built-in Functions
5. Functions

---

By the end of this class, you will be able to:

- Fork a repository and configure `origin`/`upstream` remotes
- Save and track your own work with `git add`, `git commit`, and `git log`
- Use `.gitignore`
- Create and run code in a Jupyter Notebook
- Write conditional logic and loops
- Call built-in functions
- Define and call functions

---

## <!-- fit -->1. Saving Your Work with Git

---

## Forking the Repo

Forking creates your own copy of a repository under your own GitHub namespace. You can commit to it, branch it, and manage it independently of the original.

Let's fork the course repo now:

https://github.com/datalus-dev/gsk-intro-scientific-python-course

Click **Fork** in the top right.

---

## Adding `upstream`

Right now your `origin` remote points at the course repo (`datalus-dev`). That's what you cloned in Module 1.

```bash
git remote -v
```

Convention: the repo you forked *from*, the one you pull course updates from, is called `upstream`. Let's add it, pointing at the same place `origin` currently does:

```bash
git remote add upstream https://github.com/datalus-dev/gsk-intro-scientific-python-course.git
```

---

## Repointing `origin` to Your Fork

Now that `upstream` covers the course repo, let's repoint `origin` at *your* fork instead:

```bash
git remote set-url origin https://github.com/<your-username>/gsk-intro-scientific-python-course.git
```

```bash
git remote -v
```

You should now see `origin` → your fork, `upstream` → the course repo.

---

## `git add` and `git commit`

Staging tells git which changes to include in your next snapshot:

```bash
git add <file>
```

Committing saves that snapshot with a message:

```bash
git commit -m "A short description of what changed"
```

---

## `git log`

See the history of commits:

```bash
git log
```

---

## `.gitignore`

Some files shouldn't be tracked, e.g. build artifacts, environments, caches. `.gitignore` tells git to skip them.

Here's this course repo's own [`.gitignore`](../.gitignore):

```bash
cat .gitignore
```

Why do you think `_build/`, `.venv`, and `*.pdf` are ignored here?

---

## <!-- fit -->2. Jupyter Notebooks

---

## From `ipython` to Notebooks

Last class we ran Python interactively in the terminal with `ipython`:
one line in, one result out, nothing saved.

A **notebook** lets you save your work in one place. You can mix your prose with code.

---

## Cells

A notebook is made of cells:

- **Code cells** — Python you run with `Shift+Enter`
- **Markdown cells** — formatted text, headers, notes, explanations of what you did and why

Order matters: cells run in the order *you* run them, not top to bottom automatically. This is a common source of bugs.

---

## Try it live

We'll use this notebook, `module_02.ipynb` for the rest of class.

Shortcuts you'll want:

- `Esc` then `a` / `b` — add a cell above / below
- `Esc` then `m` — change the current cell to Markdown
- `Esc` then `y` — change the current cell to code

---

## Try it live, cont.

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/notebooks/index.html?path=module_02.ipynb"
  style="width:100%; height:480px; border:1px solid #ccc;"
></iframe>

---

## Markdown Cells

Change a cell's type to Markdown (`Esc` then `m`, or the toolbar dropdown) to write formatted notes. Your notebook already has a couple — take a look.

This is how you'll document your homework and final project notebooks — narrate what you did, not just show code.

---

## Running Notebooks Locally

For the lectures, I'm running JupyterLite so I can embed Python into my slides. It's great for demos but we'll setting things up locally. For your own machine:

```bash
conda activate gsk
jupyter lab
```

This opens the full Jupyter Lab interface, backed by your actual conda environment (not the browser sandbox).

---

## Discussion

Q: What's an advantage of a notebook over a plain script?

Q: What's a risk of running cells out of order?

---

## <!-- fit -->3. Control Flow

---

## Truthiness

Every object in Python has a boolean value, even if it's not a `bool`.

Falsy by default:

- `None` and `False`
- zero of any numeric type: `0`, `0.0`, `0j`
- empty sequences and collections: `''`, `()`, `[]`, `{}`, `set()`, `range(0)`

Everything else is truthy.

---

## Comparison Operators

| Operation | Meaning |
| --------- | ------- |
| `<` | strictly less than |
| `<=` | less than or equal |
| `>` | strictly greater than |
| `>=` | greater than or equal |
| `==` | equal |
| `!=` | not equal |

---

## `if` / `elif` / `else`

Python uses indentation (spaces), not parentheses or braces, to mark a conditional's scope.

```python
if 5 > 6:
    print("the universe is broken")
elif len("cat") > len("dog"):
    print("uh oh, something is wrong in the world")
else:
    print("math is still mathing")
```

`if` runs when true, `elif` checks next, `else` catches everything else.

---

## Try it live

Add this to `module_02.ipynb`:

```python
x = 7
if x % 2 == 0:
    print("even")
elif x < 0:
    print("negative")
else:
    print("odd")
```

---

## Try it live, cont.

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/notebooks/index.html?path=module_02.ipynb"
  style="width:100%; height:480px; border:1px solid #ccc;"
></iframe>

---

## Exercise

- Create a dictionary
- Write a few different if-elif-else statements:
  - Check whether a key is in the dictionary
    - If a key does not exist, add an entry to the dictionary
  - If a key does exist, check if it is a list
    - If it's not a list, convert it to a list
    - If it's a list, append a value to it

---

## `for` Loops

Iterables are objects you can iterate over — lists, dictionaries, and more.

```python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    print(number)
```

---

## `for` Loops, cont.

You can use a loop to build a new object from an existing one:

```python
numbers_squared = []
for number in numbers:
    numbers_squared.append(number ** 2)
```

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
total = 0
for n in [1, 2, 3, 4, 5]:
    total = total + n

print(total)
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/notebooks/index.html?path=module_02.ipynb"
  style="width:100%; height:340px; border:1px solid #ccc;"
></iframe>

---

## <!-- fit -->4. Built-in Functions

---

## Built-in Functions

Python ships with functions ready to use, no import needed.

**Numerics:** `abs()`, `max()`, `min()`

**Boolean:** `any()`, `all()`, `bool()`

**Sequence-related:** `len()`, `input()`, `range()`

**Type constructors:** `dict()`, `float()`, `int()`, `list()`, `str()`, `set()`, `tuple()`

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

---

## Try it live, cont.

<style scoped>section { font-size: 24px; }</style>

```python
any([False, False, True])
```

```python
all([True, True, False])
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/notebooks/index.html?path=module_02.ipynb"
  style="width:100%; height:380px; border:1px solid #ccc;"
></iframe>

---

## All the Built-in Functions in Python

https://docs.python.org/3/library/functions.html

---

## 🐍 Python Trick

Get information about a variable, built-in type, or function by adding a `?` after it:

```python
print?
```

---

## Exercise

Spend some time exploring the different built-in functions in Python.

Q: How is `all()` different from `any()`?

Q: What happens when you give a string to the `list()` function?

Q: What happens if you give a string to `int()`?

---

## <!-- fit -->5. Functions

---

## Defining a Function

Functions let you reuse a block of code. Defined with `def`, named in `snake_case`.

```python
def print_hello_world():
    print("Hello world!")
```

---

## Functions with Arguments

```python
def print_hello_person(person):
    print(f"Hello {person}!")
```

`f"..."` is an f-string — it lets you embed a variable directly inside a string.

---

## Returning a Value

`print()` shows something on screen; `return` lets you store the result for later use.

```python
def greet(person):
    return f"Hello {person}!"
```

```python
message = greet("Teon")
message
```

---

## Try it live

<style scoped>section { font-size: 24px; }</style>

```python
def greet(person):
    return f"Hello {person}!"

message = greet("Teon")
message
```

<iframe
  src="https://datalus-dev.github.io/gsk-intro-scientific-python-course/jupyterlite/notebooks/index.html?path=module_02.ipynb"
  style="width:100%; height:340px; border:1px solid #ccc;"
></iframe>

---

## Exercise

1. Create a function that takes in a list and returns a dictionary where the keys are indexes.
2. Create a function that takes a list, creates a reversed copy of it, and returns a list of tuples pairing both lists together.
3. Create a function that prints three different messages based on the input type.

---

## <!-- fit -->6. Bringing it all together

---

## Bringing it all together

Combine everything from today: write a function that uses control flow and built-ins, run it in your notebook, then commit your work.

```python
def classify_numbers(numbers):
    result = []
    for n in numbers:
        if n % 2 == 0:
            result.append("even")
        else:
            result.append("odd")
    return result
```

---

## Save Your Work

```bash
git add module_02.ipynb
git commit -m "Complete Module 02 exercises"
git log
```

---

## <!-- fit --> That's it for today!

Next class: Module 03 — Intro to NumPy and SciPy.
