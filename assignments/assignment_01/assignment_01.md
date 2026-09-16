# Assignment 1

Due September 21, 2026

This assignment covers material from Modules 1 and 2: Python basics, git, control flow, built-in functions, and functions. Do your work in a Jupyter Notebook, with Markdown cells describing what you're doing and why, and code cells showing your work.

## 1. Explore a Library

Find a Python library relevant to your own research (something you don't already know well).

- Find its GitHub repository
- Fork it to your own GitHub namespace
- Clone your fork to your machine

In a Markdown cell in your notebook, describe the library — its name, its GitHub URL, and why it's relevant to your research — and include the commands you used to fork and clone it.

You don't need to push anything back to GitHub yet — local commits are enough for now. We'll cover pushing your work in Module 4.

## 2. Data Types

- Assign a few variables of different types (`str`, `int`, `float`, `list`, `dict`) and use `type()` to confirm each
- Pick a string and try at least three different string methods (e.g. `upper`, `split`, `join`)
- Pick a list and try `append`, slicing, and negative indexing
- Build a dictionary with at least two entries and retrieve a value with both `[]` and `.get()`

## 3. Control Flow

- Write an `if`/`elif`/`else` statement that checks something about one of the variables you created above
- Write a `for` loop that builds a new list from an existing one (e.g. squaring each number, or uppercasing each string)

## 4. Built-in Functions

- Use at least three different built-in functions (e.g. `len()`, `max()`, `min()`, `any()`, `all()`) on your own data
- In a Markdown cell, answer: how is `all()` different from `any()`?

## 5. Functions

- Define a function that takes an argument and uses control flow inside it (an `if`/`else` or a `for` loop)
- Call your function and show the result

## 6. Save Your Work

In your cloned fork, stage and commit your notebook:

```bash
git add <your_notebook>.ipynb
git commit -m "Complete Assignment 1"
git log
```
