---
title: Module 07: Intro to SciPy
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

# Module 07: Intro to SciPy

October 5, 2026

---

Content covered:

1. Intro to SciPy - Basic stats
   1. Correlation
   2. T-tests

---

By the end of this class, you will be able to:

- Run and interpret a correlation with SciPy
- Run and interpret a t-test with SciPy

---

## <!-- fit -->1. Review

---

## Things We've Covered

- Python basics: strings, lists, dictionaries, loops, functions, classes
- NumPy: `ndarray` and random number generators
- Matplotlib: `fig, ax = plt.subplots()`
- Pandas: DataFrames, `.iloc` and `.loc`, `groupby`, `.rename()`
- Seaborn: statistical plots on DataFrames

Today we move from *describing* data to asking questions about it.

---

## Open Today's Notebook

We'll use this notebook, `notebooks/module_07.ipynb`, for the rest of class.

First, bring it into your `personal` branch (recall Module 5):

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

Then open `notebooks/module_07.ipynb` in Jupyter Lab. It has today's code and a cell for each practice question.

---

## Picking Up Where We Left Off

We'll keep working with the Gapminder data.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data/gapminder.tsv', sep='\t')
df = df.rename(columns={'lifeExp': 'life_expectancy', 'gdpPercap': 'gdp_per_capita'})
df_2007 = df.query("year == 2007")
```

`df_2007` has one row per country, which is what we want for the tests today.

---

## <!-- fit -->2. Intro to SciPy

---

## SciPy

SciPy is a library of tools for scientific computing. It is built on top of NumPy and is already installed in our `gsk` conda environment.

SciPy is organized into submodules, e.g. `scipy.stats` for statistics, `scipy.optimize` for optimization, and `scipy.signal` for signal processing.

Today we use `scipy.stats`.

```python
from scipy import stats
```

---

## <!-- fit -->3. Correlation

---

## Do Wealthier Countries Live Longer?

Let's look at the relationship between GDP per capita and life expectancy in 2007.

```python
sns.scatterplot(data=df_2007, x='gdp_per_capita', y='life_expectancy')
```

Q: What do you notice about the shape of the relationship?

---

## Correlation

A **correlation** measures how strongly two variables move together, from -1 to 1:

- Close to 1: when one goes up, the other goes up
- Close to -1: when one goes up, the other goes down
- Close to 0: no linear relationship

Pandas gives us a quick look:

```python
df_2007['gdp_per_capita'].corr(df_2007['life_expectancy'])
```

---

## Correlation with SciPy

`stats.pearsonr()` gives us the correlation, and a p-value.

```python
result = stats.pearsonr(df_2007['gdp_per_capita'], df_2007['life_expectancy'])
result
```

```
PearsonRResult(statistic=0.679, pvalue=1.69e-20)
```

- `statistic` is the correlation coefficient, `r`
- `pvalue` tells us how surprising an `r` this large would be if there were no real relationship

---

## What is a p-value?

Imagine there were truly no relationship between the two variables. The p-value is the probability of seeing a result at least this extreme just by chance.

- A small p-value (commonly below 0.05): unlikely to be chance
- A large p-value: we can't rule out chance

A small p-value does not tell you the relationship is large or important. For that, look at `r`.

---

## A Better Fit with a Log Transform

The scatterplot curves, so a straight line is a poor summary of it. Wealth spans orders of magnitude, so let's use the log of GDP, like we did with the log axis in Module 6.

```python
log_gdp = np.log10(df_2007['gdp_per_capita'])
stats.pearsonr(log_gdp, df_2007['life_expectancy'])
```

`r` goes from 0.68 to 0.81. The relationship is closer to a straight line on the log scale.

---

## Correlation Is Not Causation

A strong correlation does not mean one variable causes the other.

- Wealthy countries may have better healthcare, but also better nutrition, sanitation, and education
- A third variable can drive both

Correlation tells us that two variables are related. It doesn't tell us why.

---

## Spearman Correlation

Pearson looks for a *straight-line* relationship. `stats.spearmanr()` compares the *ranks* of the values instead, so it handles curved but consistently increasing relationships, and is less sensitive to outliers.

```python
stats.spearmanr(df_2007['gdp_per_capita'], df_2007['life_expectancy'])
```

Without any transform, Spearman gives 0.86, higher than Pearson's 0.68.

---

## Practice (5 min)

Let's work on these questions:

1. Make a scatterplot of `pop` against `life_expectancy` for `df_2007`. Use a log axis for `pop`.
2. Use `stats.pearsonr()` to get the correlation between `pop` and `life_expectancy`. Is the correlation strong? Is the p-value small?
3. Pick a different year, e.g. 1952, and compute the correlation between `gdp_per_capita` and `life_expectancy`. Has the relationship changed?

---

## <!-- fit -->4. T-tests

---

## Comparing Two Groups

Is life expectancy different in Europe than in Africa?

We always start by looking at the data:

```python
two = df_2007.query("continent in ['Europe', 'Africa']")

