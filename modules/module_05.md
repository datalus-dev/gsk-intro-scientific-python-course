---
title: Module 05: Intro to Pandas
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

# Module 05: Intro to Pandas

September 28, 2026

---

<style scoped>section { font-size: 28px; }</style>

Content covered:

1. Keeping Your Branch Up to Date
   1. `git pull upstream main` on `main`
   2. `git rebase` on `personal`
2. Objects and Classes
3. Intro to Pandas
   1. DataFrames
   2. Loading Data
   3. Selecting Data
   4. Summary Statistics

---

By the end of this class, you will be able to:

- Update `main` with `git pull upstream main` and rebase your `personal` branch onto it with `git rebase`
- Describe what an object/class is
- Create and inspect a pandas DataFrame
- Load external data into a DataFrame
- Select columns and filter rows in a DataFrame
- Compute summary statistics on a DataFrame

---

## <!-- fit -->1. Keeping Your Branch Up to Date

---

## Updating `main`

Recall from Module 4: `main` only holds what's in the course repo, and your own work goes on a branch.

First, bring today's module into `main`:

```bash
cd ~/workspace/gsk-intro-scientific-python-course
git switch main
git pull upstream main
```

`main` now has today's module, but your `personal` branch was made from an older `main`, so it doesn't have it yet.

---

## `git rebase`

To bring your `personal` branch up to date:

```bash
git switch personal
git rebase main
```

`git rebase main` takes the commits on your branch and replays them on top of the latest `main`. Your notes stay, and now sit on top of today's module.

---

## `git rebase`, cont.

```text
before:  A---B---C  main
              \
               X---Y  personal

after:   A---B---C  main
                  \
                   X'---Y'  personal
```

`X` and `Y` are your commits. After the rebase, they have new commit hashes, `X'` and `Y'`, because they now start from `C`.

---

## Rebase Conflicts

If you edited a file that also changed in the course repo, `git rebase` stops with a conflict. `git status` shows which files.

- `git rebase --abort`: stop, and put your branch back the way it was
- Or fix the file, then `git add` it and run `git rebase --continue`

Recall from Module 3: editing the course files can cause conflicts. If you get stuck, abort, then raise your hand and we will help resolve the issue.

---

## Practice (5 min)

Let's work on these questions:

1. On `main`, run `git pull upstream main`, then `git log` to see today's commits.
2. Switch to `personal` and run `git rebase main`.
3. Run `git log` again. Where are your commits now, compared to today's commits?

---

## <!-- fit -->2. Objects and Classes

---

## Open Today's Notebook

We'll use this notebook, `notebooks/module_05.ipynb`, for the rest of class.

```bash
conda activate gsk
jupyter lab
```

In Jupyter Lab, open `notebooks/module_05.ipynb`. It has today's code and a cell for each practice question.

---

## Classes

Classes, also called Objects, are containers in Python that can store values, known as `attributes`; and functions, known as `methods`

---

## We've Already Been Using Objects

```python
arr = np.arange(24)
arr.shape          # an attribute
arr.reshape(4, 6)  # a method

fig, ax = plt.subplots()
ax.set_title("A title")  # a method on an Axes object
```

Attributes are accessed with a `.` and no parentheses. Methods are called with `()`, just like functions.

---

<style scoped>section { font-size: 28px; }</style>

## Anatomy of a Class

Classes are defined using `class` keyword:

```python
class MyClass:
    def __init__(self, attribute1):
        self.attribute1 = attribute1
```

`__init__` runs when you create a new object, and `self` refers to that object.

```python
obj = MyClass(5)
obj.attribute1
```

---

## Classes, cont.

You can also include functions that will be stored in the object by default too:

```python
class MyClass:
    def __init__(self, attribute1):
        self.attribute1 = attribute1

    def stringify(self, value):
        return str(value)
```

---

## Practice (5 min)

Let's work on these questions:

1. Define a class `Sample` that stores a `name` and a NumPy array of `values`.
2. Add a method `summary()` that returns the mean and standard deviation of `values`.

---

## <!-- fit -->3. Intro to Pandas

---

## Pandas

Pandas is a dataframe library used to load, manipulate, and analyze data.

You can think of it as a way to program a spreadsheet.

Pandas is already installed in our `gsk` conda environment.

---

## Pandas, cont.

By convention, we import pandas as `pd`.

```python
import pandas as pd
```

---

## Creating our first DataFrame

```python
import pandas as pd

my_zoo = {
    'animal': ['panda', 'panda', 'lion', 'tiger', 'lion'],
    'sex': ['f', 'm', 'f', 'f', 'm'],
    'age': [1, 5, 2.5, 3, 3]
}

df = pd.DataFrame(my_zoo)
```

---

## A DataFrame is an Object

`pd.DataFrame` is a class. Just like `MyClass(5)`, calling `pd.DataFrame(my_zoo)` creates a new object.

