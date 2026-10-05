# Intro to Scientific Python: Cheatsheet

Modules 1–7 · Command line, git, Python, NumPy, Matplotlib, Pandas, Seaborn, SciPy

## 1. Command line

### Where am I? What's here?

| | |
|---|---|
| `pwd` | print working directory |
| `ls` | list files in this directory |
| `ls -l` | long format: sizes, dates, permissions |
| `ls -a` | include hidden files (`.gitignore`, `.git`) |
| `ls -al` | both |
| `ls data/` | list a folder without moving into it |
| `tree` | show the folder structure as a tree |

### Moving around: `cd`

| | |
|---|---|
| `cd folder` | move into `folder` |
| `cd ..` | up one level |
| `cd ../..` | up two levels |
| `cd .` | stay here (`.` = this folder) |
| `cd ~` | go to your home folder |
| `cd` | same as `cd ~` |
| `cd -` | go back to the previous folder |

```bash
cd ~/workspace/gsk-intro-scientific-python-course
```

> Absolute paths start with `/` or `~`. Relative paths start from where you are, like `data/gapminder.tsv`.

### Tab completion

Type the first few letters, then press `Tab`. The shell finishes the name for you.

- One match: it completes the whole name
- Several matches: press `Tab` twice to list them, type another letter, `Tab` again
- Works for folders, files, and git branches
- Same trick in `ipython` and notebooks: `df.` + `Tab` lists methods

```bash
cd ~/work[Tab]      # becomes ~/workspace/
cd gsk[Tab]        # gsk-intro-...
```

> Faster, and no typos. `↑` recalls your previous commands.

### Files & folders

| | |
|---|---|
| `mkdir name` | make a folder |
| `touch file.md` | create an empty file |
| `cat file` | print a file's contents |
| `which git` | is it installed? where? |
| `clear` | clear the screen |
| `Ctrl+C` | stop a running command |

### conda & Jupyter

```bash
conda --version
conda env list
conda env create -f environment.yml
conda activate gsk
conda install gh
jupyter lab      # run from the repo root
ipython          # interactive Python
```

> `(gsk)` at the start of your prompt means the environment is active. `(base)` is the default one.

## 2. Git

### Get a repo

```bash
git clone <url>      # copy a repo locally
git status          # what changed?
git remote -v       # list remotes + URLs
```

> `origin` is your fork, `upstream` is the course repo.

### Set up your fork

```bash
git remote add upstream <course-url>
git remote set-url origin <your-fork-url>
git remote -v
```

> Fork on GitHub first (**Fork** button, top right).

### Save your work

```bash
git add <file>            # stage
git commit -m "message"  # snapshot
git log                  # history
```

> Stage, then commit. Press `q` to leave `git log`.

### Branches

```bash
git branch               # list (* = current)
git switch -c new_branch # create, switch
git switch main          # switch
```

- `main`: only what's in the course repo
- `personal`: your notes and assignments
- `yearbook_first_last`: your yearbook PR

### Stay in sync

```bash
git switch main
git pull upstream main   # get new modules
git switch personal
git rebase main          # replay yours on top
```

> Rebase conflict? `git status` shows the files. Then `git rebase --abort` to undo, or fix the file, `git add`, and `git rebase --continue`.

### See what changed

```bash
git diff                 # unstaged
git fetch upstream       # download only
git diff main upstream/main
git restore README.md    # discard edit
```

```diff
-arr = np.array([1, 2, 3, 4])
+arr = np.array([1, 2, 3, 4, 5])
```

> `-` removed, `+` added, no prefix: unchanged.

### Send it to GitHub

```bash
gh auth login --hostname github.com \
  --git-protocol https --web
gh auth status
git push origin personal
git push --force-with-lease \
  origin personal
```

> After a rebase your commits have new hashes, so a plain `push` is rejected. `--force-with-lease` overwrites your fork only if no one else pushed.

### Pull request workflow

- `git switch main` → `git pull upstream main`
- `git switch -c my-branch`
- edit, `git add`, `git commit`
- `git push origin my-branch`
- Open the PR on GitHub (base: course repo `main`, compare: your branch)
- After merge: `git switch main` → `git pull upstream main`

