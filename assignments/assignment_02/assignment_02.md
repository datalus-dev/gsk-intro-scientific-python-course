# Assignment 2

Due September 28, 2026

This assignment covers material from Modules 3 and 4: NumPy arrays, random numbers and simulations, Matplotlib, Seaborn, and pushing your work with git. Do your work in a Jupyter Notebook, with Markdown cells describing what you're doing and why, and code cells showing your work.

Before you start, make a branch for this assignment from an up-to-date `main`:

```bash
git switch main
git pull upstream main
git switch -c assignment-02
```

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

## 5. Intro to Seaborn

- Plot the distribution of your 1,000 final positions with `sns.histplot()` and `kde=True`
- Simulate the final positions of 1,000 walks for three different walk lengths: 100, 400, and 900 steps
- Compare the three groups side by side with `sns.boxplot()` and `sns.violinplot()`, drawn into two subplots with `ax=`
- Label your axes and save this figure as `walk_lengths.png`
- In a Markdown cell, answer: how does the spread of the final positions change as the walks get longer? Compute the standard deviation of each group to support your answer.

## 6. Save and Push Your Work

On your `assignment-02` branch, stage, commit, and push your notebook and figures:

```bash
git add <your_notebook>.ipynb random_walks.png walk_lengths.png
git commit -m "Complete Assignment 2"
git push origin assignment-02
```

If you haven't pushed Assignment 1 yet, push it too with `git push origin assignment-01`.

Go to your fork on GitHub and confirm that the `assignment-01` and `assignment-02` branches are there, with your notebooks and figures. Your submission is what is on your fork's `assignment-02` branch by the due date.
