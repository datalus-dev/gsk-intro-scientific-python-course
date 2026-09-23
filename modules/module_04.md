---
title: Module 04: Intro to Matplotlib and Seaborn
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

# Module 04: Intro to Matplotlib and Seaborn

September 23, 2026

---

Content covered:

1. Connecting to GitHub with `gh`
2. Collaborating with Git
   1. Branches with `git switch`
   2. Remotes and `git push`
   3. A Minimal GitHub Workflow
3. Building a Plot in Matplotlib
4. Building Subplots in Matplotlib
5. Intro to Seaborn

---

By the end of this class, you will be able to:

- Log in to GitHub from the terminal with `gh auth login`
- Push local commits to a remote with `git push`, and describe a minimal GitHub collaboration workflow
- Create a branch and open a pull request
- Build and customize a plot in Matplotlib
- Build subplots in Matplotlib
- Produce a basic statistical plot in Seaborn

---

## <!-- fit -->1. Connecting to GitHub with `gh`

---

## Why We Need to Log In

Pulling from the course repo works without logging in, because it's public. Pushing to your fork is different: GitHub needs to know it's you.

GitHub doesn't accept your account password from `git`. Instead, we'll use GitHub's command line tool, `gh`, to log in once through the browser.

---

## Installing `gh`

`gh` is on conda-forge, the same channel as the rest of our tools:

```bash
conda activate gsk
conda install gh
gh --version
```

---

## Logging in with `gh auth login`

```bash
gh auth login --hostname github.com --git-protocol https --web
```

1. When asked *Authenticate Git with your GitHub credentials?*, answer **Yes**
2. Copy the one-time code shown in the terminal
3. Press `Enter`, and your browser opens GitHub. Paste the code and authorize `gh`

---

## Checking Your Login

```bash
gh auth status
```

This should say you're logged in to `github.com` with your username.

From now on, `git` uses this login whenever you push, so you won't be asked for a password.

---

## <!-- fit -->2. Collaborating with Git

---

## The `main` branch

When you first clone a repo, you will notice that there's usually a `main` branch that comes with your project.

We can think of a repository as a tree and the main branch as being the trunk.

For a repo, there's only one default branch, and this is usually designated as `main`. Historically, this branch was called `master`, and you might still see some projects called that, but new projects default to their main branch being called `main`.

---

## Branches

Branches are used when you want to try something out on your own and you want to have your own copy of files and edits.

This is useful when you are making major edits to a project or if you want to try a new set of analyses but you aren't ready to share or commit them to the main project.

To create a new branch and switch to it:

```bash
git switch -c new_branch
```

---

## Branches, cont.

To switch between existing branches, drop the `-c`:

```bash
git switch main
git switch new_branch
```

`git branch` lists your branches and marks the one you're on with a `*`.

You'll also see `git checkout -b new_branch` in older tutorials. It does the same thing. `git switch` is the newer command that only deals with branches, just as `git restore` only deals with files.

---

## Keep `main` in Sync with the Course

From now on, `main` only holds what's in the course repo. Your own work goes on a branch.

- `main`: updated only with `git pull upstream main`
- `assignment-01`, `assignment-02`, ...: one branch per assignment
- `module-04`, ...: your in-class exercises

If you commit your work on `main`, it no longer matches the course repo, and `git pull` will refuse to update it.

---

## Moving Your Work off `main`

If you committed Assignment 1 on `main`, let's move it onto its own branch:

```bash
git fetch upstream
git switch -c assignment-01
git branch -f main upstream/main
git switch main
```

Your commits are safe on `assignment-01`. When you switch back to `main`, your notebook disappears from the folder. It's still on `assignment-01`: `git switch assignment-01` brings it back.

---

## Getting Today's Module

Recall from Module 3: `upstream` is the course repo, and `git pull` brings its updates into your local clone.

```bash
cd ~/workspace/gsk-intro-scientific-python-course
git switch main
git pull upstream main
```

---

## `git push`

To send your local commits to your fork on GitHub:

```bash
git push origin assignment-01
```

This pushes the commits on your local `assignment-01` branch to a branch of the same name on `origin`, your fork.

Go to your fork on GitHub and choose `assignment-01` from the branch dropdown. Your commits and your Assignment 1 notebook are there now.

---

## Practice (5 min)

Let's work on these questions:

1. Run `git branch` to see your branches, and `git log assignment-01` to see your Assignment 1 commits.
2. Push them to your fork with `git push origin assignment-01`.
3. Find your commits on GitHub under the `assignment-01` branch of your fork.

---
<style scoped>section { font-size: 26px; }</style>

## Pull Requests

A pull request (PR) is how you propose your changes to a project. You're asking the maintainers to *pull* your branch into their `main`.

On GitHub, after pushing a branch, you'll see a **Compare & pull request** button on your fork.

- **base repository** / **base**: where your changes should go, the course repo (`datalus-dev/...`) and `main`
- **head repository** / **compare**: where they come from, your fork and your branch

GitHub doesn't know our remote names, so you won't see `origin` or `upstream` there.