### Moving work off `main`

```bash
git fetch upstream
git switch personal
git rebase main
git branch -f main upstream/main
git switch main
```

### `.gitignore`

Lists files git should skip: build output, environments, caches, e.g. `_build/`, `.ipynb_checkpoints`, `*.pdf`.

## 3. Python basics

### Data types

| | |
|---|---|
| `int` `float` | `1`, `1.0` |
| `bool` | `True`, `False` |
| `str` | `"hello"` or `'hello'` |
| `list` | `[1, 2, 3]` mutable |
| `tuple` | `(1, 2, 3)` immutable |
| `set` | `{1, 2, 3}` |
| `dict` | `{"a": 1}` key/value |
| `range` | `range(5)` |

```python
x = 5                  # assignment
type(x)                # int
isinstance(x, int)     # True
```

> Add `?` to get help: `print?`

### Strings

```python
name = "Teon Brooks"
name.upper()          # 'TEON BROOKS'
name.lower()
name.split(" ")       # ['Teon', 'Brooks']
"-".join(["a", "b"])  # 'a-b'
f"Hello {name}!"      # f-string
```

### Lists & slicing

```python
nums = [1, 2, 3, 4, 5]
nums[0]        # 1 (zero-indexed)
nums[-1]       # 5 (last)
nums[2:4]      # [3, 4] (stop excluded)
nums[::2]      # [1, 3, 5]
nums.append(6)
nums.extend([7, 8])
nums.index(3)  # 2
```

> `list[start:stop:step]`

### Dictionaries

```python
d = {"pet": "cat", "animals": ["cats", "dogs"]}
d["pet"]                    # 'cat'
d.get("missing", "n/a")     # 'n/a'
"pet" in d                  # True
```

> `d["missing"]` raises a `KeyError`; `.get()` doesn't.

### Built-in functions

| | |
|---|---|
| `len(x)` | length |
| `max()` `min()` | largest / smallest |
| `sum(x)` | total |
| `abs(x)` | absolute value |
| `any()` `all()` | any / all truthy |
| `range(n)` | 0 to n-1 |
| `input()` | ask the user for text |

Convert types: `int()` `float()` `str()` `list()` `dict()` `set()` `tuple()`

> All of them: docs.python.org/3/library/functions.html

### Truthiness & comparisons

Falsy: `None`, `False`, `0`, `0.0`, `''`, `[]`, `()`, `{}`, `set()`. Everything else is truthy.

| | |
|---|---|
| `==` `!=` | equal / not equal |
| `<` `<=` `>` `>=` | ordering |
| `%` | remainder (`x % 2 == 0`: even) |
| `**` | power |

### `if` & `for`

```python
if x < 0:
    print("negative")
elif x == 0:
    print("zero")
else:
    print("positive")

if x % 2 == 0:
    print("even")
else:
    print("odd")

squares = []
for n in [1, 2, 3]:
    squares.append(n ** 2)
```

> Indentation marks the block.

### Functions

```python
def greet(person):
    return f"Hello {person}!"

message = greet("Teon")
```

> `print()` shows something; `return` hands it back so you can store it. Use `snake_case` names.

### Classes

```python
class Sample:
    def __init__(self, name):
        self.name = name       # attribute
    def shout(self):           # method
        return self.name.upper()

s = Sample("kenya")
s.name      # attribute, no ()
s.shout()   # method, with ()
```

### Imports

```python
import math
math.sqrt(16)

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from scipy import stats
```

### Jupyter notebooks

| | |
|---|---|
| `Shift+Enter` | run cell |
| `Esc` then `a` / `b` | add cell above / below |
| `Esc` then `m` / `y` | Markdown / code cell |

> Cells run in the order *you* run them. Out-of-order runs are a common source of bugs.

```markdown
# Heading 1      ## Heading 2
**bold**  *italic*  `code`
- bullet
[a link](https://example.com)
```

## 4. NumPy & random numbers

### Creating arrays