sns.boxplot(data=two, x='continent', y='life_expectancy')
```

---

## Comparing Two Groups, cont.

Let's pull out each group as its own Series.

```python
europe = df_2007.query("continent == 'Europe'")['life_expectancy']
africa = df_2007.query("continent == 'Africa'")['life_expectancy']

europe.mean(), africa.mean()
```

The means are about 77.6 and 54.8 years. But every country varies, so is the gap bigger than we'd expect from chance?

---

## The t-test

A **t-test** asks whether the means of two groups are different, taking into account how spread out the data is and how many samples we have.

```python
stats.ttest_ind(europe, africa)
```

```
TtestResult(statistic=12.6, pvalue=1.02e-20, df=80.0)
```

- `statistic`: how many standard errors apart the two means are
- `pvalue`: how surprising a gap this large would be if the two groups had the same mean

---

## Reading the Result

With a p-value of 1e-20, far below 0.05, we conclude that the difference in average life expectancy between Europe and Africa is very unlikely to be due to chance.

Report it with both the test and the effect:

> Life expectancy was higher in Europe (77.6 years) than in Africa (54.8 years), t = 12.6, p < 0.001.

A t-test can tell us a difference is real. It doesn't tell us why.

---

## When the Answer Is "Not Sure"

Let's compare the Americas and Asia.

```python
americas = df_2007.query("continent == 'Americas'")['life_expectancy']
asia = df_2007.query("continent == 'Asia'")['life_expectancy']

stats.ttest_ind(americas, asia)
```

The means are 73.6 and 70.7, but the p-value is about 0.11. That is above 0.05, so we can't rule out chance.

"Not significant" is not the same as "no difference". It means we don't have enough evidence.

---

## Practice (5 min)

Let's work on these questions:

1. Make a boxplot of `life_expectancy` for Europe and Oceania in 2007.
2. Use `stats.ttest_ind()` to compare them. Is the difference significant?
3. Oceania only has two countries. How might that affect your confidence in the result?

---

## Cheatsheet

| Question | Function |
|---|---|
| Linearly related? | `stats.pearsonr(x, y)` |
| Related by rank? | `stats.spearmanr(x, y)` |
| Do two groups differ in mean? | `stats.ttest_ind(a, b)` |

https://docs.scipy.org/doc/scipy/reference/stats.html

---

## Practice (10 min)

Let's work on these questions:

1. Is the correlation between `gdp_per_capita` and `life_expectancy` stronger in 1952 or 2007? Use the log of GDP.
2. Compare the 2007 life expectancy of the Americas and Europe with a t-test. Report your result in a sentence, like we did for Europe and Africa.
3. Compare the 1952 life expectancy of Europe and Africa with a t-test. Is the gap larger or smaller than in 2007?

---

## Exercise

Let's explore the Gapminder dataset with what we learned today.

- Compute the correlation between `gdp_per_capita` and `life_expectancy` for every year, in a loop or with `groupby`
- Plot the correlation over `year`
- Pick two continents and test whether their life expectancy differs in 2007
- In a Markdown cell, write a short summary of your findings

---

## Save Your Work

Commit and push your notes from today on your `personal` branch:

```bash
git add notebooks/module_07.ipynb
git commit -m "Module 7 notes"
git push --force-with-lease origin personal
```

---

## <!-- fit --> That's it for today!
