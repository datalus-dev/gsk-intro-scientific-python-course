---
title: Module 06: Pandas, continued, and Intro to Seaborn
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
    @media print {
        .copy-btn, iframe {
            display: none;
        }
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

# Module 06: Pandas, continued, and Intro to Seaborn

September 30, 2026

---

Content covered:

1. Pandas, continued
   1. Selecting Data with `.iloc` and `.loc`
   2. Group-apply-combine
   3. Renaming Columns
2. Intro to Seaborn

---

By the end of this class, you will be able to:

- Select rows and columns by position and label with `.iloc` and `.loc`
- Use group-apply-combine to summarize data by category
- Rename columns in a DataFrame
- Produce a basic statistical plot in Seaborn

---

## <!-- fit -->1. Pandas, continued

---

## Open Today's Notebook

We'll use this notebook, `notebooks/module_06.ipynb`, for the rest of class.

First, bring it into your `personal` branch (recall Module 5):

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

Then open `notebooks/module_06.ipynb` in Jupyter Lab. It has today's code and a cell for each practice question.

---

## Picking Up Where We Left Off

We'll keep working with the Gapminder data from Module 5.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data/gapminder.tsv', sep='\t')
```

---

<style scoped>section { font-size: 26px; }</style>

## Selecting Data: `.iloc`

If you would like to return a subset of your dataset, you can do so by using the `.iloc` indexer

```python
df.iloc[:100]
```

This will return the first 100 rows subset of your DataFrame.

This uses the DataFrame index to select the rows of interest. The default index will be a `range(len(df))`. There are other possible types of indices but for now, we will just consider this one.

---

## Selecting Data: `.iloc`, cont.

You can also use it to return a subset of the columns too using their index.

```python
df.iloc[:100, :2]
```

`.iloc` uses numeric indexers. This means you cannot use the column names to subset your DataFrame with `.iloc`.

---

## Selecting Data: `.loc`

You can also index your DataFrame using the indexer, `.loc`.
This indexer uses the row names and column names for indexing.

By default, the row names are the same as the index.

```python
df.loc[:100]
```

Unlike `.iloc`, `.loc` includes the end of the slice, so this returns 101 rows.

---

## Selecting Data: `.loc`, cont.

This comes into play when you want to include columns in your indexer.

```python
df.loc[:100, ['continent', 'country']]
```

---

## Selecting Data: `.loc`, cont.

`.loc` also accepts the Boolean expressions from Module 5 for the rows, with the columns you want after the comma.

```python
df.loc[df['year'] == 2007, ['country', 'lifeExp']]
```

This is the usual way to say "these rows, and only these columns."

---

## Practice (5 min)

Let's work on these questions:

1. Select the first 5 rows of the `country` and `continent` columns, once with `.iloc` and once with `.loc`.
2. Select rows 10 through 20 with `df.iloc[10:20]` and with `df.loc[10:20]`. Why is the number of rows different?
3. Use `.loc` to select the `country` and `lifeExp` columns for all rows where `continent` is `'Oceania'`.

---

## Group-Apply-Combine

Recall from Module 5: the mean `lifeExp` of the whole dataset mixes together every country and every year.

Often we want a summary for each group instead. This is done in three steps:

1. **Group**: split the rows into groups based on a column
2. **Apply**: compute something on each group, e.g. the mean
3. **Combine**: put the results back together in one table

---

## Group By

Let's go back to the zoo from Module 5.

```python
my_zoo = {
    'animal': ['panda', 'panda', 'lion', 'tiger', 'lion'],
    'sex': ['f', 'm', 'f', 'f', 'm'],
    'age': [1, 5, 2.5, 3, 3]
}