```python
arr = np.array([1, 2, 3, 4])  # one sequence
np.zeros((3, 4))
np.ones(5)
np.arange(0, 21, 2)           # 0..20
np.linspace(0, 1, 5)          # stop included
```

| | |
|---|---|
| `arr.ndim` | dimensions |
| `arr.shape` | size of each dimension |
| `arr.dtype` | data type |

### Reshape & reduce

```python
a = np.arange(24).reshape(4, 6)
a.ravel()           # flatten to 1-d
a.sum()             # everything
a.sum(axis=0)       # per column (6,)
a.sum(axis=1)       # per row (4,)
a.cumsum(axis=1)    # running total
```

> Same `axis` idea for `.min()` `.max()` `.mean()`. Sizes must fit: 24 can't reshape to `(5, 5)`.

### Math & broadcasting

```python
a = np.arange(24).reshape(4, 6)
a * a       # element-wise
a @ a.T     # matrix multiply
a * 10      # scalar broadcast
a * np.arange(1, 7)  # (4, 6) * (6,)
```

> Broadcasting works when trailing dimensions match or one of them is 1. Here the 6 matches the 6 columns, so the row is applied to every row of `a`.

```python
np.hstack((a, a))   # side by side
np.vstack((a, a))   # stacked
```

### Random numbers

```python
rng = np.random.default_rng(seed=42)
rng.random()                    # uniform 0-1
rng.integers(1, 7, size=10)     # dice
rng.choice(["H", "T"], size=10)
rng.normal(loc=0, scale=1, size=10)
rng.standard_normal((4, 100))
rng.shuffle(arr)                # in place
```

> Same seed, same numbers. `loc` = mean, `scale` = std dev. `size` can be a tuple.

### Simulation recipe

```python
rolls = rng.integers(1, 7, size=10_000)
(rolls == 6).mean()   # P(roll a 6)
```

> `True` counts as 1 and `False` as 0, so the mean of a Boolean array is a proportion.

## 5. Matplotlib

### The object-oriented way

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(5, 2.7),
                       layout='constrained')
ax.plot(x, x, label='linear')
ax.plot(x, x**2, label='quadratic')
ax.set_title("Simple Plot")
ax.set_xlabel('x label')
ax.set_ylabel('y label')
ax.legend()
```

> Figure = the canvas. Axes = one plot on it. One array passed to `plot` is treated as the y-values.

### Styling & plot types

```python
ax.plot(x, y, color='blue',
        linewidth=3, linestyle='--')
l, = ax.plot(x, y2)   # keep the line
l.set_linestyle(':')
ax.set_xscale('log')
```

| | |
|---|---|
| `ax.scatter(x, y)` | scatter |
| `ax.bar(x, height)` | bar chart |
| `ax.hist(data, bins=20)` | histogram |
| `ax.axhline(y)` `ax.axvline(x)` | reference line |

### Subplots & saving

```python
fig, axes = plt.subplots(
    1, 2, figsize=(8, 3),
    layout='constrained')
axes[0].plot(data)          # 1-d: axes[i]
axes[1].hist(data, bins=20)
axes[0, 1]                  # 2-d: [row, col]

plt.subplots(2, 1, sharex=True)
fig.suptitle('Whole figure title')
fig.savefig('plot.png', dpi=150)
```

> The extension picks the format: `.png` `.pdf` `.svg`.

## 6. Pandas

### Create & load

```python
df = pd.DataFrame({'animal': ['panda', 'lion'],
                   'age': [1, 2.5]})
