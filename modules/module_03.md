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

# Module 03: Intro to NumPy

September 21, 2026

---

Content covered:

1. Staying in Sync with Git
   1. `git pull`
   2. Reading a `git diff`
2. Markdown in Jupyter Notebooks
3. Intro to NumPy
   1. NDarray
   2. Numeric operations
   3. Random Numbers and Simulations

---

By the end of this class, you will be able to:

- Pull updates from a remote repository with `git pull` and read a `git diff`
- Write Markdown cells to document a Jupyter Notebook
- Create and manipulate NumPy arrays (`ndarray`)
- Generate random numbers with NumPy and use them to run simple simulations

---

## <!-- fit -->1. Staying in Sync with Git

---
<style scoped>section { font-size: 26px; }</style>

## `git pull`

Recall from Module 2: `origin` points at your fork, `upstream` points at the course repo.

As the course repo gets updated with new modules and fixes, you'll want to bring those changes into your local clone.

```bash
git pull upstream main
```

This fetches the latest commits from `upstream` and merges them into your current branch.

This works smoothly as long as you haven't committed your own work on `main`. In Module 4, we'll keep our work on branches instead.

---

## Reading a `git diff`

Before you pull, or after you make changes, it helps to see exactly what's different.

```bash
git diff
```

Shows unstaged changes in your working directory, line by line.

```bash
git fetch upstream
git diff main upstream/main
```

`git fetch` downloads the course repo's latest commits without merging them. The diff then shows what's changed in the course repo that you haven't pulled yet.

---

## Reading a `git diff`, cont.

```diff
-arr = np.array([1, 2, 3, 4])
+arr = np.array([1, 2, 3, 4, 5])
```

Lines starting with `-` were removed, lines starting with `+` were added. Everything else is unchanged context.

---

## Practice (5 min)

Let's work on these questions:

1. Run `git pull upstream main` to get today's module.
2. Make a small edit to `README.md` and run `git diff` to see your change.
3. Discard your change before moving on with `git restore README.md`. Editing the course files can cause conflicts the next time you pull.

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

## Practice (5 min)

Let's work on these questions:

In your notebook:

1. Add a Markdown cell with a heading for today's module and a one-sentence description of what we'll cover.
2. Add a bullet list of the git commands we used today, formatting each one as `inline code`.
3. Add a link to the [NumPy documentation](https://numpy.org/doc/stable/).

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

`arr` has some important attributes:
- `ndim`: number of dimensions
- `shape`: the dimensions of the array
- `dtype`: the data type of the array

`np.array` takes a single sequence, e.g. a list or tuple, as its argument. Passing separate values, e.g. `np.array(1, 2, 3)`, is an error.

---

## Some common arrays you can use

`np.zeros()` takes an int or list/tuple of ints as its argument and returns an array of zeros with those dimensions.

`np.ones()` is the same as above but returns ones.

`np.arange()` similar to built-in `range`, but returns an array.

`np.linspace()` takes a start, stop, and number of points, and returns an array with evenly spaced values in the range, including the stop value. e.g. `np.linspace(0, 1, 5)` returns `[0., 0.25, 0.5, 0.75, 1.]`

---

## Practice (5 min)

Let's work on these questions:

1. Create a 3 × 4 array of zeros with `np.zeros()`. Check its `shape`, `ndim`, and `dtype`.
2. Use `np.arange()` to create the even numbers from 0 to 20. Is 20 included?
3. Use `np.linspace()` to create 11 evenly spaced values from 0 to 1. What's the step between them?

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
<style scoped>section { font-size: 24px; }</style>

## Other Ways to Draw Random Values

- `rng.integers(low, high, size)`: random integers in `[low, high)`
- `rng.choice(arr, size, replace=True)`: randomly sample from an existing array
  - `replace=True` is the default. Use `replace=False` to sample without repeats
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

`rolls == 6` gives an array of `True`/`False`. `True` counts as 1 and `False` as 0, so the mean is the proportion of rolls that were a 6.

---

## Practice (5 min)

Let's work on these questions:

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

`axis=0` sums down the rows, giving one result per column. `axis=1` sums across the columns, giving one result per row.

```python
arr = np.arange(24).reshape(4, 6)
arr.sum(axis=0).shape   # (6,): one sum per column
arr.sum(axis=1).shape   # (4,): one sum per row
```

The same goes for `.min()`, `.max()`, `.cumsum()`, etc.

---

## Practice (5 min)

Let's work on these questions:

1. Create `arr = np.arange(24)` and reshape it to `(4, 6)`, then to `(2, 3, 4)`. What happens if you try `(5, 5)`?
2. Predict the shapes of `arr.reshape(4, 6).sum(axis=0)` and `.sum(axis=1)`, then check.
3. Try `.cumsum(axis=1)` on the `(4, 6)` array. How is it different from `.sum(axis=1)`?

---

By default, multiplying arrays is element-wise. It uses the `*` operator.

For matrix multiplication, use the `@` operator.

If you need to perform a scalar operation over an array, this is often referred to as broadcasting. It will perform element-wise multiplication of the scalar on the array.

Broadcasting can also be done between two arrays if their trailing dimensions are equal, or one of them is 1.
<!-- https://numpy.org/doc/stable/user/basics.broadcasting.html -->

```python
arr = np.arange(24).reshape([8,3])
scaler = np.array([1,2,3])
new_arr = arr * scaler
```

---

## Combining arrays

`np.hstack()`: this will horizontally stack arrays side by side, adding columns.

`np.vstack()`: this will vertically stack arrays on top of each other, adding rows.

Both take a single tuple or list of arrays:

```python
a = np.arange(6).reshape(2, 3)
np.hstack((a, a)).shape   # (2, 6)
np.vstack((a, a)).shape   # (4, 3)
```

---

<style scoped>section { font-size: 28px; }</style>

## Practice (5 min)

Let's work on these questions:

1. Create `a = np.arange(6).reshape(2, 3)`. Predict, then check, the shapes of `np.hstack((a, a))` and `np.vstack((a, a))`.
2. Multiply `a` by `np.array([1, 10, 100])`. Which dimension was broadcast?
3. Write a function `duplicate(values, direction)` that turns a list into an array and repeats it:
   - `duplicate([1, 2, 3], "horizontal")` returns `[1, 2, 3, 1, 2, 3]`
   - `duplicate([1, 2, 3], "vertical")` returns `[[1, 2, 3], [1, 2, 3]]`
   - `duplicate([1, 2, 3], None)` returns `[1, 2, 3]`

---

## <!-- fit --> That's it for today!