The maintainers can review, comment, and merge it.

---

## A Minimal GitHub Workflow

1. `git switch main` and `git pull upstream main`: start from the latest version
2. `git switch -c my-branch`: make a branch for your change
3. Edit files, then `git add` and `git commit`
4. `git push origin my-branch`: send your branch to your fork
5. Open a pull request on GitHub
6. After it's merged: `git switch main` and `git pull upstream main`

This is the same loop used on large open-source projects, like NumPy and Matplotlib.

---

## Contributing to the Yearbook

Let's all add an entry to this class yearbook. We will all submit a markdown file with our name `firstname_lastname.md` and it will contain a markdown message in its body.

First, let's create our branch from `main`, using your own name:

```bash
cd ~/workspace/gsk-intro-scientific-python-course
git switch main
git switch -c yearbook-firstname-lastname
```

---

## Contributing to the Yearbook, cont.

We can use the command `touch` to create an empty file.

```bash
touch yearbook/2026/firstname_lastname.md
```

Open the file in your editor and write a short message in Markdown. Recall the Markdown syntax from Module 3.

---

## Creating a commit (patch)

In terminal, we can stage the file we just created to git. This lets git know that a file was created and added to the project.

```bash
git add yearbook/2026/firstname_lastname.md
git commit -m "Adding Firstname Lastname to the yearbook"
```

---

## Pushing our Commit

To share our commit with the project, we need to push our branch with its new commit.

```bash
git push origin yearbook-firstname-lastname
```

Then, on GitHub, open a pull request from your branch to the course repo's `main`.

---

## Pulling down updates

Once the pull requests are merged, we will all sync our repos to accept the updated commits:

```bash
git switch main
git pull upstream main
```

---

## <!-- fit -->3. Building a Plot in Matplotlib

---

<style scoped>.emoji { font-size: 48px; }</style>
Matplotlib is the main plotting library in Python.

It was used to generate the first image of a black hole! <p class="emoji"> 🕳️🤯</p>

<img src="https://numpy.org/images/content_images/cs/blackhole.jpg" width="600">

---

The most common submodule in `matplotlib` that you will use is `pyplot`. A submodule is a module that lives inside a package.

A common Python pattern for interacting with this submodule is:

```python
import matplotlib.pyplot as plt
```

The keyword `as` works as an alias, which lets you map an import to another variable name.
We saw this when we imported `numpy`:

```python
import numpy as np
```

---

Let's bring together what we learned with `numpy` with some new functionality with `matplotlib`.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2 * np.pi, 200)
y = np.sin(x)

fig, ax = plt.subplots()
ax.plot(x, y)
plt.show()
```

---

## Anatomy of Plotting

```python
fig, ax = plt.subplots()
ax.plot([2, 4, 6, 8])
```

If only a single array is specified, `plot` defaults to the input array being the y-values and the x-values will default to `range(len(input_array))`, i.e. `[0, 1, 2, 3]`.

---
<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

![w:640 center](./images/anatomy.png)

---

## Most Common Elements to Modify

- Figure: the whole canvas
- Axes: a single plot on the canvas
  - `.plot()`
  - `.set_title()`
  - `.set_xlabel()`
  - `.set_ylabel()`
  - `.legend()`

---

## Building a Plot, the Object-oriented Way

```python
x = np.linspace(0, 2, 100)  # Sample data.