df = pd.read_csv('data/gapminder.tsv', sep='\t')
```

> A DataFrame is a collection of Series. `sep='\t'` because the file is tab-separated. Paths are relative to the notebook.

### Look at the data

| | |
|---|---|
| `df.head()` `df.tail()` | first / last 5 rows (`head(10)`) |
| `df.shape` | (rows, columns) |
| `df.columns` | column names |
| `df.dtypes` | type of each column |
| `df.describe()` | summary of numeric columns |

### Select columns & rows

```python
df['age']                       # a Series
df[df['continent'] == 'Africa'] # mask
df.query("continent == 'Africa'")
df.query("continent in ['Europe', 'Africa']")
```

> Strings inside `query` need different quotes than the outer string.

### `.iloc` vs `.loc`

```python
df.iloc[:100]            # 100 rows
df.iloc[:100, :2]        # by position
df.loc[:100]             # 101 rows!
df.loc[:100, ['continent', 'country']]
df.loc[df['year'] == 2007, ['country', 'lifeExp']]
```

| | |
|---|---|
| `.iloc` | numbers, end excluded |
| `.loc` | labels / Booleans, end **included** |

### Summary statistics

```python
df['lifeExp'].mean()
df['lifeExp'].median()
df['age'].max()
df.describe()
```

### Group-apply-combine

```python
df.groupby('country')['lifeExp'].mean()
df.groupby(['continent', 'year'])['lifeExp'] \
  .mean().reset_index()
df.groupby('continent').agg({
    'lifeExp': ['mean', 'median', 'max']})
```

> Group (split) → apply (compute) → combine. `.reset_index()` turns group labels back into columns.

### Reshape: wide → long

```python
long = counts.melt(id_vars='gene',
                   var_name='sample',
                   value_name='count')
long[['group', 'replicate']] = \
    long['sample'].str.split('_', expand=True)
long.groupby('group')['count'].mean()
```

> To group by something, it has to be in a column, not stuck in the column names.

### Rename columns

```python
df = df.rename(columns={
    'lifeExp': 'life_expectancy',
    'gdpPercap': 'gdp_per_capita'})
df.columns = ['a', 'b', 'c', 'd', 'e', 'f']
```

> `.rename()` returns a copy: save it back to `df`. It only changes the columns you name. Setting `df.columns` needs every name, in order.

### Pandas cheat sheet

pandas.pydata.org/Pandas_Cheat_Sheet.pdf

## 7. Seaborn & SciPy

### Seaborn plots

```python
import seaborn as sns
sns.histplot(x=data, kde=True)
sns.kdeplot(x=data)
sns.boxplot(data=df_2007, x='continent',
            y='life_expectancy')
sns.violinplot(data=groups)
sns.scatterplot(data=df_2007, x='gdp_per_capita',
                y='life_expectancy', hue='continent')
sns.lineplot(data=df, x='year',
             y='life_expectancy', hue='continent')
```

- Pass the DataFrame to `data`, name columns in `x`, `y`, `hue`
- `sns.boxplot` groups for you, like `groupby`
- `lineplot` draws the mean with a shaded interval

### Seaborn + Matplotlib

```python
fig, axes = plt.subplots(
    1, 2, figsize=(8, 3),
    layout='constrained')
sns.histplot(x=data, ax=axes[0])
sns.kdeplot(x=data, ax=axes[1])
axes[0].set_title('Histogram')
```

> Pass `ax=` to place a seaborn plot, then use any Axes method.

### Correlation

```python
from scipy import stats
df['a'].corr(df['b'])          # pandas
stats.pearsonr(x, y)           # linear
stats.spearmanr(x, y)          # ranks
np.log10(df['gdp_per_capita']) # log
```

- `r` runs from -1 to 1; 0 means no linear relationship
- Curved but rising? Try Spearman or a log transform
- Correlation is not causation

### T-tests

```python
stats.ttest_ind(europe, africa)  # separate
stats.ttest_rel(y2007, y1952)    # paired
```

> Each result has `.statistic` and `.pvalue`. For paired data, index both Series the same way (e.g. `set_index('country')`).

### Which function?

| | |
|---|---|
| Linearly related? | `pearsonr(x, y)` |
| Related by rank? | `spearmanr(x, y)` |
| Two groups differ? | `ttest_ind(a, b)` |
| Same group changed? | `ttest_rel(a, b)` |

### Reading a p-value

- p is the chance of a result this extreme if there were truly no effect
- **p < 0.05**: unlikely to be chance
- **p > 0.05**: can't rule out chance. "Not significant" is not "no difference"
- A small p doesn't mean a big effect: look at `r` or the group means

```python
"Life expectancy was higher in Europe
 (77.6 years) than in Africa (54.8 years),
 t = 12.6, p < 0.001."
```
