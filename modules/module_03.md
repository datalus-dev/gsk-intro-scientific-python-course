---
title: Module 03: Intro to NumPy
marp: true
html: true
theme: gaia
footer: Intro to Scientific Python
---
<style>
    footer {
    text-align: right;
    }
</style>

# Module 03: Intro to NumPy

September 21, 2026

---
<style scoped>section { font-size: 28px; }</style>
Content covered:

## H1

1. Staying in Sync with Git
   1. `git pull`
   2. Reading a `git diff`
2. Markdown in Jupyter Notebooks
3. Intro to NumPy
   1. NDarray
   2. Numeric operations
   3. Random Numbers and Simulations

---

## <!-- fit -->1. Staying in Sync with Git

---

## `git pull`

Recall from Module 2: `origin` points at your fork, `upstream` points at the course repo.

As the course repo gets updated with new modules and fixes, you'll want to bring those changes into your local clone.

```bash
git pull upstream main
```

This fetches the latest commits from `upstream` and merges them into your current branch.

---

## Reading a `git diff`

Before you pull, or after you make changes, it helps to see exactly what's different.

```bash
git diff
```

Shows unstaged changes in your working directory, line by line.

```bash
git diff upstream/main
```

Shows what's changed between your current branch and the course repo.

---

## Reading a `git diff`, cont.

```diff
-arr = np.array([1, 2, 3, 4])
+arr = np.array([1, 2, 3, 4, 5])
```

Lines starting with `-` were removed, lines starting with `+` were added. Everything else is unchanged context.

---

## Exercise

1. Run `git pull upstream main` to get today's module.
2. Make a small edit to a file and run `git diff` to see your change.
3. Discard or commit your change before moving on: `git restore <file>` discards it, or `git add`/`git commit` keeps it.

---

## <!-- fit -->2. Markdown in Jupyter Notebooks

---

## Markdown Cells

Recall from Module 2: change a cell's type to Markdown (`Esc` then `m`) to write formatted notes instead of code.

Markdown is a lightweight syntax for formatting plain text:

```markdown
# Heading 1
## Heading 2

**bold**, *italic*, `inline code`

- a bullet list
- another item

[a link](https://example.com)
```

---

## Why It Matters

Use Markdown cells to narrate your notebook: state the question you're answering before a code cell, and summarize what you found after it.

This is what turns a script into a readable report for your homework and final project.

---

## <!-- fit -->3. Intro to NumPy

---

## NumPy

NumPy is one of the core scientific libraries in Python. It has its own data type, the `numpy.ndarray`, which is an n-dimensional array. This is not a built-in library although it is one of the most common libraries used.

These arrays are used primarily to store numerical data of the same type, and have a host of methods and functions to perform numerical analysis and computation.

---

## Getting Started

```python
import numpy as np
```

In Python you can alias an import using the `as` keyword. A common practice is to refer to `numpy` as `np`.

---

```python
arr = np.array([1, 2, 3, 4])
```

`arr` has some important methods:
- `ndim`: number of dimensions
- `shape`: the dimensions of the array
- `dtype`: the data type of the array

`np.array` takes an object as an argument e.g. list, tuple, but not individual values.

---

## Some common arrays you can use

`np.zeros()` takes an int or list/tuple of ints as its argument and returns an array of zeros with those dimensions.

`np.ones()` is the same as above but returns ones.

`np.arange()` similar to built-in `range`, but returns an array.

`np.linspace()` takes a start, stop, and number of steps, and returns an array with evenly spaced values in the range.

---

## Exercises

Try out some of these common array functions in your iPython session.

---

## Random Numbers and Simulations

NumPy's random number generator lets us draw random values and use them to simulate a process.

```python
rng = np.random.default_rng()
rng.random()
```

`rng.random()` draws a float uniformly between 0 and 1.

---

## Seeding a Generator

If you want your random draws to be reproducible (e.g. for a homework or a shared notebook), pass a seed to `default_rng()`.

```python
rng = np.random.default_rng(seed=42)
rng.random()
```

The same seed will always produce the same sequence of "random" numbers.

---

## Other Ways to Draw Random Values

- `rng.integers(low, high, size)`: random integers in `[low, high)`
- `rng.choice(arr, size, replace=False)`: randomly sample from an existing array
- `rng.normal(loc, scale, size)`: draw from a Normal distribution
  - `loc`: the mean
  - `scale`: the standard deviation
  - `size`: the shape of the output (an int, or a tuple for multiple dimensions)
- `rng.shuffle(arr)`: shuffle an array in place

---

```python
rng = np.random.default_rng(seed=42)

rng.integers(1, 7, size=10)          # 10 simulated die rolls
rng.choice(["heads", "tails"], size=10)  # 10 simulated coin flips
rng.normal(loc=0, scale=1, size=10)  # 10 draws from a standard Normal
```

`size` can also be a tuple, e.g. `size=(4, 100)`, to draw a multi-dimensional array of random values at once.

---

## Simple Simulations

A simulation repeats a random process many times and summarizes the outcomes. NumPy's speed at operating on whole arrays makes this easy.

```python
rng = np.random.default_rng(seed=42)

rolls = rng.integers(1, 7, size=10_000)
(rolls == 6).mean()   # estimated probability of rolling a 6
```

---

## Exercise

1. Simulate flipping a fair coin 1,000 times using `rng.choice()`. What proportion came up heads?
2. Simulate rolling two dice 10,000 times (two arrays of rolls, added together). Estimate the probability that the sum is 7.
3. Use `rng.normal()` to simulate 1,000 measurements with a mean of 100 and a standard deviation of 15. Compute the mean and standard deviation of your simulated sample — how close are they to the parameters you used?

---

## Array manipulation

`.reshape()` this method is used to change the shape of an array. This method accepts the resulting dimensions as separate arguments or they can be a list/tuple.

```python
arr = np.arange(24)
arr.reshape(4,6)
arr.reshape(2,4,3)
```

`.ravel()` flattens the dimensionality into a 1-d array.

---

`.sum()` will return the sum of the entire array.

If you want to return the sum across the rows or across the columns, you can use the `axis` parameter.

`axis=0`, refers to column-wise operation where the summation will be done along the column.

`axis=1` would refer to a row-wise operation.

The same goes for `.min()`, `.max()`, `.cumsum()`, etc.

---

## Let's try some of the methods together.

---

By default, multiplying arrays is element-wise. It uses the `*` operator.

For matrix multiplication, use the `@` operator.

If you need to perform a scalar operation over an array, this is often referred to as broadcasting. It will perform element-wise multiplication of the scalar on the array.

Broadcasting can also be done between two arrays if the trailing dimensions are equivalent.
<!-- https://numpy.org/doc/stable/user/basics.broadcasting.html -->

```python
arr = np.arange(24).reshape([8,3])
scaler = np.array([1,2,3])
new_arr = arr * scaler
```

---

## Combining arrays

`np.hstack()`: this will horizontally stack values along the first dimension, column-wise.

`np.vstack()`: this will vertically stack values, row-wise.

---

## Exercises

1. Create a function that takes in a list, a parameter for vertical or horizontal or None, returns an array with a duplication either horizontally, vertically, or none at all.