zoo = pd.DataFrame(my_zoo)
```

---

## Group By, cont.

If you want to find a breakdown of a given level within your dataframe, you can use the groupby method to specify what column you're interested in grouping by. 

This lets you compute summary statistics for the given grouping:

```python
zoo.groupby('animal')['age'].mean()
```

---

## Groupby, cont.

You can also group by multiple columns:

```python
zoo.groupby(['sex', 'age']).count()
```

---

## Groupby

We use `.groupby` method when we want to do calculations based on a particular group:

```python
df.groupby('country')['lifeExp'].mean()
```

By default, it will arrange the countries in alphabetic order. But if we wanted to group based on the continent as well:

```python
df.groupby(['continent', 'country'])['lifeExp'].mean()
```

This answers the question from Module 5: what is the average life expectancy for a given country?

---

## Aggregate

If you would like to calculate diferrent summary statistics for your dataframe, you can do so by using the `.agg()` method:

```python
.agg(
    "column_of_interest": ["mean", "median", "skew", ...]
)
```

---

Let's use our dataframe to compose an aggregation:

```python
df.groupby(['continent']).agg({
    'lifeExp': ['mean', 'median', 'max']
})
```

---

## Groupby, cont.

Grouping by more than one column gives a Series with a multi-level index. Use `.reset_index()` to turn the groups back into regular columns:

```python
df.groupby(['continent', 'year'])['lifeExp'].mean().reset_index()
```

---

## Practice (5 min)

Let's work on these questions:

1. Compute the mean `gdpPercap` for each continent.
2. Compute the mean and median `lifeExp` for each `year`. How has life expectancy changed over time?
3. Group by `continent` and `year`, then use `.reset_index()`. Which continent had the highest mean `lifeExp` in `2007`?

---

## Grouping Needs a Column

To group by something, the information has to be in a column.

Sometimes it is stuck inside the column names instead. Here are read counts from an RNA-seq experiment, with the sample names as columns:

```python
counts = pd.DataFrame({
    'gene': ['Xkr4', 'Rp1'],
    'FB_1': [2, 0], 'FB_2': [0, 6],
    'HSC_1': [0, 2], 'HSC_2': [0, 0]
})
```

`FB` and `HSC` are cell types, and `_1` and `_2` are replicates. We can't group by cell type yet.

---

<style scoped>section { font-size: 26px; }</style>

## Wide to Long: `.melt()`

`.melt()` turns the sample columns into rows, so that the sample name is now a column:

```python
long = counts.melt(id_vars='gene', var_name='sample', value_name='count')
```

Then `.str.split()` splits the text in a column. `expand=True` puts each piece in its own column:

```python
long[['group', 'replicate']] = long['sample'].str.split('_', expand=True)
```

Now we can group:

```python
long.groupby('group')['count'].mean()
```

---

## Practice (5 min)

Let's work on these questions:

1. Run `.melt()` on `counts`. What is the `shape` before and after? Why?
2. Use `.str.split()` to add `group` and `replicate` columns.
3. Compute the mean `count` for each `group`.

---

## Renaming Columns

- .rename()

```python
.rename(columns = {"old_name": "new_name"})
```

---

## Renaming Columns, cont.

```python
df = df.rename(
    columns = {
        'lifeExp': 'life_expectancy',
        'gdpPercap': 'gdp_per_capita'
})
```

To prevent overwriting your dataframe, Pandas creates a copy of your dataframe.

To keep the change, save the copy back to `df`. From here on, we'll use `life_expectancy` and `gdp_per_capita`.

---

## Renaming Columns, cont.

If you want to change every column name, you can set `df.columns` to a list of names instead:

```python
df.columns = ['country', 'continent', 'year', 'life_expectancy', 'pop', 'gdp_per_capita']
```

The list has to be the same length as the columns, and in the same order. `.rename()` is safer because it only changes the columns you name.

---

## Practice (5 min)

Let's work on these questions:

1. Save a copy called `df_renamed` with `pop` renamed to `population`, and check its `columns`.
2. Rename the `gene` column of `counts` to `gene_name`.
3. Why is `df.rename(columns={'pop': 'population'})` on its own not enough to change `df`?

---

## Cheatsheet

https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf

---

## <!-- fit -->2. Intro to Seaborn

---

## Seaborn

Seaborn is a high-level visualization library that works on top of matplotlib.

It makes common statistical plots, e.g. distributions and comparisons between groups, quick to make and nice to look at.

It gives some very nice features to make plotting data in dataframes easy.

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

## Seaborn with DataFrames

Seaborn works best with DataFrames. Pass the DataFrame to `data` and name the columns to use for `x`, `y`, and more.

```python
df_2007 = df.query("year == 2007")

sns.boxplot(data=df_2007, x='continent', y='life_expectancy')
```

Seaborn does the grouping for us, one box for each continent. This is the plot version of `groupby('continent')`.

---

## Seaborn with DataFrames, cont.

Seaborn lets us convenient make plots and we can pass matplotlib `Axis` to target the location of the plots.

```python
fig, ax = plt.subplots(1, 2)
sns.lineplot(x='year', y='life_expectancy', data=df, ax=ax[0], linestyle=':')
sns.lineplot(x='year', y='life_expectancy', data=df, ax=ax[1], linestyle='-.')
```

---

## Seaborn with DataFrames, cont.

`hue` colors the points by a column, and `sns.scatterplot()` shows the relationship between two columns.

```python
fig, ax = plt.subplots(figsize=(6, 4), layout='constrained')
sns.scatterplot(data=df_2007, x='gdp_per_capita', y='life_expectancy', hue='continent', ax=ax)
ax.set_xscale('log')
```

`ax.set_xscale('log')` is a matplotlib method from Module 4. Wealth spans orders of magnitude, so a log axis spreads the countries out.

---

## Seaborn with DataFrames, cont.

`sns.lineplot()` draws a line for each value of `hue`. When there are many rows per `x`, e.g. many countries per `year`, seaborn plots the mean and a shaded interval around it.

```python
sns.lineplot(data=df, x='year', y='life_expectancy', hue='continent')
```

This is the same result as `groupby(['continent', 'year'])['life_expectancy'].mean()`, drawn for us.

---

## Practice (5 min)

Let's work on these questions:

1. Simulate rolling two dice 10,000 times, like in Module 3, and plot the distribution of the sum with `sns.histplot(..., discrete=True)`.
2. Simulate three groups with different standard deviations and compare them with `sns.boxplot()` and `sns.violinplot()` side by side.
3. Label your axes, add a figure title, and save your figure.

---

## Practice (10 min)

Let's work on these questions:

1. Use `sns.histplot()` on `df_2007` to plot the distribution of `life_expectancy`. Add `hue='continent'`. What do you notice?
2. Make a scatterplot of `gdp_per_capita` against `life_expectancy` for `df_2007`, with the size of the points set by `pop` (`size='pop'`).
3. Use `sns.lineplot()` to show `pop` over `year`, with a line for each `continent`. Which continent grew the fastest?

---

## Exercise

Let's do some more exploration of the Gapminder dataset.

- Create a breakdown by year and country of the average life expectancy and the average GDP per capita
- Create another breakdown by year and continent
- Create a breakdown by year for average life expectancy and GDP per capita
- Create a figure with two subplots with the two calculated averages

---

## Save Your Work

Commit and push your notes from today on your `personal` branch:

```bash
git add notebooks/module_06.ipynb
git commit -m "Module 6 notes"
git push --force-with-lease origin personal
```

Recall from Module 5: rebasing gave your commits new hashes, so a plain `git push` is rejected.

---

## <!-- fit --> That's it for today!
