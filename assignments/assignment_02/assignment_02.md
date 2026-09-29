# Assignment 2

Due Friday, October 2, 2026

This assignment covers material from Modules 3 and 4: NumPy arrays, random numbers and simulations, Matplotlib, and saving your work with git. Do your work in a Jupyter Notebook, with Markdown cells describing what you're doing and why, and code cells showing your work.

Do your work on your `personal` branch. First, bring it up to date with the course repo:

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

Save your work on `personal` as you go with `git add` and `git commit`. You don't need to push it to submit; you'll upload your notebook in Section 5.

Throughout this assignment, we'll build up a simulation of a *random walk*: start at 0, and at each step, move either +1 or -1 with equal chance.

## 1. NumPy Arrays

- Create an array with `np.arange()` and `.reshape()` it into a 2-d array
- Print its `ndim`, `shape`, and `dtype`
- Compute its `.sum()` with `axis=0` and with `axis=1`. In a Markdown cell, explain the difference between the two results.
- Multiply your 2-d array by a 1-d array to demonstrate broadcasting

## 2. A Simulation

- Create a seeded random number generator with `np.random.default_rng()`
- Use `rng.choice()` to draw 5 random walks of 500 steps each, of `-1` or `1`, as a single array with `size=(5, 500)`
- Use `np.cumsum()` with the right `axis` to turn the steps into positions
- In a Markdown cell, answer: what is the `shape` of your array of positions, and what does each row represent?

## 3. Building a Plot in Matplotlib

Using `fig, ax = plt.subplots()`:

- Plot all 5 random walks on a single Axes
- Give each line a unique color and linestyle, and a `label`
- Add a horizontal reference line at 0 with `ax.axhline()`
- Add a title, axis labels, and a legend

## 4. Building Subplots in Matplotlib

- Simulate 1,000 random walks of 500 steps each, and compute the final position of each walk
- Create a figure with two subplots side by side:
  - On the left, your plot of 5 random walks from Section 3
  - On the right, a histogram of the 1,000 final positions
- Add a title to each subplot and to the figure with `fig.suptitle()`
- Save your figure as `random_walks.png` with `fig.savefig()`

## 5. Submit Your Work

Download your notebook from Jupyter Lab and upload it to [https://mskeducation.mskcc.org/](https://mskeducation.mskcc.org/) by Friday, October 2 11:59PM.