```python
type(df)
```

The attributes and methods we'll use today all come from this class.

---

## DataFrames and Series

DataFrames are a collection of Series. Series are a collection of values of all the same data type.

You can think of a Series conceptually as a generalized version of a `numpy.array`.

A Series can be a collection of strings, a collection of floats, a collection of DateTime, and a host of other data types.

---

## Selecting a Column

You can index the contents of a DataFrame in the same way we indexed values from an array.

Instead of using the index for selecting the data, we can use the column name to return the values.

This is similar to how a dictionary works. Recall from Module 1: we look up a dictionary's values by their key.

```python
df['age']
```

---

## Series Methods

These Series have built-in methods to make sense of the data

```python
df['age'].max()   # 5.0, the oldest animal

df['age'].mean()  # 2.9, the average age
```

Each of these returns a single value for the whole column.

---

## Practice (5 min)

Let's work on these questions:

1. Create a DataFrame from a dictionary with three columns: `sample`, `condition`, and `measurement`.
2. Select the `measurement` column and compute its `.max()` and `.mean()`.
3. Check the `type()` of your DataFrame and of the column you selected.

---

## Loading Data

You can also use Pandas to load data from files.

```python
df = pd.read_csv('../data/gapminder.tsv', sep='\t')
```

`sep` refers to the separator. For this file, the columns are delimited using tabs.

---

## Loading Data, cont.

Notice that you can import files using relative paths. `..` means "go up one folder", from `notebooks/` to the course repo.

```bash
gsk-intro-scientific-python-course
├── data
│   └── gapminder.tsv
└── notebooks
    └── module_05.ipynb
```

---

<style scoped>section { font-size: 28px; }</style>

## Some Useful Methods

- `df.head()`: returns a view of your data. By default, it'll show you the first five rows of your data.
- `df.tail()`: similar to head but instead, it will return the last five rows of your data.

These both accept arguments. If you would like to return the first ten rows, you would write:
```python
df.head(10)
```

---

## Some Useful Attributes

- `df.columns`: returns a list of column names
- `df.shape`: returns the number of rows and number of columns of your data.
- `df.dtypes`: returns the data type of each column

Recall from Module 3: arrays have `shape` and `dtype` too.

---

## Practice (5 min)

Let's work on these questions:

1. Load `gapminder.tsv` into a DataFrame called `df`.
2. Show the first 10 rows and the last 3 rows.
3. How many rows and columns does `df` have? What is the data type of each column?

---

## Selecting Data: Boolean Expressions

Recall from Module 3: `rolls == 6` gave an array of `True`/`False`.

Pandas lets you do truth evaluation for a Series in your DataFrame by writing Boolean expressions.

```python
df['continent'] == 'Africa'
```

This returns a Series that consists of `True` and `False` for the values in a given Series.

---

## Selecting Data: Boolean Expressions, cont.

We can use Boolean expressions to select a subset of data from our DataFrame

```python
df[df['continent'] == 'Africa']
```

What this expression does is look at the column `df['continent']` and see if the value in the column is equal `Africa`.

It only returns the rows where the Boolean expression is true.

---

## Selecting Data: Boolean Expressions, cont.

Pandas also has a convenient method for its DataFrames to write these queries.

```python
df.query("continent == 'Africa'")
```

Notice that you need to provide a string to the query method. In this example, we are evaluating against a string therefore we need different string literals within our expression.

---

## Practice (5 min)

Let's work on these questions:

1. Select all rows for a single country, e.g. `'Kenya'`.
2. Select all rows from `2007` and save them as `df_2007`. From `df_2007`, select the countries with a `lifeExp` above 75.

---

## Summary Statistics

- `.mean()`: the average of the values
- `.median()`: the middle value
- `.describe()`: the count, mean, standard deviation, min, quartiles, and max of each numeric column

```python
df['lifeExp'].mean()
df['lifeExp'].median()
df.describe()
```

Let's check out some of these summary statistics for our DataFrame.

---

## Practice (5 min)

Let's work on these questions:

1. Compute the mean and median of `lifeExp`.
2. Run `df.describe()`. Which columns show up, and which don't? Why?
3. Using Boolean indexing, compare the mean `lifeExp` in `1952` and in `2007`.

---

## Summary Statistics, cont.

Q: What do you notice about these values? Is there a way to understand the average life expectancy for a given country?

We'll answer this with group-apply-combine in Module 6.

---

## Save Your Work

Commit and push your notes from today on your `personal` branch:

```bash
git add notebooks/module_05.ipynb
git commit -m "Module 5 notes"
git push --force-with-lease origin personal
```

`git rebase` gave your commits new hashes, so a plain `git push` is rejected. `--force-with-lease` replaces the branch on your fork, but only if no one else has pushed to it since.

---

## <!-- fit --> That's it for today!