# Note that even in the OO-style, we use `.pyplot.subplots` to create the Figure.
fig, ax = plt.subplots(figsize=(5, 2.7), layout='constrained')
ax.plot(x, x, label='linear')  # Plot some data on the Axes.
ax.plot(x, x**2, label='quadratic')  # Plot more data on the Axes...
ax.plot(x, x**3, label='cubic')  # ... and some more.
ax.set_xlabel('x label')  # Add an x-label to the Axes.
ax.set_ylabel('y label')  # Add a y-label to the Axes.
ax.set_title("Simple Plot")  # Add a title to the Axes.
ax.legend()  # Add a legend.
```

---

There's also a simpler way to plot but it's less explicit using the `pyplot` directly.

```python
plt.plot(x, x**2)
plt.title("Simple Plot")
```

You might come across examples using it but for now, we will use the explicit way so that we have as much control over our plots.

Ref: [Simple Plot](https://matplotlib.org/stable/users/explain/quick_start.html#the-explicit-and-the-implicit-interfaces)

---

## Generating Data from a Normal Distribution

Recall from Module 3: the random number generator lets us simulate data.

Let's randomly sample four sets of 100 values from a standard Normal distribution:

```python
rng = np.random.default_rng(seed=42)
data1, data2, data3, data4 = rng.standard_normal((4, 100))
```

Passing `(4, 100)` as the size gives a 4 × 100 array, and unpacking it gives us one row per variable.

---

## Styling

We can also style the Artists, the output of the plotting function.

Here, we are going to define the color, width, and style of different line plots.

```python
fig, ax = plt.subplots(figsize=(5, 2.7))
x = np.arange(len(data1))
ax.plot(x, np.cumsum(data1), color='blue', linewidth=3, linestyle='--')
l, = ax.plot(x, np.cumsum(data2), color='orange', linewidth=2)
l.set_linestyle(':')
```

`ax.plot` returns a list of lines. The trailing comma in `l, =` unpacks its one line into `l`, so we can modify it afterwards.

---

## Other Plot Types

`.plot()` draws lines, but the Axes has methods for many other kinds of plots:

- `ax.scatter(x, y)`: a scatter plot
- `ax.bar(x, height)`: a bar chart
- `ax.hist(data, bins=20)`: a histogram
- `ax.axhline(y)` / `ax.axvline(x)`: a reference line across the plot

---

## Practice (5 min)

Let's work on these questions:

1. Plot the cumulative sums of `data1` through `data4` on a single Axes.
2. Give each line a unique color, linestyle, and a `label`.
3. Add a title, axis labels, and a legend.

---

## <!-- fit -->4. Building Subplots in Matplotlib

---

## Subplots

`plt.subplots()` can create a grid of Axes by passing the number of rows and columns:

```python
fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(8, 3), layout='constrained')
```

`axes` is now a NumPy array of Axes objects, one for each subplot.

---

## Indexing Subplots

We index `axes` the same way we indexed arrays:

```python
fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout='constrained')
axes[0].plot(np.cumsum(data1))
axes[0].set_title('Random walk')
axes[1].hist(data2, bins=20)
axes[1].set_title('Histogram')
```

For a 2-d grid, e.g. `plt.subplots(2, 2)`, use two indices: `axes[0, 1]` is the first row, second column.

---

## Subplots, cont.

- `sharex=True` / `sharey=True`: the subplots share an axis range
- `fig.suptitle()`: a title for the whole Figure

```python
fig, axes = plt.subplots(2, 1, sharex=True, layout='constrained')
axes[0].plot(np.cumsum(data1))
axes[1].plot(np.cumsum(data2))
fig.suptitle('Two random walks')
```

---

## Saving a Figure

```python
fig.savefig('random_walks.png', dpi=150)
```

The file type comes from the extension, e.g. `.png`, `.pdf`, `.svg`.

Saved figures are files like any other, so you can `git add`, `git commit`, and `git push` them too.

---

## Practice (5 min)

Let's work on these questions:

1. Create a figure with two subplots side by side.
2. In the first, create a lineplot and give it a unique color and linestyle.
3. In the second, simulate 1,000 draws with `rng.normal()` and plot a histogram.
4. Add a title to each subplot and to the figure, then save it with `fig.savefig()`.

---

## <!-- fit -->5. Intro to Seaborn

---

## Seaborn

Seaborn is a high-level visualization library that works on top of matplotlib.

It makes common statistical plots, e.g. distributions and comparisons between groups, quick to make and nice to look at.

Seaborn is already installed in our `gsk` conda environment.

---

## Seaborn, cont.

By convention, we import seaborn as `sns`.

```python
import seaborn as sns
```

TIL: `sns` comes from an inside joke about West Wing and the character, Samuel Norman Seaborn.

ref: https://github.com/mwaskom/seaborn/issues/229

---

## A Basic Statistical Plot

`sns.histplot()` plots the distribution of your data. `kde=True` adds a smoothed estimate of the distribution on top.

```python
rng = np.random.default_rng(seed=42)
measurements = rng.normal(loc=100, scale=15, size=1_000)

sns.histplot(x=measurements, kde=True)
```

---

## Seaborn and Matplotlib Together

Seaborn lets us conveniently make plots and we can pass a matplotlib `Axes` to target the location of the plots.

```python
fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout='constrained')
sns.histplot(x=measurements, ax=axes[0])
sns.kdeplot(x=measurements, ax=axes[1])
axes[0].set_title('Histogram')
axes[1].set_title('KDE')
```

The Axes methods we learned, e.g. `.set_title()`, still work on seaborn plots.

---

## Comparing Groups

Pass a 2-d array to `data`, and seaborn treats each column as a group:

```python
groups = rng.normal(loc=[0, 1, 2], scale=1, size=(200, 3))

fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout='constrained')
sns.boxplot(data=groups, ax=axes[0])
sns.violinplot(data=groups, ax=axes[1])
```

`loc=[0, 1, 2]` gives each column a different mean, a nice use of broadcasting from Module 3.

---

## Practice (5 min)

Let's work on these questions:

1. Simulate rolling two dice 10,000 times, like in Module 3, and plot the distribution of the sum with `sns.histplot(..., discrete=True)`.
2. Simulate three groups with different standard deviations and compare them with `sns.boxplot()` and `sns.violinplot()` side by side.
3. Label your axes, add a figure title, and save your figure.

---

## Save Your Work

Commit and push your notebook and figures from today on their own branch:

```bash
git switch -c module-04
git add <your_notebook>.ipynb *.png
git commit -m "Module 4 plotting exercises"
git push origin module-04
```

---

## <!-- fit --> That's it for today!
